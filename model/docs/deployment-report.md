# LIFE OS database deployment report

วันที่ตรวจรับ: 2026-09-22  
Supabase project: `Life OS - Data base` (`hsvoywcabayydmvydqrj`)

## สถานะ

Foundation database ถูก deploy และผ่านการทดสอบบน Supabase/PostgreSQL จริงแล้ว

| รายการ | ผลลัพธ์ |
|---|---|
| Baseline migration `20260922032016` | สำเร็จ |
| Typed-entity message fix `20260922084905` | สำเร็จ |
| ตารางใน `public` | 12 ตาราง เปิด RLS ครบ |
| Section catalog | `tasks`, `calendar`, `health`, `finance` |
| TypeScript database types | สร้างสำเร็จ |
| Test fixtures หลังทดสอบ | ไม่เหลือ users, entities หรือข้อมูลทดสอบ |

## ผลทดสอบ

ชุดทดสอบถูกแบ่งเป็น 5 คำขอ SQL เพื่อให้อยู่ภายในขนาดที่ Supabase MCP รองรับ ทุกชุดสร้าง fixture ใน transaction ของตนเองและจบด้วย `ROLLBACK`

- `01_rls_crud.sql`: ผ่าน — owner A/B CRUD และ cross-user isolation
- `02a_links_typed.sql`: ผ่าน — owner/cross-owner links และ typed rows
- `02b_identity_time.sql`: ผ่าน — section/type validation, immutable identity และ time constraints
- `03_finance_access.sql`: ผ่าน — balanced ledger, owner access, cross-owner/anon denial
- `04_finance_invariants.sql`: ผ่าน — ปฏิเสธ empty และ unbalanced finance transactions

การทดสอบสดพบ bug ใน baseline: `validate_typed_entity()` ใช้ placeholder ของ PostgreSQL `format()` ผิดรูปแบบและคืน error `22023`. Migration `20260922084905` แก้เป็น `%s`, คง `SECURITY INVOKER`, pinned `search_path`, SQLSTATE `23514` และสิทธิ์ execute ที่จำกัดไว้ หลังแก้แล้วชุดทดสอบทั้งห้าผ่าน

## Advisors

- Security Advisor ยังมี warning เดิมจาก `public.rls_auto_enable()` ซึ่งเป็น `SECURITY DEFINER` และ executable โดย `anon`/`authenticated`. ฟังก์ชันนี้มีอยู่ก่อน LIFE OS migration และไม่ได้แก้ตามขอบเขตที่อนุมัติ: https://supabase.com/docs/guides/database/database-linter?lint=0028_anon_security_definer_function_executable
- Performance Advisor รายงาน INFO: foreign keys ที่ยังไม่มี index 9 รายการ และ unused indexes 9 รายการ. ฐานข้อมูลยังว่าง จึงยังสรุป unused indexes จาก workload ไม่ได้; ควรตรวจ foreign-key indexes ก่อนเริ่มโหลดข้อมูลจริง และประเมิน unused indexes หลังมี query workload.

## การจัด migration ใน repository

ให้เก็บ **ประวัติที่ deploy จริงแบบ immutable** เป็น source of truth:

```text
supabase/migrations/
  20260922032016_life_os_core_baseline.sql
  20260922084905_fix_typed_entity_validation_message.sql
```

ไฟล์แรกต้องตรงกับ SQL ที่ apply จริง รวม bug ของข้อความ error และไฟล์ที่สองต้องเก็บ fix ที่ apply จริง ห้ามแก้ย้อนหลังไฟล์ `20260922032016` เพราะจะทำให้ repository ไม่ตรงกับ migration history ของฐานข้อมูล

สำหรับการสร้าง environment ใหม่ ให้รัน migrations ทั้งสองไฟล์ตามลำดับ ผลลัพธ์สุดท้ายจะถูกต้องและทำซ้ำได้. ไฟล์ corrected/squashed baseline ใน `db_work/schema/002_hardened_core.sql` ใช้เป็น schema reference หรือ bootstrap artifact ได้ แต่ไม่ควรวางใน migration runner พร้อมสองไฟล์ข้างต้น เพราะจะสร้างตารางซ้ำ

`model/migrations/001_core.sql` เดิมเป็น design draft และไม่ตรงกับประวัติ deploy จึงลบออกจาก repository แล้วเพื่อป้องกันการ apply ผิดไฟล์; source of truth อยู่ใน `supabase/migrations`.

## งานถัดไป

1. เพิ่ม index สำหรับ foreign keys ที่มีรูปแบบ query/join ชัดเจน แล้วรัน Performance Advisor ซ้ำ.
2. ตัดสินใจแยกต่างหากว่าจะ revoke execute จาก `public.rls_auto_enable()` หรือย้ายออกจาก exposed schema.
3. ทำ server transaction/RPC สำหรับการเขียน `entity_records` พร้อม typed row แบบ atomic.

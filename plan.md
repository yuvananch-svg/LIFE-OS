# LIFE OS — แผนสร้างแอพส่วนตัว

> สถานะ: แผนเริ่มต้น | ปรับปรุง: 2026-09-21 | เป้าหมาย: ใช้เองบน iPhone เป็นหลัก และต้องสามารถเปิดใช้งานบน iPad/คอมพิวเตอร์ได้

## 1. เป้าหมายและหลักการ

LIFE OS เป็นศูนย์กลางดูแลชีวิตประจำวัน: วันนี้ต้องทำอะไร, เป้าหมายคืบหน้าแค่ไหน, สุขภาพและเงินเป็นอย่างไร, มีอะไรที่ควรบันทึกหรือติดตามต่อ ไม่ให้หน้าแรกหรือเมนูหลักกลายเป็นแอพการเงินเพียงอย่างเดียว

- เริ่มเป็นเว็บแอพแบบ **PWA** เพิ่มไปยังหน้าจอโฮม iPhone ได้ โดยไม่ต้องลง App Store หรือจ่ายค่าสมาชิก Apple Developer
- ใช้คนเดียวก่อน แต่ฐานข้อมูลผูก `user_id` ตั้งแต่แรกเพื่อกันข้อมูลข้ามบัญชีและขยายภายหลังได้
- ออกแบบ mobile first; คอมพิวเตอร์ใช้ดูรายละเอียด/รายงานได้; ภาษาไทยเป็นหลัก; เวลา `Asia/Bangkok`; รองรับ light/dark
- จดให้เร็วที่สุด: งาน, มื้ออาหาร, น้ำหนัก, เซ็ตออกกำลัง, รายจ่าย ด้วยทางลัดเดียวจากหน้า Capture/hold to talk
- ผู้ช่วย AI อ่านและเชื่อมข้อมูลจากทุก section ที่ผู้ใช้อนุญาต ไม่จำกัดคู่ด้านที่กำหนดไว้ล่วงหน้า; เสนอแผนและเตือนอย่างมีเหตุผล โดยผู้ใช้เห็นและยืนยันก่อนบันทึกหรือแก้ข้อมูล
- ทำงานเป็นช่วงเล็ก ๆ ที่ใช้งานได้จริงก่อนเพิ่มการสแกนสลิป, การเชื่อมบริการภายนอก และ AI ขั้นสูง

## 2. ขอบเขตผลิตภัณฑ์และลำดับความสำคัญ

| ด้านชีวิต | รุ่นแรก (MVP) | ระยะต่อไป |
|---|---|---|
| ภาพรวม | Today: กำหนดการ, งาน, นิสัย, นัด/บิลใกล้ครบ, บันทึกด่วน; สรุปวัน | สรุปรายสัปดาห์และข้อสังเกตในแต่ละด้าน |
| วางแผน | Tasks, กำหนดวัน/เวลา, งานซ้ำ, habits, goals และ milestones | จัดเวลาอัตโนมัติ, ปฏิทินภายนอกแบบสองทาง |
| สุขภาพ | น้ำหนัก, อาหาร/พลังงานและ macro, โปรแกรมฝึก, เซ็ต/ครั้ง/น้ำหนัก, น้ำ, การนอน, steps แบบกรอกเอง | รอบเอว, ภาพความคืบหน้า, RIR, อาการล้า, cardio, วิเคราะห์แนวโน้ม, เชื่อม Health หากทำได้จริง |
| การเงิน | Wallet หลายใบ, รายรับ/รายจ่าย, โอนระหว่าง wallet, หมวดหมู่, บิล/สมาชิก, เป้าหมายออม | หนี้, ผ่อนชำระ, ลงทุน, เงินปันผล, หลายสกุล/อัตราแลกเปลี่ยน, อ่านสลิปและจดจำร้านค้า |
| งาน/การเรียน | งานและเป้าหมายแยกตาม life area, บันทึกสั้น | โครงการ, บันทึกการเรียน, โฟกัสเซสชัน |
| ความสัมพันธ์/ส่วนตัว | นัดและวันสำคัญ, reminders, บันทึก | check-in และทบทวนช่วงเวลา |
| AI | ช่วยสรุปวันนี้/วางแผนพรุ่งนี้, ชวนบันทึกเมื่อข้อมูลขาด, ตอบคำถามจากทุก section ที่เชื่อมเข้าระบบและได้รับอนุญาต, ตรวจเวลาชนกันก่อนเพิ่มนัด | ค้นความสัมพันธ์หลายด้านอย่างยืดหยุ่น (ตัวอย่าง: สุขภาพ/การเงิน/งาน/ความสัมพันธ์/การเรียน), จัดหมวดหมู่อัตโนมัติ, OCR และวิเคราะห์เชิงลึก |

**เกณฑ์ MVP:** เปิดจากหน้าจอโฮม → เห็นวันนี้ → เพิ่มงาน/นิสัย/ข้อมูลสุขภาพ/รายการเงิน → ติดตามเป้าหมาย → ดูสรุป 7 วัน → ตั้งการเตือน → ส่งออกข้อมูลของตัวเองได้ โดยทุกหน้าทำงานบนมือถือจริง

**ขอบเขตที่ยังไม่ทำใน MVP:** ซิงก์บัญชีธนาคาร, อ่านข้อมูล Apple Health โดยตรง, OCR สลิป, คำแนะนำการรักษาพยาบาลหรือการลงทุนอัตโนมัติ, ระบบสมาชิกหลายคน/การแชร์ข้อมูล ให้เตรียมจุดต่อขยายไว้โดยไม่เพิ่มความซับซ้อนตั้งแต่เริ่ม

## 3. ประสบการณ์ใช้งานและ Frontend

### 3.1 โครงหน้า

เมนูล่าง: **Today / Plan / Capture / Insights / Me**; ปุ่ม Capture อยู่กลางและเด่นกว่าเมนูอื่น การเงินและสุขภาพอยู่ใน life areas ไม่ครองเมนูหลัก

- **Today:** timeline วันนี้, งานที่ต้องทำ, habits, การฝึก/มื้ออาหาร, ยอดเงินที่ควรรู้, บิลใกล้ครบ, ข้อเสนอแนะสั้น ๆ; แต่ละการ์ดแตะเข้าโมดูลได้
- **Plan:** ปฏิทิน/รายการงาน, habit, goal, กรองตาม Work / Health / Finance / Relationships / Learning / Personal; ก่อนบันทึกนัด/งานที่มีเวลา แสดงเวลาชนกันและช่วงว่างทางเลือกจากทุก life area
- **Capture:** แผ่นเมนูเพิ่มด่วนจากทุกหน้า; ช่องเดียวรองรับข้อความสั้น แล้วให้เลือกชนิดข้อมูลก่อนบันทึก; ฟอร์มจำค่าที่ใช้บ่อย
- **Insights:** กราฟและสรุปที่มีช่วงวันชัดเจน; เริ่มจากงาน/นิสัย/สุขภาพ/เงิน ไม่ให้ยอดรวมต่างหน่วยมาปะปน
- **Me:** โปรไฟล์, เป้าหมาย, การตั้งค่าเวลา/หน่วย/สกุลเงิน, การแจ้งเตือน, AI/ความเป็นส่วนตัว, ส่งออก/ลบข้อมูล
- **หน้าโมดูล:** Health (Body, Nutrition, Workout, Recovery, Activity), Finance (Wallet, Transactions, Bills, Goals), รายละเอียดงาน/เป้าหมาย, AI assistant

### 3.2 ดีไซน์และการเข้าถึง

- ผิวสว่างขาว/เทาอ่อนเป็นหลัก สีรองนุ่ม ๆ ลดเหลือง/ส้มจัด มี dark mode; ขอบมน เงาบาง ปุ่มมีสถานะกด
- เมนูที่เลือกมีตัวเน้นเคลื่อนอย่างนุ่มนวล, drag/spring เฉพาะส่วนที่ช่วยเข้าใจการกระทำ; เคารพ `prefers-reduced-motion`
- ขนาดปุ่มกดเหมาะกับนิ้ว, รองรับ safe area ของ iPhone, คีย์บอร์ด/โปรแกรมอ่านหน้าจอ, สถานะ loading/empty/error และการแก้รายการย้อนหลัง
- Wallet โอนเงินด้วยฟอร์มก่อน; drag ระหว่าง wallet เป็นทางลัดในระยะต่อไป และต้องมีหน้าตรวจสอบยอดก่อนยืนยัน
- ทำ manifest, icons, หน้า offline และแคชเฉพาะ app shell; ข้อมูลส่วนตัวไม่เก็บถาวรในแคชสาธารณะ
- การบันทึกเมื่อออฟไลน์เป็นเฟสแยก: queue ฝั่งเครื่องพร้อม `client_mutation_id`, แสดงสถานะยังไม่ซิงก์, กันบันทึกซ้ำ/จัดการ conflict แล้วทดสอบก่อนเปิดใช้

### 3.3 สแต็กและโครงไฟล์ที่เสนอ

- **Next.js + TypeScript + React** สำหรับ UI/PWA และ route handlers; เลือกเวอร์ชัน stable ที่ตรวจสอบ ณ วันเริ่มทำและล็อกใน lockfile
- CSS ผ่าน Tailwind CSS หรือ CSS modules ตามต้นแบบจริง; reusable components, form validation ด้วย schema เดียวทั้ง client/server, chart library เท่าที่จำเป็น
- โครงสร้าง: `src/app/(auth)`, `src/app/(app)/today|plan|insights|me|health|finance`, `src/components`, `src/features/{tasks,habits,goals,health,finance,ai}`, `src/lib`, `supabase/migrations`, `supabase/tests`
- CI ตรวจ typecheck, lint, unit tests ของกฎคำนวณ และ smoke test ของ flow หลัก

## 4. Backend และขอบเขตความรับผิดชอบ

ใช้ **Supabase Auth + PostgreSQL + private Storage** เป็นระบบข้อมูลหลัก; Next.js route handlers/server actions เป็นชั้นตรวจคำขอ, orchestration และเรียกบริการภายนอก; งานตั้งเวลา/การแจ้งเตือนให้รันบน server scheduler ที่ยืนยันความพร้อมของผู้ให้บริการในตอนลงมือทำ ไม่อาศัยแท็บเว็บเปิดค้าง

### 4.1 Flow หลัก

1. ผู้ใช้เข้าสู่ระบบ → เซสชันยืนยันตัวตน → อ่านข้อมูลตาม `user_id` ผ่าน RLS
2. บันทึกด่วน → ตรวจชนิด/หน่วย/วันที่ที่ server → เขียนรายการ → ส่งข้อมูลล่าสุดกลับไปอัปเดต Today และ Insights
3. เปลี่ยนงาน/บิล/ตารางซ้ำ → คำนวณ occurrence/เวลาเตือนตามเขตเวลาที่เก็บ → บันทึก reminder job ที่มี idempotency key
4. AI question → server ตรวจสิทธิ์/ช่วงเวลาและค้น data capabilities ของทุก section ที่เปิดใช้ → เลือกเครื่องมืออ่านข้อมูลที่เกี่ยวข้องหนึ่งหรือหลาย section ตามสิทธิ์ → เชื่อม fact ด้วยเวลา/ความสัมพันธ์/หน่วยที่มีความหมาย → คำนวณตัวเลขและเวลาชนกันแบบ deterministic → ส่งผลลัพธ์พร้อมแหล่งรายการให้โมเดลช่วยสรุป → คืนคำตอบพร้อมขอบเขตและข้อจำกัด
5. AI เสนอแก้งาน/หมวดหมู่ → แสดง preview diff → ผู้ใช้กดยืนยัน → server ตรวจสิทธิ์และบันทึก

### 4.2 โมดูลบริการ

- **Auth/profile:** เริ่มด้วย email sign-in ที่ใช้ง่าย, protected routes, session expiry, timezone/locale/currency/preferences
- **Planner:** CRUD tasks, recurrence rule, completion events, habits และ check-ins, goal milestones; เปลี่ยน recurrence ต้องไม่ลบประวัติ; โมดูล availability รวมเวลานัด งานที่ล็อกเวลา การออกกำลังกาย และเวลาที่ผู้ใช้กันไว้ก่อนเสนอช่วงว่าง
- **Health:** อาหารบันทึกแบบกรอกเอง, รายการฝึก, per-set logs, metrics รายวัน; ค่าแคลอรี/มาโครเป้าหมายปรับได้ (เช่น baseline 2,500 kcal; P 140 g / C 325 g / F 71 g เป็นค่าตั้งต้นของผู้ใช้ ไม่ hardcode เป็นกฎสำหรับทุกคน)
- **Finance:** ledger รายการ, การโอนสร้างคู่รายการใน transaction เดียว, ตัวเลขเงินใช้ `numeric` หรือจำนวนหน่วยย่อยตามสกุล ไม่ใช้ float; แยกยอดคงเหลือจริงกับยอดแสดงผล/การจัดสรร
- **Reminders:** ตั้งเตือนในแอพและ browser push เมื่ออุปกรณ์อนุญาต; ตรวจ permission/การติดตั้ง Home Screen บน iPhone จริง; มี fallback เป็นรายการเตือนใน Today เสมอ, ป้องกันการส่งซ้ำ
- **AI gateway:** มี capability registry ที่แต่ละ section ลงทะเบียนชนิดข้อมูล/เวลา/ตัวกรอง/เครื่องมืออ่าน/กฎสิทธิ์; AI วางแผน query จาก registry โดยไม่ hardcode คู่ section; เก็บ API key บน server, จำกัดการเรียกและ token budget, บันทึกต้นทุน/ข้อผิดพลาดเท่าที่จำเป็น; ผู้ใช้เลือกเปิดทุกด้านหรือกำหนดสิทธิ์รายด้าน/ปิด AI
- **Imports/exports:** CSV/JSON export แยกตามโมดูล, backup/restore ที่ตรวจ schema; นำเข้าข้อมูลจริงและ OCR สลิปในเฟสหลังพร้อมหน้า review
- **Jobs:** สร้าง reminders, สรุปรายสัปดาห์, FX snapshot วันละครั้งเมื่อเปิดหลายสกุลในเฟสหลัง; กำหนดเวลาใน `Asia/Bangkok` แล้วเก็บ instant เป็น UTC

### 4.3 API contract ตัวอย่าง

| Contract | หน้าที่ | กติกาสำคัญ |
|---|---|---|
| `POST /api/capture` | สร้าง task/health/finance ตาม discriminator | validate ตามประเภท; user_id จากเซสชันเท่านั้น |
| `GET /api/today?date=YYYY-MM-DD` | รวมรายการและสรุปวันนี้ | คำนวณวันที่ตาม timezone; จำกัดข้อมูลที่ดึง |
| `POST /api/finance/transfers` | ย้ายเงิน wallet | atomic, source ≠ destination, หน่วยเงิน/FX ชัดเจน |
| `POST /api/ai/ask` | ถามข้อมูลช่วงวัน | whitelist tools, read scope, rate limit, อ้างช่วงเวลา |
| `POST /api/reminders/subscriptions` | ลงทะเบียน push | ผูก device/user, ลบหรือ revoke ได้ |
| `GET /api/export` | ส่งออกข้อมูล | ยืนยันเซสชัน; ไม่เปิดเผยไฟล์ถาวรต่อสาธารณะ |

เส้นทางเป็นแนวทางออกแบบ; บาง CRUD อาจใช้ Supabase client + RLS โดยตรง แยก route handler เฉพาะกฎธุรกิจและงานที่ต้องใช้ secret ไม่สร้าง API ซ้ำโดยไร้เหตุผล

## 5. Database: schema รุ่นแรก

ใช้ PostgreSQL migrations ที่ version control; ทุกตารางมี primary key, `user_id` (ยกเว้นตารางลูกที่ owner ตรวจผ่าน parent และ auth-owned table), `created_at` และ `updated_at` ตามเหมาะสม; ความสัมพันธ์จริงใช้ FK, check constraints, unique keys และ index ตามรูปแบบ query

| กลุ่ม | ตารางหลักและฟิลด์สำคัญ | ความสัมพันธ์/ข้อกำหนด |
|---|---|---|
| ตัวตน | `profiles(id = auth.users.id, timezone, locale, base_currency, units, ai_consent)`, `user_settings` | ผู้ใช้หนึ่งคนมี settings ของตนเอง |
| Planner | `life_areas(id, user_id, name)`, `tasks(id, user_id, area_id, title, due_at, recurrence_rule, status)`, `task_completions(task_id, occurrence_date, completed_at)` | unique completion ต่อ occurrence; ใช้ `due_at` UTC และ local recurrence |
| Habits/goals | `habits(id, user_id, schedule, target)`, `habit_checkins(habit_id, local_date, value)`, `goals(id, user_id, area_id, target, unit, due_date)`, `goal_updates` | unique check-in ต่อวันตามกฎ habit; goal history ไม่ overwrite |
| Notes/events | `notes(id, user_id, area_id, body)`, `personal_events(id, user_id, starts_at, ends_at, recurrence_rule, type, blocks_time)`, `availability_rules(id, user_id, weekday, local_start, local_end, type)` | นัดและเวลาที่กันไว้โยง life area; แต่ละช่วงเวลาต้อง end > start; occurrence ของรายการซ้ำคำนวณตาม timezone |
| Health/body | `body_measurements(id, user_id, measured_at, weight_kg, waist_cm)`, `daily_wellness(id, user_id, local_date, sleep_minutes, water_ml, steps, energy, soreness)` | unique daily wellness ต่อ local date; nullable เมื่อไม่บันทึก |
| Nutrition | `food_entries(id, user_id, eaten_at, title, kcal, protein_g, carbs_g, fat_g)`, `nutrition_targets(user_id, valid_from, kcal, protein_g, carbs_g, fat_g)` | target มีประวัติช่วงเวลา; ไม่เดาค่าอาหารที่ไม่รู้ |
| Workout | `exercises(id, user_id, name, muscle_group)`, `workout_templates`, `template_exercises`, `workout_schedule(id, user_id, weekday, local_start, local_end, recurrence_rule)`, `workout_sessions(id, user_id, started_at, ended_at)`, `workout_sets(id, session_id, exercise_id, set_index, weight_kg, reps, rir)` | ตารางฝึกที่วางแผนเป็นช่วงไม่ว่าง; session ที่ทำจริงแยกจากแผน; index session/exercise/time |
| Finance | `wallets(id, user_id, currency, opening_balance)`, `categories(id, user_id, type)`, `transactions(id, user_id, wallet_id, type, amount, currency, occurred_at, category_id, transfer_group_id)`, `bills`, `subscriptions`, `saving_goals` | amount เป็นค่าบวกพร้อมชนิด debit/credit; transfer_group เชื่อมคู่รายการ, บันทึกใน transaction เดียว |
| Reminders | `reminders(id, user_id, source_type, source_id, due_at, status)`, `push_subscriptions(id, user_id, endpoint, keys_encrypted_or_protected)`, `notification_deliveries` | unique source occurrence + channel; เก็บ delivery status และ retry count |
| AI/ระบบ | `ai_requests(id, user_id, intent, period_start, period_end, token_count, cost_estimate)`, `ai_data_permissions(user_id, area_id, allowed)`, `entity_links(id, user_id, source_type, source_id, target_type, target_id, relation, provenance)`, `audit_events`, `import_jobs` | สิทธิ์การอ่านแยก section; entity_links ใช้โยงรายการข้ามด้านเมื่อมีความสัมพันธ์จริง; ตรวจเจ้าของทั้งสองฝั่งใน server; เก็บ metadata เท่าที่จำเป็น |

**เฟสต่อไป:** `debts`, `debt_payments`, `investment_accounts`, `holdings`, `trades`, `dividends`, `fx_rates(base, quote, rate, as_of, source)`, `merchant_rules`, `receipt_uploads`, `cardio_sessions`, `body_photos`. เพิ่มด้วย migrations แยกตามโมดูล

**กฎคำนวณ:** น้ำหนักแสดงค่าเฉลี่ยเคลื่อนที่ 7 วันเฉพาะวันที่มีข้อมูล พร้อมจำนวนตัวอย่าง; workout volume = ผลรวม `weight_kg × reps` ของเซ็ตที่ทำจริง (แยกความหมายเมื่อเป็น bodyweight); macro/kcal มีเป้าหมายและยอดจริงแยกกัน; balance = opening balance + signed ledger entries; multi-currency ต้องระบุสกุลต้นทาง/ปลายทาง, rate และ snapshot ณ เวลารายการ ห้ามบวกยอดต่างสกุลตรง ๆ

**ความปลอดภัย:** เปิด RLS ทุกตารางใน exposed schema, ให้สิทธิ์ SQL เท่าที่ต้องใช้และทดสอบ SELECT/INSERT/UPDATE/DELETE ทั้งกรณีเจ้าของ/คนอื่น/ไม่ล็อกอิน; storage รูปและสลิปเป็น private bucket พร้อม path ownership; ไม่มี service-role key ใน browser; views ต้องรักษา RLS; การลบข้อมูลและ export เป็น flow ที่ตรวจสิทธิ์; logs ไม่บันทึกข้อมูลสุขภาพ/การเงินโดยไม่จำเป็น

### 5.1 ชั้นเชื่อมข้อมูลข้าม section

ตารางแต่ละโมดูลยังเก็บข้อมูลเฉพาะด้านอย่างถูกชนิด ไม่ยัดข้อมูลทุกอย่างลงตารางเดียว แต่ทุก section มี **สัญญาการเชื่อมข้อมูล** ที่ประกาศให้ระบบกลางรู้จัก: `section`, `entity_type/id`, เจ้าของข้อมูล, ช่วงเวลา/เขตเวลา, หน่วย, tags หรือการจัดประเภทที่มีความหมาย, แหล่งที่มา, เวลาอัปเดตล่าสุด, permission และฟังก์ชันอ่าน/คำนวณที่รองรับ

- **Capability registry:** section ใหม่ลงทะเบียน schema ของข้อเท็จจริงและ read tools เช่น `search`, `get_timeline`, `aggregate`, `get_related`; ตัว orchestrator เห็นเฉพาะเครื่องมือที่ได้รับอนุญาต ไม่ต้องเพิ่มโค้ดเฉพาะสำหรับทุกคู่ section
- **Cross-section query layer:** นำผลจากแต่ละโมดูลมาจัดให้อยู่ในรูป fact ที่มีชนิดชัดเจน เชื่อมด้วยช่วงเวลา, เป้าหมาย, แท็ก หรือ `entity_links` ที่ตรวจสิทธิ์; รวมข้อมูลหลายด้านแบบเป็นลำดับขั้นใน server ไม่ให้โมเดลเขียน SQL อิสระหรืออ่านข้อมูลดิบทั้งฐานพร้อมกัน
- **Timeline กลาง:** นัด, งานที่ล็อกเวลา, ตารางฝึก, การเรียน, บิลที่มีเวลา, และกิจกรรมใหม่ในอนาคตลงทะเบียนว่า `blocks_time` หรือไม่; เครื่องมือตรวจชน/หาช่วงว่างจึงรับข้อมูลทุก section ที่เกี่ยวข้อง ไม่ผูกกับสองโมดูลตัวอย่าง
- **Insights:** registry ระบุ metric, หน่วย, grain, วิธีรวม และข้อมูลที่ขาด; ความสัมพันธ์ที่เสนอแสดงรายการ/ช่วงเวลาที่ใช้และแยก “ข้อสังเกต” จาก “ข้อสรุปเชิงเหตุผล”; ไม่จับคู่ข้อมูลที่หน่วยหรือช่วงเวลาเทียบกันไม่ได้
- **สิทธิ์และความสด:** ผู้ใช้เปิดทุก section หรือปิดเฉพาะบางด้านได้; เมื่อปิดด้านใดต้องไม่ถูกดึงเข้า AI ผ่าน summary/link/cache; แสดงแหล่งที่มาและเวลาซิงก์ของข้อมูลภายนอก
- **สัญญาของ section ใหม่:** ต้องระบุ entity/metrics/timeline contribution/read permissions และเพิ่ม integration tests ที่ถามข้าม section เดิมอย่างน้อยหนึ่งกรณี; จึงขยายความสามารถได้โดยไม่เขียนกฎเป็นคู่ เช่น Health × Finance, Health × Work, Finance × Learning ทีละคู่

## 6. AI assistant ที่ตอบจากข้อมูลจริง

- เริ่มจาก 4 intents: `plan_today`, `missing_logs`, `weekly_summary`, `answer_metrics`
- เครื่องมืออ่านข้อมูลที่แต่ละ section ลงทะเบียนใน registry เช่น `get_tasks(range)`, `get_habit_checkins(range)`, `get_health_summary(range)`, `get_finance_summary(range)` รวมถึงเครื่องมือกลาง `get_timeline(range)`, `find_free_slots(range, duration, buffer)` และ `check_conflicts(start, end)`; จำกัดช่วงวัน/จำนวนแถว และขอเฉพาะข้อมูลที่คำถามต้องใช้
- Backend เป็นคนคำนวณยอด, สถิติ, วันที่, ช่วงว่าง/เวลาชนกัน และแหล่งข้อมูล; โมเดลเขียนสรุป/ข้อเสนอแนะ พร้อมระบุข้อมูลที่ขาดและช่วงเวลาที่ใช้
- ทุก write action เป็นข้อเสนอที่กด confirm; ป้องกัน prompt injection จากข้อความบันทึก/สลิป; ไม่ส่งภาพหรือข้อมูลอ่อนไหวไปผู้ให้บริการ AI โดยไม่ยินยอม
- การเตือนให้กรอกข้อมูลมี cooldown, ตั้งช่วงเวลาห้ามรบกวนได้, ตรวจว่าเคยกรอกแล้ว; AI ล่มแล้วการบันทึกข้อมูลปกติยังใช้ได้
- ตัวอย่าง: “วันนี้ยังไม่ได้บันทึกมื้อเย็น” → ตรวจ log ในวันตามเวลาไทย → แสดงชวนบันทึกโดยไม่เดาอาหาร; “สัปดาห์นี้ฝึกดีขึ้นไหม” → เปรียบเทียบ exercise/volume/reps ที่เทียบกันได้ พร้อมจำนวนเซสชัน

### 6.1 AI ใช้ข้อมูลทุก section ร่วมกันอย่างไร

- “เรียนรู้ข้าม section” หมายถึงอ่านและเชื่อมข้อมูล **ทุกด้านที่มีในระบบและผู้ใช้อนุญาต** เพื่อหาความสัมพันธ์หรือจัดแผน ไม่จำกัดตัวอย่างหรือคู่ section ที่กำหนดไว้ และไม่ฝึกโมเดลใหม่ด้วยข้อมูลส่วนตัวโดยอัตโนมัติ
- คำถามอาจครอบคลุมหลายด้านพร้อมกัน เช่น “เวลางานกระทบการฝึกและค่าอาหารไหม”, “ช่วงไหนมีเวลาเรียนโดยไม่ชนงาน นัด และกิจวัตร”, “เดือนที่ค่าใช้จ่ายสูงขึ้นเกี่ยวข้องกับกิจกรรมอะไรบ้าง”; ระบบเลือก facts/metrics/timeline จาก section ที่เกี่ยวข้อง ไม่ต้องมีเครื่องมือเฉพาะทุกประโยค
- **ตัวอย่างเรื่องตารางเวลา:** รวม event, งานที่ระบุช่วงเวลา, ตารางฝึก, เวลาเรียน, เวลาเดินทาง/พัก และช่วงไม่สะดวกจาก section ใด ๆ เป็น busy intervals; คลี่ recurrence เฉพาะช่วงวันที่ถาม แล้วหักจากช่วงเวลาว่างที่ผู้ใช้ตั้งไว้เพื่อเสนอ slot ที่ยาวพอ รวม buffer ก่อน/หลัง
- ก่อนบันทึกรายการใหม่ที่บล็อกเวลา ตรวจ `check_conflicts` จากทุก section และแสดงรายการที่ชน (ชื่อ, ช่วงเวลา, แหล่งข้อมูล); ถ้าชนให้เสนอเวลาอื่น ผู้ใช้จะเลือกยืนยันรายการเดิมก็ได้; รายการที่ไม่มีเวลาแน่นอนหรือไม่บล็อกเวลาไม่ควรถูกนับว่าชน
- การคำนวณใช้เวลา `Asia/Bangkok` เพื่อแสดงผล แต่เปรียบเทียบ instant เป็น UTC; จัดการนัดข้ามวัน, event ทั้งวัน, ตารางซ้ำ และรายการนำเข้าจากภายนอกโดยไม่สร้าง occurrence ซ้ำ
- เมื่อวิเคราะห์ความสัมพันธ์ ใช้ข้อมูลที่เทียบกันได้และแสดงจำนวนตัวอย่าง/ข้อมูลที่ขาด; ใช้คำว่า “สัมพันธ์กัน” เมื่อยังสรุปเหตุและผลไม่ได้; หากไม่พบความเชื่อมโยงที่มีหลักฐาน ให้บอกว่าไม่พบ
- หากยังไม่ได้เชื่อมข้อมูลภายนอก ให้บอกชัดว่าตรวจเฉพาะรายการใน LIFE OS; แสดง “อัปเดตล่าสุด” ของแต่ละแหล่งเมื่อมีการซิงก์ และไม่รับรองว่าข้อมูลครบหากแหล่งภายนอกยังไม่ครบ
- ผู้ใช้ตั้งสิทธิ์ให้ AI อ่านทุกด้านหรือแยกแต่ละด้านได้ และเพิกถอนได้; การตรวจชนของตารางในแอพยังทำงานเป็นกฎปกติแม้ปิด AI; AI ไม่มีสิทธิ์เพิ่ม ย้าย หรือลบรายการเอง

**เกณฑ์ทดสอบ:** นัด 18:00–19:00 กับออกกำลัง 18:15–19:30 ต้องถูกแจ้งว่าชนพร้อมต้นทาง; ขอ “หาเวลาว่าง 60 นาทีพรุ่งนี้” แล้วผลลัพธ์ต้องไม่ทับรายการที่บล็อกเวลาจาก section ใด ๆ; เพิ่ม section ทดลองใหม่ที่มีข้อมูลช่วงเวลาและ metric → เครื่องมือกลางต้องค้นพบ ใช้ตอบคำถามข้ามด้านได้โดยไม่เพิ่มกฎเฉพาะคู่ section; ปิดสิทธิ์ section หนึ่ง → คำตอบและข้อมูลส่งไป AI ต้องไม่รวมด้านนั้น

## 7. ลำดับลงมือทำและงานที่ตรวจรับได้

| เฟส | งาน Frontend | งาน Backend/Database | เกณฑ์เสร็จ |
|---|---|---|---|
| 0. ตั้งต้น | wireframes 5 แท็บ, design tokens, PWA shell, responsive layout | repo, env example, Supabase project, migrations แรก, CI, backup/export strategy, สัญญา section/capability registry | เปิดแอพบน iPhone Home Screen และ desktop; ไม่มี secret ใน Git; section ใหม่มีรูปแบบเชื่อมระบบกลาง |
| 1. แกนประจำวัน | Today/Plan/Capture/Me, tasks, habits, goals, empty/loading/error, แจ้งเวลานัดชนกัน | auth, profiles, life areas, tasks/check-ins/goals, events/availability rules, conflict detection, RLS tests | สร้าง/แก้/ปิดงาน, เช็ก habit, ดูวันนี้ตามเวลาไทย; เพิ่มนัดชนแล้วเห็นคำเตือน; อีกบัญชีอ่านไม่ได้ |
| 2. สุขภาพ | Body/Nutrition/Workout/Recovery/Activity, quick log, กราฟ 7 วัน | health tables, validation หน่วย/วันที่, aggregations | จดน้ำหนัก/อาหาร/เซ็ตออกกำลัง และเห็นยอด/ค่าเฉลี่ยถูกต้อง |
| 3. การเงิน | wallets, transaction list, transfer, bills, saving goals | atomic transfer ledger, totals, due reminders | เพิ่มรายรับ/รายจ่าย/โอน; ยอดตรงกับรายการ; ไม่มีรายการโอนครึ่งเดียว |
| 4. เตือนและสรุป | notification settings, Insights, export | scheduler, delivery dedupe, push subscription, summary queries/export | รับหรือปฏิเสธ permission ได้; เตือนครั้งเดียว; export แล้วอ่านข้อมูลกลับได้ |
| 5. AI | หน้า assistant + preview การแก้ไข, ถามข้ามทุก section และขอช่วงว่าง | AI gateway, capability registry, cross-section query layer, availability query, consent, quota, error fallback | ถามข้อมูลจากหลายด้านพร้อมที่มา; เพิ่ม section แล้ว AI อ่านได้ผ่าน contract; เสนอเวลาไม่ชน; AI ไม่แก้ข้อมูลเอง |
| 6. ขยาย | slip review, investment/debt, FX, richer health, external integrations | OCR pipeline, merchant rules, FX snapshots, migrations รายโมดูล | แต่ละโมดูลมี migration, ทดสอบข้อมูลผิด/ซ้ำ, เปิดใช้ทีละส่วน |

### งานย่อยที่ควรเปิดเป็น GitHub Issues ตอนเริ่มพัฒนา

1. สร้าง wireframe ทั้ง 5 หน้าและ design tokens; ทดสอบการกดด้วยมือเดียวบน iPhone
2. ตั้ง Next.js, TypeScript, formatting/lint/CI, PWA manifest และไอคอน
3. ตั้ง Auth + protected routes + profiles + RLS policy tests
4. ทำ schema/migration planner; tasks/habits/goals CRUD และ recurrence
5. ทำ Capture + Today aggregation และ empty states
6. ทำ schema/หน้า Health และสูตรคำนวณ nutrition/workout
7. ทำ ledger/transfer/wallet พร้อม invariant tests
8. ทำ bills/reminders, in-app notification, ทดสอบ web push บนอุปกรณ์จริง
9. ทำ Insights + export/restore ขั้นต้น
10. ทำ AI gateway + section capability registry + read-only cross-section query + availability query + consent + confirm ก่อน write
11. ทดสอบ E2E บน iPhone, iPad/desktop, light/dark, timezone, เน็ตหลุด, สิทธิ์เข้าถึงข้อมูล

## 8. แนวทางทดสอบ, การปล่อยใช้งาน และค่าใช้จ่าย

- **Unit:** สูตรยอดเงิน/โอน, recurrence, ค่าเฉลี่ย 7 วัน, macro, workout volume, การแปลงวันใน timezone
- **DB/integration:** migration up/down ที่เหมาะสม, FK/checks, RLS allow/deny ข้ามบัญชี, atomicity, reminder idempotency, export/restore
- **E2E:** เข้าสู่ระบบ → เพิ่มข้อมูลจาก Capture → Today/Insights เปลี่ยน → แก้/ลบ; ทดสอบ iPhone จริงและติดตั้ง PWA
- **Deploy:** GitHub เก็บ source; deploy ตัวเว็บบนโฮสต์ที่รองรับ Next.js server runtime; ฐานข้อมูล/Storage แยกจาก GitHub; ตั้ง env ฝั่ง server ในโฮสต์, custom domain เป็นทางเลือก
- **ต้นทุน:** เริ่มจาก free tier ที่มีอยู่ ณ วันสร้างจริง ตรวจข้อจำกัดฐานข้อมูล/Storage/ฟังก์ชัน/AI/push ก่อนเลือกโฮสต์; ตั้งเพดานคำขอ AI, quota การเก็บรูป และแจ้งเมื่อใกล้เกินงบ ไม่สมมติว่าฟรีได้ตลอด
- **สำรองข้อมูล:** ส่งออกไฟล์ได้ตั้งแต่ MVP; ก่อนใช้งานจริงกำหนด backup ฐานข้อมูล, วิธีคืนข้อมูล, retention, และทดสอบ restore อย่างน้อยหนึ่งครั้ง
- **Definition of done ต่อ feature:** ใช้ได้บนจอมือถือ, validation ครบ, มี loading/error/empty, เข้าถึงด้วยคีย์บอร์ด, สิทธิ์ข้อมูลถูก, มีทดสอบสำหรับกฎสำคัญ, เอกสารและ migration อัปเดต

## 9. การตัดสินใจที่ต้องยืนยันด้วยต้นแบบจริง

- รุ่นแรกจะเชื่อม Google Calendar แบบอ่านอย่างเดียวหรือให้กรอกนัดใน LIFE OS ก่อน; หลีกเลี่ยงการซิงก์สองทางจนกว่าจะกำหนดเจ้าของข้อมูลและการแก้รายการชนกัน
- iPhone web push ต้องทดสอบบนเวอร์ชัน iOS/การติดตั้ง Home Screen/permission ของเครื่องผู้ใช้จริง; ใช้ Today reminders เป็น fallback
- การอ่าน Apple Health, สลิปธนาคาร และ bank sync ต้องตรวจความสามารถ/สิทธิ์ของ PWA และบริการที่เกี่ยวข้องก่อนกำหนดเป็นงานที่ส่งมอบ
- เลือกผู้ให้บริการ AI ภายหลังจากทดสอบต้นทุน, ความแม่นยำภาษาไทย และนโยบายข้อมูล; การเปลี่ยนโมเดลต้องไม่แตะ schema หลัก
- ตั้งค่าเริ่มต้นด้านโภชนาการจากข้อมูลผู้ใช้ที่ยืนยันอีกครั้ง; แสดงเป้าหมายเป็นค่าปรับได้ ไม่ผูกคำแนะนำสุขภาพกับตัวเลขถาวร

## 10. เอกสารอ้างอิงทางเทคนิค

- [Next.js PWA guide](https://nextjs.org/docs/app/guides/progressive-web-apps)
- [Supabase RLS guide](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [WebKit: Web Push for Web Apps on iOS/iPadOS](https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/)

> เอกสารนี้เป็นแผน ไม่ใช่สถานะว่า implementation มีแล้ว; อัปเดต checklist/การตัดสินใจหลังสร้างต้นแบบและทดสอบอุปกรณ์จริง

## 11. สถานะความคืบหน้าเทียบกับแผนงาน 9 ขั้นตอน

> ตรวจจาก branch `main` ณ 2026-09-25; เปอร์เซ็นต์เป็นการประเมินความครบของงานแต่ละขั้น ไม่ใช่ผลทดสอบการใช้งานจริงหรือค่าเฉลี่ยความคืบหน้าของทั้งโครงการ. สถานะฐานข้อมูลที่ deploy อ้างอิง [deployment report](model/docs/deployment-report.md). การเปลี่ยนแปลงรอบนี้ผ่าน lint, typecheck, unit tests, production build และ route smoke test; ยังไม่ได้ทดสอบกับอุปกรณ์หรือ Supabase ที่ deploy จริง.

### 1. โครงแอพและงานตั้งต้น — ประมาณ 95% (โค้ดพร้อม; รอตรวจอุปกรณ์)

- ทำแล้ว: ตั้ง Next.js, TypeScript และคำสั่ง lint, typecheck, test, build ใน [package.json](package.json)
- ทำแล้ว: มี [CI](.github/workflows/ci.yml), [.env.example](.env.example), [PWA manifest](public/manifest.webmanifest), service worker แบบ network-first ที่ไม่ cache หน้าข้อมูลส่วนตัว, ไอคอน PNG/SVG และหน้า offline
- ทำแล้ว: มีโครง 5 เมนู Today, Plan, Capture, Insights, Me และ CSS สำหรับ layout
- ทำแล้ว: เพิ่ม [คู่มือตรวจรับเฟส 1–2](docs/phase-1-2-verification.md) ระบุขั้นตอน PWA, offline และข้อจำกัด backup/export
- เหลือ: ติดตั้งและตรวจการแสดงผล PWA บน iPhone/iPad และ desktop จริง; ยืนยัน retention/restore ของฐานข้อมูลในโปรเจกต์ที่ใช้งาน

### 2. Auth และโปรไฟล์ — ประมาณ 95% (ยืนยันล็อกอินจริงบน Vercel แล้ว; เหลือทดสอบแยกข้อมูลสองบัญชี)

- ทำแล้ว: มีหน้า [เข้าสู่ระบบด้วย email Magic Link](src/app/(auth)/login/page.tsx), callback และการตรวจ session ก่อนเข้าหน้าแอพ
- ทำแล้ว: มี [ฟอร์มโปรไฟล์](src/components/profile-form.tsx) สำหรับ timezone, locale, currency, units และ AI consent; มี migration ตั้งค่าเริ่มต้นของโปรไฟล์และชุดทดสอบ [profile RLS](supabase/tests/profile_rls.sql)
- ทำแล้ว: migration ฐานข้อมูลแกนกลางและการทดสอบแยกข้อมูลข้ามบัญชีถูกบันทึกใน [deployment report](model/docs/deployment-report.md)
- ทำแล้ว: callback ส่ง auth cookies กลับพร้อม redirect; หน้า login แสดงสถานะส่ง/ข้อผิดพลาด, หน้า Me แสดงสถานะโหลด/บันทึก, logout แสดงข้อผิดพลาด
- ทดสอบจริง 2026-09-25: ผู้ใช้ยืนยันว่าเว็บ Vercel เปิดและ Magic Link login ใช้งานได้แล้ว; การทดสอบรอบนี้ยืนยันเส้นทางเข้าสู่ระบบได้ แต่ยังไม่ได้ตรวจโปรไฟล์และ session แยกกันสองบัญชี
- เหลือ: ทดสอบสองบัญชีแยกกัน โดยแก้/โหลดโปรไฟล์, logout, เปิด `/today` หลัง logout และตรวจว่าไม่มีข้อมูลข้ามบัญชี

### 3. Planner schema — ยังไม่เริ่มงานขยาย (ฐานข้อมูลแกนกลางมีแล้ว)

- ทำแล้ว: migration ชุดแรกมี section `tasks` และ `calendar`, entity กลาง, ความสัมพันธ์ข้าม section, time blocks และตารางงาน/นัดตั้งต้น
- เหลือ: life areas, task completions/recurrence, habits/check-ins, goals/milestones และ availability rules ตาม [แผนเฟส 1](#7-ลำดับลงมือทำและงานที่ตรวจรับได้)
- เหลือ: migration เพิ่ม, RLS และ tests สำหรับข้อมูลซ้ำ ข้อมูลต่างบัญชี และช่วงเวลาที่คร่อมวัน

### 4. Capture → Today → Plan และการตรวจเวลาชน — มีเฉพาะโครงหน้า

- ทำแล้ว: สร้างหน้า [Capture](src/app/(app)/capture/page.tsx), [Today](src/app/(app)/today/page.tsx) และ [Plan](src/app/(app)/plan/page.tsx) แล้ว
- เหลือ: บันทึก/แก้งานและนัดจริง ดึงข้อมูลตามวันใน Asia/Bangkok และแสดงผลใน Today/Plan; ปุ่มบันทึกใน Capture ยัง disabled
- เหลือ: ตรวจเวลาชนจากทุก section ที่ลง time block และแสดงรายการต้นทางพร้อมทางเลือกให้ผู้ใช้ยืนยัน

### 5. Health — ยังไม่เริ่มฟีเจอร์

- ทำแล้ว: มี section `health` และฐานข้อมูลแกนกลางสำหรับข้อมูลสุขภาพเริ่มต้น
- เหลือ: schema และหน้าบันทึกอาหาร/macro, น้ำหนัก, น้ำ, นอน, steps, โปรแกรมฝึกและเซ็ต; คำนวณสรุปรายวันและ 7 วันพร้อมทดสอบสูตร

### 6. Finance — มีเฉพาะฐานข้อมูลแกนกลาง

- ทำแล้ว: มี section `finance`, โครงธุรกรรมการเงินเริ่มต้น และ [ชุดทดสอบสิทธิ์กับยอดธุรกรรม](supabase/tests)
- เหลือ: wallets, หมวดหมู่, รายรับรายจ่าย, การโอน, bills, เป้าหมายออม และหน้าจอใช้งานจริง
- เหลือ: ทดสอบยอด wallet จาก ledger และการโอนแบบสำเร็จครบสองฝั่งหรือ rollback ทั้งหมด

### 7. Reminders, Insights และ export — มีเฉพาะโครงหน้า Insights

- ทำแล้ว: มี [หน้า Insights](src/app/(app)/insights/page.tsx) เป็นหน้าเริ่มต้น
- เหลือ: scheduler, กฎป้องกันเตือนซ้ำ, การตั้งค่าและส่ง notification, summary queries, export และทดสอบการอ่าน/คืนข้อมูล

### 8. AI ข้ามทุก section — ออกแบบสัญญาแล้ว

- ทำแล้ว: มี [เอกสารสถาปัตยกรรม](model/docs/architecture.md) และ [TypeScript contracts](model/contracts/index.ts) สำหรับการเชื่อม section
- เหลือ: AI gateway, registry และ read tools ที่ทำงานกับข้อมูลจริง, การตรวจ consent/สิทธิ์, คำตอบพร้อมที่มา, การหาเวลาว่าง และการยืนยันก่อน write
- เหลือ: ทดสอบเพิ่ม section ใหม่แล้ว AI ใช้ข้อมูลข้ามด้านได้ และปิดสิทธิ์ section แล้วข้อมูลไม่เข้าคำตอบ

### 9. ทดสอบครบเส้นทางและปล่อยใช้จริง — ยังไม่เสร็จ

- ทำแล้ว: มี CI สำหรับ lint/typecheck/unit tests/build, smoke script และ SQL tests ของฐานข้อมูลแกนกลาง
- เหลือ: E2E ตั้งแต่ login → Capture → Today/Insights → export, ทดสอบ PWA บน iPhone จริง, backup/restore และตรวจสิทธิ์หลัง deploy
- เหลือ: ตรวจผล CI ล่าสุดและทดสอบกับระบบที่ deploy ก่อนระบุว่าใช้งานประจำวันได้

**งานถัดไป:** ทดสอบการแยกโปรไฟล์และสิทธิ์ระหว่างสองบัญชีเพื่อปิดข้อ 2 จากนั้นเริ่มข้อ 3 โดยเพิ่ม Planner migration และ RLS tests ก่อนเชื่อมเส้นทางข้อ 4.

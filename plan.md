# LIFE OS — แผนสร้างแอพส่วนตัว

> สถานะ: แผนเริ่มต้น | ปรับปรุง: 2026-09-21 | เป้าหมาย: ใช้เองบน iPhone เป็นหลัก และเปิดบน iPad/คอมพิวเตอร์ได้

## 1. เป้าหมายและหลักการ

LIFE OS เป็นศูนย์กลางดูแลชีวิตประจำวัน: วันนี้ต้องทำอะไร, เป้าหมายคืบหน้าแค่ไหน, สุขภาพและเงินเป็นอย่างไร, มีอะไรที่ควรบันทึกหรือติดตามต่อ ไม่ให้หน้าแรกหรือเมนูหลักกลายเป็นแอพการเงินเพียงอย่างเดียว

- เริ่มเป็นเว็บแอพแบบ **PWA** เพิ่มไปยังหน้าจอโฮม iPhone ได้ โดยไม่ต้องลง App Store หรือจ่ายค่าสมาชิก Apple Developer
- ใช้คนเดียวก่อน แต่ฐานข้อมูลผูก `user_id` ตั้งแต่แรกเพื่อกันข้อมูลข้ามบัญชีและขยายภายหลังได้
- ออกแบบ mobile first; คอมพิวเตอร์ใช้ดูรายละเอียด/รายงานได้; ภาษาไทยเป็นหลัก; เวลา `Asia/Bangkok`; รองรับ light/dark
- จดให้เร็วที่สุด: งาน, มื้ออาหาร, น้ำหนัก, เซ็ตออกกำลัง, รายจ่าย ด้วยทางลัดเดียวจากหน้า Capture
- ผู้ช่วย AI เสนอแผนและเตือนอย่างมีเหตุผล โดยผู้ใช้เห็นและยืนยันก่อนบันทึกหรือแก้ข้อมูล
- ทำงานเป็นช่วงเล็ก ๆ ที่ใช้งานได้จริงก่อนเพิ่มการสแกนสลิป, การเชื่อมบริการภายนอก และ AI ขั้นสูง

## 2. ขอบเขตผลิตภัณฑ์และลำดับความสำคัญ

| ด้านชีวิต | รุ่นแรก (MVP) | ระยะต่อไป |
|---|---|---|
| ภาพรวม | Today: กำหนดการ, งาน, นิสัย, นัด/บิลใกล้ครบ, บันทึกด่วน; สรุปวัน | สรุปรายสัปดาห์และข้อสังเกตข้ามด้าน |
| วางแผน | Tasks, กำหนดวัน/เวลา, งานซ้ำ, habits, goals และ milestones | จัดเวลาอัตโนมัติ, ปฏิทินภายนอกแบบสองทาง |
| สุขภาพ | น้ำหนัก, อาหาร/พลังงานและ macro, โปรแกรมฝึก, เซ็ต/ครั้ง/น้ำหนัก, น้ำ, การนอน, steps แบบกรอกเอง | รอบเอว, ภาพความคืบหน้า, RIR, อาการล้า, cardio, วิเคราะห์แนวโน้ม, เชื่อม Health หากทำได้จริง |
| การเงิน | Wallet หลายใบ, รายรับ/รายจ่าย, โอนระหว่าง wallet, หมวดหมู่, บิล/สมาชิก, เป้าหมายออม | หนี้, ผ่อนชำระ, ลงทุน, เงินปันผล, หลายสกุล/อัตราแลกเปลี่ยน, อ่านสลิปและจดจำร้านค้า |
| งาน/การเรียน | งานและเป้าหมายแยกตาม life area, บันทึกสั้น | โครงการ, บันทึกการเรียน, โฟกัสเซสชัน |
| ความสัมพันธ์/ส่วนตัว | นัดและวันสำคัญ, reminders, บันทึก | check-in และทบทวนช่วงเวลา |
| AI | ช่วยสรุปวันนี้/วางแผนพรุ่งนี้, ชวนบันทึกเมื่อข้อมูลขาด, ตอบคำถามจากข้อมูลที่เลือก | insight ข้ามด้าน, จัดหมวดหมู่อัตโนมัติ, OCR และการวิเคราะห์เชิงลึก |

**เกณฑ์ MVP:** เปิดจากหน้าจอโฮม → เห็นวันนี้ → เพิ่มงาน/นิสัย/ข้อมูลสุขภาพ/รายการเงิน → ติดตามเป้าหมาย → ดูสรุป 7 วัน → ตั้งการเตือน → ส่งออกข้อมูลของตัวเองได้ โดยทุกหน้าทำงานบนมือถือจริง

**ขอบเขตที่ยังไม่ทำใน MVP:** ซิงก์บัญชีธนาคาร, อ่านข้อมูล Apple Health โดยตรง, OCR สลิป, คำแนะนำการรักษาพยาบาลหรือการลงทุนอัตโนมัติ, ระบบสมาชิกหลายคน/การแชร์ข้อมูล ให้เตรียมจุดต่อขยายไว้โดยไม่เพิ่มความซับซ้อนตั้งแต่เริ่ม

## 3. ประสบการณ์ใช้งานและ Frontend

### 3.1 โครงหน้า

เมนูล่าง: **Today / Plan / Capture / Insights / Me**; ปุ่ม Capture อยู่กลางและเด่นกว่าเมนูอื่น การเงินและสุขภาพอยู่ใน life areas ไม่ครองเมนูหลัก

- **Today:** timeline วันนี้, งานที่ต้องทำ, habits, การฝึก/มื้ออาหาร, ยอดเงินที่ควรรู้, บิลใกล้ครบ, ข้อเสนอแนะสั้น ๆ; แต่ละการ์ดแตะเข้าโมดูลได้
- **Plan:** ปฏิทิน/รายการงาน, habit, goal, กรองตาม Work / Health / Finance / Relationships / Learning / Personal
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
4. AI question → server ตรวจสิทธิ์และชนิดคำถาม → เรียกฟังก์ชันอ่านข้อมูลเฉพาะช่วงที่ร้องขอ → คำนวณตัวเลขแบบ deterministic → ส่งตัวเลข/แหล่งรายการให้โมเดลช่วยสรุป → คืนคำตอบพร้อมช่วงเวลาและข้อจำกัด
5. AI เสนอแก้งาน/หมวดหมู่ → แสดง preview diff → ผู้ใช้กดยืนยัน → server ตรวจสิทธิ์และบันทึก

### 4.2 โมดูลบริการ

- **Auth/profile:** เริ่มด้วย email sign-in ที่ใช้ง่าย, protected routes, session expiry, timezone/locale/currency/preferences
- **Planner:** CRUD tasks, recurrence rule, completion events, habits และ check-ins, goal milestones; เปลี่ยน recurrence ต้องไม่ลบประวัติ
- **Health:** อาหารบันทึกแบบกรอกเอง, รายการฝึก, per-set logs, metrics รายวัน; ค่าแคลอรี/มาโครเป้าหมายปรับได้ (เช่น baseline 2,500 kcal; P 140 g / C 325 g / F 71 g เป็นค่าตั้งต้นของผู้ใช้ ไม่ hardcode เป็นกฎสำหรับทุกคน)
- **Finance:** ledger รายการ, การโอนสร้างคู่รายการใน transaction เดียว, ตัวเลขเงินใช้ `numeric` หรือจำนวนหน่วยย่อยตามสกุล ไม่ใช้ float; แยกยอดคงเหลือจริงกับยอดแสดงผล/การจัดสรร
- **Reminders:** ตั้งเตือนในแอพและ browser push เมื่ออุปกรณ์อนุญาต; ตรวจ permission/การติดตั้ง Home Screen บน iPhone จริง; มี fallback เป็นรายการเตือนใน Today เสมอ, ป้องกันการส่งซ้ำ
- **AI gateway:** เก็บ API key บน server เท่านั้น, จำกัดการเรียกและ token budget, บันทึกต้นทุน/ข้อผิดพลาดแบบไม่เก็บข้อความอ่อนไหวเกินจำเป็น; ผู้ใช้เลือกปิด AI หรือเลือกว่าจะให้ AI อ่านข้อมูลด้านใด
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
| Notes/events | `notes(id, user_id, area_id, body)`, `personal_events(id, user_id, starts_at, recurrence_rule, type)` | วันสำคัญและบันทึกโยง life area |
| Health/body | `body_measurements(id, user_id, measured_at, weight_kg, waist_cm)`, `daily_wellness(id, user_id, local_date, sleep_minutes, water_ml, steps, energy, soreness)` | unique daily wellness ต่อ local date; nullable เมื่อไม่บันทึก |
| Nutrition | `food_entries(id, user_id, eaten_at, title, kcal, protein_g, carbs_g, fat_g)`, `nutrition_targets(user_id, valid_from, kcal, protein_g, carbs_g, fat_g)` | target มีประวัติช่วงเวลา; ไม่เดาค่าอาหารที่ไม่รู้ |
| Workout | `exercises(id, user_id, name, muscle_group)`, `workout_templates`, `template_exercises`, `workout_sessions(id, user_id, started_at, ended_at)`, `workout_sets(id, session_id, exercise_id, set_index, weight_kg, reps, rir)` | sessions และ sets มี owner ผ่าน FK; index session/exercise/time |
| Finance | `wallets(id, user_id, currency, opening_balance)`, `categories(id, user_id, type)`, `transactions(id, user_id, wallet_id, type, amount, currency, occurred_at, category_id, transfer_group_id)`, `bills`, `subscriptions`, `saving_goals` | amount เป็นค่าบวกพร้อมชนิด debit/credit; transfer_group เชื่อมคู่รายการ, บันทึกใน transaction เดียว |
| Reminders | `reminders(id, user_id, source_type, source_id, due_at, status)`, `push_subscriptions(id, user_id, endpoint, keys_encrypted_or_protected)`, `notification_deliveries` | unique source occurrence + channel; เก็บ delivery status และ retry count |
| AI/ระบบ | `ai_requests(id, user_id, intent, period_start, period_end, token_count, cost_estimate)`, `audit_events`, `import_jobs` | เก็บ metadata เท่าที่จำเป็น; retention และการลบตามตั้งค่า |

**เฟสต่อไป:** `debts`, `debt_payments`, `investment_accounts`, `holdings`, `trades`, `dividends`, `fx_rates(base, quote, rate, as_of, source)`, `merchant_rules`, `receipt_uploads`, `cardio_sessions`, `body_photos`. เพิ่มด้วย migrations แยกตามโมดูล

**กฎคำนวณ:** น้ำหนักแสดงค่าเฉลี่ยเคลื่อนที่ 7 วันเฉพาะวันที่มีข้อมูล พร้อมจำนวนตัวอย่าง; workout volume = ผลรวม `weight_kg × reps` ของเซ็ตที่ทำจริง (แยกความหมายเมื่อเป็น bodyweight); macro/kcal มีเป้าหมายและยอดจริงแยกกัน; balance = opening balance + signed ledger entries; multi-currency ต้องระบุสกุลต้นทาง/ปลายทาง, rate และ snapshot ณ เวลารายการ ห้ามบวกยอดต่างสกุลตรง ๆ

**ความปลอดภัย:** เปิด RLS ทุกตารางใน exposed schema, ให้สิทธิ์ SQL เท่าที่ต้องใช้และทดสอบ SELECT/INSERT/UPDATE/DELETE ทั้งกรณีเจ้าของ/คนอื่น/ไม่ล็อกอิน; storage รูปและสลิปเป็น private bucket พร้อม path ownership; ไม่มี service-role key ใน browser; views ต้องรักษา RLS; การลบข้อมูลและ export เป็น flow ที่ตรวจสิทธิ์; logs ไม่บันทึกข้อมูลสุขภาพ/การเงินโดยไม่จำเป็น

## 6. AI assistant ที่ตอบจากข้อมูลจริง

- เริ่มจาก 4 intents: `plan_today`, `missing_logs`, `weekly_summary`, `answer_metrics`
- เครื่องมืออ่านข้อมูลเชิงโครงสร้าง เช่น `get_tasks(range)`, `get_habit_checkins(range)`, `get_health_summary(range)`, `get_finance_summary(range)`; จำกัดช่วงวันและจำนวนแถว
- Backend เป็นคนคำนวณยอด, สถิติ, วันที่ และแหล่งข้อมูล; โมเดลเขียนสรุป/ข้อเสนอแนะ พร้อมระบุข้อมูลที่ขาดและช่วงเวลาที่ใช้
- ทุก write action เป็นข้อเสนอที่กด confirm; ป้องกัน prompt injection จากข้อความบันทึก/สลิป; ไม่ส่งภาพหรือข้อมูลอ่อนไหวไปผู้ให้บริการ AI โดยไม่ยินยอม
- การเตือนให้กรอกข้อมูลมี cooldown, ตั้งช่วงเวลาห้ามรบกวนได้, ตรวจว่าเคยกรอกแล้ว; AI ล่มแล้วการบันทึกข้อมูลปกติยังใช้ได้
- ตัวอย่าง: “วันนี้ยังไม่ได้บันทึกมื้อเย็น” → ตรวจ log ในวันตามเวลาไทย → แสดงชวนบันทึกโดยไม่เดาอาหาร; “สัปดาห์นี้ฝึกดีขึ้นไหม” → เปรียบเทียบ exercise/volume/reps ที่เทียบกันได้ พร้อมจำนวนเซสชัน

## 7. ลำดับลงมือทำและงานที่ตรวจรับได้

| เฟส | งาน Frontend | งาน Backend/Database | เกณฑ์เสร็จ |
|---|---|---|---|
| 0. ตั้งต้น | wireframes 5 แท็บ, design tokens, PWA shell, responsive layout | repo, env example, Supabase project, migrations แรก, CI, backup/export strategy | เปิดแอพบน iPhone Home Screen และ desktop; ไม่มี secret ใน Git |
| 1. แกนประจำวัน | Today/Plan/Capture/Me, tasks, habits, goals, empty/loading/error | auth, profiles, life areas, tasks/check-ins/goals, RLS tests | สร้าง/แก้/ปิดงาน, เช็ก habit, ดูวันนี้ตามเวลาไทย; อีกบัญชีอ่านไม่ได้ |
| 2. สุขภาพ | Body/Nutrition/Workout/Recovery/Activity, quick log, กราฟ 7 วัน | health tables, validation หน่วย/วันที่, aggregations | จดน้ำหนัก/อาหาร/เซ็ตออกกำลัง และเห็นยอด/ค่าเฉลี่ยถูกต้อง |
| 3. การเงิน | wallets, transaction list, transfer, bills, saving goals | atomic transfer ledger, totals, due reminders | เพิ่มรายรับ/รายจ่าย/โอน; ยอดตรงกับรายการ; ไม่มีรายการโอนครึ่งเดียว |
| 4. เตือนและสรุป | notification settings, Insights, export | scheduler, delivery dedupe, push subscription, summary queries/export | รับหรือปฏิเสธ permission ได้; เตือนครั้งเดียว; export แล้วอ่านข้อมูลกลับได้ |
| 5. AI | หน้า assistant + preview การแก้ไข | AI gateway, read tools, consent, quota, error fallback | ถามจากข้อมูลจริงพร้อมช่วงวัน; AI ไม่แก้ข้อมูลเองและไม่ทำให้แอพหลักล่ม |
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
10. ทำ AI gateway + read-only tools + consent + confirm ก่อน write
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

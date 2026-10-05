# LIFE OS — แผนสร้างแอพส่วนตัว

> สถานะ: Roadmap และ sub tasks อนุมัติแล้ว | ปรับปรุง: 2026-10-05 | เป้าหมาย: ใช้เองบน iPhone เป็นหลัก และต้องสามารถเปิดใช้งานบน iPad/คอมพิวเตอร์ได้

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
- **Capture:** ปุ่มกลางแบบกดค้างเพื่ออัดเสียงและปล่อยเพื่อส่งประมวลผล → แปลงเสียงเป็นข้อความ → AI ตีความและเลือกเครื่องมือที่ได้รับอนุญาตจากทุกโมดูลที่พร้อมใช้งาน; รองรับหลายคำสั่ง ถามข้อมูลที่ขาด และแก้ transcript ได้; คำถามแสดงคำตอบ ส่วนเพิ่ม/แก้/ลบต้องแสดง preview และให้ผู้ใช้ยืนยันก่อนบันทึก; มีการยกเลิกและสถานะไมโครโฟน/ประมวลผล/ข้อผิดพลาดชัดเจน
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
- **Health:** อาหารบันทึกแบบกรอกเอง, รายการฝึก, per-set logs, metrics รายวัน; ค่าแคลอรี/มาโครเป้าหมายปรับได้ (เช่น baseline …19270 tokens truncated…ำซ้ำ เปอร์เซ็นต์เดิมในข้อ 11 เป็นสถานะเดิม ไม่ใช่คะแนนของ checklist ใหม่นี้

### 12.2 Voice Capture: พฤติกรรมที่อนุมัติ

กดค้าง → เปิดไมโครโฟนและแสดงกำลังฟัง → พูด → ปล่อยปุ่ม → หยุดอัดและแปลงเป็นข้อความ → AI แยกเจตนา/ข้อมูล → เรียก read tools หรือนำเสนอ write commands → ผู้ใช้ตรวจและยืนยัน → server ตรวจสิทธิ์และบันทึก → แสดงผลและอัปเดตหน้าที่เกี่ยวข้อง

| คำพูดตัวอย่าง | ผลที่ต้องเตรียม/แสดง |
|---|---|
| วันนี้หนัก 68 กิโล | บันทึกน้ำหนักพร้อมวันที่ให้ยืนยัน |
| ซื้อข้าว 60 บาทจากกระเป๋ารายวัน | รายจ่ายและ wallet ให้ยืนยัน |
| วันนี้ bench press 40 กิโล 10 ครั้ง 3 เซ็ต | workout sets ให้ยืนยัน |
| พรุ่งนี้สองทุ่มเตือนส่งเอกสาร | งาน/เตือนพร้อมวันเวลาให้ยืนยัน |
| เย็นนี้ว่างออกกำลังกายตอนไหน | อ่านตารางและแสดงช่วงว่าง |
| วันนี้กินข้าว 60 บาท แล้วพรุ่งนี้เตือนซื้อไข่ด้วย | แยกสองคำสั่งให้ตรวจพร้อมกัน; ถ้าข้อมูลไม่ครบให้ถาม |

ห้ามเดาตัวเลขอาหารหรือรายละเอียดที่ไม่ได้บอก; คำสั่งต้องตรวจ validation/สิทธิ์ แม้ AI ตีความได้แล้ว; การยกเลิกต้องไม่สร้างรายการ ส่วนการเก็บเสียงและ retention ต้องระบุในแผน implementation ก่อนใช้งาน

### 12.3 1. โครงแอพและ PWA

| Sub task | งาน | รายละเอียด | เกณฑ์ตรวจรับ | สถานะ |
|---|---|---|---|---|
| 1.1 | ตรวจโครงปัจจุบัน | ตรวจ routes, layout, navigation, dependencies และ config | ระบุสิ่งที่ใช้ต่อได้และรายการที่ต้องแก้ | ตรวจแล้ว; ดู baseline audit ใน `docs/voice-capture-design.md` |
| 1.2 | กำหนดรูปแบบหน้าจอ | สี ฟอนต์ ระยะห่าง ปุ่ม ฟอร์ม และการ์ดเป็นชุดเดียวกัน | มีตัวอย่างหน้าจอให้ผู้ใช้อนุมัติ | มี token sheet และ static concept; รอผู้ใช้ review, ยังไม่ถือว่า UI อนุมัติ/ตรวจรับ |
| 1.3 | ตรวจ responsive | iPhone, iPad, desktop รวม safe area และคีย์บอร์ด | ไม่มีเนื้อหาล้นหรือปุ่มถูกบัง | ยังไม่ตรวจรับ |
| 1.4 | ตรวจสถานะหน้าจอ | loading, empty, error, disabled และข้อความภาษาไทย | ผู้ใช้เข้าใจสถานะและทำต่อได้ | ยังไม่ตรวจรับ |
| 1.5 | ตรวจ PWA/offline | manifest, icons, service worker และการอัปเดต cache | เปิดจาก Home Screen ได้และ offline แสดงหน้าถูกต้อง | ยังไม่ตรวจรับ |
| 1.6 | ตรวจการเข้าถึง | focus, labels, contrast และขนาดพื้นที่กด | ใช้คีย์บอร์ดและกดบนมือถือได้ | ยังไม่ตรวจรับ |
| 1.7 | สรุปตรวจรับ | บันทึกผลจริงและข้อจำกัด | checklist ครบพร้อมหลักฐาน | ยังไม่ตรวจรับ |
| 1.8 | ปรับ app shell สำหรับ Voice Capture | แยก navigation link ออกจากปุ่มกดค้าง; เพิ่ม client controller/provider ร่วมทุกหน้า โดยคง protected layout ฝั่ง server; วางไฟล์ใน src/features/capture และใช้ /capture สำหรับตรวจ transcript/ผลลัพธ์ตามแบบที่อนุมัติ | กดค้างจากทุกหน้าได้; มี recording session เดียว; เปลี่ยนหน้า/ยกเลิก/logout แล้วหยุดไมค์และ cleanup | เตรียม provider + cleanup registry หลัง auth; ไม่มีไมค์หรือ action; เกณฑ์ recording/session จริงยังค้าง |
| 1.9 | จัด contracts และ test coverage พื้นฐาน | กำหนดตำแหน่ง shared contracts เดียว; ปรับ vitest include ให้รัน model/contracts/index.test.ts หรือย้ายพร้อมปรับ imports; เปลี่ยน top-level assertions เป็น tests ที่ runner รองรับ; ตรวจ typecheck ครอบคลุมไฟล์กลางที่ไม่ได้ถูก import โดย src | CI รัน tests ของ registry/conflict/availability จริงและตรวจ types ของไฟล์กลาง; ไม่รอข้อ 9 | เสร็จและ merge แล้วผ่าน [PR #2](https://github.com/yuvananch-svg/LIFE-OS/pull/2): `npm test` 4 files / 18 tests และ typecheck ผ่าน; GitHub CI verify ผ่านก่อน merge; ดู [verification checkpoint](docs/voice-capture-design.md) |
| 1.10 | ทำเอกสารสถาปัตยกรรมให้ตรงแผน | อัปเดต model/docs/architecture.md, contracts README, supabase/tests/README.md และตารางเฟส/API ใน plan.md ให้ตรง Voice Capture และ migration/test inventory | ไม่มีลำดับที่เลื่อน AI gateway พื้นฐานไปหลัง Capture; เอกสารแยกสิ่งที่มีแล้วกับสิ่งที่จะสร้าง | แก้และตรวจแล้ว; architecture/README แยก implemented กับ planned; migration inventory 5 และ SQL test inventory 6 ระบุครบ; ยังไม่ได้รัน SQL กับฐานข้อมูล remote; ดู [design checkpoint](docs/voice-capture-design.md) |

### 12.4 2. Auth และโปรไฟล์

| Sub task | งาน | รายละเอียด | เกณฑ์ตรวจรับ | สถานะ |
|---|---|---|---|---|
| 2.1 | ตรวจ configuration | env, Site URL และ callback allowlist | ตรงกับเว็บที่ใช้งาน | ยังไม่ตรวจรับ |
| 2.2 | ตรวจ Magic Link | ส่งลิงก์ เปิด callback และเข้าสู่แอพ | ล็อกอินสำเร็จใน flow ปกติ | ยังไม่ตรวจรับ |
| 2.3 | ตรวจลิงก์ผิด/หมดอายุ | missing code, ลิงก์ใช้แล้ว และ callback target | แสดงข้อผิดพลาดและขอลิงก์ใหม่ได้ | ยังไม่ตรวจรับ |
| 2.4 | ตรวจโปรไฟล์ | โหลด บันทึก และ reload ทุกช่อง | ค่าที่บันทึกกลับมาเหมือนเดิม | ยังไม่ตรวจรับ |
| 2.5 | ตรวจสองบัญชี | ใช้โปรไฟล์ต่างกันและสลับบัญชี | ไม่มีข้อมูลข้ามบัญชี | ยังไม่ตรวจรับ |
| 2.6 | ตรวจ session/logout | refresh, session หมดอายุ และ protected route หลัง logout | ผู้ไม่มี session ถูกส่งไป login | ยังไม่ตรวจรับ |
| 2.7 | สรุปตรวจรับ | แยกผล SQL tests กับผลทดสอบผ่านเว็บ | มีหลักฐานก่อนปิดข้อ 2 | ยังไม่ตรวจรับ |
| 2.8 | รวม profile context และ timezone | ให้ app shell โหลด preferences จากบัญชีที่ยืนยันแล้ว; ส่ง timezone/locale ไป UI และ command context แทน Asia/Bangkok คงที่; ตรวจ session/account change ไม่ให้ใช้ preferences เดิม | header และวันนี้/พรุ่งนี้ใช้ timezone โปรไฟล์เดียวกัน; สลับบัญชี/logout ไม่เหลือ context เก่า | ยังไม่ตรวจรับ |
| 2.9 | ออกแบบ consent กลาง | กำหนดความหมาย global ai_consent + section_permissions และการอนุญาตส่งเสียงไป transcription provider; เตรียม UI/contract สำหรับ scope resolver ในข้อ 3.12 | ปิด global หรือสิทธิ์ section แล้วถูกปฏิเสธตามกฎ; กำหนด default deny และขอบเขตการเพิกถอนชัดเจน | ยังไม่ตรวจรับ |

### 12.5 3. Planner schema และกฎข้อมูล

| Sub task | งาน | รายละเอียด | เกณฑ์ตรวจรับ | สถานะ |
|---|---|---|---|---|
| 3.1 | ออกแบบข้อมูล | เทียบ schema เดิมกับ life areas/tasks/events/habits/goals | มีตาราง ฟิลด์ และความสัมพันธ์ให้อนุมัติ | ยังไม่ตรวจรับ |
| 3.2 | เพิ่ม life areas | Work, Health, Finance, Relationships, Learning, Personal | แต่ละบัญชีมีหมวดของตนเอง | ยังไม่ตรวจรับ |
| 3.3 | ขยาย tasks | รายละเอียด หมวด วันครบกำหนด สถานะ และประวัติ completion | งานครั้งเดียวบันทึกและติดตามได้ | ยังไม่ตรวจรับ |
| 3.4 | ออกแบบ recurrence | occurrence และแก้เฉพาะครั้ง/ทั้งชุด | ไม่สร้างซ้ำหรือทำประวัติหาย | ยังไม่ตรวจรับ |
| 3.5 | เพิ่ม habits/check-ins | ตารางกิจวัตร เป้าหมาย และบันทึกต่อวัน | ป้องกัน check-in ซ้ำตามกฎ | ยังไม่ตรวจรับ |
| 3.6 | เพิ่ม goals/milestones | เป้าหมาย หน่วย วันครบกำหนดและประวัติ | อ่านความคืบหน้าย้อนหลังได้ | ยังไม่ตรวจรับ |
| 3.7 | ขยาย events/availability | นัดทั้งวัน ช่วงเวลาที่กันไว้ และ timezone | รองรับข้ามวันและ end > start | ยังไม่ตรวจรับ |
| 3.8 | ทำ atomic write | canonical entity, typed row และ time block ใน transaction เดียว | ล้มเหลวแล้วไม่มีข้อมูลค้างบางส่วน | ยังไม่ตรวจรับ |
| 3.9 | ทำ RLS/constraints/indexes | owner policies, FK, unique keys และ indexes ที่จำเป็น | ปฏิเสธข้อมูลผิดและข้ามบัญชี | ยังไม่ตรวจรับ |
| 3.10 | ทดสอบ migration | ทดสอบ environment ที่เหมาะสมและอัปเดต types | รันจากฐานสะอาดได้ตามลำดับ | ยังไม่ตรวจรับ |
| 3.11 | เพิ่ม command contracts และ registry | ขยาย read registry เดิมด้วย command definitions: ชื่อ version input schema required read/write scope และ handler; แยก proposal ออกจาก execution; ใช้ registry เดียวสำหรับฟอร์มและเสียงตามความเหมาะสม | มี typed commands Tasks/Calendar; reject unknown command และ malformed payload; AI output ไม่เขียน DB โดยตรง | ยังไม่ตรวจรับ |
| 3.12 | สร้าง authorization scope จาก server | สร้าง scope จาก authenticated session, ai_consent, section_permissions และ field rules; ไม่เชื่อ scope/user_id จาก browser; ตรวจอีกครั้งตอน execution | owner-only + global/section permissions บังคับจริง; revoked consent ระหว่าง preview/confirm ถูกปฏิเสธ | ยังไม่ตรวจรับ |
| 3.13 | ทำ read boundary และ timeline adapter | ตรวจ entityTypes, owner, section, fields, ช่วงวัน, limit และ runtime payload shape; กำหนด handling ของ facts ไม่มีเวลา/metrics interval ผิด; map planned เป็น busy/tentative และตัด cancelled | provider คืนข้อมูลเกินขอบเขตแล้วถูกกรอง/ปฏิเสธ; timeline ไม่รวม cancelled; boundary tests ครบ | ยังไม่ตรวจรับ |
| 3.14 | เพิ่ม idempotent mutation และ proposal lifecycle | ออกแบบ request/command IDs, owner-scoped dedupe, proposal version/expiry และ execute transaction ที่ตรวจข้อมูลล่าสุด; ครอบคลุม entity + typed row + time block; ตัดสินใจ atomicity ของหลายคำสั่งที่เป็นอิสระและแสดงผลรายคำสั่ง | retry/double confirm ไม่สร้างซ้ำ; proposal เปลี่ยน/หมดอายุต้องตรวจใหม่; rollback ไม่มีข้อมูลครึ่งเดียว; ไม่อ้างว่าทุก batch สำเร็จหากสำเร็จบางคำสั่ง | ยังไม่ตรวจรับ |

### 12.6 4. Voice Capture → Today → Plan และตรวจเวลาชน (ฉบับอนุมัติล่าสุด)

| Sub task | งาน | รายละเอียด | เกณฑ์ตรวจรับ | สถานะ |
|---|---|---|---|---|
| 4.1 | ออกแบบปุ่มกดค้าง | กดค้างเพื่อพูด; ปล่อยเพื่อหยุดและส่งประมวลผล; สถานะฟังเสียง ประมวลผล ยกเลิก และผลลัพธ์ | มีหน้าจอและ interaction ให้อนุมัติ; Capture อยู่กลางและเด่น | ยังไม่ตรวจรับ |
| 4.2 | ไมโครโฟนและอัดเสียง | ขอสิทธิ์ อัดเสียง และจัดการปฏิเสธสิทธิ์/ถูกขัดจังหวะ/ยกเลิก | ไม่ส่งเสียงเมื่อยกเลิกและสถานะชัดเจน | ยังไม่ตรวจรับ |
| 4.3 | แปลงเสียงเป็นข้อความ | รองรับภาษาไทยและแก้ข้อความที่ฟังผิดได้ | ข้อความตรวจทานและแก้ได้ก่อนยืนยันรายการ | ยังไม่ตรวจรับ |
| 4.4 | ตีความคำสั่งด้วย AI | แยกเจตนา ข้อมูล และหลายคำสั่งจากคำพูดเดียว; ย้าย gateway พื้นฐานและ orchestration จากข้อ 8 มาทำที่นี่ | มี structured commands; ไม่เดาข้อมูลที่ไม่ได้พูด | ยังไม่ตรวจรับ |
| 4.5 | ส่งคำสั่งไปเครื่องมือ | เชื่อม Tasks/Calendar ก่อน และ Health/Finance/โมดูลอื่นเมื่อพร้อม; ตรวจ session, consent, scope และ validation ฝั่ง server | ใช้เครื่องมือที่อนุญาต; แจ้งเมื่อโมดูลยังไม่พร้อม; ไม่มี arbitrary SQL | ยังไม่ตรวจรับ |
| 4.6 | ข้อมูลขาดและยืนยัน | ถามเฉพาะข้อมูลจำเป็น; คำถามตอบได้โดยไม่เขียน; เพิ่ม/แก้/ลบแสดง preview และยืนยันก่อน write | ไม่มี mutation ก่อนยืนยัน; รองรับตรวจหลายคำสั่งพร้อมกัน | ยังไม่ตรวจรับ |
| 4.7 | อัปเดตหน้าหลังบันทึก | Today/Plan/Insights ที่พร้อมใช้งานสะท้อนผล; ใช้ atomic write และป้องกันคำสั่งซ้ำ | ข้อมูลตรงกันและไม่มีรายการซ้ำเมื่อ retry | ยังไม่ตรวจรับ |
| 4.8 | ทดสอบเสียงบน iPhone PWA | เสียงรบกวน เน็ตหลุด สิทธิ์ไมค์ interruption และกด/ปล่อย/ยกเลิก | flow จริงผ่านและข้อผิดพลาดไม่สร้างรายการผิด | ยังไม่ตรวจรับ |
| 4.9 | แก้ไข/ลบ/ปิดงาน | รายละเอียดรายการและยืนยันที่จำเป็น | ทุกหน้าสะท้อนการเปลี่ยนแปลง | ยังไม่ตรวจรับ |
| 4.10 | Today query/UI | ดึงงาน นัด กิจวัตรตาม timezone โปรไฟล์; timeline งานค้าง habit check-in | รายการใกล้เที่ยงคืนอยู่วันถูกและใช้จากหน้าเดียวได้ | ยังไม่ตรวจรับ |
| 4.11 | Plan UI | รายการ/ปฏิทินและตัวกรอง life area | เปิดรายละเอียดและเปลี่ยนช่วงวันได้ | ยังไม่ตรวจรับ |
| 4.12 | ตรวจ conflict และช่วงว่าง | เชื่อม findConflicts/availableSlots กับ time blocks จริงและ availability rules; แสดงต้นทางและให้ผู้ใช้เลือก | overlap/ช่วงติดกันถูกต้อง; slot ไม่ชนและยาวพอ | ยังไม่ตรวจรับ |
| 4.13 | ทดสอบครบเส้นทาง | พูด → transcript → AI → preview → confirm → Capture/Today/Plan → แก้/ปิดงาน | ข้อมูลตรงกันและแยกบัญชี; voice pipeline ไม่ขึ้นกับ AI วิเคราะห์ขั้นสูง | ยังไม่ตรวจรับ |
| 4.14 | จัด voice pipeline และ API boundary | แยก recorder → transcription → interpretation → proposal → confirm/execute; server-only gateway/keys; runtime schemas และ state machine idle/requesting_permission/recording/transcribing/interpreting/needs_input/preview/executing/success/error/cancelled | มี owner-scoped flow; ปล่อยปุ่มส่งครั้งเดียว; ยกเลิก/ผลตอบกลับล่าช้าไม่ execute; gateway พื้นฐานมี timeout/rate limit ตั้งแต่ข้อ 4 | ยังไม่ตรวจรับ |
| 4.15 | เชื่อม confirmation กับ command service | ใช้ contracts/scope/idempotency จาก 3.11–3.14; ผูก preview กับ version ของคำสั่ง; transcript แก้แล้วตีความใหม่; execute เฉพาะคำสั่งที่ยืนยัน | ไม่มี write ก่อน confirm; เปลี่ยน preview ไม่ใช้การอนุมัติเก่า; แสดงผลจริงต่อคำสั่งและขอ confirm ใหม่เมื่อข้อมูลสำคัญเปลี่ยน | ยังไม่ตรวจรับ |
| 4.16 | กำหนด audio lifecycle และ retention | ระบุขนาด/ความยาว/format ที่รองรับบนอุปกรณ์จริง; จัดการ abort, interruption, resource cleanup; กำหนดว่าจะเก็บเสียง/transcriptหรือไม่ ระยะเก็บ และการลบ ก่อนเลือก storage implementation | ไมค์ไม่ค้างหลังยกเลิก/logout; ไม่ส่งเสียงที่ยกเลิก; retention มีเอกสารและไม่ใช้ public cache เก็บเสียงส่วนตัว | ยังไม่ตรวจรับ |

### 12.7 5. Health

| Sub task | งาน | รายละเอียด | เกณฑ์ตรวจรับ | สถานะ |
|---|---|---|---|---|
| 5.1 | ออกแบบ schema/หน่วย | แยกข้อมูลจริง เป้าหมาย และวันที่มีผล | มีแบบข้อมูลให้อนุมัติ | ยังไม่ตรวจรับ |
| 5.2 | Body | น้ำหนัก/รอบเอวและแก้ย้อนหลัง | หน่วยและวันที่ถูกต้อง | ยังไม่ตรวจรับ |
| 5.3 | Nutrition | อาหาร kcal/protein/carbs/fat และเป้าหมาย | รวมรายวันถูกต้องและไม่เดาค่าที่ไม่ทราบ | ยังไม่ตรวจรับ |
| 5.4 | Workout templates | ท่า โปรแกรม และตารางฝึก | ใช้โปรแกรมซ้ำได้ | ยังไม่ตรวจรับ |
| 5.5 | Workout sessions/sets | น้ำหนัก ครั้ง เซ็ต และ RIR ถ้าใช้ | แยกแผนกับการฝึกจริง | ยังไม่ตรวจรับ |
| 5.6 | Recovery/Activity | น้ำ นอน steps และความล้า | แยกไม่บันทึกจากศูนย์ | ยังไม่ตรวจรับ |
| 5.7 | สรุปและกราฟ | น้ำหนักเฉลี่ย 7 วัน macro และ workout volume | สูตรถูกพร้อมจำนวนข้อมูล | ยังไม่ตรวจรับ |
| 5.8 | เชื่อมระบบกลางและ Voice Capture | Capture, Today, timeline และ section adapter/command tools | สั่งบันทึกสุขภาพด้วยเสียงและใช้ร่วม Planner ได้ | ยังไม่ตรวจรับ |
| 5.9 | ตรวจรับ | validation, RLS และ flow มือถือ | บันทึก/แก้/อ่านย้อนหลังครบ | ยังไม่ตรวจรับ |

### 12.8 6. Finance

| Sub task | งาน | รายละเอียด | เกณฑ์ตรวจรับ | สถานะ |
|---|---|---|---|---|
| 6.1 | ออกแบบบัญชีและ ledger | wallet/account กับ ledger เดิม | สูตรยอดและชนิดรายการชัดเจน | ยังไม่ตรวจรับ |
| 6.2 | Wallets/categories | กระเป๋า สกุลเงิน ยอดตั้งต้นและหมวด | แยกตามบัญชี | ยังไม่ตรวจรับ |
| 6.3 | รายรับ/รายจ่าย | ฟอร์ม รายการ รายละเอียดและ voice command tools | ยอดตรง ledger | ยังไม่ตรวจรับ |
| 6.4 | การโอน | สองฝั่งใน transaction เดียว | สำเร็จครบหรือ rollback ทั้งหมด | ยังไม่ตรวจรับ |
| 6.5 | แก้ไข/ลบรายการ | วิธีแก้ ledger และประวัติ | ยอดไม่คลาดเคลื่อน | ยังไม่ตรวจรับ |
| 6.6 | Bills/subscriptions | วันครบกำหนด รอบซ้ำและสถานะจ่าย | occurrence ไม่ซ้ำ | ยังไม่ตรวจรับ |
| 6.7 | Saving goals | เป้าหมายและเงินจัดสรร | แยกเงินจัดสรรกับเงินจริง | ยังไม่ตรวจรับ |
| 6.8 | สรุปการเงิน | รายรับ รายจ่าย ยอดแต่ละ wallet | ไม่รวมต่างสกุลโดยตรง | ยังไม่ตรวจรับ |
| 6.9 | ตรวจรับ | เงินทศนิยม atomicity และสิทธิ์ | ผ่าน invariant tests และ flow มือถือ | ยังไม่ตรวจรับ |

### 12.9 7. Reminders, Insights และ Export

| Sub task | งาน | รายละเอียด | เกณฑ์ตรวจรับ | สถานะ |
|---|---|---|---|---|
| 7.1 | ออกแบบ reminder rules | เวลา ช่องทาง quiet hours และเลื่อนเตือน | กฎส่งชัดเจน | ยังไม่ตรวจรับ |
| 7.2 | scheduler/jobs | รัน server และ retry | ทำงานแม้ปิดเว็บ | ยังไม่ตรวจรับ |
| 7.3 | ป้องกันเตือนซ้ำ | idempotency key และ delivery status | occurrence ไม่ส่งซ้ำโดยไม่ตั้งใจ | ยังไม่ตรวจรับ |
| 7.4 | In-app reminders | รายการเตือนใน Today | ใช้ได้เมื่อไม่อนุญาต push | ยังไม่ตรวจรับ |
| 7.5 | Web push | permission, subscriptions และ revoke | ทดสอบ iPhone จริง | ยังไม่ตรวจรับ |
| 7.6 | Insights | สรุปแต่ละด้าน ช่วงวันและหน่วย | ตัวเลขตรวจกลับจากรายการได้ | ยังไม่ตรวจรับ |
| 7.7 | Export | JSON/CSV และ schema version | เฉพาะข้อมูลเจ้าของ | ยังไม่ตรวจรับ |
| 7.8 | Restore/import | preview, validation และกันซ้ำ | คืนข้อมูลทดสอบแล้วเทียบได้ | ยังไม่ตรวจรับ |
| 7.9 | Backup procedure | retention และ recovery | มีผล restore และคู่มือ | ยังไม่ตรวจรับ |

### 12.10 8. AI ข้ามทุก section — ขยายจากพื้นฐาน Voice Capture

| Sub task | งาน | รายละเอียด | เกณฑ์ตรวจรับ | สถานะ |
|---|---|---|---|---|
| 8.1 | กำหนด intents | สรุปวันนี้ ข้อมูลขาด สรุปสัปดาห์และถาม metrics | ตัวอย่างคำถาม/คำตอบให้อนุมัติ | ยังไม่ตรวจรับ |
| 8.2 | เชื่อม registry | adapter อ่านข้อมูลจริงแต่ละ section; ใช้ registry เดียวกับข้อ 4 | เพิ่ม section ผ่าน contract กลาง | ยังไม่ตรวจรับ |
| 8.3 | consent/scope | global consent, ราย section และ field permissions | ปิดสิทธิ์แล้วไม่เข้า context รวม link/summary/cache | ยังไม่ตรวจรับ |
| 8.4 | context builder | จำกัดวัน จำนวนรายการและ provenance | fact มีต้นทาง | ยังไม่ตรวจรับ |
| 8.5 | ขยาย AI gateway | ใช้ gateway จากข้อ 4; เพิ่ม quota, timeout, budget และการติดตามต้นทุน | วัดและจำกัดการใช้ได้; keys อยู่ server | ยังไม่ตรวจรับ |
| 8.6 | read-only assistant | คำตอบพร้อมรายการต้นทางและข้อจำกัด | ระบบคำนวณตัวเลขและอ้างอิงถูก | ยังไม่ตรวจรับ |
| 8.7 | เวลา/ช่วงว่าง | AI ใช้ผล deterministic ของ Planner | ไม่ทับ busy intervals | ยังไม่ตรวจรับ |
| 8.8 | ขยาย proposal/confirmation | ใช้ flow จากข้อ 4 สำหรับคำสั่งซับซ้อนและข้ามด้าน | ไม่แก้ก่อนยืนยัน; ตรวจสิทธิ์อีกครั้งตอน execute | ยังไม่ตรวจรับ |
| 8.9 | fallback/security tests | AI ล่ม prompt injection และข้อมูลต่างบัญชี | บันทึกปกติใช้ได้และไม่รั่ว | ยังไม่ตรวจรับ |
| 8.10 | ตรวจ section ใหม่ | adapter ทดลองและทดสอบข้ามด้าน | ไม่เขียนกฎเฉพาะคู่ section | ยังไม่ตรวจรับ |
| 8.11 | ต่อยอดโครงสร้างกลางโดยไม่สร้างซ้ำ | ใช้ command registry/scope resolver/gateway/proposal service ที่ข้อ 3–4 สร้างแล้ว; เพิ่ม adapter/context builder และ advanced intents แทน gateway หรือ consent อีกชุด | คำสั่งเสียงและ assistant ใช้ permission/confirmation policy เดียวกัน; ไม่มี code path ลัดที่ bypass checks | ยังไม่ตรวจรับ |

### 12.11 9. ตรวจครบและปล่อยใช้งาน

| Sub task | งาน | รายละเอียด | เกณฑ์ตรวจรับ | สถานะ |
|---|---|---|---|---|
| 9.1 | จัด test coverage | CI รัน contracts tests และ checks จำเป็น | ไม่มีชุดสำคัญตกหล่น | ยังไม่ตรวจรับ |
| 9.2 | E2E | login → Voice Capture → confirm → Today/Insights → export | flow หลักผ่าน | ยังไม่ตรวจรับ |
| 9.3 | ทดสอบสิทธิ์ | สองบัญชี logout และ consent revoke | ข้อมูล/session แยกกัน | ยังไม่ตรวจรับ |
| 9.4 | ทดสอบอุปกรณ์ | iPhone PWA, iPad, desktop และ light/dark | หน้าหลักใช้ได้ครบ | ยังไม่ตรวจรับ |
| 9.5 | failure cases | เน็ตหลุด กดซ้ำ API ล้ม session หมดอายุและ voice interruption | ไม่สูญข้อมูลหรือสร้างซ้ำ | ยังไม่ตรวจรับ |
| 9.6 | performance | เวลาเปิดหน้า query บันทึก และ voice processing | มีผลวัดและแก้คอขวด | ยังไม่ตรวจรับ |
| 9.7 | deployment | env, migrations และเวอร์ชัน deploy | ตรง commit ตรวจรับ | ยังไม่ตรวจรับ |
| 9.8 | Release/rollback | checklist, recovery และคู่มือ | พร้อมปล่อยและย้อนกลับ | ยังไม่ตรวจรับ |
| 9.9 | อัปเดตแผน | ความคืบหน้า หลักฐานและข้อจำกัด | plan.md ตรงงานจริง | ยังไม่ตรวจรับ |


### 12.12 Dependencies ของงานปรับโครงสร้าง

| ต้องเตรียมก่อน | งานที่พึ่งพา | เหตุผล |
|---|---|---|
| 1.8 และ 2.8 | 4.1–4.3, 4.14, 4.16 | ปุ่มเสียงและ context ต้องใช้ร่วมจากทุกหน้าและบัญชี |
| 1.9 | งานโค้ดกลางข้อ 3–4 | ตรวจ contracts ใน CI ก่อนต่อยอด |
| 2.9 → 3.12 | 4.5–4.6, 4.15 | scope มาจาก session/consent จริง |
| 3.8, 3.11, 3.14 | 4.5–4.7, 4.15 | write มี schema, confirmation, atomicity และ dedupe |
| 3.13 | 4.10, 4.12 และ 8.4 | query จำกัดขอบเขตและ timeline มีสถานะถูกต้อง |
| 4.14–4.16 | 4.8, 4.13 และ 9.2 | ทดสอบเสียงครบ lifecycle และคำสั่งจริง |
| 3.11–3.14 และ 4.14–4.16 | 5.8, 6.3 และ 8.11 | โมดูลใหม่ลงทะเบียนกับโครงกลางเดิม |

แนวทาง migration: ใช้ foundation และ Auth/RLS เดิมต่อ; เพิ่ม schema ด้วย migrations ใหม่ ไม่แก้ประวัติ migration ที่ deploy แล้ว ไม่รื้อฐานข้อมูลหรือย้ายข้อมูลโดยไม่มีแผน compatibility/rollback และการตรวจรับ ส่วน read-only registry เดิมยังคงทำหน้าที่อ่าน; command registry เพิ่มเป็นอีก capability ภายใต้ระบบกลางเดียวกัน


### 12.13 บันทึกการดำเนินงานและ merge — 2026-10-05

งานรอบแรกข้อ 1 ดำเนินการโดย gpt-6.1-sol ระดับ light คุม/ตรวจงาน และ gpt-6-luna ระดับ light ลงมือทำ; ผู้คุมงานตีกลับ tests, type narrowing และ cleanup แล้วตรวจรับหลังแก้ไข ผู้ใช้อนุมัติ merge และ [PR #2](https://github.com/yuvananch-svg/LIFE-OS/pull/2) เข้า `main` แล้วที่ commit [a92422b](https://github.com/yuvananch-svg/LIFE-OS/commit/a92422bb86875bd45bc5bfb9ca3143e6e3668221) (implementation commit `de733bd`)

- [x] **1.1** ตรวจ baseline ของโค้ดเดิมและบันทึกส่วนที่ใช้ต่อ/ต้องปรับใน [design และ audit checkpoint](docs/voice-capture-design.md)
- [x] **1.9** รวม contracts ใน Vitest/TypeScript checks, แปลง assertions เป็น tests และแก้ type inference ที่การตรวจครอบคลุมใหม่พบ
- [x] **1.10** อัปเดต architecture, contracts README, SQL tests README และแผนให้ตรง Voice Capture; ระบุ 5 migrations และ 6 SQL test files
- [x] เพิ่ม preparatory Capture provider ภายใต้ authenticated layout แยกตาม user และ cleanup registry; ทดสอบ cleanup ทำต่อได้แม้ callback หนึ่งล้มเหลว
- [x] เตรียม [design proposal](docs/voice-capture-design.md) และ [static mockup](docs/voice-capture-mockup.svg) สำหรับ **1.2**
- [x] ตรวจในเครื่อง: unit tests **18 รายการ / 4 files**, typecheck, production build และ smoke **4 routes** ผ่าน; diff whitespace ผ่าน
- [x] GitHub CI `verify` ของ PR head ผ่านก่อน merge
- [x] Merge PR #2 เข้า `main` ตามคำสั่งผู้ใช้
- [ ] **1.2** ผู้ใช้ตรวจและอนุมัติหน้าตา/interaction; การอนุมัติ merge ไม่ถือเป็นอนุมัติแบบหน้าจอโดยอัตโนมัติ
- [ ] **1.8** ทำปุ่มกดค้างจริงและ recording lifecycle; โครงปัจจุบันเป็น `unavailable` และยังไม่มี microphone/transcription/AI execution
- [ ] **1.3–1.6** ตรวจ responsive, UI states, PWA/offline และ accessibility ตาม checklist ใหม่บนอุปกรณ์จริง
- [ ] **1.7** ตรวจรับข้อ 1 ทั้งหมดหลังงานค้างครบ
- [ ] ตรวจ production deployment และผลทดสอบหลัง deploy; รอบนี้ไม่ได้สั่ง deploy หรือเปลี่ยนฐานข้อมูล

Lint รอบนี้ไม่มี error และมี warning เดิมหนึ่งจุด: `eslint.config.mjs:1:62` (`import/no-anonymous-default-export`). ผล SQL remote, two-account browser test และ device acceptance ไม่ได้รันใหม่ในรอบนี้

**กติกาบันทึกความคืบหน้าต่อไป:** หลังจบงานแต่ละชุดให้อัปเดตสถานะ sub task, สิ่งที่เปลี่ยน, tests/หลักฐาน, commit/PR และงานค้างใน Git ทุกครั้ง; ใช้ “เสร็จ” เฉพาะเกณฑ์ที่ตรวจผ่านจริง และแยกเตรียมโครง/รออนุมัติ/รออุปกรณ์ออกจากงานตรวจรับแล้ว

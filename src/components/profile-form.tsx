'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import { SUPPORTED_TIMEZONES, validateProfile } from '@/lib/profile-validation';
import { useProfileContext } from '@/features/profile/profile-context';
import { AI_CONSENT_COPY } from '@/features/profile/consent';

export function ProfileForm() {
  const context = useProfileContext();
  const profile = context.profile;
  const [timezone, setTimezone] = useState('Asia/Bangkok');
  const [locale, setLocale] = useState('th-TH');
  const [currency, setCurrency] = useState('THB');
  const [units, setUnits] = useState('metric');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [busySection, setBusySection] = useState<string | null>(null);

  useEffect(() => {
    if (!profile) return;
    // Hydrate editable fields when the shared account snapshot first becomes available.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTimezone(profile.timezone); setLocale(profile.locale); setCurrency(profile.base_currency); setUnits(profile.units);
  }, [context.userId, profile]);

  const writable = context.ready && Boolean(profile) && !saving && !busySection;

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setMessage(''); setError('');
    if (!profile || !validateProfile({ timezone, locale, base_currency: currency, units })) { setError('กรุณาตรวจสอบเขตเวลา ภาษา สกุลเงิน และหน่วย'); return; }
    setSaving(true);
    try {
      const client = createClient();
      const { data: { user }, error: authError } = await client.auth.getUser();
      if (authError || user?.id !== context.userId) { setError('บัญชีเปลี่ยนหรือเซสชันหมดอายุ กรุณาโหลดหน้าใหม่'); return; }
      const { error: saveError } = await client.from('profiles').update({ timezone, locale, base_currency: currency, units }).eq('user_id', context.userId);
      if (saveError) setError('บันทึกโปรไฟล์ไม่สำเร็จ กรุณาลองอีกครั้ง');
      else { setMessage('บันทึกโปรไฟล์แล้ว'); await context.refresh(); }
    } catch { setError('เชื่อมต่อไม่ได้ โปรไฟล์ยังไม่ถูกบันทึก'); }
    finally { setSaving(false); }
  }

  async function savePermission(sectionId: string, canRead: boolean, canWrite: boolean) {
    setBusySection(sectionId); setError(''); setMessage('');
    try {
      const ok = await context.setPermission(sectionId, canRead, canWrite);
      if (ok) setMessage('บันทึกสิทธิ์ AI แล้ว'); else setError('บันทึกสิทธิ์ไม่สำเร็จ กรุณาตรวจสอบ session และลองใหม่');
    } catch { setError('บันทึกสิทธิ์ไม่สำเร็จ กรุณาลองอีกครั้ง'); }
    finally { setBusySection(null); }
  }

  async function updateConsent(enabled: boolean) {
    setBusySection('consent'); setError(''); setMessage('');
    try { const ok = await context.setAiConsent(enabled); if (ok) setMessage('บันทึกความยินยอม AI แล้ว'); else setError('บันทึกความยินยอมไม่สำเร็จ กรุณาลองอีกครั้ง'); }
    catch { setError('บันทึกความยินยอมไม่สำเร็จ กรุณาลองอีกครั้ง'); }
    finally { setBusySection(null); }
  }

  const canEdit = writable && context.permissions !== null;
  return <div className="form profile-form">
    {!context.ready && <p role="status" className="subtitle">กำลังตรวจสอบ session และโหลดโปรไฟล์…</p>}
    {context.ready && !profile && <div role="alert" className="form-error">โหลดข้อมูลโปรไฟล์ไม่ได้ กรุณาลองใหม่</div>}
    {context.loadError && <button type="button" className="button" onClick={() => void context.refresh()}>โหลดโปรไฟล์อีกครั้ง</button>}
    {profile && <>
      <form className="card form" onSubmit={save}>
        <label htmlFor="timezone">เขตเวลา<select id="timezone" className="input" value={timezone} onChange={(event) => setTimezone(event.target.value)} disabled={!canEdit}><option value="">เลือกเขตเวลา</option>{SUPPORTED_TIMEZONES.map((value) => <option key={value} value={value}>{value}</option>)}</select></label>
        <label htmlFor="locale">ภาษา<input id="locale" className="input" value={locale} onChange={(event) => setLocale(event.target.value)} disabled={!canEdit} /></label>
        <label htmlFor="currency">สกุลเงินหลัก<input id="currency" className="input" value={currency} maxLength={3} autoCapitalize="characters" onChange={(event) => setCurrency(event.target.value.toUpperCase())} disabled={!canEdit} /></label>
        <label htmlFor="units">หน่วย<select id="units" className="input" value={units} onChange={(event) => setUnits(event.target.value)} disabled={!canEdit}><option value="metric">Metric</option><option value="imperial">Imperial</option></select></label>
        <button className="button" type="submit" disabled={!canEdit}>{saving ? 'กำลังบันทึก…' : 'บันทึกโปรไฟล์'}</button>
      </form>
      <section className="card form" aria-labelledby="ai-consent-heading">
        <h2 id="ai-consent-heading">ความเป็นส่วนตัวและ AI</h2>
        <p className="subtitle">การอนุญาต AI ต้องเปิดทั้งความยินยอมรวมและสิทธิ์ในส่วนข้อมูลที่เกี่ยวข้อง การปิดสิทธิ์มีผลกับคำขอ AI ครั้งถัดไป</p>
        <label className="check-row" htmlFor="ai-consent"><input id="ai-consent" type="checkbox" checked={profile.ai_consent} onChange={(event) => void updateConsent(event.target.checked)} disabled={!canEdit} />{AI_CONSENT_COPY.global}</label>
        <p className="subtitle">{AI_CONSENT_COPY.transcription}; ขณะนี้ยังไม่มีการบันทึกหรือส่งเสียง</p>
        <h3>อนุญาต section สำหรับ AI</h3>
        {context.sections === null && <p role="alert" className="form-error">โหลดรายการ section ไม่สำเร็จ</p>}
        {context.sections?.length === 0 && <p className="subtitle">ยังไม่มี section ที่เปิดใช้ สิทธิ์เริ่มต้นจึงเป็นปฏิเสธ</p>}
        {context.sections?.map((section) => {
          const permission = context.permissions?.find((item) => item.section_id === section.id);
          const canRead = permission?.can_read ?? false;
          const canWrite = permission?.can_write ?? false;
          return <div className="check-row" key={section.id}>
            <strong>{section.name}</strong>
            <label><input type="checkbox" checked={canRead} disabled={!canEdit || !profile.ai_consent} onChange={(event) => void savePermission(section.id, event.target.checked, event.target.checked && canWrite)} /> อ่าน</label>
            <label><input type="checkbox" checked={canWrite} disabled={!canEdit || !profile.ai_consent || !canRead} onChange={(event) => void savePermission(section.id, canRead, event.target.checked)} /> เขียน/เสนอแก้</label>
          </div>;
        })}
      </section>
    </>}
    {message && <p role="status" className="subtitle">{message}</p>}{error && <p role="alert" className="form-error">{error}</p>}
  </div>;
}

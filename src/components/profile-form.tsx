'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import { SUPPORTED_TIMEZONES, validateProfile } from '@/lib/profile-validation';

export function ProfileForm() {
  const [timezone, setTimezone] = useState('Asia/Bangkok');
  const [locale, setLocale] = useState('th-TH');
  const [currency, setCurrency] = useState('THB');
  const [units, setUnits] = useState('metric');
  const [consent, setConsent] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;
    async function loadProfile() {
      try {
        const client = createClient();
        const { data: { user }, error: authError } = await client.auth.getUser();
        if (authError || !user) {
          if (active) setError('กรุณาเข้าสู่ระบบก่อน');
          return;
        }
        const { data, error: profileError } = await client
          .from('profiles')
          .select('timezone,locale,base_currency,units,ai_consent')
          .eq('user_id', user.id)
          .maybeSingle();
        if (!active) return;
        if (profileError) setError('โหลดโปรไฟล์ไม่สำเร็จ กรุณาลองโหลดหน้าใหม่');
        else if (data) {
          setTimezone(data.timezone);
          setLocale(data.locale);
          setCurrency(data.base_currency);
          setUnits(data.units);
          setConsent(data.ai_consent);
        } else {
          setMessage('ยังไม่มีโปรไฟล์ ระบบจะบันทึกค่าเริ่มต้นเมื่อกดบันทึก');
        }
      } catch {
        if (active) setError('เชื่อมต่อไม่ได้ กรุณาลองโหลดหน้าใหม่');
      } finally {
        if (active) setLoading(false);
      }
    }
    void loadProfile();
    return () => { active = false; };
  }, []);

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('');
    setError('');
    if (!validateProfile({ timezone, locale, base_currency: currency, units })) {
      setError('กรุณาตรวจสอบเขตเวลา ภาษา สกุลเงิน และหน่วย');
      return;
    }
    setSaving(true);
    try {
      const client = createClient();
      const { data: { user }, error: authError } = await client.auth.getUser();
      if (authError || !user) {
        setError('เซสชันหมดอายุ กรุณาเข้าสู่ระบบอีกครั้ง');
        return;
      }
      const { error: saveError } = await client.from('profiles').upsert({
        user_id: user.id, timezone, locale, base_currency: currency, units, ai_consent: consent,
      });
      if (saveError) setError('บันทึกโปรไฟล์ไม่สำเร็จ กรุณาลองอีกครั้ง');
      else setMessage('บันทึกโปรไฟล์แล้ว');
    } catch {
      setError('เชื่อมต่อไม่ได้ โปรไฟล์ยังไม่ถูกบันทึก');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="card form profile-form" onSubmit={save}>
      {loading && <p role="status" className="subtitle">กำลังโหลดโปรไฟล์…</p>}
      <label htmlFor="timezone">เขตเวลา
        <select id="timezone" className="input" value={timezone} onChange={(event) => setTimezone(event.target.value)} disabled={loading || saving}>
          {SUPPORTED_TIMEZONES.map((value) => <option key={value} value={value}>{value}</option>)}
        </select>
      </label>
      <label htmlFor="locale">ภาษา
        <input id="locale" className="input" value={locale} onChange={(event) => setLocale(event.target.value)} disabled={loading || saving} />
      </label>
      <label htmlFor="currency">สกุลเงินหลัก
        <input id="currency" className="input" value={currency} maxLength={3} autoCapitalize="characters" onChange={(event) => setCurrency(event.target.value.toUpperCase())} disabled={loading || saving} />
      </label>
      <label htmlFor="units">หน่วย
        <select id="units" className="input" value={units} onChange={(event) => setUnits(event.target.value)} disabled={loading || saving}>
          <option value="metric">Metric</option><option value="imperial">Imperial</option>
        </select>
      </label>
      <label className="check-row" htmlFor="ai-consent">
        <input id="ai-consent" type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} disabled={loading || saving} />
        อนุญาตให้ AI อ่านข้อมูลเมื่อเปิดใช้
      </label>
      <button className="button" type="submit" disabled={loading || saving}>{saving ? 'กำลังบันทึก…' : 'บันทึกโปรไฟล์'}</button>
      {message && <p role="status" className="subtitle">{message}</p>}
      {error && <p role="alert" className="form-error">{error}</p>}
    </form>
  );
}

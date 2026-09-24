'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase';

export function LoginForm({ initialError }: { initialError: string }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(initialError);
  const [sending, setSending] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('');
    setError('');
    setSending(true);
    try {
      const { error: authError } = await createClient().auth.signInWithOtp({
        email: email.trim(),
        options: { emailRedirectTo: `${window.location.origin}/callback` },
      });
      if (authError) setError('ส่งลิงก์ไม่สำเร็จ กรุณาตรวจอีเมลแล้วลองอีกครั้ง');
      else setMessage('ถ้าอีเมลนี้ลงทะเบียนไว้ คุณจะได้รับลิงก์เข้าสู่ระบบ โปรดตรวจกล่องจดหมาย');
    } catch {
      setError('เชื่อมต่อไม่ได้ กรุณาตรวจอินเทอร์เน็ตแล้วลองอีกครั้ง');
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="form" onSubmit={submit} style={{ marginTop: 24 }}>
      <label htmlFor="email">อีเมล</label>
      <input
        id="email"
        required
        type="email"
        autoComplete="email"
        inputMode="email"
        className="input"
        placeholder="you@example.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        disabled={sending}
      />
      <button className="button" type="submit" disabled={sending}>
        {sending ? 'กำลังส่ง…' : 'ส่งลิงก์เข้าสู่ระบบ'}
      </button>
      {message && <p role="status" className="subtitle">{message}</p>}
      {error && <p role="alert" className="form-error">{error}</p>}
    </form>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';

export function SignOut() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function signOut() {
    setBusy(true);
    setError('');
    try {
      const { error: signOutError } = await createClient().auth.signOut();
      if (signOutError) {
        setError('ออกจากระบบไม่สำเร็จ กรุณาลองอีกครั้ง');
        setBusy(false);
        return;
      }
      router.replace('/login');
      router.refresh();
    } catch {
      setError('เชื่อมต่อไม่ได้ กรุณาลองอีกครั้ง');
      setBusy(false);
    }
  }

  return (
    <div>
      <button className="button" type="button" onClick={signOut} disabled={busy}>
        {busy ? 'กำลังออกจากระบบ…' : 'ออกจากระบบ'}
      </button>
      {error && <p role="alert" className="form-error">{error}</p>}
    </div>
  );
}

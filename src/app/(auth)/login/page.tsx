import { LoginForm } from '@/components/login-form';

const callbackErrors: Record<string, string> = {
  missing_code: 'ลิงก์เข้าสู่ระบบไม่สมบูรณ์ กรุณาขอลิงก์ใหม่',
  auth: 'ลิงก์หมดอายุหรือถูกใช้แล้ว กรุณาขอลิงก์ใหม่',
  config: 'ยังไม่ได้ตั้งค่า Supabase',
};

export default async function Login({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <main className="container" style={{ paddingTop: '15vh' }}>
      <p className="eyebrow">LIFE OS</p>
      <h1 className="title">ยินดีต้อนรับกลับ</h1>
      <p className="subtitle">เข้าสู่ระบบด้วยอีเมลเพื่อดูข้อมูลของคุณ</p>
      <LoginForm initialError={error ? callbackErrors[error] ?? 'เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่' : ''} />
    </main>
  );
}

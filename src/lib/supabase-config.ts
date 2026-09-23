// These are Supabase publishable client values. They are safe to expose in a
// browser bundle; authorization is enforced by Auth and PostgreSQL RLS.
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://hsvoywcabayydmvydqrj.supabase.co';
export const SUPABASE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_VS86k58HW6BU2lzdQ8P7Eg_8ao7iACF';

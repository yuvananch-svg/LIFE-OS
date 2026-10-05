import {redirect} from 'next/navigation';
import {createClient} from '@/lib/supabase-server';
import {CaptureProvider} from '@/features/capture/capture-provider';
import {AuthenticatedProfileProvider} from '@/features/profile/profile-context';

export default async function AppLayout({children}:{children:React.ReactNode}) {
  const client=await createClient();
  if(!client) redirect('/login?error=config');
  const {data:{user},error}=await client.auth.getUser();
  if(error||!user) redirect('/login');
  const [profileResult, permissionResult] = await Promise.all([
    client.from('profiles').select('display_name,timezone,locale,base_currency,units,ai_consent').eq('user_id',user.id).maybeSingle(),
    client.from('section_permissions').select('user_id,section_id,can_read,can_write').eq('user_id',user.id),
  ]);
  const sectionResult = await client.from('sections').select('id,key,name').eq('active', true);
  const profile = profileResult.error || !profileResult.data ? null : profileResult.data;
  const permissions = permissionResult.error ? null : permissionResult.data;
  const sections = sectionResult.error ? null : sectionResult.data;
  return <AuthenticatedProfileProvider key={user.id} userId={user.id} profile={profile} permissions={permissions} sections={sections}>
    <CaptureProvider key={user.id} userId={user.id}>{children}</CaptureProvider>
  </AuthenticatedProfileProvider>;
}

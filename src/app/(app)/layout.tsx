import {redirect} from 'next/navigation'; import {createClient} from '@/lib/supabase-server';
export default async function AppLayout({children}:{children:React.ReactNode}){const client=await createClient(); if(!client) redirect('/login?error=config'); const {data:{user},error}=await client.auth.getUser(); if(error||!user) redirect('/login'); return children}

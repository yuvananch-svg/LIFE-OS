import {createServerClient} from '@supabase/ssr'; import {NextResponse,type NextRequest} from 'next/server';
import {SUPABASE_PUBLISHABLE_KEY,SUPABASE_URL} from './src/lib/supabase-config';
export async function middleware(request:NextRequest){let response=NextResponse.next({request}); const client=createServerClient(SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY,{cookies:{getAll(){return request.cookies.getAll()},setAll(cookies){cookies.forEach(({name,value})=>request.cookies.set(name,value));response=NextResponse.next({request});cookies.forEach(({name,value,options})=>response.cookies.set(name,value,options))}}}); await client.auth.getUser(); return response}
export const config={matcher:['/((?!_next/static|_next/image|favicon.ico|manifest.webmanifest).*)']};

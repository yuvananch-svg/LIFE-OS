import {createServerClient} from '@supabase/ssr'; import {cookies} from 'next/headers'; import type {Database} from '../../model/contracts/database.types';
import {SUPABASE_PUBLISHABLE_KEY,SUPABASE_URL} from './supabase-config';
export async function createClient(){const jar=await cookies(); return createServerClient<Database>(SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY,{cookies:{getAll(){return jar.getAll()},setAll(cookies){try{cookies.forEach(({name,value,options})=>jar.set(name,value,options))}catch{}}}})}

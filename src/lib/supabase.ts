import {createBrowserClient} from '@supabase/ssr';
import type {Database} from '../../model/contracts/database.types';
import {SUPABASE_PUBLISHABLE_KEY,SUPABASE_URL} from './supabase-config';
import {hasSupabaseConfig} from './supabase-config';
export function createClient(){if(!hasSupabaseConfig())throw new Error('Supabase is not configured');return createBrowserClient<Database>(SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY)}

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
/* Connecting to my supabase url and supabase anon key */ 

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
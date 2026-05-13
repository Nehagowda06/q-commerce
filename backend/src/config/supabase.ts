import { createClient } from "@supabase/supabase-js";
import { env } from "./env.js";

// Client for server-side operations (with service role key)
export const supabaseAdmin = createClient(
  env.supabaseUrl,
  env.supabaseServiceRoleKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// Client for verifying user tokens (with anon key)
export const supabase = createClient(
  env.supabaseUrl,
  env.supabaseAnonKey
);

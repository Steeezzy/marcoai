// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://kpknevuvtapghvlaglaj.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtwa25ldnV2dGFwZ2h2bGFnbGFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwODA2NDUsImV4cCI6MjA1OTY1NjY0NX0.pApFaESL_QB1IwyeAKsvRRWvt3CD-MnyMAjntUhaZJU";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
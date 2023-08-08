import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://knhqtxitxlmwtpgijmvj.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtuaHF0eGl0eGxtd3RwZ2lqbXZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE0Nzc4MDUsImV4cCI6MjAwNzA1MzgwNX0.I1Qw6TYrHRWGo63DxEDPubD_xaTJ7Do-nYpkykifPVA"

export default createClient(supabaseUrl, supabaseAnonKey)

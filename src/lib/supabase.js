import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://heybbhydfitlsoocfxog.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhleWJiaHlkZml0bHNvb2NmeG9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkyMjQ3NTQsImV4cCI6MjA1NDgwMDc1NH0.Dhe2LnUumDRk4FaZB92SUU_A-qGpC8_5TYHaBFRlagY"

export default createClient(supabaseUrl, supabaseAnonKey)

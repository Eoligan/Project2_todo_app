import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://hmevyfznbwwyxinwyiur.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtZXZ5ZnpuYnd3eXhpbnd5aXVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE1OTUxOTcsImV4cCI6MjAwNzE3MTE5N30.SCVF0KL3g4W5BPa_0uRRlPxdi2fCrgQ-ot7Aupff3RI"

export default createClient(supabaseUrl, supabaseAnonKey)

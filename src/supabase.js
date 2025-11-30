import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqdG1xdXRicW9kaWNqdXBnc3huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzNTk1NjYsImV4cCI6MjA3OTkzNTU2Nn0.NSm0ACU5YFc78e8Ck0PvCNLFaido3noRkJC_7vRMrrU "
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqdG1xdXRicW9kaWNqdXBnc3huIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDM1OTU2NiwiZXhwIjoyMDc5OTM1NTY2fQ.8RXY7u4gZyD3MIP7iN1bwwDkSqw15aD2jlQskfi5AS4"      
);

export { supabase };

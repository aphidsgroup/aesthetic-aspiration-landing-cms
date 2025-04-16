import { createClient } from '@supabase/supabase-js';

// Fallback values for local development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qehgflksdftpsxnqnekd.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlaGdmbGtzZGZ0cHN4bnFuZWtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA4NDc1MzcsImV4cCI6MjAyNjQyMzUzN30.tmQE5oGHaBgWhNoGJ9RSkLoMgSeEZv0MMUXz7YDVjwQ';

// Create a single Supabase client for the entire app
export const supabase = createClient(supabaseUrl, supabaseKey);

// Add to window for legacy components 
if (typeof window !== 'undefined') {
  window.supabase = supabase;
}

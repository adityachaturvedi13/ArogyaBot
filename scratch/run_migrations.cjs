/**
 * Run Supabase migrations via the REST SQL endpoint.
 * Executes 001_init_schema.sql, 002_rls_policies.sql, 003_seed_myths.sql in order.
 */

const fs = require('fs');
const path = require('path');

const SUPABASE_URL = 'https://thdnmyagzrropanlvoxd.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRoZG5teWFnenJyb3Bhbmx2b3hkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzE1MzYxNCwiZXhwIjoyMDkyNzI5NjE0fQ.AuJIT-KXk4Q7c1rILCd9utMfDtfH4wN3_ObnhsUQKo4';

const migrations = [
  'supabase/migrations/001_init_schema.sql',
  'supabase/migrations/002_rls_policies.sql',
  'supabase/migrations/003_seed_myths.sql',
];

async function runMigration(filePath) {
  const sql = fs.readFileSync(path.join(__dirname, '..', filePath), 'utf-8');
  console.log(`\n--- Running: ${filePath} ---`);
  
  const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
    },
    body: JSON.stringify({ query: sql }),
  });

  // If RPC doesn't work, try the SQL endpoint directly
  if (!response.ok) {
    // Try via the pg-meta SQL endpoint
    const sqlResponse = await fetch(`${SUPABASE_URL}/pg/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
      },
      body: JSON.stringify({ query: sql }),
    });
    
    if (!sqlResponse.ok) {
      const text = await sqlResponse.text();
      console.log(`  Status: ${sqlResponse.status} - Trying alternative method...`);
      
      // Last resort: use the /sql endpoint
      const altResponse = await fetch(`${SUPABASE_URL}/rest/v1/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SERVICE_ROLE_KEY,
          'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
          'Prefer': 'return=representation',
        },
      });
      console.log(`  Alternative status: ${altResponse.status}`);
      return false;
    }
    
    const data = await sqlResponse.json();
    console.log(`  ✅ Success`);
    return true;
  }

  console.log(`  ✅ Success`);
  return true;
}

async function main() {
  console.log('Testing Supabase connection...');
  
  // First test the connection
  const testResponse = await fetch(`${SUPABASE_URL}/rest/v1/`, {
    headers: {
      'apikey': SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
    },
  });
  console.log(`Connection test: ${testResponse.status}`);
  
  if (testResponse.status !== 200) {
    const text = await testResponse.text();
    console.log('Response:', text);
  } else {
    console.log('✅ Connected to Supabase successfully!');
  }

  for (const migration of migrations) {
    await runMigration(migration);
  }
}

main().catch(console.error);

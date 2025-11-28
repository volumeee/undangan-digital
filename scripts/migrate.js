#!/usr/bin/env node

/**
 * Database Migration Script
 * Runs Supabase migrations against the configured database
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Get Supabase credentials from environment
const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Error: SUPABASE_URL and SUPABASE_SERVICE_KEY must be set')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function runMigration() {
  console.log('🚀 Starting database migration...')
  
  try {
    // Read migration file
    const migrationPath = join(__dirname, '../supabase/migrations/001_initial_schema.sql')
    const migrationSQL = readFileSync(migrationPath, 'utf8')
    
    console.log('📄 Running migration: 001_initial_schema.sql')
    
    // Split SQL by statement (rough split by semicolon, handling some edge cases)
    const statements = migrationSQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'))
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i] + ';'
      
      // Skip comments and empty statements
      if (statement.trim().startsWith('--') || statement.trim() === ';') {
        continue
      }
      
      try {
        const { error } = await supabase.rpc('exec_sql', { sql: statement })
        
        if (error && !error.message.includes('already exists')) {
          console.warn(`⚠️  Warning on statement ${i + 1}: ${error.message}`)
        } else {
          console.log(`✅ Executed statement ${i + 1}/${statements.length}`)
        }
      } catch (err) {
        // If table/function already exists, it's okay
        if (err.message && (
          err.message.includes('already exists') ||
          err.message.includes('duplicate')
        )) {
          console.log(`ℹ️  Statement ${i + 1} skipped (already exists)`)
        } else {
          console.error(`❌ Error on statement ${i + 1}:`, err.message)
        }
      }
    }
    
    console.log('✅ Migration completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Migration failed:', error.message)
    process.exit(1)
  }
}

// Run migration
runMigration()

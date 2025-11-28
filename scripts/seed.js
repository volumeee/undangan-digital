#!/usr/bin/env node

/**
 * Database Seeder Script
 * Seeds the database with sample data for development/testing
 * 
 * WARNING: This will insert sample data. Only run in development!
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
const nodeEnv = process.env.NODE_ENV || 'development'

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Error: SUPABASE_URL and SUPABASE_SERVICE_KEY must be set')
  process.exit(1)
}

// Safety check: Don't run seeder in production unless explicitly allowed
if (nodeEnv === 'production' && process.env.ALLOW_PRODUCTION_SEED !== 'true') {
  console.log('⚠️  Seeding skipped in production environment')
  console.log('   Set ALLOW_PRODUCTION_SEED=true to force seeding in production')
  process.exit(0)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function runSeeder() {
  console.log('🌱 Starting database seeding...')
  console.log(`   Environment: ${nodeEnv}`)
  
  try {
    // Read seed file
    const seedPath = join(__dirname, '../supabase/seed.sql')
    const seedSQL = readFileSync(seedPath, 'utf8')
    
    console.log('📄 Running seed: seed.sql')
    
    // Split SQL by statement
    const statements = seedSQL
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
        
        if (error && !error.message.includes('duplicate key')) {
          console.warn(`⚠️  Warning on statement ${i + 1}: ${error.message}`)
        } else {
          console.log(`✅ Executed statement ${i + 1}/${statements.length}`)
        }
      } catch (err) {
        // If data already exists, it's okay
        if (err.message && (
          err.message.includes('duplicate key') ||
          err.message.includes('already exists')
        )) {
          console.log(`ℹ️  Statement ${i + 1} skipped (data already exists)`)
        } else {
          console.error(`❌ Error on statement ${i + 1}:`, err.message)
        }
      }
    }
    
    console.log('✅ Seeding completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Seeding failed:', error.message)
    process.exit(1)
  }
}

// Run seeder
runSeeder()

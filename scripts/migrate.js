#!/usr/bin/env node

/**
 * Database Migration Script
 * Runs Supabase migrations against the configured database using PostgreSQL client
 */

import pg from 'pg'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const { Client } = pg
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Get Supabase credentials from environment
const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Error: SUPABASE_URL and SUPABASE_SERVICE_KEY must be set')
  process.exit(1)
}

// Extract database connection info from Supabase URL
// Format: https://xxxxx.supabase.co -> xxxxx.db.supabase.co
const projectRef = supabaseUrl.replace('https://', '').replace('.supabase.co', '')
const dbHost = `db.${projectRef.split('.')[0]}.supabase.co`

// Password is the service key (for direct PostgreSQL connection)
const dbPassword = process.env.DATABASE_PASSWORD || supabaseServiceKey

const connectionString = process.env.DATABASE_URL || 
  `postgresql://postgres:${dbPassword}@${dbHost}:5432/postgres`

async function runMigration() {
  console.log('🚀 Starting database migration...')
  console.log(`📡 Connecting to: ${dbHost}`)
  
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  })
  
  try {
    await client.connect()
    console.log('✅ Connected to database')
    
    // Read migration file
    const migrationPath = join(__dirname, '../supabase/migrations/001_initial_schema.sql')
    const migrationSQL = readFileSync(migrationPath, 'utf8')
    
    console.log('📄 Running migration: 001_initial_schema.sql')
    
    // Run the entire migration in a transaction
    await client.query('BEGIN')
    
    try {
      // Execute the migration SQL
      await client.query(migrationSQL)
      await client.query('COMMIT')
      
      console.log('✅ Migration completed successfully!')
    } catch (err) {
      await client.query('ROLLBACK')
      
      // Check if error is because objects already exist
      if (err.message && (
        err.message.includes('already exists') ||
        err.message.includes('duplicate')
      )) {
        console.log('ℹ️  Migration skipped (schema already exists)')
      } else {
        throw err
      }
    }
    
    await client.end()
    process.exit(0)
  } catch (error) {
    console.error('❌ Migration failed:', error.message)
    if (client) {
      await client.end()
    }
    process.exit(1)
  }
}

// Run migration
runMigration()

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

// Get database connection from environment
const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  console.error('❌ Error: DATABASE_URL must be set')
  console.error('   Format: postgresql://postgres.xxxxx:[PASSWORD]@host:port/postgres')
  process.exit(1)
}

async function runMigration() {
  console.log('🚀 Starting database migration...')
  console.log(`📡 Connecting to database...`)
  
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

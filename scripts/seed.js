#!/usr/bin/env node

/**
 * Database Seeder Script
 * Seeds the database with sample data for development/testing using PostgreSQL client
 * 
 * WARNING: This will insert sample data. Only run in development!
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
const nodeEnv = process.env.NODE_ENV || 'development'

if (!connectionString) {
  console.error('❌ Error: DATABASE_URL must be set')
  console.error('   Format: postgresql://postgres.xxxxx:[PASSWORD]@host:port/postgres')
  process.exit(1)
}

// Safety check: Don't run seeder in production unless explicitly allowed
if (nodeEnv === 'production' && process.env.ALLOW_PRODUCTION_SEED !== 'true') {
  console.log('⚠️  Seeding skipped in production environment')
  console.log('   Set ALLOW_PRODUCTION_SEED=true to force seeding in production')
  process.exit(0)
}

async function runSeeder() {
  console.log('🌱 Starting database seeding...')
  console.log(`   Environment: ${nodeEnv}`)
  console.log(`📡 Connecting to database...`)
  
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  })
  
  try {
    await client.connect()
    console.log('✅ Connected to database')
    
    // Read seed file
    const seedPath = join(__dirname, '../supabase/seed.sql')
    const seedSQL = readFileSync(seedPath, 'utf8')
    
    console.log('📄 Running seed: seed.sql')
    
    try {
      // Execute the seed SQL
      await client.query(seedSQL)
      console.log('✅ Seeding completed successfully!')
    } catch (err) {
      // Check if error is because data already exists
      if (err.message && (
        err.message.includes('duplicate key') ||
        err.message.includes('already exists')
      )) {
        console.log('ℹ️  Seeding skipped (data already exists)')
      } else {
        throw err
      }
    }
    
    await client.end()
    process.exit(0)
  } catch (error) {
    console.error('❌ Seeding failed:', error.message)
    console.error(error.stack)
    if (client) {
      await client.end()
    }
    process.exit(1)
  }
}

// Run seeder
runSeeder()

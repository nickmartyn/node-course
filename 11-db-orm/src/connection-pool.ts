import { Pool } from 'pg'

const connectionString = 'postgresql://postgres:postgres@localhost:2345/nickDB'
 
export const pool = new Pool({
  connectionString,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  maxLifetimeSeconds: 60
});

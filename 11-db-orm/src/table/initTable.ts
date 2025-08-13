import { pool } from '../connection-pool';
import SQL from 'sql-template-strings';


export async function initTable() {
  console.log('initTable');
  const query = SQL`CREATE TABLE IF NOT EXISTS public.products (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    caption VARCHAR(150) NOT NULL,
    description VARCHAR(150) NOT NULL)`;
  await pool.query(query);
  console.log('Table initialized');
}
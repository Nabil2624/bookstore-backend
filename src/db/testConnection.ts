import { sql } from 'drizzle-orm';

import { db } from './index.js';

async function testConnection() {
  try {
    const result = await db.execute(sql`SELECT NOW();`);

    console.log('Database connected successfully!');
    console.log(result.rows);
  } catch (error) {
    console.error('Database connection failed.');
    console.error(error);
  }
}

testConnection();
import { Pool, QueryResult } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function getUserId(authId: string, email: string): Promise<string> {
  const client = await pool.connect();
  try {
    // Check if user exists
    const res = await client.query('SELECT id FROM users WHERE auth_id = $1', [authId]);
    if (res.rows.length > 0) {
      return res.rows[0].id;
    }

    // Create new user if not exists
    const insertRes = await client.query(
      'INSERT INTO users (auth_id, email) VALUES ($1, $2) RETURNING id',
      [authId, email]
    );
    return insertRes.rows[0].id;
  } finally {
    client.release();
  }
}

export async function queryWithUser(sql: string, params: any[], authId: string | null, email?: string): Promise<QueryResult> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    if (authId) {
      let internalId: string;
      // Optimistic check or cache could go here, but for now we query/insert
      // We need the internal ID to set the RLS context
      // Note: In a real app, you might separate sync logic from every query, 
      // but for simplicity/robustness we ensure user exists here.
      if (email) {
        internalId = await getUserId(authId, email);
      } else {
        // If we don't have email (e.g. just ID), try to find user. 
        // If not found, we can't create without email (constraint).
        const res = await client.query('SELECT id FROM users WHERE auth_id = $1', [authId]);
        if (res.rows.length === 0) {
          throw new Error('User not found and no email provided to create one');
        }
        internalId = res.rows[0].id;
      }

      await client.query(`SELECT set_config('app.current_user_id', $1, true)`, [internalId]);
    }

    const result = await client.query(sql, params);
    await client.query('COMMIT');
    return result;
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}

export async function syncUser(user: any) {
  const client = await pool.connect();
  try {
    // Upsert user: update if exists, insert if not
    // We use ON CONFLICT (auth_id) DO UPDATE to ensure we keep latest info
    // We also generate a default username if one doesn't exist
    const defaultUsername = user.displayName?.replace(/\s+/g, '').toLowerCase() || `user${user.id.slice(0, 8)}`;

    await client.query(
      `INSERT INTO users (auth_id, email, username, bio) 
             VALUES ($1, $2, $3, '') 
             ON CONFLICT (auth_id) 
             DO UPDATE SET 
                email = EXCLUDED.email,
                username = COALESCE(users.username, EXCLUDED.username)
             RETURNING id`,
      [user.id, user.primaryEmail, defaultUsername]
    );
  } finally {
    client.release();
  }
}

export default pool;

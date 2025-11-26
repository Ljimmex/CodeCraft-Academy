const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Manually read .env files since dotenv might not be installed
function loadEnv(filePath) {
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        content.split('\n').forEach(line => {
            const match = line.match(/^([^=]+)=(.*)$/);
            if (match) {
                const key = match[1].trim();
                const value = match[2].trim().replace(/^["']|["']$/g, ''); // Remove quotes
                if (!process.env[key]) {
                    process.env[key] = value;
                }
            }
        });
    }
}

loadEnv(path.join(__dirname, '.env.local'));
loadEnv(path.join(__dirname, '.env'));

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function runMigration() {
    const client = await pool.connect();
    try {
        const sql = fs.readFileSync(path.join(__dirname, 'migrations', '06_add_settings_fields.sql'), 'utf8');
        await client.query(sql);
        console.log('Migration executed successfully');
    } catch (err) {
        console.error('Error executing migration:', err);
    } finally {
        client.release();
        pool.end();
    }
}

runMigration();

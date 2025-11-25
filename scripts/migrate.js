const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// Simple .env parser since we might not have dotenv
function loadEnv() {
    try {
        const envPath = path.join(__dirname, '../.env.local');
        if (!fs.existsSync(envPath)) {
            console.log('.env.local not found at:', envPath);
            return;
        }
        const envFile = fs.readFileSync(envPath, 'utf8');
        envFile.split(/\r?\n/).forEach(line => {
            const match = line.match(/^([^=]+)=(.*)$/);
            if (match) {
                const key = match[1].trim();
                let value = match[2].trim();
                if (value.startsWith("'") && value.endsWith("'")) {
                    value = value.slice(1, -1);
                }
                process.env[key] = value;
            }
        });
        console.log('Loaded env vars from .env.local');
    } catch (e) {
        console.log('Error reading .env.local:', e);
    }
}

loadEnv();

async function runMigration() {
    console.log('Connecting to database...');
    if (!process.env.DATABASE_URL) {
        console.error('DATABASE_URL is not set');
        process.exit(1);
    }

    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });

    try {
        await client.connect();

        const migrationsDir = path.join(__dirname, '../migrations');
        const files = fs.readdirSync(migrationsDir)
            .filter(f => f.endsWith('.sql'))
            .sort();

        for (const file of files) {
            const sqlPath = path.join(migrationsDir, file);
            const sql = fs.readFileSync(sqlPath, 'utf8');
            console.log('Applying migration:', file);
            try {
                await client.query(sql);
                console.log(`Migration ${file} applied successfully`);
            } catch (e) {
                console.error(`Error applying ${file}:`, e.message);
                // Continue or throw? For now let's continue as some might already exist
            }
        }

    } catch (err) {
        console.error('Migration failed', err);
        process.exit(1);
    } finally {
        await client.end();
    }
}

runMigration();

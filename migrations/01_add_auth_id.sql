-- Add auth_id column to users table to store Stack Auth ID
ALTER TABLE users ADD COLUMN IF NOT EXISTS auth_id TEXT UNIQUE;
CREATE INDEX IF NOT EXISTS idx_users_auth_id ON users(auth_id);

-- Update current_user_id function to read from session variable
CREATE OR REPLACE FUNCTION current_user_id() RETURNS UUID AS $$
BEGIN
    RETURN current_setting('app.current_user_id', true)::uuid;
END;
$$ LANGUAGE plpgsql;

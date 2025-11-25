-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    total_xp INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Languages Table
CREATE TABLE languages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    docker_image_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Courses Table
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    language_id UUID REFERENCES languages(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Modules Table
CREATE TABLE modules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    order_index INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Lessons Table
CREATE TABLE lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    module_id UUID REFERENCES modules(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    type TEXT CHECK (type IN ('challenge', 'text', 'project')) NOT NULL,
    order_index INTEGER NOT NULL,
    content TEXT, -- For text lessons or descriptions
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Challenges Table (One-to-One with Lessons)
CREATE TABLE challenges (
    lesson_id UUID PRIMARY KEY REFERENCES lessons(id) ON DELETE CASCADE,
    starter_code TEXT,
    solution_code TEXT,
    instructions TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Test Definitions Table (One-to-One with Challenges)
CREATE TABLE test_definitions (
    challenge_id UUID PRIMARY KEY REFERENCES challenges(lesson_id) ON DELETE CASCADE,
    test_data JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. User Progress Table
CREATE TABLE user_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
    status TEXT CHECK (status IN ('started', 'completed')) DEFAULT 'started',
    completed_at TIMESTAMP WITH TIME ZONE,
    last_accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, lesson_id)
);

-- 9. Submission Results Table
CREATE TABLE submission_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    challenge_id UUID REFERENCES challenges(lesson_id) ON DELETE CASCADE,
    submitted_code TEXT NOT NULL,
    passed BOOLEAN DEFAULT FALSE,
    execution_time_ms INTEGER,
    detailed_feedback JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_modules_course_id ON modules(course_id);
CREATE INDEX idx_lessons_module_id ON lessons(module_id);
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_submission_results_user_challenge ON submission_results(user_id, challenge_id);
CREATE INDEX idx_submission_results_user_id ON submission_results(user_id);

-- ==========================================
-- Triggers for Automatic Timestamps
-- ==========================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- ==========================================
-- Row Level Security (RLS)
-- ==========================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_definitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE submission_results ENABLE ROW LEVEL SECURITY;

-- Helper function to get current user ID (Adjust based on your Auth provider, e.g., Supabase uses auth.uid())
-- This is a placeholder.
CREATE OR REPLACE FUNCTION current_user_id() RETURNS UUID AS $$
BEGIN
    -- Example: RETURN current_setting('app.user_id')::uuid;
    RETURN NULL; 
END;
$$ LANGUAGE plpgsql;

-- Policies

-- 1. Users: Can view and update their own profile
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (id = current_user_id());
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (id = current_user_id());

-- 2. Content (Courses, Modules, Lessons, etc.): Publicly readable
CREATE POLICY "Languages are public" ON languages FOR SELECT USING (true);
CREATE POLICY "Courses are public" ON courses FOR SELECT USING (true);
CREATE POLICY "Modules are public" ON modules FOR SELECT USING (true);
CREATE POLICY "Lessons are public" ON lessons FOR SELECT USING (true);
CREATE POLICY "Challenges are public" ON challenges FOR SELECT USING (true);
CREATE POLICY "Test definitions are public" ON test_definitions FOR SELECT USING (true);

-- 3. User Progress: Private to the user
CREATE POLICY "Users view own progress" ON user_progress FOR SELECT USING (user_id = current_user_id());
CREATE POLICY "Users insert own progress" ON user_progress FOR INSERT WITH CHECK (user_id = current_user_id());
CREATE POLICY "Users update own progress" ON user_progress FOR UPDATE USING (user_id = current_user_id());

-- 4. Submissions: Private to the user
CREATE POLICY "Users view own submissions" ON submission_results FOR SELECT USING (user_id = current_user_id());
CREATE POLICY "Users insert own submissions" ON submission_results FOR INSERT WITH CHECK (user_id = current_user_id());

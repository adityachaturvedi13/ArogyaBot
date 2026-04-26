-- ArogyaBot Database Schema
-- Migration 001: Initial table creation
-- NO AUTH TABLES — all sessions are anonymous via client-generated UUIDs

-- ─── Anonymous Conversation Sessions ─────────────────────────────────────────
-- session_id is a UUID generated client-side and stored in localStorage
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY,
  started_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  last_active TIMESTAMPTZ DEFAULT now() NOT NULL,
  language_used TEXT DEFAULT 'en' NOT NULL,
  city TEXT,
  message_count INT DEFAULT 0 NOT NULL
);

-- ─── Individual Messages Per Session ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE NOT NULL,
  role TEXT CHECK (role IN ('user', 'assistant')) NOT NULL,
  content TEXT NOT NULL,
  intent_category TEXT CHECK (
    intent_category IS NULL OR
    intent_category IN ('symptoms', 'prevention', 'myth', 'location', 'general', 'emergency')
  ),
  module_used TEXT CHECK (
    module_used IS NULL OR
    module_used IN ('VIR', 'PMC', 'CARE', 'EMERGENCY', 'GENERAL')
  ),
  is_emergency BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- ─── Myth/Fact Verified Knowledge Base ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS myths (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  myth_text TEXT NOT NULL,
  fact_text TEXT NOT NULL,
  explanation TEXT,
  category TEXT CHECK (
    category IN ('vaccines', 'covid', 'dengue', 'malaria', 'nutrition', 'mental_health')
  ),
  language TEXT DEFAULT 'en' NOT NULL,
  source_url TEXT,
  verified_by TEXT CHECK (
    verified_by IN ('WHO', 'CDC', 'MoHFW')
  ) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- ─── Location-Based Health Resources ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS health_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT CHECK (
    type IN ('hospital', 'clinic', 'vaccination_center', 'pharmacy')
  ),
  city TEXT,
  state TEXT,
  pincode TEXT,
  address TEXT,
  phone TEXT,
  is_govt BOOLEAN DEFAULT false NOT NULL
);

-- ─── Per-Message Feedback (Anonymous) ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID REFERENCES messages(id) ON DELETE CASCADE NOT NULL,
  was_helpful BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- ─── Indexes for Performance ─────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_messages_session_id ON messages(session_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);
CREATE INDEX IF NOT EXISTS idx_health_resources_city ON health_resources(city);
CREATE INDEX IF NOT EXISTS idx_health_resources_pincode ON health_resources(pincode);
CREATE INDEX IF NOT EXISTS idx_myths_category ON myths(category);
CREATE INDEX IF NOT EXISTS idx_myths_language ON myths(language);
CREATE INDEX IF NOT EXISTS idx_feedback_message_id ON feedback(message_id);
CREATE INDEX IF NOT EXISTS idx_sessions_last_active ON sessions(last_active);

-- ArogyaBot RLS Policies
-- Migration 002: Row Level Security
-- All tables use public/anonymous access — NO auth.users references

-- ─── Sessions: Anonymous insert, update, select ──────────────────────────────
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_insert_sessions"
  ON sessions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "anon_update_sessions"
  ON sessions FOR UPDATE
  USING (true);

CREATE POLICY "anon_select_sessions"
  ON sessions FOR SELECT
  USING (true);

-- ─── Messages: Public insert + select ────────────────────────────────────────
-- Filtering by session_id is handled in application logic
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_insert_messages"
  ON messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "anon_select_messages"
  ON messages FOR SELECT
  USING (true);

-- ─── Myths: Public read only ─────────────────────────────────────────────────
-- Myths are seeded by admins, users can only read
ALTER TABLE myths ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_myths"
  ON myths FOR SELECT
  USING (true);

-- ─── Health Resources: Public read only ──────────────────────────────────────
-- Resources are seeded by admins, users can only read
ALTER TABLE health_resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_resources"
  ON health_resources FOR SELECT
  USING (true);

-- ─── Feedback: Public insert only ────────────────────────────────────────────
-- Users can submit feedback but cannot read other feedback
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_insert_feedback"
  ON feedback FOR INSERT
  WITH CHECK (true);

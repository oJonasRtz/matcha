CREATE TABLE IF NOT EXISTS matches (
	id SERIAL PRIMARY KEY,
	user1_id INTEGER NOT NULL,
	user2_id INTEGER NOT NULL,
	matched_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	match_source VARCHAR(50) NOT NULL DEFAULT 'mutual_like',

	FOREIGN KEY (user1_id) REFERENCES users(id) ON DELETE CASCADE,
	FOREIGN KEY (user2_id) REFERENCES users(id) ON DELETE CASCADE,

	UNIQUE (user1_id, user2_id)
);

CREATE INDEX IF NOT EXISTS idx_matches_matched_at ON matches(matched_at DESC);
CREATE INDEX IF NOT EXISTS idx_matches_user1_id ON matches(user1_id);
CREATE INDEX IF NOT EXISTS idx_matches_user2_id ON matches(user2_id);
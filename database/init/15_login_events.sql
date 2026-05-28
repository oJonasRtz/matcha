CREATE TABLE IF NOT EXISTS login_events (
	id SERIAL PRIMARY KEY,
	user_id INTEGER NOT NULL,
	logged_in_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	device_label TEXT,
	ip_address INET,

	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_login_events_logged_in_at ON login_events(logged_in_at DESC);
CREATE INDEX IF NOT EXISTS idx_login_events_user_id ON login_events(user_id);
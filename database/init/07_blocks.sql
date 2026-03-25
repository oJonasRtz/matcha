CREATE TABLE IF NOT EXISTS blocks (
	id SERIAL PRIMARY KEY,
	blocker_id INTEGER NOT NULL,
	blocked_id INTEGER NOT NULL,

	FOREIGN KEY (blocker_id) REFERENCES users(id) ON DELETE CASCADE,
	FOREIGN KEY (blocked_id) REFERENCES users(id) ON DELETE CASCADE,
	
	UNIQUE (blocker_id, blocked_id)
);
;
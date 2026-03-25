CREATE TABLE IF NOT EXISTS likes (
	id SERIAL PRIMARY KEY,
	liker_id INTEGER NOT NULL,
	liked_id INTEGER NOT NULL,

	FOREIGN KEY (liker_id) REFERENCES users(id) ON DELETE CASCADE,
	FOREIGN KEY (liked_id) REFERENCES users(id) ON DELETE CASCADE,
	
	UNIQUE (liker_id, liked_id)
);

-- index for efficient lookup of mutual likes
CREATE INDEX IF NOT EXISTS idx_likes_liker_id ON likes(liker_id);
CREATE INDEX IF NOT EXISTS idx_likes_liked_id ON likes(liked_id);
CREATE INDEX IF NOT EXISTS idx_likes_liker_liked ON likes(liker_id, liked_id);

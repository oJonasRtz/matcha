CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS moderators (
	id SERIAL PRIMARY KEY,
	public_id UUID UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
	username VARCHAR(255) UNIQUE NOT NULL,
	email VARCHAR(255) UNIQUE NOT NULL,
	"role" VARCHAR(50) NOT NULL DEFAULT 'moderator',
	is_online BOOLEAN NOT NULL DEFAULT FALSE,
	last_online TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	password_hash VARCHAR(255) NOT NULL
);

INSERT INTO moderators (username, email, password_hash)
VALUES ('admin', 'admin@mod.com', crypt('admin', gen_salt('bf')))
ON CONFLICT (username) DO NOTHING;

ALTER TABLE users
ADD CONSTRAINT fk_users_moderator_who_restricted
FOREIGN KEY (moderator_who_restricted)
REFERENCES moderators(id)
ON DELETE SET NULL;

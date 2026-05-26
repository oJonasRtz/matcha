CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS moderators (
	id SERIAL PRIMARY KEY,
	public_id UUID UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
	username VARCHAR(255) UNIQUE NOT NULL,
	email VARCHAR(255) UNIQUE NOT NULL,
	password_hash VARCHAR(255) NOT NULL
);

INSERT INTO moderators (username, email, password_hash)
VALUES ('admin', 'admin@mod.com', crypt('admin', gen_salt('bf')))
ON CONFLICT (username) DO NOTHING;

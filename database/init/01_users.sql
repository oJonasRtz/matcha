CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
	id SERIAL PRIMARY KEY,
	public_id UUID UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
	username VARCHAR(255) UNIQUE NOT NULL,
	email VARCHAR(255) UNIQUE NOT NULL,
	firstname VARCHAR(255) NOT NULL,
	lastname VARCHAR(255) NOT NULL,
	gender VARCHAR(50) NOT NULL,
	sexual_orientation VARCHAR(50) NOT NULL DEFAULT 'bisexual',
	bio TEXT DEFAULT '',
	birthday DATE,
	age INTEGER NOT NULL DEFAULT 18,
	frame_rate INTEGER NOT NULL DEFAULT 0,
	is_online BOOLEAN NOT NULL DEFAULT FALSE,
	last_online TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
	restricted BOOLEAN NOT NULL DEFAULT FALSE,
	restriction_reason TEXT,
	restriction_expires TIMESTAMPTZ,
	moderator_who_restricted INTEGER
);

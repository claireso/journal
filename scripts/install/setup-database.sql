-- Create extensions
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create table media
CREATE TYPE MEDIA_TYPE AS ENUM ('image');
CREATE TABLE media (
  ID SERIAL PRIMARY KEY,
  created_at TIMESTAMP with time zone DEFAULT NOW(),
  type MEDIA_TYPE NOT NULL,
  name VARCHAR NOT NULL,
  width INT,
  height INT
);

-- Create table photos
CREATE TYPE POSITION_TYPE AS ENUM ('left', 'center', 'right');
CREATE TABLE photos (
  ID SERIAL PRIMARY KEY,
  media_id INTEGER UNIQUE REFERENCES media(id),
  created_at TIMESTAMP with time zone DEFAULT NOW(),
  updated_at TIMESTAMP with time zone DEFAULT NOW(),
  title VARCHAR,
  description TEXT,
  name VARCHAR NOT NULL,
  position POSITION_TYPE DEFAULT 'left',
  color CHAR (7) CHECK (color ~ '^#[A-Fa-f0-9]{6}$'),
  portrait BOOLEAN DEFAULT False,
  square BOOLEAN DEFAULT False
);

-- Create table subscriptions
CREATE TABLE subscriptions (
  ID SERIAL PRIMARY KEY,
  subscription JSON NOT NULL,
  created_at TIMESTAMP with time zone DEFAULT NOW(),
  updated_at TIMESTAMP with time zone DEFAULT NOW()
);

-- Create table users
CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  cid UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  username VARCHAR NOT NULL UNIQUE,
  password VARCHAR NOT NULL,
  created_at TIMESTAMP with time zone DEFAULT NOW(),
  updated_at TIMESTAMP with time zone DEFAULT NOW()
);

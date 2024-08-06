-- Create extensions
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create table photos
CREATE TYPE POSITION_TYPE AS ENUM ('left', 'center', 'right');
CREATE TABLE photos (
  ID SERIAL PRIMARY KEY,
  title VARCHAR,
  description TEXT,
  name VARCHAR NOT NULL,
  position POSITION_TYPE DEFAULT 'left',
  portrait BOOLEAN DEFAULT False,
  color CHAR (7) CHECK (color ~ '^#[A-Fa-f0-9]{6}$'),
  square BOOLEAN DEFAULT False,
  created_at TIMESTAMP with time zone DEFAULT NOW(),
  updated_at TIMESTAMP with time zone DEFAULT NOW()
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

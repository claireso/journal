CREATE TYPE POSITION_TYPE AS ENUM ('left', 'center', 'right');

CREATE TABLE photos (
  ID SERIAL PRIMARY KEY,
  title VARCHAR,
  description TEXT,
  name VARCHAR,
  position POSITION_TYPE DEFAULT 'left',
  portrait BOOLEAN DEFAULT False,
  square BOOLEAN DEFAULT False
);

INSERT INTO photos (title, description, name)
  VALUES ('Photo 1', 'First photo', '100.jpg');

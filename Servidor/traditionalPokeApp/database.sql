create database pokemons
    default character set utf8
    collate utf8_unicode_ci;

use pokemons;

CREATE TABLE pokemon (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL,
  ability VARCHAR(100),
  hp INT,
  attack INT,
  defense INT
);

create user pokeuser@localhost
    identified by 'Pokepassword1234#';

grant all
    on pokemon.*
    to pokeuser@localhost;

flush privileges;
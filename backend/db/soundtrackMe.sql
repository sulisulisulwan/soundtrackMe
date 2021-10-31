DROP DATABASE IF EXISTS SoundtrackMe;

CREATE DATABASE IF NOT EXISTS SoundtrackMe;

USE SoundtrackMe;

CREATE TABLE Users (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(100),
  email VARCHAR(60),
  salt VARCHAR(60),
  hash VARCHAR(60),
  resetSalt VARCHAR(60),
  resetToken VARCHAR(60),
  confirmed BOOLEAN,
  PRIMARY KEY (id),
  UNIQUE(username, salt, hash)
);


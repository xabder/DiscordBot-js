CREATE DATABASE discordbot;

CREATE TABLE tickets
(
    guildId VARCHAR(100) NOT NULL PRIMARY KEY,
    ticket1 int,
    ticket2 int,
    ticket3 int
);
-- db/setup.sql

-- Cria a tabela "users" se ela não existir
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
);

-- Adiciona alguns dados de exemplo
INSERT OR REPLACE INTO users (name, email)
VALUES ('Alice', 'alice@example.com'),
       ('Bob', 'bob@example.com');

CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    code TEXT NOT NULL UNIQUE
);

-- Adiciona alguns dados de exemplo
INSERT OR REPLACE INTO products (name, code)
VALUES ('IVP 5001', 'abc-20'),
       ('IVP 7001', 'def-10');


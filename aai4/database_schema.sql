CREATE TABLE admins (
	id SERIAL PRIMARY KEY,
	nome_social VARCHAR(250) UNIQUE NOT NULL,
	nome_adm VARCHAR(250) NOT NULL,
	email VARCHAR(250) UNIQUE NOT NULL,
	cnpj VARCHAR(250) UNIQUE NOT NULL,
	senha VARCHAR(250) NOT NULL
);

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	id_admin INT REFERENCES admins(id) ON DELETE CASCADE,
	nome VARCHAR(250) NOT NULL,
	email VARCHAR(250) UNIQUE NOT NULL,
	telefone VARCHAR(250) UNIQUE NOT NULL,
	senha VARCHAR(50) NOT NULL
);

CREATE TABLE tasks (
	id SERIAL PRIMARY KEY,
	nome VARCHAR(250) UNIQUE NOT NULL,
	pontos INT NOT NULL,
	descricao VARCHAR(250) NOT NULL
);

CREATE TABLE tasks_users (
	id SERIAL PRIMARY KEY,
	id_task INT REFERENCES tasks(id) ON DELETE CASCADE,
	id_user INT REFERENCES users(id) ON DELETE CASCADE
);

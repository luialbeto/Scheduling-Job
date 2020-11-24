-- CRIANDO E NORMALIZANDO A TABELA TERCEIRA FORMA

DROP DATABASE IF EXISTS vivoJobs;

CREATE DATABASE vivoJobs;

USE vivoJobs;

CREATE TABLE tipo(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  descricao VARCHAR(45) NOT NULL
)
ENGINE = InnoDB;

CREATE TABLE data_maxima(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  data_maxima_de_conclusao DATE NOT NULL,
  tipo_id INT NOT NULL
  FOREIGN KEY (tipo_id)
  REFERENCES tipo(id)
 )
ENGINE = InnoDB;

CREATE TABLE horas(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  hora INT NOT NULL,
  data_maxima_de_conclusao_id DATE NOT NULL
  FOREIGN KEY (data_maxima_de_conclusao_id)
  REFERENCES data_maxima_de_conclusao(id)
ENGINE = InnoDB;

CREATE TABLE tempo_estimado(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  data_maxima_de_conclusao_id DATE NOT NULL
  FOREIGN KEY (data_maxima_de_conclusao_id)
  REFERENCES data_maxima_de_conclusao(id);
) ENGINE = InnoDB;

INSERT INTO tipo (descricao)
VALUES
  ('Importação de arquivos de fundos'),
  ('Importação de dados da Base Legada'),
  ('Importação de dados de integração');

INSERT INTO data_maxima (data_maxima_de_conclusao)
VALUES
  (2019 - 11 - 10),
  (2019 - 11 - 11),
  (2019 - 11 - 11),

INSERT INTO horas (hora)
VALUES
  (12),
  (12),
  (8);
  
INSERT INTO tempo_estimado (tempo)
VALUES
  (2),
  (4),
  (6);
  
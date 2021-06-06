CREATE DATABASE IF NOT EXISTS gestair DEFAULT CHARACTER SET latin1;

USE gestair;

CREATE TABLE companies (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB ;
INSERT INTO companies VALUES (1,'Test Company');

CREATE TABLE customers (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  company_id int NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_customers_company_id_companies_id FOREIGN KEY (company_id) REFERENCES companies (id)
) ENGINE=InnoDB;
INSERT INTO customers VALUES (1,'Test Customer',1);

CREATE TABLE enviroments (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  customer_id int NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_customer_id FOREIGN KEY (customer_id) REFERENCES customers (id)
) ENGINE=InnoDB;

CREATE TABLE equipments (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  email varchar(100) NOT NULL,
  password_hash char(60) NOT NULL,
  type enum('gestair', 'company', 'customer'),
  role enum('gestair_admin'),
  first_name varchar(20) NOT NULL,
  last_name varchar(60) NOT NULL,
  cpf char(11) NOT NULL,
  phone varchar(20),
  company_id int,
  customer_id int,
  PRIMARY KEY (id),
  UNIQUE KEY (email),
  CONSTRAINT fk_users_company_id_companies_id FOREIGN KEY (company_id) REFERENCES companies (id),
  CONSTRAINT fk_users_customer_id_customers_id FOREIGN KEY (customer_id) REFERENCES customers (id)
) ENGINE=InnoDB;
--INSERT INTO users VALUES (1,'admin','$2y$08$h.mktfdf5S2ne.4VW1oUuOywuVKWK.kpcs69oVaUDYeLcOXT1lPru','gestair','gestair_admin', null, null);
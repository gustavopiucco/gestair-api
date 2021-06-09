CREATE DATABASE IF NOT EXISTS gestair DEFAULT CHARACTER SET latin1;

USE gestair;

CREATE TABLE companies (
  id int NOT NULL AUTO_INCREMENT,
  company_name varchar(100) NOT NULL,
  trading_name varchar(100) NOT NULL,
  cnpj char(14) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE customers (
  id int NOT NULL AUTO_INCREMENT,
  company_name varchar(100) NOT NULL,
  trading_name varchar(100) NOT NULL,
  cnpj char(14) NOT NULL,
  company_id int NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_customers_company_id_companies_id FOREIGN KEY (company_id) REFERENCES companies (id)
) ENGINE=InnoDB;

CREATE TABLE units (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  floors smallint NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE enviroments (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  floor varchar(20) NOT NULL,
  area varchar(20) NOT NULL,
  activity_type varchar(30) NOT NULL,
  fixed_occupants smallint NOT NULL,
  floating_occupants smallint NOT NULL,
  thermal_load smallint NOT NULL,
  unit_id int NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_enviroments_unit_id_units_id FOREIGN KEY (unit_id) REFERENCES enviroments (id)
) ENGINE=InnoDB;

CREATE TABLE equipments (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  type enum('ac_central', 'ac_split') NOT NULL,
  serial_numer varchar(200) NOT NULL,
  capacity smallint NOT NULL,
  brand enum('samsung') NOT NULL,
  model enum('ac123') NOT NULL,
  tag varchar(100) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  email varchar(100) NOT NULL,
  password_hash char(60) NOT NULL,
  type enum('admin', 'company', 'customer'),
  role enum('admin'),
  first_name varchar(20) NOT NULL,
  last_name varchar(60) NOT NULL,
  cpf char(11) NOT NULL,
  phone varchar(20) NOT NULL,
  company_id int,
  customer_id int,
  PRIMARY KEY (id),
  UNIQUE KEY (email),
  CONSTRAINT chk_company_id_customer_id CHECK ((company_id IS NOT NULL AND customer_id IS NULL) OR (customer_id IS NOT NULL AND company_id IS NULL) OR (company_id IS NULL AND customer_id IS NULL)),
  CONSTRAINT fk_users_company_id_companies_id FOREIGN KEY (company_id) REFERENCES companies (id),
  CONSTRAINT fk_users_customer_id_customers_id FOREIGN KEY (customer_id) REFERENCES customers (id)
) ENGINE=InnoDB;
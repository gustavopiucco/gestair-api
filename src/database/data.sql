CREATE DATABASE IF NOT EXISTS gestair DEFAULT CHARACTER SET utf8mb4;

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
  name varchar(100),
  type varchar(100) NOT NULL,
  capacity smallint NOT NULL,
  brand varchar(100) NOT NULL,
  model varchar(100) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE physical_equipments (
  id int NOT NULL AUTO_INCREMENT,
  serial_number varchar(100) NOT NULL,
  tag varchar(100) NOT NULL,
  equipment_id int NOT NULL,
  enviroment_id int NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_physical_equipments_equipment_id_equipments_id FOREIGN KEY (equipment_id) REFERENCES equipments (id),
  CONSTRAINT fk_physical_equipments_enviroments_id_enviroments_id FOREIGN KEY (enviroment_id) REFERENCES enviroments (id)
) ENGINE=InnoDB;

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  email varchar(100) NOT NULL,
  password_hash char(60) NOT NULL,
  type enum('admin', 'company', 'customer'),
  role enum('admin', 'company_manager'),
  first_name varchar(20) NOT NULL,
  last_name varchar(60) NOT NULL,
  cpf char(11) NOT NULL,
  phone varchar(20) NOT NULL,
  company_id int,
  customer_id int,
  PRIMARY KEY (id),
  UNIQUE KEY (email),
  UNIQUE KEY (cpf),
  CONSTRAINT chk_company_id_customer_id CHECK ((company_id IS NOT NULL AND customer_id IS NULL) OR (customer_id IS NOT NULL AND company_id IS NULL) OR (company_id IS NULL AND customer_id IS NULL)),
  CONSTRAINT fk_users_company_id_companies_id FOREIGN KEY (company_id) REFERENCES companies (id),
  CONSTRAINT fk_users_customer_id_customers_id FOREIGN KEY (customer_id) REFERENCES customers (id)
) ENGINE=InnoDB;
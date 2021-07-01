CREATE DATABASE IF NOT EXISTS gestair DEFAULT CHARACTER SET utf8mb4;

USE gestair;

CREATE TABLE companies (
  id int NOT NULL AUTO_INCREMENT,
  company_name varchar(100) NOT NULL,
  trading_name varchar(100) NOT NULL,
  cnpj char(14) NOT NULL,
  CONSTRAINT pk_id PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE customers (
  id int NOT NULL AUTO_INCREMENT,
  company_name varchar(100) NOT NULL,
  trading_name varchar(100) NOT NULL,
  cnpj char(14) NOT NULL,
  company_id int NOT NULL,
  CONSTRAINT pk_id PRIMARY KEY (id),
  CONSTRAINT fk_customers_company_id_companies_id FOREIGN KEY (company_id) REFERENCES companies (id)
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
  CONSTRAINT pk_id PRIMARY KEY (id),
  CONSTRAINT uc_email UNIQUE (email),
  CONSTRAINT uc_cpf UNIQUE (cpf),
  CONSTRAINT chk_company_id_customer_id CHECK ((company_id IS NOT NULL AND customer_id IS NULL) OR (customer_id IS NOT NULL AND company_id IS NULL) OR (company_id IS NULL AND customer_id IS NULL)),
  CONSTRAINT fk_users_company_id_companies_id FOREIGN KEY (company_id) REFERENCES companies (id),
  CONSTRAINT fk_users_customer_id_customers_id FOREIGN KEY (customer_id) REFERENCES customers (id)
) ENGINE=InnoDB;

CREATE TABLE units (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  floors smallint NOT NULL,
  address varchar(150) NOT NULL,
  district varchar(50) NOT NULL,
  city varchar(50) NOT NULL,
  federal_unit varchar(50) NOT NULL,
  cep varchar(20) NOT NULL,
  customer_id int NOT NULL,
  CONSTRAINT pk_id PRIMARY KEY (id),
  CONSTRAINT fk_u_c_id_c_id FOREIGN KEY (customer_id) REFERENCES customers (id)
) ENGINE=InnoDB;

CREATE TABLE enviroments (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  floor varchar(20) NOT NULL,
  area mediumint NOT NULL,
  activity_type varchar(100) NOT NULL,
  fixed_occupants smallint NOT NULL,
  floating_occupants smallint NOT NULL,
  thermal_load smallint NOT NULL,
  unit_id int NOT NULL,
  CONSTRAINT pk_id PRIMARY KEY (id),
  CONSTRAINT fk_enviroments_unit_id_units_id FOREIGN KEY (unit_id) REFERENCES units (id)
) ENGINE=InnoDB;

CREATE TABLE equipments_system_type (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  CONSTRAINT pk_id PRIMARY KEY (id)
) ENGINE=InnoDB;
INSERT INTO equipments_system_type (name) VALUES ('refrigeration');
INSERT INTO equipments_system_type (name) VALUES ('airconditioning');
INSERT INTO equipments_system_type (name) VALUES ('heating');
INSERT INTO equipments_system_type (name) VALUES ('ventilation');

CREATE TABLE equipments_type (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  CONSTRAINT pk_id PRIMARY KEY (id)
) ENGINE=InnoDB;
INSERT INTO equipments_type (name) VALUES ('split');
INSERT INTO equipments_type (name) VALUES ('split_hidronico_piso_teto');
INSERT INTO equipments_type (name) VALUES ('split');
INSERT INTO equipments_type (name) VALUES ('split_hidronico_piso_teto');
INSERT INTO equipments_type (name) VALUES ('split_hidronico');
INSERT INTO equipments_type (name) VALUES ('split_k7');
INSERT INTO equipments_type (name) VALUES ('fancolete_corredores');
INSERT INTO equipments_type (name) VALUES ('fancolete_teto_embutido');
INSERT INTO equipments_type (name) VALUES ('fancoil_casa_maquinas');
INSERT INTO equipments_type (name) VALUES ('camaras_frias');
INSERT INTO equipments_type (name) VALUES ('chiller');
INSERT INTO equipments_type (name) VALUES ('fancoil');
INSERT INTO equipments_type (name) VALUES ('bebedouro');
INSERT INTO equipments_type (name) VALUES ('vrf');
INSERT INTO equipments_type (name) VALUES ('vrf_split');
INSERT INTO equipments_type (name) VALUES ('vrf_condensadora');
INSERT INTO equipments_type (name) VALUES ('vrf_duto');

CREATE TABLE equipments_brand_model (
  id int NOT NULL AUTO_INCREMENT,
  brand_name varchar(100) NOT NULL,
  model_name varchar(100) NOT NULL,
  CONSTRAINT pk_id PRIMARY KEY (id),
  CONSTRAINT uc_equipments_brand_model_model UNIQUE (model_name),
  CONSTRAINT uc_equipments_brand_model_brand_model UNIQUE (brand_name, model_name)
) ENGINE=InnoDB;
INSERT INTO equipments_brand_model (brand_name, model_name) VALUES ('carrier', '42LUCAU09515LC');
INSERT INTO equipments_brand_model (brand_name, model_name) VALUES ('hitachi', 'RKPQ10B');

CREATE TABLE equipments_capacity_type (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  CONSTRAINT pk_id PRIMARY KEY (id)
) ENGINE=InnoDB;
INSERT INTO equipments_capacity_type (name) VALUES ('btu');
INSERT INTO equipments_capacity_type (name) VALUES ('tr');
INSERT INTO equipments_capacity_type (name) VALUES ('m3');

CREATE TABLE work_time (
  id int NOT NULL AUTO_INCREMENT,
  week_day enum('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday') NOT NULL,
  work_from time NOT NULL,
  work_to time NOT NULL,
  user_id int NOT NULL,
  CONSTRAINT pk_id PRIMARY KEY (id),
  CONSTRAINT uc_users_work_time UNIQUE (user_id, week_day, work_from, work_to),
  CONSTRAINT fk_users_working_time_user_id_users_id FOREIGN KEY (user_id) REFERENCES users (id)
) ENGINE=InnoDB;

CREATE TABLE maintenance_plans (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  isolated boolean DEFAULT false,
  company_id int NOT NULL,
  CONSTRAINT pk_id PRIMARY KEY (id),
  CONSTRAINT fk_company_id FOREIGN KEY (company_id) REFERENCES companies (id)
) ENGINE=InnoDB;

CREATE TABLE maintenance_plans_activities (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  frequency enum('daily', 'weekly', 'monthly', 'bimonthly', 'quarterly', 'biannual', 'annual') NOT NULL,
  time int NOT NULL,
  maintenance_plan_id int NOT NULL,
  CONSTRAINT pk_id PRIMARY KEY (id),
  CONSTRAINT fk_mpa_id_m_p_id FOREIGN KEY (maintenance_plan_id) REFERENCES maintenance_plans (id)
) ENGINE=InnoDB;

CREATE TABLE maintenance_plans_activities_checklists (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  min_value double,
  max_value double,
  done boolean NOT NULL,
  maintenance_plan_activity_id int NOT NULL,
  CONSTRAINT pk_id PRIMARY KEY (id),
  CONSTRAINT fk_mpac_mpa_id_mpa_id FOREIGN KEY (maintenance_plan_activity_id) REFERENCES maintenance_plans_activities (id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE equipments (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(100),
  equipment_system_type_id int NOT NULL,
  equipment_type_id int NOT NULL,
  capacity_type_id int NOT NULL,
  capacity_value int NOT NULL,
  equipment_brand_model_id int NOT NULL,
  CONSTRAINT pk_id PRIMARY KEY (id),
  CONSTRAINT fk_equipments_equipment_system_type_id_equipments_system_type_id FOREIGN KEY (equipment_system_type_id) REFERENCES equipments_system_type (id),
  CONSTRAINT fk_equipments_equipment_type_id_equipments_type_id FOREIGN KEY (equipment_type_id) REFERENCES equipments_type (id),
  CONSTRAINT fk_equipments_capacity_type_id_equipments_capacity_type_id FOREIGN KEY (capacity_type_id) REFERENCES equipments_capacity_type (id),
  CONSTRAINT fk_equipments_equipment_brand_model_id_equipments_brand_model_id FOREIGN KEY (equipment_brand_model_id) REFERENCES equipments_brand_model (id)
) ENGINE=InnoDB;

CREATE TABLE equipments_physical (
  id int NOT NULL AUTO_INCREMENT,
  serial_number varchar(100) NOT NULL,
  tag varchar(100) NOT NULL,
  equipment_id int NOT NULL,
  enviroment_id int NOT NULL,
  maintenance_plan_id int NOT NULL,
  CONSTRAINT pk_id PRIMARY KEY (id),
  CONSTRAINT fk_equipments_physical_equipment_id_equipments_id FOREIGN KEY (equipment_id) REFERENCES equipments (id),
  CONSTRAINT fk_equipments_physical_enviroments_id_enviroments_id FOREIGN KEY (enviroment_id) REFERENCES enviroments (id),
  CONSTRAINT fk_ep_mp_id_mp_id FOREIGN KEY (maintenance_plan_id) REFERENCES maintenance_plans (id)
) ENGINE=InnoDB;

CREATE TABLE schedules (
  id int NOT NULL AUTO_INCREMENT,
  CONSTRAINT pk_id PRIMARY KEY (id)
) ENGINE=InnoDB;
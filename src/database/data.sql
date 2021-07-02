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

CREATE TABLE system_types (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  CONSTRAINT pk_id PRIMARY KEY (id)
) ENGINE=InnoDB;
INSERT INTO system_types (name) VALUES ('refrigeration');
INSERT INTO system_types (name) VALUES ('airconditioning');
INSERT INTO system_types (name) VALUES ('heating');
INSERT INTO system_types (name) VALUES ('ventilation');

CREATE TABLE equipment_types (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  CONSTRAINT pk_id PRIMARY KEY (id)
) ENGINE=InnoDB;
INSERT INTO equipment_types (name) VALUES ('split');
INSERT INTO equipment_types (name) VALUES ('split_hidronico_piso_teto');
INSERT INTO equipment_types (name) VALUES ('split');
INSERT INTO equipment_types (name) VALUES ('split_hidronico_piso_teto');
INSERT INTO equipment_types (name) VALUES ('split_hidronico');
INSERT INTO equipment_types (name) VALUES ('split_k7');
INSERT INTO equipment_types (name) VALUES ('fancolete_corredores');
INSERT INTO equipment_types (name) VALUES ('fancolete_teto_embutido');
INSERT INTO equipment_types (name) VALUES ('fancoil_casa_maquinas');
INSERT INTO equipment_types (name) VALUES ('camaras_frias');
INSERT INTO equipment_types (name) VALUES ('chiller');
INSERT INTO equipment_types (name) VALUES ('fancoil');
INSERT INTO equipment_types (name) VALUES ('bebedouro');
INSERT INTO equipment_types (name) VALUES ('vrf');
INSERT INTO equipment_types (name) VALUES ('vrf_split');
INSERT INTO equipment_types (name) VALUES ('vrf_condensadora');
INSERT INTO equipment_types (name) VALUES ('vrf_duto');

CREATE TABLE brand_models (
  id int NOT NULL AUTO_INCREMENT,
  brand_name varchar(100) NOT NULL,
  model_name varchar(100) NOT NULL,
  CONSTRAINT pk_id PRIMARY KEY (id),
  CONSTRAINT uc_brand_model_model UNIQUE (model_name),
  CONSTRAINT uc_brand_model_brand_model UNIQUE (brand_name, model_name)
) ENGINE=InnoDB;
INSERT INTO brand_models (brand_name, model_name) VALUES ('carrier', '42LUCAU09515LC');
INSERT INTO brand_models (brand_name, model_name) VALUES ('hitachi', 'RKPQ10B');

CREATE TABLE capacity_types (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  CONSTRAINT pk_id PRIMARY KEY (id)
) ENGINE=InnoDB;
INSERT INTO capacity_types (name) VALUES ('btu');
INSERT INTO capacity_types (name) VALUES ('tr');
INSERT INTO capacity_types (name) VALUES ('m3');

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
  company_id int NOT NULL,
  CONSTRAINT pk_id PRIMARY KEY (id),
  CONSTRAINT fk_company_id FOREIGN KEY (company_id) REFERENCES companies (id)
) ENGINE=InnoDB;

CREATE TABLE maintenance_plans_activities (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  frequency enum('daily', 'weekly', 'monthly', 'bimonthly', 'quarterly', 'biannual', 'annual') NOT NULL,
  time int NOT NULL,
  isolated boolean DEFAULT false,
  maintenance_plan_id int NOT NULL,
  CONSTRAINT pk_id PRIMARY KEY (id),
  CONSTRAINT fk_mpa_id_m_p_id FOREIGN KEY (maintenance_plan_id) REFERENCES maintenance_plans (id)
) ENGINE=InnoDB;

CREATE TABLE maintenance_plans_activities_checklists (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  value_type varchar(20),
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
  serial_number varchar(100) NOT NULL,
  tag varchar(100) NOT NULL,
  system_type_id int NOT NULL,
  equipment_type_id int NOT NULL,
  capacity_type_id int NOT NULL,
  capacity_value int NOT NULL,
  brand_model_id int NOT NULL,
  maintenance_plan_id int,
  enviroment_id int NOT NULL,
  CONSTRAINT pk_id PRIMARY KEY (id),
  CONSTRAINT fk_e_st_st_id FOREIGN KEY (system_type_id) REFERENCES system_type (id),
  CONSTRAINT fk_e_et_id_et_id FOREIGN KEY (equipment_type_id) REFERENCES equipments_type (id),
  CONSTRAINT fk_e_ct_id_ct_id FOREIGN KEY (capacity_type_id) REFERENCES capacity_type (id),
  CONSTRAINT fk_e_bm_id_bm_id FOREIGN KEY (brand_model_id) REFERENCES brand_model (id),
  CONSTRAINT fk_e_mp_id_m_id FOREIGN KEY (maintenance_plan_id) REFERENCES maintenance_plans (id),
  CONSTRAINT fk_e_env_id_env_id FOREIGN KEY (enviroment_id) REFERENCES enviroments (id)
) ENGINE=InnoDB;

CREATE TABLE maintenance_plans_requests (
  id int NOT NULL AUTO_INCREMENT,
  requester_cpf char(11) NOT NULL,
  requester_firstname varchar(50) NOT NULL,
  requester_lastname varchar(50) NOT NULL,
  description varchar(250) NOT NULL,
  approved_by_client boolean DEFAULT false,
  approved_by_client_at timestamp,
  approved_by_manager boolean DEFAULT false,
  approved_by_manager_at timestamp,
  equipment_id int NOT NULL,
  CONSTRAINT pk_id PRIMARY KEY (id),
  CONSTRAINT fk_mpr_id_e_id FOREIGN KEY (equipment_id) REFERENCES equipments (id)
) ENGINE=InnoDB;

CREATE TABLE schedules (
  id int NOT NULL AUTO_INCREMENT,
  CONSTRAINT pk_id PRIMARY KEY (id)
) ENGINE=InnoDB;
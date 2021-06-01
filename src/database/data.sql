CREATE DATABASE IF NOT EXISTS `gestair` DEFAULT CHARACTER SET latin1;

USE `gestair`;

DROP TABLE IF EXISTS `companies`;
CREATE TABLE `companies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB ;
LOCK TABLES `companies` WRITE;
INSERT INTO `companies` VALUES (1,'Test Company');
UNLOCK TABLES;

DROP TABLE IF EXISTS `customers`;
CREATE TABLE `customers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `company_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_customers_company_id_companies_id` (`company_id`),
  CONSTRAINT `fk_customers_company_id_companies_id` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`)
) ENGINE=InnoDB;
LOCK TABLES `customers` WRITE;
INSERT INTO `customers` VALUES (1,'Test Customer',1);
UNLOCK TABLES;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) CHARACTER SET latin1 NOT NULL,
  `password_hash` char(60) CHARACTER SET latin1 NOT NULL,
  `role` enum('gestair_admin') DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB;
LOCK TABLES `users` WRITE;
INSERT INTO `users` VALUES (1,'admin','$2y$08$h.mktfdf5S2ne.4VW1oUuOywuVKWK.kpcs69oVaUDYeLcOXT1lPru','gestair_admin');
UNLOCK TABLES;
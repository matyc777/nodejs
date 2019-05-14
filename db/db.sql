-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema delivery_service
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema delivery_service
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `delivery_service` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `delivery_service` ;

-- -----------------------------------------------------
-- Table `delivery_service`.`admin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delivery_service`.`admin` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `login` VARCHAR(45) NULL DEFAULT NULL,
  `password` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `delivery_service`.`client`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delivery_service`.`client` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `login` VARCHAR(45) NULL DEFAULT NULL,
  `password` INT(11) NULL DEFAULT NULL,
  `phone_number` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `delivery_service`.`courier`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delivery_service`.`courier` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `login` VARCHAR(45) NULL DEFAULT NULL,
  `password` INT(11) NULL DEFAULT NULL,
  `phone_number` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `delivery_service`.`request`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delivery_service`.`request` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `from` VARCHAR(45) NULL DEFAULT NULL,
  `to` VARCHAR(45) NULL DEFAULT NULL,
  `weight` INT(11) NULL DEFAULT NULL,
  `deadline` DATE NULL DEFAULT NULL,
  `client` INT(11) NULL DEFAULT NULL,
  `courier` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `client_idx` (`client` ASC) VISIBLE,
  INDEX `courier_idx` (`courier` ASC) VISIBLE,
  CONSTRAINT `client`
    FOREIGN KEY (`client`)
    REFERENCES `delivery_service`.`client` (`id`),
  CONSTRAINT `courier`
    FOREIGN KEY (`courier`)
    REFERENCES `delivery_service`.`courier` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

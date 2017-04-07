DROP SCHEMA IF EXISTS `BudgetManager`;
CREATE SCHEMA `BudgetManager`;

USE `BudgetManager`;

DROP TABLE IF EXISTS `IncomeSource`;
CREATE TABLE `IncomeSource`
(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` NVARCHAR(50) NOT NULL,
    `annualAmount` INT NOT NULL
);

DROP TABLE IF EXISTS `TaxExemption`;
CREATE TABLE `TaxExemption`
(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` NVARCHAR(50) NOT NULL,
    `amount` INT NOT NULL
);

DROP TABLE IF EXISTS `TaxDeduction`;
CREATE TABLE `TaxDeduction`
(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` NVARCHAR(50) NOT NULL,
    `amount` INT NOT NULL
);

DROP TABLE IF EXISTS `TaxCredit`;
CREATE TABLE `TaxCredit`
(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` NVARCHAR(50) NOT NULL,
    `amount` INT NOT NULL
);

DROP TABLE IF EXISTS `BudgetCategory`;
CREATE TABLE `BudgetCategory`
(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` NVARCHAR(50) NOT NULL
);

DROP TABLE IF EXISTS `BudgetItem`;
CREATE TABLE `BudgetItem`
(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `budgetCategoryId` INT NOT NULL,
    `name` NVARCHAR(50) NOT NULL,
    `amount` INT NOT NULL,
    `isMonthlyPayment` TINYINT NOT NULL,
    CONSTRAINT `fkBudgetCategoryId`
        FOREIGN KEY (`budgetCategoryId`) REFERENCES `BudgetCategory` (`id`)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

DROP TABLE IF EXISTS `Transaction`;
CREATE TABLE `Transaction`
(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `date` DATE NOT NULL,
    `name` NVARCHAR(50) NOT NULL,
    `budgetItemId` INT NOT NULL,
    `amount` INT NOT NULL,
    CONSTRAINT `fkTransactionsBudgetItemId`
        FOREIGN KEY (`budgetItemId`) REFERENCES `BudgetItem` (`id`)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);


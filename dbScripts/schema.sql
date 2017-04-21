DROP SCHEMA IF EXISTS `BudgetManager`;
CREATE SCHEMA `BudgetManager`;

USE `BudgetManager`;

DROP TABLE IF EXISTS `User`;
CREATE TABLE `User`
(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `emailAddress` NVARCHAR(50) UNIQUE NOT NULL,
    `passwordSalt` VARCHAR(36) NOT NULL,
    `passwordHash` VARCHAR(44) NOT NULL
);

DROP TABLE IF EXISTS `IncomeSource`;
CREATE TABLE `IncomeSource`
(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `userId` INT NOT NULL,
    `name` NVARCHAR(50) NOT NULL,
    `annualAmount` INT NOT NULL,
    CONSTRAINT `fkIncomeSourceUserId`
        FOREIGN KEY (`userId`) REFERENCES `User` (`id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

DROP TABLE IF EXISTS `TaxExemption`;
CREATE TABLE `TaxExemption`
(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `userId` INT NOT NULL,
    `name` NVARCHAR(50) NOT NULL,
    `amount` INT NOT NULL,
    CONSTRAINT `fkTaxExemptionUserId`
        FOREIGN KEY (`userId`) REFERENCES `User` (`id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

DROP TABLE IF EXISTS `TaxDeduction`;
CREATE TABLE `TaxDeduction`
(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `userId` INT NOT NULL,
    `name` NVARCHAR(50) NOT NULL,
    `amount` INT NOT NULL,
    CONSTRAINT `fkTaxDeductionUserId`
        FOREIGN KEY (`userId`) REFERENCES `User` (`id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

DROP TABLE IF EXISTS `TaxCredit`;
CREATE TABLE `TaxCredit`
(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `userId` INT NOT NULL,
    `name` NVARCHAR(50) NOT NULL,
    `amount` INT NOT NULL,
    CONSTRAINT `fkTaxCreditUserId`
        FOREIGN KEY (`userId`) REFERENCES `User` (`id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

DROP TABLE IF EXISTS `BudgetCategory`;
CREATE TABLE `BudgetCategory`
(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `userId` INT NOT NULL,
    `name` NVARCHAR(50) NOT NULL,
    CONSTRAINT `fkBudgetCategoryUserId`
        FOREIGN KEY (`userId`) REFERENCES `User` (`id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

DROP TABLE IF EXISTS `BudgetItem`;
CREATE TABLE `BudgetItem`
(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `userId` INT NOT NULL,
    `budgetCategoryId` INT NOT NULL,
    `name` NVARCHAR(50) NOT NULL,
    `amount` INT NOT NULL,
    CONSTRAINT `fkBudgetCategoryId`
        FOREIGN KEY (`budgetCategoryId`) REFERENCES `BudgetCategory` (`id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT `fkBudgetItemUserId`
        FOREIGN KEY (`userId`) REFERENCES `User` (`id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

DROP TABLE IF EXISTS `Transaction`;
CREATE TABLE `Transaction`
(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `userId` INT NOT NULL,
    `date` DATE NOT NULL,
    `name` NVARCHAR(50) NOT NULL,
    `budgetItemId` INT NOT NULL,
    `amount` DECIMAL(13,2) NOT NULL,
    CONSTRAINT `fkTransactionsBudgetItemId`
        FOREIGN KEY (`budgetItemId`) REFERENCES `BudgetItem` (`id`)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
    CONSTRAINT `fkTransactionUserId`
        FOREIGN KEY (`userId`) REFERENCES `User` (`id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
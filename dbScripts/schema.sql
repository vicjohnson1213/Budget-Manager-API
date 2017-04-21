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

DROP TABLE IF EXISTS `FederalTaxBracket`;
CREATE TABLE `FederalTaxBracket`
(
    `min` INT,
    `max` INT,
    `rate` INT,
    `base` INT
);

INSERT INTO `FederalTaxBracket` (`min`, `max`, `rate`, `base`) VALUES (0, 9325, 10, 0);
INSERT INTO `FederalTaxBracket` (`min`, `max`, `rate`, `base`) VALUES (9325, 37950, 15, 932);
INSERT INTO `FederalTaxBracket` (`min`, `max`, `rate`, `base`) VALUES (37950, 91900, 25, 5226);
INSERT INTO `FederalTaxBracket` (`min`, `max`, `rate`, `base`) VALUES (91900, 191650, 28, 18713);
INSERT INTO `FederalTaxBracket` (`min`, `max`, `rate`, `base`) VALUES (191650, 461700, 33, 46643);
INSERT INTO `FederalTaxBracket` (`min`, `max`, `rate`, `base`) VALUES (461700, 418400, 35, 120910);
INSERT INTO `FederalTaxBracket` (`min`, `max`, `rate`, `base`) VALUES (418400, NULL, 40, 121505);

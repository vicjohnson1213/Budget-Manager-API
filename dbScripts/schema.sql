CREATE SCHEMA `BudgetManager`;

USE `BudgetManager`;

CREATE TABLE `IncomeSource`
(
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` NVARCHAR(50) NOT NULL,
    `annualAmount` INT NOT NULL
);

CREATE TABLE `TaxExemption`
(
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` NVARCHAR(50) NOT NULL,
    `amount` INT NOT NULL
);

CREATE TABLE `TaxDeduction`
(
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` NVARCHAR(50) NOT NULL,
    `amount` INT NOT NULL
);

CREATE TABLE `TaxCredit`
(
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` NVARCHAR(50) NOT NULL,
    `amount` INT NOT NULL
);

CREATE TABLE `ExpenseCategory`
(
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `parentId` INT NULL DEFAULT NULL,
    `name` NVARCHAR(50) NOT NULL,
	CONSTRAINT `fkExpenseCategoryParentId`
		FOREIGN KEY (`parentId`) REFERENCES `ExpenseCategory` (`id`)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

CREATE TABLE `Transaction`
(
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `date` DATE NOT NULL,
    `name` NVARCHAR(50) NOT NULL,
	`categoryId` INT NOT NULL,
    `amount` INT NOT NULL,
	CONSTRAINT `fkTransactionsCategoryId`
		FOREIGN KEY (`categoryId`) REFERENCES `ExpenseCategory` (`id`)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

CREATE TABLE `Budget`
(
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `categoryId` INT NOT NULL,
    `amount` INT NOT NULL,
	CONSTRAINT `fkBudgetCategoryId`
		FOREIGN KEY (`categoryId`) REFERENCES `ExpenseCategory` (`id`)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);
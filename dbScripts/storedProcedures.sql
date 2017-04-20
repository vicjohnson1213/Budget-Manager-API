/* BEGIN BUDGET CATEGORIES */

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spBudgetCategoryGetAll`;;
CREATE PROCEDURE `spBudgetCategoryGetAll`
(
    IN `userId` INT
)
BEGIN
    SELECT * FROM `BudgetCategory` bc
        WHERE bc.`userId` = userId
        ORDER BY bc.`name` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spBudgetCategoryGetById`;;
CREATE PROCEDURE `spBudgetCategoryGetById`
(
    IN `userId` INT,
    IN `budgetCategoryId` INT
)
BEGIN
    SELECT * FROM `BudgetCategory` bc
        WHERE bc.`userId` = userId AND
            bc.`id` = budgetCategoryId;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spBudgetCategoryCreate`;;
CREATE PROCEDURE `spBudgetCategoryCreate`
(
    IN `userId` INT,
    IN `name` NVARCHAR(50)
)
BEGIN
    INSERT INTO `BudgetCategory`
    (
        `userId`,
        `name`
    )
    VALUES
    (
        `userId`,
        `name`
    );

    SELECT * FROM `BudgetCategory` bc
        WHERE bc.`userId` = userId
        ORDER BY bc.`name` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spBudgetCategoryUpdate`;;
CREATE PROCEDURE `spBudgetCategoryUpdate`
(
    IN `userId` INT,
    IN `budgetCategoryId` INT,
    IN `name` NVARCHAR(50)
)
BEGIN
    UPDATE `BudgetCategory` bc SET
        bc.`name` = name
    WHERE bc.`userId` = userId AND
        bc.`id` = budgetCategoryId;

    SELECT * FROM `BudgetCategory` bc
        WHERE bc.`userId` = userId
        ORDER BY bc.`name` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spBudgetCategoryDelete`;;
CREATE PROCEDURE `spBudgetCategoryDelete`
(
    IN `userId` INT,
    IN `budgetCategoryId` INT
)
BEGIN
    DELETE bc FROM `BudgetCategory` bc
        WHERE bc.`userId` = userId AND
            bc.`id` = budgetCategoryId;

    SELECT * FROM `BudgetCategory` bc
        WHERE bc.`userId` = userId
        ORDER BY bc.`name` ASC;
END;;
DELIMITER ;

/* END BUDGET CATEGORIES */


/* BEGIN BUDGET ITEMS */

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spBudgetItemGetAll`;;
CREATE PROCEDURE `spBudgetItemGetAll`
(
    IN `userId` INT
)
BEGIN
    SELECT * FROM `BudgetItem` bi
        WHERE bi.`userId` = userId
        ORDER BY bi.`name` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spBudgetItemGetById`;;
CREATE PROCEDURE `spBudgetItemGetById`
(
    IN `userId` INT,
    IN `budgetItemId` INT
)
BEGIN
    SELECT * FROM `BudgetItem` bi
        WHERE bi.`userId` = userId AND
            bi.`id` = `budgetItemId`;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spBudgetItemCreate`;;
CREATE PROCEDURE `spBudgetItemCreate`
(
    IN `userId` INT,
    IN `budgetCategoryId` INT,
    IN `name` NVARCHAR(50),
    IN `amount` INT
)
BEGIN
    INSERT INTO `BudgetItem`
    (
        `userId`,
        `budgetCategoryId`,
        `name`,
        `amount`
    )
    VALUES
    (
        `userId`,
        `budgetCategoryId`,
        `name`,
        `amount`
    );

    SELECT * FROM `BudgetItem` bi
        WHERE bi.`userId` = userId
        ORDER BY bi.`name` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spBudgetItemUpdate`;;
CREATE PROCEDURE `spBudgetItemUpdate`
(
    IN `userId` INT,
    IN `budgetItemId` INT,
    IN `budgetCategoryId` INT,
    IN `name` NVARCHAR(50),
    IN `amount` INT
)
BEGIN
    UPDATE `BudgetItem` bi SET
        bi.`budgetCategoryId` = `budgetCategoryId`,
        bi.`name` = `name`,
        bi.`amount` = `amount`
    WHERE bi.`userId` = userId AND
        bi.`id` = `budgetItemId`;

    SELECT * FROM `BudgetItem` bi
        WHERE bi.`userId` = userId
        ORDER BY bi.`name` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spBudgetItemDelete`;;
CREATE PROCEDURE `spBudgetItemDelete`
(
    IN `userId` INT,
    IN `budgetItemId` INT
)
BEGIN
    DELETE bi FROM `BudgetItem` bi
        WHERE bi.`userId` = userId AND
            bi.`id` = budgetItemId;

    SELECT * FROM `BudgetItem` bi
        WHERE bi.`userId` = userId
        ORDER BY bi.`name` ASC;
END;;
DELIMITER ;

/* END BUDGET ITEMS */


/* BEGIN INCOME SOURCES */

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spIncomeSourceGetAll`;;
CREATE PROCEDURE `spIncomeSourceGetAll`
(
    IN `userId` INT
)
BEGIN
    SELECT * FROM `IncomeSource` ins
        WHERE ins.`userId` = userId
        ORDER BY ins.`name` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spIncomeSourceGetById`;;
CREATE PROCEDURE `spIncomeSourceGetById`
(
    IN `userId` INT,
    IN `incomeSourceId` INT
)
BEGIN
    SELECT * FROM `IncomeSource` ins
        WHERE ins.`userId` = userId AND
            ins.`id` = incomeSourceId;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spIncomeSourceCreate`;;
CREATE PROCEDURE `spIncomeSourceCreate`
(
    IN `userId` INT,
    IN `name` NVARCHAR(50),
    IN `annualAmount` INT
)
BEGIN
    INSERT INTO `IncomeSource`
    (
        `userId`,
        `name`,
        `annualAmount`
    )
    VALUES
    (
        `userId`,
        `name`,
        `annualAmount`
    );

    SELECT * FROM `IncomeSource` ins
        WHERE ins.`userId` = userId
        ORDER BY ins.`name` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spIncomeSourceUpdate`;;
CREATE PROCEDURE `spIncomeSourceUpdate`
(
    IN `userId` INT,
    IN `incomeSourceId` INT,
    IN `name` NVARCHAR(50),
    IN `annualAmount` INT
)
BEGIN
    UPDATE `IncomeSource` ins SET
        ins.`name` = `name`,
        ins.`annualAmount` = annualAmount
    WHERE ins.`userId` = userId AND
        ins.`id` = incomeSourceId;

    SELECT * FROM `IncomeSource` ins
        WHERE ins.`userId` = userId
        ORDER BY ins.`name` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spIncomeSourceDelete`;;
CREATE PROCEDURE `spIncomeSourceDelete`
(
    IN `userId` INT,
    IN `incomeSourceId` INT
)
BEGIN
    DELETE ins FROM `IncomeSource` ins
        WHERE ins.`userId` = userId AND
            ins.`id` = incomeSourceId;

    SELECT * FROM `IncomeSource` ins
        WHERE ins.`userId` = userId
        ORDER BY ins.`name` ASC;
END;;
DELIMITER ;

/* END INCOME SOURCES */


/* BEGIN TAX CREDITS */

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTaxCreditGetAll`;;
CREATE PROCEDURE `spTaxCreditGetAll`
(
    IN `userId` INT
)
BEGIN
    SELECT * FROM `TaxCredit` tc
        WHERE tc.`userId` = userId
        ORDER BY tc.`name` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTaxCreditGetById`;;
CREATE PROCEDURE `spTaxCreditGetById`
(
    IN `userId` INT,
    IN `taxCreditId` INT
)
BEGIN
    SELECT * FROM `TaxCredit` tc
        WHERE tc.`userId` = userId AND
            tc.`id` = taxCreditId;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTaxCreditCreate`;;
CREATE PROCEDURE `spTaxCreditCreate`
(
    IN `userId` INT,
    IN `name` NVARCHAR(50),
    IN `amount` INT
)
BEGIN
    INSERT INTO `TaxCredit`
    (
        `userId`,
        `name`,
        `amount`
    )
    VALUES
    (
        `userId`,
        `name`,
        `amount`
    );

    SELECT * FROM `TaxCredit` tc
        WHERE tc.`userId` = userId
        ORDER BY tc.`name` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTaxCreditUpdate`;;
CREATE PROCEDURE `spTaxCreditUpdate`
(
    IN `userId` INT,
    IN `taxCreditId` INT,
    IN `name` NVARCHAR(50),
    IN `amount` INT
)
BEGIN
    UPDATE `TaxCredit` tc SET
        tc.`name` = `name`,
        tc.`amount` = amount
    WHERE tc.`userId` = userId AND
        tc.`id` = taxCreditId;

    SELECT * FROM `TaxCredit` tc
        WHERE tc.`userId` = userId
        ORDER BY tc.`name` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTaxCreditDelete`;;
CREATE PROCEDURE `spTaxCreditDelete`
(
    IN `userId` INT,
    IN `taxCreditId` INT
)
BEGIN
    DELETE tc FROM `TaxCredit` tc
        WHERE tc.`userId` = userId AND
            tc.`id` = taxCreditId;

    SELECT * FROM `TaxCredit` tc
        WHERE tc.`userId` = userId
        ORDER BY tc.`name` ASC;
END;;
DELIMITER ;

/* END TAX CREDITS */


/* BEGIN TAX DEDUCTIONS */

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTaxDeductionGetAll`;;
CREATE PROCEDURE `spTaxDeductionGetAll`
(
    IN `userId` INT
)
BEGIN
    SELECT * FROM `TaxDeduction` td
        WHERE td.`userId` = userId
        ORDER BY td.`name` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTaxDeductionGetById`;;
CREATE PROCEDURE `spTaxDeductionGetById`
(
    IN `userId` INT,
    IN `taxDeductionId` INT
)
BEGIN
    SELECT * FROM `TaxDeduction` td
        WHERE td.`userId` = userId AND
            td.`id` = taxDeductionId;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTaxDeductionCreate`;;
CREATE PROCEDURE `spTaxDeductionCreate`
(
    IN `userId` INT,
    IN `name` NVARCHAR(50),
    IN `amount` INT
)
BEGIN
    INSERT INTO `TaxDeduction`
    (
        `userId`,
        `name`,
        `amount`
    )
    VALUES
    (
        `userId`,
        `name`,
        `amount`
    );

    SELECT * FROM `TaxDeduction` td
        WHERE td.`userId` = userId
        ORDER BY td.`name` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTaxDeductionUpdate`;;
CREATE PROCEDURE `spTaxDeductionUpdate`
(
    IN `userId` INT,
    IN `taxDeductionId` INT,
    IN `name` NVARCHAR(50),
    IN `amount` INT
)
BEGIN
    UPDATE `TaxDeduction` td SET
        td.`name` = `name`,
        td.`amount` = amount
    WHERE td.`userId` = userId AND
        td.`id` = taxDeductionId;

    SELECT * FROM `TaxDeduction` td
        WHERE td.`userId` = userId
        ORDER BY td.`name` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTaxDeductionDelete`;;
CREATE PROCEDURE `spTaxDeductionDelete`
(
    IN `userId` INT,
    IN `taxDeductionId` INT
)
BEGIN
    DELETE td FROM `TaxDeduction` td
        WHERE td.`userId` = userId AND
            td.`id` = taxDeductionId;

    SELECT * FROM `TaxDeduction` td
        WHERE td.`userId` = userId
        ORDER BY td.`name` ASC;
END;;
DELIMITER ;

/* END TAX DEDUCTIONS */


/* BEGIN TAX EXEMPTIONS */

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTaxExemptionGetAll`;;
CREATE PROCEDURE `spTaxExemptionGetAll`
(
    IN `userId` INT
)
BEGIN
    SELECT * FROM `TaxExemption` te
        WHERE te.`userId` = userId
        ORDER BY te.`name` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTaxExemptionGetById`;;
CREATE PROCEDURE `spTaxExemptionGetById`
(
    IN `userId` INT,
    IN `taxExemptionId` INT
)
BEGIN
    SELECT * FROM `TaxExemption` te
        WHERE te.`userId` = userId AND
            te.`id` = taxExemptionId;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTaxExemptionCreate`;;
CREATE PROCEDURE `spTaxExemptionCreate`
(
    IN `userId` INT,
    IN `name` NVARCHAR(50),
    IN `amount` INT
)
BEGIN
    INSERT INTO `TaxExemption`
    (
        `userId`,
        `name`,
        `amount`
    )
    VALUES
    (
        `userId`,
        `name`,
        `amount`
    );

    SELECT * FROM `TaxExemption` te
        WHERE te.`userId` = userId
        ORDER BY te.`name` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTaxExemptionUpdate`;;
CREATE PROCEDURE `spTaxExemptionUpdate`
(
    IN `userId` INT,
    IN `taxExemptionId` INT,
    IN `name` NVARCHAR(50),
    IN `amount` INT
)
BEGIN
    UPDATE `TaxExemption` te SET
        te.`name` = `name`,
        te.`amount` = amount
    WHERE te.`userId` = userId AND
        te.`id` = taxExemptionId;

    SELECT * FROM `TaxExemption` te
        WHERE te.`userId` = userId
        ORDER BY te.`name` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTaxExemptionDelete`;;
CREATE PROCEDURE `spTaxExemptionDelete`
(
    IN `userId` INT,
    IN `taxExemptionId` INT
)
BEGIN
    DELETE te FROM `TaxExemption` te
        WHERE te.`userId` = userId AND
            te.`id` = taxExemptionId;

    SELECT * FROM `TaxExemption` te
        WHERE te.`userId` = userId
        ORDER BY te.`name` ASC;
END;;
DELIMITER ;

/* END TAX EXEMPTIONS */


/* BEGIN TRANSACTIONS */

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTransactionGetMonth`;;
CREATE PROCEDURE `spTransactionGetMonth`
(
    IN `userId` INT,
    IN `searchDate` DATE
)
BEGIN
    SELECT * FROM `Transaction` t
        WHERE t.`userId` = userId AND
            YEAR(t.`date`) = YEAR(`searchDate`) AND
            MONTH(t.`date`) = MONTH(`searchDate`)
        ORDER BY t.`date` DESC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTransactionGetMonthSummary`;;
CREATE PROCEDURE `spTransactionGetMonthSummary`
(
    IN `userId` INT,
    IN `searchDate` DATE
)
BEGIN
    SELECT
        t.id,
        t.userId,
        t.date,
        t.`name`,
        t.amount,
        t.budgetItemId,
        bi.name as budgetItemName,
        bc.id as budgetCategoryId,
        bc.name as budgetCategoryName
    FROM `Transaction` t
        INNER JOIN `BudgetItem` bi
            ON t.budgetItemId = bi.id
            INNER JOIN `BudgetCategory` bc
                ON bi.budgetCategoryId = bc.id
    WHERE t.userId = userId AND 
        YEAR(t.date) = YEAR(`searchDate`) AND
        MONTH(t.date) = MONTH(`searchDate`)
    ORDER BY `date` DESC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTransactionGetById`;;
CREATE PROCEDURE `spTransactionGetById`
(
    IN `userId` INT,
    IN `transactionId` INT
)
BEGIN
    SELECT * FROM `Transaction` t
        WHERE t.`userId` = userId AND
            t.`id` = transactionId;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTransactionCreate`;;
CREATE PROCEDURE `spTransactionCreate`
(
    IN `userId` INT,
    IN `date` DATE,
    IN `name` NVARCHAR(50),
    IN `budgetItemId` INT,
    IN `amount` DECIMAL(13,2)
)
BEGIN
    INSERT INTO `Transaction`
    (
        `userId`,
        `date`,
        `name`,
        `budgetItemId`,
        `amount`
    )
    VALUES
    (
        `userId`,
        `date`,
        `name`,
        `budgetItemId`,
        `amount`
    );

    SELECT * FROM `Transaction` t
        WHERE t.`userId` = userId
        ORDER BY t.`date` DESC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTransactionUpdate`;;
CREATE PROCEDURE `spTransactionUpdate`
(
    IN `userId` INT,
    IN `transactionId` INT,
    IN `date` DATE,
    IN `name` NVARCHAR(50),
    IN `budgetItemId` INT,
    IN `amount` DECIMAL(13,2)
)
BEGIN
    UPDATE `Transaction` t SET
        t.`date` = `date`,
        t.`name` = `name`,
        t.`budgetItemId` = budgetItemId,
        t.`amount` = amount
    WHERE t.`userId` = userId AND
        t.`id` = transactionId;

    SELECT * FROM `Transaction` t
        WHERE t.`userId` = userId
        ORDER BY t.`date` DESC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTransactionDelete`;;
CREATE PROCEDURE `spTransactionDelete`
(
    IN `userId` INT,
    IN `transactionId` INT
)
BEGIN
    DELETE t FROM `Transaction` t
        WHERE t.`userId` = userID AND 
            t.`id` = transactionId;

    SELECT * FROM `Transaction` t
        WHERE t.`userId` = userId
        ORDER BY t.`date` DESC;
END;;
DELIMITER ;

/* END TRANSACTIONS */


/* BEGIN USERS */

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spUserCreate`;;
CREATE PROCEDURE `spUserCreate` 
(
    IN `emailAddress` NVARCHAR(50),
    IN `passwordSalt` VARCHAR(36),
    IN `passwordHash` VARCHAR(44)
)
BEGIN
    INSERT INTO `User`
    (
        `emailAddress`,
        `passwordSalt`,
        `passwordHash`
    )
    VALUES
    (
        emailAddress,
        passwordSalt,
        passwordHash
    );
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spUserGet`;;
CREATE PROCEDURE `spUserGet`
(
    IN `userId` INT
)
BEGIN
    SELECT * FROM `User` u
        WHERE u.`id` = userId;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spUserGetByEmail`;;
CREATE PROCEDURE `spUserGetByEmail`
(
    IN `emailAddress` NVARCHAR(50)
)
BEGIN
    SELECT * FROM `User` u
        WHERE u.`emailAddress` = emailAddress;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spUserUpdate`;;
CREATE PROCEDURE `spUserUpdate`
(
    IN `userId` INT,
    IN `emailAddress` NVARCHAR(50)
)
BEGIN
    UPDATE `User` u SET
        u.`emailAddress` = emailAddress
    WHERE u.`id` = userId;

    SELECT * FROM `User` u
        WHERE u.`userId` = userId;
END;;
DELIMITER ;


/* END USERS */
DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTransactionGetMonth`;;
CREATE PROCEDURE `spTransactionGetMonth` (IN `searchDate` DATE)
BEGIN
    SELECT * FROM `Transaction`
    WHERE YEAR(`date`) = YEAR(`searchDate`) AND MONTH(`date`) = MONTH(`searchDate`)
    ORDER BY `date` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTransactionGetMonthSummary`;;
CREATE PROCEDURE `spTransactionGetMonthSummary` (IN `searchDate` DATE)
BEGIN
    SELECT
        t.id,
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
    WHERE YEAR(`searchDate`) AND MONTH(`date`) = MONTH(`searchDate`)
    ORDER BY `date` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTransactionGetById`;;
CREATE PROCEDURE `spTransactionGetById` (IN `transactionId` INT)
BEGIN
    SELECT * FROM `Transaction` WHERE `id` = transactionId;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTransactionCreate`;;
CREATE PROCEDURE `spTransactionCreate` (IN `date` DATE, IN `name` NVARCHAR(50), IN `budgetItemId` INT, IN `amount` DECIMAL(13,2))
BEGIN
    INSERT INTO `Transaction` (`date`, `name`, `budgetItemId`, `amount`) values (`date`, `name`, `budgetItemId`, `amount`);
    SELECT * FROM `Transaction` ORDER BY `date` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTransactionUpdate`;;
CREATE PROCEDURE `spTransactionUpdate` (IN `transactionId` INT, IN `date` DATE, IN `name` NVARCHAR(50), IN `budgetItemId` INT, IN `amount` DECIMAL(13,2))
BEGIN
    UPDATE `Transaction` SET
        `date` = `date`,
        `name` = `name`,
        `budgetItemId` = budgetItemId,
        `amount` = amount
    WHERE `id` = transactionId;
    SELECT * FROM `Transaction` ORDER BY `date` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTransactionDelete`;;
CREATE PROCEDURE `spTransactionDelete` (IN `transactionId` INT)
BEGIN
    DELETE FROM `Transaction` WHERE `id` = transactionId;
    SELECT * FROM `Transaction` ORDER BY `date` ASC;
END;;
DELIMITER ;
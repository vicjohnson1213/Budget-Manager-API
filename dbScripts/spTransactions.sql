DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTransactionGetMonth`;;
CREATE PROCEDURE `spTransactionGetMonth`
(
    IN `userId` INT,
    IN `searchDate` DATE
)
BEGIN
    SELECT * FROM `Transaction`
        WHERE `userId` = userId AND
            YEAR(`date`) = YEAR(`searchDate`) AND
            MONTH(`date`) = MONTH(`searchDate`)
        ORDER BY `date` DESC;
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
    SELECT * FROM `Transaction`
        WHERE `userId` = userId AND `id` = transactionId;
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

    SELECT * FROM `Transaction`
        WHERE `userId` = userId
        ORDER BY `date` DESC;
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
    UPDATE `Transaction` SET
        `date` = `date`,
        `name` = `name`,
        `budgetItemId` = budgetItemId,
        `amount` = amount
    WHERE `userId` = userId AND `id` = transactionId;

    SELECT * FROM `Transaction` ORDER BY `date` DESC;
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
    DELETE FROM `Transaction`
        WHERE `userId` = userID AND `id` = transactionId;

    SELECT * FROM `Transaction`
        WHERE `userId` = userId
        ORDER BY `date` DESC;
END;;
DELIMITER ;
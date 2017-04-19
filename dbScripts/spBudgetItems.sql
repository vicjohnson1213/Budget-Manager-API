DELIMITER ;;
DROP PROCEDURE IF EXISTS `spBudgetItemGetAll`;;
CREATE PROCEDURE `spBudgetItemGetAll`
(
    IN `userId` INT
)
BEGIN
    SELECT * FROM `BudgetItem`
        WHERE `userId` = userId
        ORDER BY `name` ASC;
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
    SELECT * FROM `BudgetItem`
        WHERE `userId` = userId AND
            `id` = `budgetItemId`;
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

    SELECT * FROM `BudgetItem`
        WHERE `userId` = userId
        ORDER BY `name` ASC;
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
    UPDATE `BudgetItem` SET
        `budgetCategoryId` = `budgetCategoryId`,
        `name` = `name`,
        `amount` = `amount`
    WHERE `userId` = userId AND
        `id` = `budgetItemId`;

    SELECT * FROM `BudgetItem`
        WHERE `userId` = userId
        ORDER BY `name` ASC;
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
    DELETE FROM `BudgetItem`
        WHERE `userId` = userId AND
            `id` = budgetItemId;

    SELECT * FROM `BudgetItem`
        WHERE `userId` = userId
        ORDER BY `name` ASC;
END;;
DELIMITER ;
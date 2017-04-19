DELIMITER ;;
DROP PROCEDURE IF EXISTS `spBudgetCategoryGetAll`;;
CREATE PROCEDURE `spBudgetCategoryGetAll`
(
    IN `userId` INT
)
BEGIN
    SELECT * FROM `BudgetCategory`
        WHERE `userId` = userId
        ORDER BY `name` ASC;
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
    SELECT * FROM `BudgetCategory`
        WHERE `userId` = userId AND
            `id` = budgetCategoryId;
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

    SELECT * FROM `BudgetCategory` 
        WHERE `userId` = userId
        ORDER BY `name` ASC;
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
    UPDATE `BudgetCategory` SET
        `name` = name
    WHERE `userId` = userId AND
        `id` = budgetCategoryId;

    SELECT * FROM `BudgetCategory`
        WHERE `userId` = userId
        ORDER BY `name` ASC;
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
    DELETE FROM `BudgetCategory`
        WHERE `userId` = userId AND
            `id` = budgetCategoryId;

    SELECT * FROM `BudgetCategory`
        WHERE `userId` = userId
        ORDER BY `name` ASC;
END;;
DELIMITER ;
DELIMITER ;;
DROP PROCEDURE IF EXISTS `spBudgetCategoryGetAll`;;
CREATE PROCEDURE `spBudgetCategoryGetAll` ()
BEGIN
    SELECT * FROM `BudgetCategory` ORDER BY `name` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spBudgetCategoryGetById`;;
CREATE PROCEDURE `spBudgetCategoryGetById` (IN `budgetCategoryId` INT)
BEGIN
    SELECT * FROM `BudgetCategory` WHERE `id` = budgetCategoryId;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spBudgetCategoryCreate`;;
CREATE PROCEDURE `spBudgetCategoryCreate` (IN `name` NVARCHAR(50))
BEGIN
    INSERT INTO `BudgetCategory` (`name`) values (`name`);
    SELECT * FROM `BudgetCategory` ORDER BY `name` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spBudgetCategoryUpdate`;;
CREATE PROCEDURE `spBudgetCategoryUpdate` (IN `budgetCategoryId` INT, IN `name` NVARCHAR(50))
BEGIN
    UPDATE `BudgetCategory` SET
        `name` = name
    WHERE `id` = budgetCategoryId;
    SELECT * FROM `BudgetCategory` ORDER BY `name` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spBudgetCategoryDelete`;;
CREATE PROCEDURE `spBudgetCategoryDelete` (IN `budgetCategoryId` INT)
BEGIN
    DELETE FROM `BudgetCategory` WHERE `id` = budgetCategoryId;
    SELECT * FROM `BudgetCategory` ORDER BY `name` ASC;
END;;
DELIMITER ;
DELIMITER ;;
DROP PROCEDURE IF EXISTS `spBudgetItemGetAll`;;
CREATE PROCEDURE `spBudgetItemGetAll` ()
BEGIN
    SELECT * FROM `BudgetItem` ORDER BY `name` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spBudgetItemGetById`;;
CREATE PROCEDURE `spBudgetItemGetById` (IN `budgetItemId` INT)
BEGIN
    SELECT * FROM `BudgetItem` WHERE `id` = `budgetItemId`;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spBudgetItemCreate`;;
CREATE PROCEDURE `spBudgetItemCreate` (IN `budgetCategoryId` INT, IN `name` NVARCHAR(50), IN `amount` INT)
BEGIN
    INSERT INTO `BudgetItem` (`budgetCategoryId`, `name`, `amount`) values (`budgetCategoryId`, `name`, `amount`);
    SELECT * FROM `BudgetItem` ORDER BY `name` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spBudgetItemUpdate`;;
CREATE PROCEDURE `spBudgetItemUpdate` (IN `budgetItemId` INT, IN `budgetCategoryId` INT, IN `name` NVARCHAR(50), IN `amount` INT)
BEGIN
    UPDATE `BudgetItem` SET
        `budgetCategoryId` = `budgetCategoryId`,
        `name` = `name`,
        `amount` = `amount`
    WHERE `id` = `budgetItemId`;
    SELECT * FROM `BudgetItem` ORDER BY `name` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spBudgetItemDelete`;;
CREATE PROCEDURE `spBudgetItemDelete` (IN `budgetItemId` INT)
BEGIN
    DELETE FROM `BudgetItem` WHERE `id` = budgetItemId;
    SELECT * FROM `BudgetItem` ORDER BY `name` ASC;
END;;
DELIMITER ;
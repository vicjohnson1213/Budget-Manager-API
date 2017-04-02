DELIMITER ;;
DROP PROCEDURE IF EXISTS `spBudgetGetAll`;;
CREATE PROCEDURE `spBudgetGetAll` ()
BEGIN
    SELECT * FROM `Budget` ORDER BY `categoryId` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spBudgetGetById`;;
CREATE PROCEDURE `spBudgetGetById` (IN `budgetId` INT)
BEGIN
    SELECT * FROM `Budget` WHERE `id` = budgetId;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spBudgetCreate`;;
CREATE PROCEDURE `spBudgetCreate` (IN `categoryId` INT, IN `amount` INT)
BEGIN
    INSERT INTO `Budget` (`categoryId`, `amount`) values (`categoryId`, `amount`);
    SELECT * FROM `Budget` ORDER BY `categoryId` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spBudgetUpdate`;;
CREATE PROCEDURE `spBudgetUpdate` (IN `budgetId` INT, IN `categoryId` NVARCHAR(50), IN `amount` INT)
BEGIN
    UPDATE `Budget` SET
        `categoryId` = `categoryId`,
        `amount` = amount
    WHERE `id` = budgetId;
    SELECT * FROM `Budget` ORDER BY `categoryId` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spBudgetDelete`;;
CREATE PROCEDURE `spBudgetDelete` (IN `budgetId` INT)
BEGIN
    DELETE FROM `Budget` WHERE `id` = budgetId;
    SELECT * FROM `Budget` ORDER BY `categoryId` ASC;
END;;
DELIMITER ;
DELIMITER ;;
DROP PROCEDURE IF EXISTS `spExpenseCategoryGetAll`;;
CREATE PROCEDURE `spExpenseCategoryGetAll` ()
BEGIN
    SELECT * FROM `ExpenseCategory` ORDER BY `name` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spExpenseCategoryGetById`;;
CREATE PROCEDURE `spExpenseCategoryGetById` (IN `expenseCategoryId` INT)
BEGIN
    SELECT * FROM `ExpenseCategory` WHERE `id` = expenseCategoryId;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spExpenseCategoryCreate`;;
CREATE PROCEDURE `spExpenseCategoryCreate` (IN `parentId` INT, IN `name` NVARCHAR(50))
BEGIN
    INSERT INTO `ExpenseCategory` (`parentId`, `name`) values (`parentId`, `name`);
    SELECT * FROM `ExpenseCategory` ORDER BY `name` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spExpenseCategoryUpdate`;;
CREATE PROCEDURE `spExpenseCategoryUpdate` (IN `parentId` INT, IN `name` NVARCHAR(50))
BEGIN
    UPDATE `ExpenseCategory` SET
        `parentId` = `parentId`,
        `name` = name
    WHERE `id` = expenseCategoryId;
    SELECT * FROM `ExpenseCategory` ORDER BY `name` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spExpenseCategoryDelete`;;
CREATE PROCEDURE `spExpenseCategoryDelete` (IN `expenseCategoryId` INT)
BEGIN
    DELETE FROM `ExpenseCategory` WHERE `id` = expenseCategoryId;
    SELECT * FROM `ExpenseCategory` ORDER BY `name` ASC;
END;;
DELIMITER ;
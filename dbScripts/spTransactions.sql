DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTransactionGetAll`;;
CREATE PROCEDURE `spTransactionGetAll` ()
BEGIN
    SELECT * FROM `Transaction` ORDER BY `date` ASC;
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
CREATE PROCEDURE `spTransactionCreate` (IN `date` DATE, IN `name` NVARCHAR(50), IN `categoryId` INT, IN `amount` INT)
BEGIN
    INSERT INTO `Transaction` (`date`, `name`, `categoryId`, `amount`) values (`date`, `name`, `categoryId`, `amount`);
    SELECT * FROM `Transaction` ORDER BY `date` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTransactionUpdate`;;
CREATE PROCEDURE `spTransactionUpdate` (IN `transactionId` INT, IN `date` DATE, IN `name` NVARCHAR(50), IN `categoryId` INT, IN `amount` INT)
BEGIN
    UPDATE `Transaction` SET
        `date` = `date`,
        `name` = `name`,
        `categoryId` = categoryId,
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
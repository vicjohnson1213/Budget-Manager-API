DELIMITER ;;
DROP PROCEDURE IF EXISTS `spIncomeSourceGetAll`;;
CREATE PROCEDURE `spIncomeSourceGetAll` ()
BEGIN
    SELECT * FROM `IncomeSource` ORDER BY `annualAmount` DESC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spIncomeSourceGetById`;;
CREATE PROCEDURE `spIncomeSourceGetById` (IN `incomeSourceId` INT)
BEGIN
    SELECT * FROM `IncomeSource` WHERE `id` = incomeSourceId;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spIncomeSourceCreate`;;
CREATE PROCEDURE `spIncomeSourceCreate` (IN `name` NVARCHAR(50), IN `annualAmount` INT)
BEGIN
    INSERT INTO `IncomeSource` (`name`, `annualAmount`) values (`name`, `annualAmount`);
    SELECT * FROM `IncomeSource` ORDER BY `annualAmount` DESC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spIncomeSourceUpdate`;;
CREATE PROCEDURE `spIncomeSourceUpdate` (IN `incomeSourceId` INT, IN `name` NVARCHAR(50), IN `annualAmount` INT)
BEGIN
    UPDATE `IncomeSource` SET
        `name` = `name`,
        `annualAmount` = annualAmount
    WHERE `id` = incomeSourceId;
    SELECT * FROM `IncomeSource` ORDER BY `annualAmount` DESC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spIncomeSourceDelete`;;
CREATE PROCEDURE `spIncomeSourceDelete` (IN `incomeSourceId` INT)
BEGIN
    DELETE FROM `IncomeSource` WHERE `id` = incomeSourceId;
    SELECT * FROM `IncomeSource` ORDER BY `annualAmount` DESC;
END;;
DELIMITER ;
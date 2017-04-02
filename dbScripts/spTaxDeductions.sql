DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTaxDeductionGetAll`;;
CREATE PROCEDURE `spTaxDeductionGetAll` ()
BEGIN
    SELECT * FROM `TaxDeduction` ORDER BY `name` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTaxDeductionGetById`;;
CREATE PROCEDURE `spTaxDeductionGetById` (IN `taxDeductionId` INT)
BEGIN
    SELECT * FROM `TaxDeduction` WHERE `id` = taxDeductionId;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTaxDeductionCreate`;;
CREATE PROCEDURE `spTaxDeductionCreate` (IN `name` NVARCHAR(50), IN `amount` INT)
BEGIN
    INSERT INTO `TaxDeduction` (`name`, `amount`) values (`name`, `amount`);
    SELECT * FROM `TaxDeduction` ORDER BY `name` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTaxDeductionUpdate`;;
CREATE PROCEDURE `spTaxDeductionUpdate` (IN `taxDeductionId` INT, IN `name` NVARCHAR(50), IN `amount` INT)
BEGIN
    UPDATE `TaxDeduction` SET
        `name` = `name`,
        `amount` = amount
    WHERE `id` = taxDeductionId;
    SELECT * FROM `TaxDeduction` ORDER BY `name` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTaxDeductionDelete`;;
CREATE PROCEDURE `spTaxDeductionDelete` (IN `taxDeductionId` INT)
BEGIN
    DELETE FROM `TaxDeduction` WHERE `id` = taxDeductionId;
    SELECT * FROM `TaxDeduction` ORDER BY `name` ASC;
END;;
DELIMITER ;
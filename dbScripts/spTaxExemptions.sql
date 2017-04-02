DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTaxExemptionGetAll`;;
CREATE PROCEDURE `spTaxExemptionGetAll` ()
BEGIN
    SELECT * FROM `TaxExemption` ORDER BY `name` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTaxExemptionGetById`;;
CREATE PROCEDURE `spTaxExemptionGetById` (IN `taxExemptionId` INT)
BEGIN
    SELECT * FROM `TaxExemption` WHERE `id` = taxExemptionId;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTaxExemptionCreate`;;
CREATE PROCEDURE `spTaxExemptionCreate` (IN `name` NVARCHAR(50), IN `amount` INT)
BEGIN
    INSERT INTO `TaxExemption` (`name`, `amount`) values (`name`, `amount`);
    SELECT * FROM `TaxExemption` ORDER BY `name` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTaxExemptionUpdate`;;
CREATE PROCEDURE `spTaxExemptionUpdate` (IN `taxExemptionId` INT, IN `name` NVARCHAR(50), IN `amount` INT)
BEGIN
    UPDATE `TaxExemption` SET
        `name` = `name`,
        `amount` = amount
    WHERE `id` = taxExemptionId;
    SELECT * FROM `TaxExemption` ORDER BY `name` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTaxExemptionDelete`;;
CREATE PROCEDURE `spTaxExemptionDelete` (IN `taxExemptionId` INT)
BEGIN
    DELETE FROM `TaxExemption` WHERE `id` = taxExemptionId;
    SELECT * FROM `TaxExemption` ORDER BY `name` ASC;
END;;
DELIMITER ;
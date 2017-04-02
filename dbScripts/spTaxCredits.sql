DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTaxCreditGetAll`;;
CREATE PROCEDURE `spTaxCreditGetAll` ()
BEGIN
    SELECT * FROM `TaxCredit` ORDER BY `name` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTaxCreditGetById`;;
CREATE PROCEDURE `spTaxCreditGetById` (IN `taxCreditId` INT)
BEGIN
    SELECT * FROM `TaxCredit` WHERE `id` = taxCreditId;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTaxCreditCreate`;;
CREATE PROCEDURE `spTaxCreditCreate` (IN `name` NVARCHAR(50), IN `amount` INT)
BEGIN
    INSERT INTO `TaxCredit` (`name`, `amount`) values (`name`, `amount`);
    SELECT * FROM `TaxCredit` ORDER BY `name` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTaxCreditUpdate`;;
CREATE PROCEDURE `spTaxCreditUpdate` (IN `taxCreditId` INT, IN `name` NVARCHAR(50), IN `amount` INT)
BEGIN
    UPDATE `TaxCredit` SET
        `name` = `name`,
        `amount` = amount
    WHERE `id` = taxCreditId;
    SELECT * FROM `TaxCredit` ORDER BY `name` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTaxCreditDelete`;;
CREATE PROCEDURE `spTaxCreditDelete` (IN `taxCreditId` INT)
BEGIN
    DELETE FROM `TaxCredit` WHERE `id` = taxCreditId;
    SELECT * FROM `TaxCredit` ORDER BY `name` ASC;
END;;
DELIMITER ;
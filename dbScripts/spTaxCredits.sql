DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTaxCreditGetAll`;;
CREATE PROCEDURE `spTaxCreditGetAll`
(
    IN `userId` INT
)
BEGIN
    SELECT * FROM `TaxCredit`
        WHERE `userId` = userId
        ORDER BY `name` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTaxCreditGetById`;;
CREATE PROCEDURE `spTaxCreditGetById`
(
    IN `userId` INT,
    IN `taxCreditId` INT
)
BEGIN
    SELECT * FROM `TaxCredit`
        WHERE `userId` = userId AND
            `id` = taxCreditId;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTaxCreditCreate`;;
CREATE PROCEDURE `spTaxCreditCreate`
(
    IN `userId` INT,
    IN `name` NVARCHAR(50),
    IN `amount` INT
)
BEGIN
    INSERT INTO `TaxCredit`
    (
        `userId`,
        `name`,
        `amount`
    )
    VALUES
    (
        `userId`,
        `name`,
        `amount`
    );

    SELECT * FROM `TaxCredit`
        WHERE `userId` = userId
        ORDER BY `name` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTaxCreditUpdate`;;
CREATE PROCEDURE `spTaxCreditUpdate`
(
    IN `userId` INT,
    IN `taxCreditId` INT,
    IN `name` NVARCHAR(50),
    IN `amount` INT
)
BEGIN
    UPDATE `TaxCredit` SET
        `name` = `name`,
        `amount` = amount
    WHERE `userId` = userId AND
        `id` = taxCreditId;

    SELECT * FROM `TaxCredit`
        WHERE `userId` = userId
        ORDER BY `name` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTaxCreditDelete`;;
CREATE PROCEDURE `spTaxCreditDelete`
(
    IN `userId` INT,
    IN `taxCreditId` INT
)
BEGIN
    DELETE FROM `TaxCredit`
        WHERE `userId` = userId AND
            `id` = taxCreditId;

    SELECT * FROM `TaxCredit`
        WHERE `userId` = userId
        ORDER BY `name` ASC;
END;;
DELIMITER ;
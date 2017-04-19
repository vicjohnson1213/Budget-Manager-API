DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTaxDeductionGetAll`;;
CREATE PROCEDURE `spTaxDeductionGetAll`
(
    IN `userId` INT
)
BEGIN
    SELECT * FROM `TaxDeduction`
        WHERE `userId` = userId
        ORDER BY `name` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTaxDeductionGetById`;;
CREATE PROCEDURE `spTaxDeductionGetById`
(
    IN `userId` INT,
    IN `taxDeductionId` INT
)
BEGIN
    SELECT * FROM `TaxDeduction`
        WHERE `userId` = userId AND
            `id` = taxDeductionId;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTaxDeductionCreate`;;
CREATE PROCEDURE `spTaxDeductionCreate`
(
    IN `userId` INT,
    IN `name` NVARCHAR(50),
    IN `amount` INT
)
BEGIN
    INSERT INTO `TaxDeduction`
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

    SELECT * FROM `TaxDeduction`
        WHERE `userId` = userId
        ORDER BY `name` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTaxDeductionUpdate`;;
CREATE PROCEDURE `spTaxDeductionUpdate`
(
    IN `userId` INT,
    IN `taxDeductionId` INT,
    IN `name` NVARCHAR(50),
    IN `amount` INT
)
BEGIN
    UPDATE `TaxDeduction` SET
        `name` = `name`,
        `amount` = amount
    WHERE `userId` = userId AND
        `id` = taxDeductionId;

    SELECT * FROM `TaxDeduction`
        WHERE `userId` = userId
        ORDER BY `name` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTaxDeductionDelete`;;
CREATE PROCEDURE `spTaxDeductionDelete`
(
    IN `userId` INT,
    IN `taxDeductionId` INT
)
BEGIN
    DELETE FROM `TaxDeduction`
        WHERE `userId` = userId AND
            `id` = taxDeductionId;

    SELECT * FROM `TaxDeduction`
        WHERE `userId` = userId
        ORDER BY `name` ASC;
END;;
DELIMITER ;
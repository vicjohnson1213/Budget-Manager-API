DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTaxExemptionGetAll`;;
CREATE PROCEDURE `spTaxExemptionGetAll`
(
    IN `userId` INT
)
BEGIN
    SELECT * FROM `TaxExemption`
        WHERE `userId` = userId
        ORDER BY `name` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTaxExemptionGetById`;;
CREATE PROCEDURE `spTaxExemptionGetById`
(
    IN `userId` INT,
    IN `taxExemptionId` INT
)
BEGIN
    SELECT * FROM `TaxExemption`
        WHERE `userId` = userId AND
            `id` = taxExemptionId;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTaxExemptionCreate`;;
CREATE PROCEDURE `spTaxExemptionCreate`
(
    IN `userId` INT,
    IN `name` NVARCHAR(50),
    IN `amount` INT
)
BEGIN
    INSERT INTO `TaxExemption`
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

    SELECT * FROM `TaxExemption`
        WHERE `userId` = userId
        ORDER BY `name` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTaxExemptionUpdate`;;
CREATE PROCEDURE `spTaxExemptionUpdate`
(
    IN `userId` INT,
    IN `taxExemptionId` INT,
    IN `name` NVARCHAR(50),
    IN `amount` INT
)
BEGIN
    UPDATE `TaxExemption` SET
        `name` = `name`,
        `amount` = amount
    WHERE `userId` = userId AND
        `id` = taxExemptionId;

    SELECT * FROM `TaxExemption`
        WHERE `userId` = userId
        ORDER BY `name` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spTaxExemptionDelete`;;
CREATE PROCEDURE `spTaxExemptionDelete`
(
    IN `userId` INT,
    IN `taxExemptionId` INT
)
BEGIN
    DELETE FROM `TaxExemption`
        WHERE `userId` = userId AND
            `id` = taxExemptionId;

    SELECT * FROM `TaxExemption`
        WHERE `userId` = userId
        ORDER BY `name` ASC;
END;;
DELIMITER ;
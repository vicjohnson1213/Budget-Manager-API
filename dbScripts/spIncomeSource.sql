DELIMITER ;;
DROP PROCEDURE IF EXISTS `spIncomeSourceGetAll`;;
CREATE PROCEDURE `spIncomeSourceGetAll`
(
    IN `userId` INT
)
BEGIN
    SELECT * FROM `IncomeSource`
        WHERE `userId` = userId
        ORDER BY `name` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spIncomeSourceGetById`;;
CREATE PROCEDURE `spIncomeSourceGetById`
(
    IN `userId` INT,
    IN `incomeSourceId` INT
)
BEGIN
    SELECT * FROM `IncomeSource`
        WHERE `userId` = userId AND
            `id` = incomeSourceId;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spIncomeSourceCreate`;;
CREATE PROCEDURE `spIncomeSourceCreate`
(
    IN `userId` INT,
    IN `name` NVARCHAR(50),
    IN `annualAmount` INT
)
BEGIN
    INSERT INTO `IncomeSource`
    (
        `userId`,
        `name`,
        `annualAmount`
    )
    VALUES
    (
        `userId`,
        `name`,
        `annualAmount`
    );

    SELECT * FROM `IncomeSource`
        WHERE `userId` = userId
        ORDER BY `name` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spIncomeSourceUpdate`;;
CREATE PROCEDURE `spIncomeSourceUpdate`
(
    IN `userId` INT,
    IN `incomeSourceId` INT,
    IN `name` NVARCHAR(50),
    IN `annualAmount` INT
)
BEGIN
    UPDATE `IncomeSource` SET
        `name` = `name`,
        `annualAmount` = annualAmount
    WHERE `userId` = userId AND
        `id` = incomeSourceId;

    SELECT * FROM `IncomeSource`
        WHERE `userId` = userId
        ORDER BY `name` ASC;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spIncomeSourceDelete`;;
CREATE PROCEDURE `spIncomeSourceDelete`
(
    IN `userId` INT,
    IN `incomeSourceId` INT
)
BEGIN
    DELETE FROM `IncomeSource`
        WHERE `userId` = userId AND
            `id` = incomeSourceId;

    SELECT * FROM `IncomeSource`
        WHERE `userId` = userId
        ORDER BY `name` ASC;
END;;
DELIMITER ;
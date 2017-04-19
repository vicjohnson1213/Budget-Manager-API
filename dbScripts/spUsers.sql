DELIMITER ;;
DROP PROCEDURE IF EXISTS `spUserCreate`;;
CREATE PROCEDURE `spUserCreate` 
(
    IN `emailAddress` NVARCHAR(50),
    IN `passwordSalt` VARCHAR(36),
    IN `passwordHash` VARCHAR(44)
)
BEGIN
    INSERT INTO `User`
    (
        `emailAddress`,
        `passwordSalt`,
        `passwordHash`
    )
    VALUES
    (
        emailAddress,
        passwordSalt,
        passwordHash
    );
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spUserGet`;;
CREATE PROCEDURE `spUserGet`
(
    IN `userId` INT
)
BEGIN
    SELECT * FROM `User`
        WHERE `id` = userId;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spUserGetByEmail`;;
CREATE PROCEDURE `spUserGetByEmail`
(
    IN `emailAddress` NVARCHAR(50)
)
BEGIN
    SELECT * FROM `User`
        WHERE `emailAddress` = emailAddress;
END;;
DELIMITER ;

DELIMITER ;;
DROP PROCEDURE IF EXISTS `spUserUpdate`;;
CREATE PROCEDURE `spUserUpdate`
(
    IN `userId` INT,
    IN `emailAddress` NVARCHAR(50),
)
BEGIN
    UPDATE `User` SET
        `emailAddress` = emailAddress
    WHERE `id` = userId;
    SELECT * FROM `User`
        WHERE `userId` = userId;
END;;
DELIMITER ;

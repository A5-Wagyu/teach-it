USE teachit;
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `Users`;
DROP TABLE IF EXISTS `Roles`;
DROP TABLE IF EXISTS `Topics`;
DROP TABLE IF EXISTS `Subtopics`;
DROP TABLE IF EXISTS `Webinars`;
DROP TABLE if EXISTS `Ratings`;
DROP TABLE IF EXISTS `UserRoleWebinarAssociations`;
SET FOREIGN_KEY_CHECKS = 1;
CREATE TABLE `Users`(
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL UNIQUE,
    `password` varchar(255) not null,
    PRIMARY KEY (`id`)
);
CREATE TABLE `Roles`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY (`id`)
);
CREATE TABLE `Topics`(
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL UNIQUE,
    PRIMARY KEY (`id`)
);
CREATE TABLE `Subtopics`(
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `topicID` int NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`topicID`) REFERENCES `Topics` (`id`)
);
CREATE TABLE `Webinars`(
    `id` int NOT NULL AUTO_INCREMENT,
    `title` varchar(255) NOT NULL,
    `date` DATETIME,
    `startTime` TIME,
    `endTime` TIME,
    `description` varchar(2550) NOT NULL,
    `learn` varchar(2550) NOT NULL,
    `know` varchar(2550) NOT NULL,
    `need` varchar(2550) NOT NULL,
    `zoomLink` varchar(255) NOT NULL,
    `zoomPasscode` varchar(255),
    `isComplete` BOOLEAN,
    `topicID` int NOT NULL,
    `subTopicID` INT,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`subTopicID`) REFERENCES `Subtopics` (`id`),
    FOREIGN KEY (`topicID`) REFERENCES `Topics` (`id`)
);
CREATE TABLE `Ratings`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `score` INT NOT NULL,
    `raterID` INT NOT NULL,
    `webinarID` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`raterID`) REFERENCES `Users` (`id`),
    FOREIGN KEY (`webinarID`) REFERENCES `Webinars` (`id`)
);
CREATE TABLE `UserRoleWebinarAssociations`(
    `id` int NOT NULL AUTO_INCREMENT,
    `userID` int NOT NULL,
    `roleID` int NOT NULL,
    `webinarID` int NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`userID`) REFERENCES `Users` (`id`),
    FOREIGN KEY (`roleID`) REFERENCES `Roles` (`id`),
    FOREIGN KEY (`webinarID`) REFERENCES `Webinars` (`id`)
);
-- dumping initial Users data 
INSERT INTO `Users` (`name`, `email`, `password`)
VALUES ('admin', 'admin@gmail.com', 'password'),
    ('Quan', 'quan@gmail.com', '1232456'),
    ('Josiah', 'jmetz@gmail.com', 'aaaaabbbb'),
	 ('Arthur','arthur@gmail.com', '123456');
-- dumbping Roles
INSERT INTO `Roles` (`name`)
VALUES ('host'),
    ('guest');
-- dumping topics
INSERT INTO `Topics` (`name`)
VALUES ('Computer Science'),
    ('Business'),
    ('Science'),
    ('Engineering'),
    ('Music'),
    ('Math'),
    ('Personal Development'),
    ('Liberal Arts');
-- dumping subtopics
INSERT INTO `Subtopics` (`name`, `topicID`)
VALUES (
        'Artificial Intelligence',
        (
            SELECT `id`
            FROM `Topics`
            WHERE `name` = 'Computer Science'
        )
    ),
    (
        'Web Development',
        (
            SELECT `id`
            FROM `Topics`
            WHERE `name` = 'Computer Science'
        )
    ),
    (
        'Network & Security',
        (
            SELECT `id`
            FROM `Topics`
            WHERE `name` = 'Computer Science'
        )
    ),
    (
        'Marketing',
        (
            SELECT `id`
            FROM `Topics`
            WHERE `name` = 'Business'
        )
    ),
    (
        'Accounting',
        (
            SELECT `id`
            FROM `Topics`
            WHERE `name` = 'Business'
        )
    ),
    (
        'Finance',
        (
            SELECT `id`
            FROM `Topics`
            WHERE `name` = 'Business'
        )
    ),
    (
        'Biology',
        (
            SELECT `id`
            FROM `Topics`
            WHERE `name` = 'Science'
        )
    ),
    (
        'Chemistry',
        (
            SELECT `id`
            FROM `Topics`
            WHERE `name` = 'Science'
        )
    ),
    (
        'Physics',
        (
            SELECT `id`
            FROM `Topics`
            WHERE `name` = 'Science'
        )
    ),
    (
        'Mechanical Engineering',
        (
            SELECT `id`
            FROM `Topics`
            WHERE `name` = 'Engineering'
        )
    ),
    (
        'Civil Engineering',
        (
            SELECT `id`
            FROM `Topics`
            WHERE `name` = 'Engineering'
        )
    ),
    (
        'Chemical Engineering',
        (
            SELECT `id`
            FROM `Topics`
            WHERE `name` = 'Engineering'
        )
    ),
    (
        'Music Theory',
        (
            SELECT `id`
            FROM `Topics`
            WHERE `name` = 'Music'
        )
    ),
    (
        'Music Performance',
        (
            SELECT `id`
            FROM `Topics`
            WHERE `name` = 'Music'
        )
    ),
    (
        'Music Education',
        (
            SELECT `id`
            FROM `Topics`
            WHERE `name` = 'Music'
        )
    ),
    (
        'Statistics',
        (
            SELECT `id`
            FROM `Topics`
            WHERE `name` = 'Math'
        )
    ),
    (
        'Algebra',
        (
            SELECT `id`
            FROM `Topics`
            WHERE `name` = 'Math'
        )
    ),
    (
        'Calculus',
        (
            SELECT `id`
            FROM `Topics`
            WHERE `name` = 'Math'
        )
    ),
    (
        'Political Science',
        (
            SELECT `id`
            FROM `Topics`
            WHERE `name` = 'Liberal Arts'
        )
    ),
    (
        'Literature',
        (
            SELECT `id`
            FROM `Topics`
            WHERE `name` = 'Liberal Arts'
        )
    ),
    (
        'English',
        (
            SELECT `id`
            FROM `Topics`
            WHERE `name` = 'Liberal Arts'
        )
    ),
    (
        'Spanish',
        (
            SELECT `id`
            FROM `Topics`
            WHERE `name` = 'Liberal Arts'
        )
    ),
    (
        'Calculus',
        (
            SELECT `id`
            FROM `Topics`
            WHERE `name` = 'Liberal Arts'
        )
    ),
    (
        'History',
        (
            SELECT `id`
            FROM `Topics`
            WHERE `name` = 'Liberal Arts'
        )
    ),
    (
        'Religion',
        (
            SELECT `id`
            FROM `Topics`
            WHERE `name` = 'Liberal Arts'
        )
    ),
    (
        'Philosophy',
        (
            SELECT `id`
            FROM `Topics`
            WHERE `name` = 'Liberal Arts'
        )
    );
-- dump webinars
INSERT INTO `Webinars` (
        `title`,
        `date`,
        `startTime`,
        `endTime`,
        `topicID`,
        `subTopicID`,
        `description`,
        `learn`,
        `know`,
        `need`,
        `zoomLink`,
        `zoomPasscode`,
        `isComplete`
    )
VALUES (
        'How to design a relational database',
        '2020-12-17',
        '14:00:00',
        '15:00:00',
        (
            SELECT `id`
            FROM `Topics`
            WHERE `name` = 'Computer Science'
        ),
        NULL,
        'How to design and build a relational database',
        'Guests will learn how to create a local database, how to use lucidchart to draw ERD and DB Schema',
        'N/A',
        'Computer',
        'zoom.us',
        'N/A',
        FALSE
    );
    
    INSERT INTO `Webinars` (
        `title`,
        `date`,
        `startTime`,
        `endTime`,
        `topicID`,
        `subTopicID`,
        `description`,
        `learn`,
        `know`,
        `need`,
        `zoomLink`,
        `zoomPasscode`,
        `isComplete`
    )
VALUES (
        'Economic Cycle',
        '2020-12-13',
        '16:30:00',
        '17:00:00',
        (
            SELECT `id`
            FROM `Topics`
            WHERE `name` = 'Business'
        ),
        (SELECT `id` FROM `Subtopics` WHERE `name` ='Macroeconomics'),
        'Test',
        'Test',
        'N/A',
        'Computer',
        'zoom.us',
        'N/A',
        FALSE
    );
-- dump UserRoleWebinarAssociations  
INSERT INTO `UserRoleWebinarAssociations` (
        `userID`,
        `roleID`,
        `webinarID`
    )
VALUES (
        (
            SELECT `id`
            FROM `Users`
            WHERE `name` = 'Arthur'
        ),
        (
            SELECT `id`
            FROM `Roles`
            WHERE `name` = 'host'
        ),
        (
            SELECT `id`
            FROM `Webinars`
            WHERE `id` = 1
        )
    	);
INSERT INTO `UserRoleWebinarAssociations` (
        `userID`,
        `roleID`,
        `webinarID`
    )
VALUES (
        (
            SELECT `id`
            FROM `Users`
            WHERE `name` = 'Arthur'
        ),
        (
            SELECT `id`
            FROM `Roles`
            WHERE `name` = 'host'
        ),
        (
            SELECT `id`
            FROM `Webinars`
            WHERE `id` = 2
        )
    	);
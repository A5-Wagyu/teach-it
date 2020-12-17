DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS UserWebinarAssociations;
DROP TABLE IF EXISTS Webinars;
DROP TABLE IF EXISTS Topics;
DROP TABLE IF EXISTS Subtopics;

CREATE TABLE Users(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    email varchar(255) NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

CREATE TABLE UserWebinarAssociations(
    id int NOT NULL AUTO_INCREMENT,
    userID int NOT NULL,
    webinarID int NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (userID) REFERENCES Users (id),
    FOREIGN KEY (webinarID) REFERENCES Webinars (id)
);

CREATE TABLE Webinars(
    id int NOT NULL AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    date DATETIME,
    startTime TIME,
    endTime TIME,
    description varchar(2550) NOT NULL,
    learn varchar(2550) NOT NULL,
    need varchar(2550) NOT NULL,
    zoomLink varchar(255) NOT NULL,
    isComplete BOOLEAN,
    topicID int NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (topicID) REFERENCES Topics (id)
);

CREATE TABLE Topics(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE Subtopics(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    topicID int NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (topicID) REFERENCES Topics (id)
);


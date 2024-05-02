-- phpMyAdmin SQL Dump
-- version 5.2.1deb1+jammy2
-- https://www.phpmyadmin.net/
--
-- Hostiteľ: localhost:3306
-- Čas generovania: Št 02.Máj 2024, 06:13
-- Verzia serveru: 8.0.36-0ubuntu0.22.04.1
-- Verzia PHP: 8.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


CREATE TABLE `user` (
  `id_user` int NOT NULL,
  `nick` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `admin` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


INSERT INTO `user` (`id_user`, `nick`, `password`, `admin`) VALUES
(1, 'ADMINKO', 'KOTAKOMACKA', 1);


CREATE TABLE `question_set` (
  `id_set` int NOT NULL,
  `name_set` varchar(255) DEFAULT NULL,
  `id_user` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `question` (
  `id_question` int NOT NULL,
  `text_q` varchar(255) DEFAULT NULL,
  `active` int DEFAULT NULL,
  `open` int DEFAULT NULL,
  `id_set` int DEFAULT NULL,
  `creationDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `answer` (
  `id_answer` int NOT NULL,
  `text_a` varchar(255) DEFAULT NULL,
  `correct` int DEFAULT NULL,
  `id_question` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;




CREATE TABLE `stats` (
  `id_stats` int NOT NULL,
  `year` int DEFAULT NULL,
  `id_answer` int DEFAULT NULL,
  `count` int DEFAULT NULL,
  `percentage` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


ALTER TABLE `answer`
  ADD PRIMARY KEY (`id_answer`),
  ADD KEY `id_question` (`id_question`);

ALTER TABLE `question`
  ADD PRIMARY KEY (`id_question`),
  ADD KEY `id_set` (`id_set`);

ALTER TABLE `question_set`
  ADD PRIMARY KEY (`id_set`),
  ADD KEY `id_user` (`id_user`);

ALTER TABLE `stats`
  ADD PRIMARY KEY (`id_stats`),
  ADD KEY `id_answer` (`id_answer`);

ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

ALTER TABLE `answer`
  MODIFY `id_answer` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

ALTER TABLE `question`
  MODIFY `id_question` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

ALTER TABLE `question_set`
  MODIFY `id_set` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

ALTER TABLE `stats`
  MODIFY `id_stats` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

ALTER TABLE `user`
  MODIFY `id_user` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

ALTER TABLE `answer`
  ADD CONSTRAINT `answer_ibfk_1` FOREIGN KEY (`id_question`) REFERENCES `question` (`id_question`);

ALTER TABLE `question`
  ADD CONSTRAINT `question_ibfk_1` FOREIGN KEY (`id_set`) REFERENCES `question_set` (`id_set`);

ALTER TABLE `question_set`
  ADD CONSTRAINT `question_set_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);

ALTER TABLE `stats`
  ADD CONSTRAINT `stats_ibfk_1` FOREIGN KEY (`id_answer`) REFERENCES `answer` (`id_answer`);
COMMIT;

-- Inserting data into the `user` table
INSERT INTO `user` (`id_user`, `nick`, `password`, `admin`) VALUES
(2, 'Joseph', 'password1', 0),
(3, 'Maria', 'password2', 0),
(4, 'John', 'password3', 0),
(5, 'Emma', 'password4', 0),
(6, 'Daniel', 'password5', 0);

-- Inserting data into the `question_set` table
INSERT INTO `question_set` (`id_set`, `name_set`, `id_user`) VALUES
(1, 'Math', 2),
(2, 'English', 2),
(3, 'PE', 3),
(4, 'Biology', 3),
(5, 'History', 4),
(6, 'Geography', 4);

-- Inserting data into the `question` table
INSERT INTO `question` (`id_question`, `text_q`, `active`, `open`, `id_set`, `creationDate`) VALUES
(1, 'What is the value of PI?', 1, 1, 1, '2024-05-02'),
(2, 'How do you say "hello" in Spanish?', 1, 1, 2, '2024-05-02'),
(3, 'What are the main rules of soccer?', 1, 1, 3, '2024-05-02'),
(4, 'What is the function of mitochondria?', 1, 1, 4, '2024-05-02'),
(5, 'Who was the first president of the United States?', 1, 1, 5, '2024-05-02'),
(6, 'Where is the capital of France?', 1, 1, 6, '2024-05-02');

-- Inserting data into the `answer` table
INSERT INTO `answer` (`id_answer`, `text_a`, `correct`, `id_question`) VALUES
(1, '3.14159', 1, 1),
(2, '3.14', 0, 1),
(3, 'Hola', 1, 2),
(4, 'Bonjour', 0, 2),
(5, 'Scoring goals', 1, 3),
(6, 'Throwing the ball', 0, 3),
(7, 'Powerhouse of the cell', 1, 4),
(8, 'Transportation of oxygen', 0, 4),
(9, 'George Washington', 1, 5),
(10, 'Abraham Lincoln', 0, 5),
(11, 'Paris', 1, 6),
(12, 'London', 0, 6);

-- Inserting data into the `stats` table
INSERT INTO `stats` (`id_stats`, `year`, `id_answer`, `count`, `percentage`) VALUES
(1, 2024, 1, 10, 50.0),
(2, 2024, 2, 10, 50.0),
(3, 2024, 3, 10, 50.0),
(4, 2024, 4, 10, 50.0),
(5, 2024, 5, 10, 50.0),
(6, 2024, 6, 10, 50.0),
(7, 2024, 7, 10, 50.0),
(8, 2024, 8, 10, 50.0),
(9, 2024, 9, 10, 50.0),
(10, 2024, 10, 10, 50.0),
(11, 2024, 11, 10, 50.0),
(12, 2024, 12, 10, 50.0);

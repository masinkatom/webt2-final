-- phpMyAdmin SQL Dump
-- version 5.2.1deb1+jammy2
-- https://www.phpmyadmin.net/
--
-- Hostiteľ: localhost:3306
-- Čas generovania: Po 20.Máj 2024, 15:54
-- Verzia serveru: 8.0.36-0ubuntu0.22.04.1
-- Verzia PHP: 8.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databáza: `WIAH`
--

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `answer`
--

CREATE TABLE `answer` (
  `id_answer` int NOT NULL,
  `text_a` varchar(255) DEFAULT NULL,
  `correct` int DEFAULT NULL,
  `id_question` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Sťahujem dáta pre tabuľku `answer`
--

INSERT INTO `answer` (`id_answer`, `text_a`, `correct`, `id_question`) VALUES
(20, '8', 0, 78),
(21, '64', 0, 78),
(22, '128', 1, 78),
(23, 'SSH', 1, 79),
(24, 'SSI', 0, 79),
(25, 'IEEE', 0, 79),
(26, 'Áno', 1, 84),
(27, 'Nie', 0, 84);

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `question`
--

CREATE TABLE `question` (
  `id_question` int NOT NULL,
  `text_q` varchar(255) DEFAULT NULL,
  `active` int DEFAULT NULL,
  `open` int DEFAULT NULL,
  `id_set` int DEFAULT NULL,
  `creationDate` date DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `cloudmap` int DEFAULT '0',
  `adminOwner` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Sťahujem dáta pre tabuľku `question`
--

INSERT INTO `question` (`id_question`, `text_q`, `active`, `open`, `id_set`, `creationDate`, `code`, `cloudmap`, `adminOwner`) VALUES
(76, 'Načo slúži telnet', 0, 1, 49, '2024-05-20', NULL, 1, NULL),
(77, 'Je telnet bezpečný?', 0, 1, 49, '2024-05-20', NULL, 1, NULL),
(78, 'Koľko bitov má IPV6 adresa', 0, 0, 50, '2024-05-20', '', 1, NULL),
(79, 'Čo je alternatíva pre telnet?', 1, 0, 49, '2024-05-20', NULL, 1, NULL),
(80, 'Ktoré BMW je najlepšie', 0, 1, 51, '2024-05-20', '', 1, NULL),
(81, 'Aké je posledné číslo PI?', 0, 1, 52, '2024-05-20', NULL, 1, NULL),
(82, 'Idem na maturu z Matematiky?', 0, 1, 52, '2024-05-20', NULL, 1, NULL),
(83, 'Kto je naj fyzik?', 0, 1, 53, '2024-05-20', NULL, 1, NULL),
(84, 'Je zem guľatá?', 0, 0, 53, '2024-05-20', NULL, 1, NULL);

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `question_set`
--

CREATE TABLE `question_set` (
  `id_set` int NOT NULL,
  `name_set` varchar(255) DEFAULT NULL,
  `id_user` int DEFAULT NULL,
  `code` varchar(255) DEFAULT 'ooops'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Sťahujem dáta pre tabuľku `question_set`
--

INSERT INTO `question_set` (`id_set`, `name_set`, `id_user`, `code`) VALUES
(49, 'telnet', 19, 'ooops'),
(50, 'ipv6', 19, 'ooops'),
(51, 'BMW', 19, 'ooops'),
(52, 'Matematika', 20, 'ooops'),
(53, 'Fyzika', 20, 'ooops');

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `stats`
--

CREATE TABLE `stats` (
  `id_stats` int NOT NULL,
  `year` int DEFAULT NULL,
  `id_answer` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Sťahujem dáta pre tabuľku `stats`
--

INSERT INTO `stats` (`id_stats`, `year`, `id_answer`) VALUES
(211, 2024, 20),
(212, 2024, 22),
(213, 2024, 22),
(214, 2024, 21),
(215, 2024, 22),
(216, 2024, 22),
(217, 2024, 22),
(218, 2024, 22),
(219, 2024, 20),
(220, 2024, 20),
(221, 2024, 22),
(222, 2024, 22),
(223, 2024, 20),
(224, 2024, 22),
(225, 2024, 22),
(226, 2024, 21),
(227, 2024, 20),
(228, 2024, 22),
(229, 2024, 21),
(230, 2024, 20),
(231, 2024, 21);

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `user`
--

CREATE TABLE `user` (
  `id_user` int NOT NULL,
  `nick` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `admin` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Sťahujem dáta pre tabuľku `user`
--

INSERT INTO `user` (`id_user`, `nick`, `password`, `admin`) VALUES
(1, 'ADMINKO', 'KOTAKOMACKA', 1),
(19, 'MisoKulbaga', '$argon2id$v=19$m=65536,t=4,p=1$OWpVTXRmLkpPYnc5VjFKLw$PJlD+1SGgEQm2y169piyYnA2JAEWVog5D5ag1dfUt0Y', 0),
(20, 'MartickaKozarova', '$argon2id$v=19$m=65536,t=4,p=1$bUlnSXR6TUUwQUZkQU9mNA$Uz/OJIO1R2Yb5PBn0d6fVlu5iMNTOICC7zLokigIwnw', 0),
(21, 'JanoBajusz', '$argon2id$v=19$m=65536,t=4,p=1$UW9yWEZOUm8xMXhtYXFUSQ$OBhEdqb9ijmITgD8JrZRv+heoLZb8aflMB2TS27hi9E', 0),
(22, 'NepohodlnyUser', '$argon2id$v=19$m=65536,t=4,p=1$Wmh1VmxnWnUzOEdYVmZERA$bePg0Y0SWJS2Jlmxu5FvNdzRjAVq7bx5uw7uAh18w+U', 0),
(23, 'testtt', '$argon2id$v=19$m=65536,t=4,p=1$enovYW5QZVpLM1J4ZHRqLw$NwRnJ3FjkLactCjJDJn56VK8zTv51n/AnYBK8uG4uNU', 0);

--
-- Kľúče pre exportované tabuľky
--

--
-- Indexy pre tabuľku `answer`
--
ALTER TABLE `answer`
  ADD PRIMARY KEY (`id_answer`),
  ADD KEY `id_question` (`id_question`);

--
-- Indexy pre tabuľku `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`id_question`),
  ADD KEY `id_set` (`id_set`);

--
-- Indexy pre tabuľku `question_set`
--
ALTER TABLE `question_set`
  ADD PRIMARY KEY (`id_set`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexy pre tabuľku `stats`
--
ALTER TABLE `stats`
  ADD PRIMARY KEY (`id_stats`),
  ADD KEY `id_answer` (`id_answer`);

--
-- Indexy pre tabuľku `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT pre exportované tabuľky
--

--
-- AUTO_INCREMENT pre tabuľku `answer`
--
ALTER TABLE `answer`
  MODIFY `id_answer` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT pre tabuľku `question`
--
ALTER TABLE `question`
  MODIFY `id_question` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT pre tabuľku `question_set`
--
ALTER TABLE `question_set`
  MODIFY `id_set` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT pre tabuľku `stats`
--
ALTER TABLE `stats`
  MODIFY `id_stats` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=232;

--
-- AUTO_INCREMENT pre tabuľku `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Obmedzenie pre exportované tabuľky
--

--
-- Obmedzenie pre tabuľku `answer`
--
ALTER TABLE `answer`
  ADD CONSTRAINT `answer_ibfk_1` FOREIGN KEY (`id_question`) REFERENCES `question` (`id_question`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Obmedzenie pre tabuľku `question`
--
ALTER TABLE `question`
  ADD CONSTRAINT `question_ibfk_1` FOREIGN KEY (`id_set`) REFERENCES `question_set` (`id_set`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Obmedzenie pre tabuľku `question_set`
--
ALTER TABLE `question_set`
  ADD CONSTRAINT `question_set_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Obmedzenie pre tabuľku `stats`
--
ALTER TABLE `stats`
  ADD CONSTRAINT `stats_ibfk_1` FOREIGN KEY (`id_answer`) REFERENCES `answer` (`id_answer`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

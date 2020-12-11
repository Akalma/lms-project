-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 11, 2020 at 09:19 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cable`
--

-- --------------------------------------------------------

--
-- Table structure for table `appusers`
--

CREATE TABLE `appusers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `type` int(11) NOT NULL COMMENT '0=Normal 1=Admin',
  `created` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `appusers`
--

INSERT INTO `appusers` (`id`, `name`, `email`, `password`, `type`, `created`) VALUES
(1, 'Admin', 'admin@gmail.com', '123456', 1, '0000-00-00 00:00:00'),
(3, 'Normal User', 'admin2@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 0, '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `lead`
--

CREATE TABLE `lead` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `area` varchar(255) DEFAULT NULL,
  `existing_broadband` varchar(255) DEFAULT NULL,
  `lead_type` enum('HOT','WARM','COLD','CLOSED','') DEFAULT NULL,
  `added_by` int(11) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `creared_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `lead`
--

INSERT INTO `lead` (`id`, `first_name`, `last_name`, `mobile`, `area`, `existing_broadband`, `lead_type`, `added_by`, `remarks`, `creared_date`) VALUES
(1, 'Satyajit', 'Sadhukhan', '8442922399', 'Value 1', 'Value 1', 'HOT', 1, '', '2020-12-01 00:31:33'),
(2, 'Satyajit', 'Sadhukhan', '8442922399', 'Value 1', 'Value 1', 'HOT', 1, '', '2020-12-01 00:36:23'),
(3, 'John', 'Sadhukhan', '2145858956', 'Value 1', 'Value 1', 'HOT', 3, '', '2020-12-01 00:37:18'),
(5, 'Satyajit', 'Sadhukhan', '+918442922399', 'gg', 'AIRTEL', 'CLOSED', 1, 'This is test remarks', '2020-12-10 14:55:16'),
(6, 'Satyajit', 'Sadhukhan', '+918442922399', 'gg', 'OTHERS', 'HOT', 1, '', '2020-12-10 15:00:40');

-- --------------------------------------------------------

--
-- Stand-in structure for view `vw_leads`
-- (See below for the actual view)
--
CREATE TABLE `vw_leads` (
`id` int(11)
,`first_name` varchar(255)
,`last_name` varchar(255)
,`mobile` varchar(255)
,`area` varchar(255)
,`existing_broadband` varchar(255)
,`lead_type` enum('HOT','WARM','COLD','CLOSED','')
,`added_by` int(11)
,`creared_date` datetime
,`name` varchar(255)
,`remarks` text
);

-- --------------------------------------------------------

--
-- Structure for view `vw_leads`
--
DROP TABLE IF EXISTS `vw_leads`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vw_leads`  AS  select `lead`.`id` AS `id`,`lead`.`first_name` AS `first_name`,`lead`.`last_name` AS `last_name`,`lead`.`mobile` AS `mobile`,`lead`.`area` AS `area`,`lead`.`existing_broadband` AS `existing_broadband`,`lead`.`lead_type` AS `lead_type`,`lead`.`added_by` AS `added_by`,`lead`.`creared_date` AS `creared_date`,`appusers`.`name` AS `name`,`lead`.`remarks` AS `remarks` from (`lead` join `appusers` on(`appusers`.`id` = `lead`.`added_by`)) ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appusers`
--
ALTER TABLE `appusers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lead`
--
ALTER TABLE `lead`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appusers`
--
ALTER TABLE `appusers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `lead`
--
ALTER TABLE `lead`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 16, 2022 at 07:53 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `partialform`
--

-- --------------------------------------------------------

--
-- Table structure for table `depform`
--

CREATE TABLE `depform` (
  `id` int(12) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `age` int(12) NOT NULL,
  `relation` varchar(32) NOT NULL,
  `occupation` varchar(50) NOT NULL,
  `parentid` int(12) NOT NULL,
  `reffid` varchar(50) NOT NULL,
  `timestamp` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `depform`
--

INSERT INTO `depform` (`id`, `fullname`, `age`, `relation`, `occupation`, `parentid`, `reffid`, `timestamp`) VALUES
(12, 'eja', 21, 'na', 'vilheim', 18, '76f1b1665e25742b2c329e5391cd98c5', '2022-08-16');

-- --------------------------------------------------------

--
-- Table structure for table `mainform`
--

CREATE TABLE `mainform` (
  `id` int(12) NOT NULL,
  `detcode` varchar(50) NOT NULL,
  `brand` varchar(32) NOT NULL,
  `apptype` varchar(50) NOT NULL,
  `purpose` varchar(50) NOT NULL,
  `fname` varchar(32) NOT NULL,
  `mname` varchar(32) NOT NULL,
  `lname` varchar(32) NOT NULL,
  `birthday` date NOT NULL,
  `birthplace` varchar(32) NOT NULL,
  `alias` varchar(12) NOT NULL,
  `civilstatus` varchar(12) NOT NULL,
  `gender` varchar(12) NOT NULL,
  `nationality` varchar(24) NOT NULL,
  `religion` varchar(50) NOT NULL,
  `contact` int(32) NOT NULL,
  `email` varchar(32) NOT NULL,
  `currhouse` varchar(32) NOT NULL,
  `currstreet` varchar(32) NOT NULL,
  `currsubd` varchar(32) NOT NULL,
  `currbrng` varchar(32) NOT NULL,
  `currprov` varchar(32) NOT NULL,
  `currtown` varchar(32) NOT NULL,
  `permhouse` varchar(32) NOT NULL,
  `permstreet` varchar(32) NOT NULL,
  `permsubd` varchar(32) NOT NULL,
  `permbrng` varchar(32) NOT NULL,
  `permprov` varchar(32) NOT NULL,
  `permtown` varchar(32) NOT NULL,
  `provhouse` varchar(32) NOT NULL,
  `provstreet` varchar(32) NOT NULL,
  `provsubd` varchar(32) NOT NULL,
  `provbrng` varchar(32) NOT NULL,
  `provprov` varchar(32) NOT NULL,
  `provtown` varchar(32) NOT NULL,
  `employmenttype` varchar(32) NOT NULL,
  `employmentstat` varchar(32) NOT NULL,
  `employername` varchar(32) NOT NULL,
  `employeraddress` varchar(32) NOT NULL,
  `employercontact` int(32) NOT NULL,
  `employertel` varchar(32) NOT NULL,
  `position` varchar(32) NOT NULL,
  `servicelength` varchar(32) NOT NULL,
  `grossincome` int(32) NOT NULL,
  `othersource` varchar(32) NOT NULL,
  `expences` int(32) NOT NULL,
  `reffid` varchar(50) NOT NULL,
  `timestamp` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `mainform`
--

INSERT INTO `mainform` (`id`, `detcode`, `brand`, `apptype`, `purpose`, `fname`, `mname`, `lname`, `birthday`, `birthplace`, `alias`, `civilstatus`, `gender`, `nationality`, `religion`, `contact`, `email`, `currhouse`, `currstreet`, `currsubd`, `currbrng`, `currprov`, `currtown`, `permhouse`, `permstreet`, `permsubd`, `permbrng`, `permprov`, `permtown`, `provhouse`, `provstreet`, `provsubd`, `provbrng`, `provprov`, `provtown`, `employmenttype`, `employmentstat`, `employername`, `employeraddress`, `employercontact`, `employertel`, `position`, `servicelength`, `grossincome`, `othersource`, `expences`, `reffid`, `timestamp`) VALUES
(18, 'brandnew', 'honda', 'First time buying or applying motorcycle', 'Business Pasenger Side Car', 'nathaniel', 'aguilar', 'morales', '2022-08-16', 'gua gua', 'nath', 'Single', 'Male', 'filipino', 'christian', 912121212, 'nath@gmail.com', 'blk32 lot 23', 'vista drive', 'solana', 'magliman', 'city of san fernando', 'pampanga', 'blk 1', 'del pillar', 'davsan', 'sindalan', 'san fernando', 'pampanga', 'bl2', 'jose', 'laback', 'san roque', 'florida blanca', 'pampanga', 'Govenment', 'Regular', 'glen dimaandal', 'pilar village, san fernando', 9121212, '098008', 'web developer', '3 months', 20000, 'n/a', 10000, '76f1b1665e25742b2c329e5391cd98c5', '2022-08-16');

-- --------------------------------------------------------

--
-- Table structure for table `reffform`
--

CREATE TABLE `reffform` (
  `id` int(12) NOT NULL,
  `parentid` int(32) NOT NULL,
  `reffid` varchar(50) NOT NULL,
  `relatives` tinyint(1) NOT NULL,
  `fname` varchar(32) NOT NULL,
  `mname` varchar(32) NOT NULL,
  `lname` varchar(32) NOT NULL,
  `contact` int(32) NOT NULL,
  `raddress` varchar(50) NOT NULL,
  `timestamp` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `reffform`
--

INSERT INTO `reffform` (`id`, `parentid`, `reffid`, `relatives`, `fname`, `mname`, `lname`, `contact`, `raddress`, `timestamp`) VALUES
(18, 18, '76f1b1665e25742b2c329e5391cd98c5', 1, 'tifa', 'strike', 'lockhart', 507776, 'sector 7', '2022-08-16');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `depform`
--
ALTER TABLE `depform`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mainform`
--
ALTER TABLE `mainform`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reffform`
--
ALTER TABLE `reffform`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `depform`
--
ALTER TABLE `depform`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `mainform`
--
ALTER TABLE `mainform`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `reffform`
--
ALTER TABLE `reffform`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 3.4.8
-- http://www.phpmyadmin.net
--
-- Host: cias.rit.edu
-- Generation Time: Apr 09, 2012 at 01:59 AM
-- Server version: 5.1.41
-- PHP Version: 5.3.2-1ubuntu4.14

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `polaroid`
--
CREATE DATABASE `polaroid` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `polaroid`;

-- --------------------------------------------------------

--
-- Table structure for table `image_tags`
--

CREATE TABLE IF NOT EXISTS `image_tags` (
  `ImageID` int(11) NOT NULL COMMENT 'image from Image table',
  `TagID` int(11) NOT NULL COMMENT 'tag from Tags table',
  `weight` int(11) NOT NULL COMMENT 'How many times this tag was applied',
  `imagetagID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID of the Image_Tag table',
  PRIMARY KEY (`imagetagID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE IF NOT EXISTS `images` (
  `ImageID` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID Of Images',
  `Filename` varchar(100) NOT NULL COMMENT 'Filename of image',
  `Approved` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Boolean if the image has been approved for viewing',
  `message` varchar(100) DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ImageID`),
  UNIQUE KEY `Filename` (`Filename`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE IF NOT EXISTS `tags` (
  `tagID` int(11) NOT NULL AUTO_INCREMENT,
  `tag_text` varchar(100) NOT NULL,
  PRIMARY KEY (`tagID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

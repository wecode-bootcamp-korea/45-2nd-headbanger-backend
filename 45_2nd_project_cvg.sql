-- MySQL dump 10.13  Distrib 8.0.32, for macos13.0 (arm64)
--
-- Host: localhost    Database: 45_2nd_project_cvg
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `amenities`
--

DROP TABLE IF EXISTS `amenities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `amenities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `amenity_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `amenities`
--

LOCK TABLES `amenities` WRITE;
/*!40000 ALTER TABLE `amenities` DISABLE KEYS */;
INSERT INTO `amenities` VALUES (1,'샤워장'),(2,'수영장'),(3,'상점'),(4,'주차장'),(5,'취사장'),(6,'반려동물'),(7,'키즈존');
/*!40000 ALTER TABLE `amenities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `camping_zones`
--

DROP TABLE IF EXISTS `camping_zones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `camping_zones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `zone_name` varchar(100) NOT NULL,
  `x1` int NOT NULL,
  `x2` int NOT NULL,
  `x3` int NOT NULL,
  `x4` int NOT NULL,
  `y1` int NOT NULL,
  `y2` int NOT NULL,
  `y3` int NOT NULL,
  `y4` int NOT NULL,
  `zone_size_option_id` int NOT NULL,
  `camp_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `head_count_id` (`zone_size_option_id`),
  KEY `camp_id` (`camp_id`),
  CONSTRAINT `camping_zones_ibfk_1` FOREIGN KEY (`zone_size_option_id`) REFERENCES `zone_size_options` (`id`),
  CONSTRAINT `camping_zones_ibfk_2` FOREIGN KEY (`camp_id`) REFERENCES `camps` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `camping_zones`
--

LOCK TABLES `camping_zones` WRITE;
/*!40000 ALTER TABLE `camping_zones` DISABLE KEYS */;
/*!40000 ALTER TABLE `camping_zones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `camps`
--

DROP TABLE IF EXISTS `camps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `camps` (
  `id` int NOT NULL AUTO_INCREMENT,
  `campsite_name` varchar(200) NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `address` text NOT NULL,
  `latitude` varchar(30) DEFAULT NULL,
  `longitude` varchar(30) DEFAULT NULL,
  `description` text NOT NULL,
  `thumbnail` text NOT NULL,
  `picture` text NOT NULL,
  `view_map` text NOT NULL,
  `check_in` varchar(30) NOT NULL,
  `check_out` varchar(30) NOT NULL,
  `region_id` int NOT NULL,
  `theme_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `region_id` (`region_id`),
  KEY `theme_id` (`theme_id`),
  CONSTRAINT `camps_ibfk_1` FOREIGN KEY (`region_id`) REFERENCES `regions` (`id`),
  CONSTRAINT `camps_ibfk_2` FOREIGN KEY (`theme_id`) REFERENCES `themes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `camps`
--

LOCK TABLES `camps` WRITE;
/*!40000 ALTER TABLE `camps` DISABLE KEYS */;
INSERT INTO `camps` VALUES (1,'Campsite 1',50.00,'123 Example St, City','37.123456','127.123456','A beautiful campsite','thumbnail1.jpg','picture1.jpg','map1.jpg','','',1,1),(2,'Campsite 2',75.00,'456 Sample Rd, Town','38.654321','128.654321','A peaceful camping spot','thumbnail2.jpg','picture2.jpg','map2.jpg','','',2,2),(3,'Campsite 3',100.00,'789 Test Ave, Village','39.987654','129.987654','An adventurous camping experience','thumbnail3.jpg','picture3.jpg','map3.jpg','','',3,3),(4,'Campsite 4',80.00,'321 New St, County','40.456789','130.456789','A cozy campsite','thumbnail4.jpg','picture4.jpg','map4.jpg','','',4,4),(5,'Campsite 5',60.00,'987 Main Rd, Village','41.789012','131.789012','A secluded camping spot','thumbnail5.jpg','picture5.jpg','map5.jpg','','',5,1),(6,'Campsite 6',90.00,'654 First St, City','42.012345','132.012345','A family-friendly campsite','thumbnail6.jpg','picture6.jpg','map6.jpg','','',6,2),(7,'Campsite 7',70.00,'789 Elm Ave, Town','43.345678','133.345678','A campsite surrounded by nature','thumbnail7.jpg','picture7.jpg','map7.jpg','','',1,3),(8,'Campsite 8',55.00,'1234 Pine St, Village','44.678901','134.678901','A campsite with stunning views','thumbnail8.jpg','picture8.jpg','map8.jpg','','',2,4),(9,'Campsite 9',85.00,'567 Oak Rd, City','45.901234','135.901234','An eco-friendly camping experience','thumbnail9.jpg','picture9.jpg','map9.jpg','','',3,1),(10,'Campsite 10',95.00,'890 Maple Ave, Town','46.234567','136.234567','A rustic camping retreat','thumbnail10.jpg','picture10.jpg','map10.jpg','','',4,2),(11,'Campsite 11',65.00,'12345 Forest St, County','47.567890','137.567890','A campsite for adventure enthusiasts','thumbnail11.jpg','picture11.jpg','map11.jpg','','',5,3),(12,'Campsite 12',75.00,'9876 River Rd, City','48.901234','138.901234','A riverside camping spot','thumbnail12.jpg','picture12.jpg','map12.jpg','','',6,4),(13,'Campsite 13',105.00,'5432 Meadow Ave, Village','49.234567','139.234567','A luxury camping experience','thumbnail13.jpg','picture13.jpg','map13.jpg','','',1,1),(14,'Campsite 14',70.00,'9876 Hill Rd, Town','50.567890','140.567890','A peaceful getaway in nature','thumbnail14.jpg','picture14.jpg','map14.jpg','','',2,2),(15,'Campsite 15',80.00,'123 Pine St, City','51.901234','141.901234','A campsite surrounded by mountains','thumbnail15.jpg','picture15.jpg','map15.jpg','','',3,3),(16,'Campsite 16',90.00,'456 Oak Rd, Town','52.234567','142.234567','A campsite with lake views','thumbnail16.jpg','picture16.jpg','map16.jpg','','',4,4),(17,'Campsite 17',60.00,'789 Maple Ave, Village','53.567890','143.567890','A pet-friendly camping spot','thumbnail17.jpg','picture17.jpg','map17.jpg','','',5,1),(18,'Campsite 18',70.00,'789 Forest Rd, City','54.901234','144.901234','A campsite for nature lovers','thumbnail21.jpg','picture21.jpg','map21.jpg','','',6,1),(19,'Campsite 19',80.00,'987 Lake Ave, Town','55.234567','145.234567','A lakeside camping retreat','thumbnail22.jpg','picture22.jpg','map22.jpg','','',1,2),(20,'Campsite 20',90.00,'543 Mountain St, Village','56.567890','146.567890','A scenic mountain camping spot','thumbnail23.jpg','picture23.jpg','map23.jpg','','',2,3),(21,'Campsite 21',65.00,'123 River Rd, County','57.901234','147.901234','A riverside getaway','thumbnail24.jpg','picture24.jpg','map24.jpg','','',3,4),(22,'Campsite 22',95.00,'456 Hill Ave, City','58.234567','148.234567','A hilltop camping experience','thumbnail25.jpg','picture25.jpg','map25.jpg','','',4,1),(23,'Campsite 23',75.00,'789 Meadow St, Town','59.567890','149.567890','A campsite in a peaceful meadow','thumbnail26.jpg','picture26.jpg','map26.jpg','','',5,2),(24,'Campsite 24',85.00,'987 Pine Rd, Village','60.901234','150.901234','A campsite surrounded by pine trees','thumbnail27.jpg','picture27.jpg','map27.jpg','','',6,3),(25,'Campsite 25',55.00,'543 Oak Ave, City','61.234567','151.234567','A small and cozy campsite','thumbnail28.jpg','picture28.jpg','map28.jpg','','',1,4),(26,'Campsite 26',105.00,'123 Maple St, Town','62.567890','152.567890','A luxurious camping retreat','thumbnail29.jpg','picture29.jpg','map29.jpg','','',2,1),(27,'Campsite 27',100.00,'456 Forest Rd, County','63.901234','153.901234','A secluded forest camping spot','thumbnail30.jpg','picture30.jpg','map30.jpg','','',3,2);
/*!40000 ALTER TABLE `camps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `camps_amenities`
--

DROP TABLE IF EXISTS `camps_amenities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `camps_amenities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `camp_id` int NOT NULL,
  `amenity_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `camp_id` (`camp_id`),
  KEY `amenity_id` (`amenity_id`),
  CONSTRAINT `camps_amenities_ibfk_1` FOREIGN KEY (`camp_id`) REFERENCES `camps` (`id`),
  CONSTRAINT `camps_amenities_ibfk_2` FOREIGN KEY (`amenity_id`) REFERENCES `amenities` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `camps_amenities`
--

LOCK TABLES `camps_amenities` WRITE;
/*!40000 ALTER TABLE `camps_amenities` DISABLE KEYS */;
INSERT INTO `camps_amenities` VALUES (1,1,3),(2,1,5),(3,2,2),(4,2,4),(5,3,1),(6,3,6),(7,4,4),(8,5,1),(9,5,7),(10,6,3),(11,6,5),(12,7,2),(13,7,6),(14,8,1),(15,8,4),(16,9,3),(17,9,7),(18,10,2),(19,10,5),(20,11,1),(21,12,6),(22,13,4),(23,13,7),(24,14,3),(25,15,5),(26,16,2),(27,17,1),(28,18,4),(29,19,3),(30,20,7),(31,21,5),(32,22,2),(33,23,1),(34,24,6),(35,25,4),(36,26,7),(37,27,3);
/*!40000 ALTER TABLE `camps_amenities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `payment_number` varchar(200) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `regions`
--

DROP TABLE IF EXISTS `regions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `regions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `region_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regions`
--

LOCK TABLES `regions` WRITE;
/*!40000 ALTER TABLE `regions` DISABLE KEYS */;
INSERT INTO `regions` VALUES (1,'수도권'),(2,'강원도'),(3,'제주도'),(4,'충청도'),(5,'전라도'),(6,'경상도');
/*!40000 ALTER TABLE `regions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation_status`
--

DROP TABLE IF EXISTS `reservation_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation_status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation_status`
--

LOCK TABLES `reservation_status` WRITE;
/*!40000 ALTER TABLE `reservation_status` DISABLE KEYS */;
/*!40000 ALTER TABLE `reservation_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reservation_number` varchar(200) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `selected_zone` varchar(50) NOT NULL,
  `total_members` int NOT NULL,
  `user_id` int NOT NULL,
  `reservation_status_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `reservation_status_id` (`reservation_status_id`),
  CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `reservations_ibfk_3` FOREIGN KEY (`reservation_status_id`) REFERENCES `reservation_status` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
/*!40000 ALTER TABLE `reservations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservations_payments`
--

DROP TABLE IF EXISTS `reservations_payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservations_payments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reservation_id` int NOT NULL,
  `payment_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `reservation_id` (`reservation_id`),
  KEY `payment_id` (`payment_id`),
  CONSTRAINT `reservations_payments_ibfk_1` FOREIGN KEY (`reservation_id`) REFERENCES `reservations` (`id`),
  CONSTRAINT `reservations_payments_ibfk_2` FOREIGN KEY (`payment_id`) REFERENCES `payments` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations_payments`
--

LOCK TABLES `reservations_payments` WRITE;
/*!40000 ALTER TABLE `reservations_payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `reservations_payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `view_score` float NOT NULL,
  `safety_score` float NOT NULL,
  `cost__score` float NOT NULL,
  `clean_score` float NOT NULL,
  `convenience_score` float NOT NULL,
  `user_id` int NOT NULL,
  `camp_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `camp_id` (`camp_id`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`camp_id`) REFERENCES `camps` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,'Lovely campground!',4,5,4,4,5,3,2,'2023-05-25 07:51:03',NULL),(2,'Disappointing experience.',2,3,2,2,3,6,9,'2023-05-25 07:51:03',NULL),(3,'Highly recommended!',5,5,5,5,5,9,12,'2023-05-25 07:51:03',NULL),(4,'Great value for money.',4,4,5,4,4,11,16,'2023-05-25 07:51:03',NULL),(5,'Scenic views!',5,4,4,5,4,14,19,'2023-05-25 07:51:03',NULL),(6,'Average amenities.',3,3,3,3,3,16,22,'2023-05-25 07:51:03',NULL),(7,'Clean and well-maintained.',4,5,4,5,5,18,25,'2023-05-25 07:51:03',NULL),(8,'Peaceful atmosphere.',4,4,3,4,4,20,27,'2023-05-25 07:51:03',NULL),(9,'Family-friendly campground.',5,4,4,5,5,4,6,'2023-05-25 07:51:03',NULL),(10,'Needs improvement in cleanliness.',2,3,3,2,3,7,11,'2023-05-25 07:51:03',NULL),(11,'Excellent facilities!',5,5,5,5,5,13,17,'2023-05-25 07:51:03',NULL),(12,'Good location.',4,4,3,4,4,19,23,'2023-05-25 07:51:03',NULL),(13,'Friendly staff.',4,4,4,4,4,5,8,'2023-05-25 07:51:03',NULL),(14,'Disorganized management.',2,2,3,2,2,8,14,'2023-05-25 07:51:03',NULL),(15,'Beautiful nature trails.',5,4,4,5,4,12,20,'2023-05-25 07:51:03',NULL),(16,'Limited amenities.',3,3,2,3,3,15,26,'2023-05-25 07:51:03',NULL),(17,'Cozy camping experience.',4,5,4,4,5,17,24,'2023-05-25 07:51:03',NULL),(18,'Affordable rates.',4,4,5,4,4,10,13,'2023-05-25 07:51:03',NULL),(19,'Noisy surroundings.',2,3,3,2,2,2,5,'2023-05-25 07:51:03',NULL),(20,'Well-maintained facilities.',5,5,4,5,5,1,3,'2023-05-25 07:51:03',NULL),(21,'Great campground!',5,4,5,4,5,1,1,'2023-05-25 07:51:03',NULL),(22,'Wonderful experience!',4,5,4,5,4,2,3,'2023-05-25 07:51:03',NULL),(23,'Average campground.',3,3,4,3,4,3,5,'2023-05-25 07:51:03',NULL),(24,'Beautiful location!',5,4,4,5,4,4,7,'2023-05-25 07:51:03',NULL),(25,'Needs improvement in facilities.',3,2,3,2,3,5,10,'2023-05-25 07:51:03',NULL),(26,'Highly recommended!',5,5,4,5,5,8,13,'2023-05-25 07:51:03',NULL),(27,'Good amenities!',4,4,3,4,4,10,15,'2023-05-25 07:51:03',NULL),(28,'Excellent customer service!',5,5,5,5,5,12,18,'2023-05-25 07:51:03',NULL),(29,'Cozy atmosphere.',3,4,3,4,4,15,21,'2023-05-25 07:51:03',NULL),(30,'Family-friendly.',4,5,4,4,5,17,24,'2023-05-25 07:51:03',NULL);
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schema_migrations`
--

DROP TABLE IF EXISTS `schema_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schema_migrations` (
  `version` varchar(128) NOT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schema_migrations`
--

LOCK TABLES `schema_migrations` WRITE;
/*!40000 ALTER TABLE `schema_migrations` DISABLE KEYS */;
INSERT INTO `schema_migrations` VALUES ('20230522082453'),('20230522082552'),('20230522082602'),('20230522083044'),('20230522083100'),('20230522083119'),('20230522083135'),('20230522083140'),('20230522083145'),('20230522083158'),('20230522083217'),('20230523024249'),('20230523112008'),('20230523112210'),('20230523112218'),('20230523112751'),('20230523113326'),('20230524052957'),('20230524055759'),('20230525051132');
/*!40000 ALTER TABLE `schema_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `themes`
--

DROP TABLE IF EXISTS `themes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `themes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `theme` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `themes`
--

LOCK TABLES `themes` WRITE;
/*!40000 ALTER TABLE `themes` DISABLE KEYS */;
INSERT INTO `themes` VALUES (1,'산'),(2,'바다'),(3,'도심'),(4,'호수');
/*!40000 ALTER TABLE `themes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(200) DEFAULT NULL,
  `kakao_id` bigint DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `profile_image` text,
  `phone_number` varchar(100) DEFAULT NULL,
  `points` decimal(10,2) DEFAULT NULL,
  `theme_id` int DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `theme_id` (`theme_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`theme_id`) REFERENCES `themes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'user1@example.com',123456789,'password1','John Doe',NULL,'010-1234-5678',100000.00,2,'2023-05-24 06:18:48',NULL),(2,'user2@example.com',987654321,'password2','Jane Smith',NULL,'010-9876-5432',100000.00,4,'2023-05-24 06:18:48',NULL),(3,'user3@example.com',456789123,'password3','Mike Johnson',NULL,'010-4567-8912',100000.00,3,'2023-05-24 06:18:48',NULL),(4,'user4@example.com',321654987,'password4','Sarah Lee',NULL,'010-3216-5498',100000.00,3,'2023-05-24 06:18:48',NULL),(5,'user5@example.com',654321987,'password5','Emily Davis',NULL,'010-6543-2198',100000.00,3,'2023-05-24 06:18:48',NULL),(6,'user6@example.com',789456123,'password6','David Wilson',NULL,'010-7894-5612',100000.00,3,'2023-05-24 06:18:48',NULL),(7,'user7@example.com',951753852,'password7','Olivia Moore',NULL,'010-9517-5385',100000.00,4,'2023-05-24 06:18:48',NULL),(8,'user8@example.com',852963741,'password8','James Johnson',NULL,'010-8529-6374',100000.00,3,'2023-05-24 06:18:48',NULL),(9,'user9@example.com',147258369,'password9','Sophia Brown',NULL,'010-1472-5836',100000.00,2,'2023-05-24 06:18:48',NULL),(10,'user10@example.com',369258147,'password10','William Taylor',NULL,'010-3692-5814',100000.00,1,'2023-05-24 06:18:48',NULL),(11,'user11@example.com',258369147,'password11','Ava Anderson',NULL,'010-2583-6914',100000.00,3,'2023-05-24 06:18:48',NULL),(12,'user12@example.com',963852741,'password12','Liam Jackson',NULL,'010-9638-5274',100000.00,1,'2023-05-24 06:18:48',NULL),(13,'user13@example.com',741852963,'password13','Mia Thompson',NULL,'010-7418-5296',100000.00,2,'2023-05-24 06:18:48',NULL),(14,'user14@example.com',852741963,'password14','Isabella White',NULL,'010-8527-4196',100000.00,4,'2023-05-24 06:18:48',NULL),(15,'user15@example.com',369147258,'password15','Benjamin Harris',NULL,'010-3691-4725',100000.00,4,'2023-05-24 06:18:48',NULL),(16,'user16@example.com',987321654,'password16','Ethan Clark',NULL,'010-9873-2165',100000.00,4,'2023-05-24 06:18:48',NULL),(17,'user17@example.com',741963852,'password17','Charlotte Walker',NULL,'010-7419-6385',100000.00,2,'2023-05-24 06:18:48',NULL),(18,'user18@example.com',369741852,'password18','Harper Turner',NULL,'010-3697-4185',100000.00,4,'2023-05-24 06:18:48',NULL),(19,'user19@example.com',852369741,'password19','Sebastian Martinez',NULL,'010-8523-6974',100000.00,2,'2023-05-24 06:18:48',NULL),(20,'user20@example.com',741258963,'password20','Avery Garcia',NULL,'010-7412-5896',100000.00,3,'2023-05-24 06:18:48',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlists`
--

DROP TABLE IF EXISTS `wishlists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlists` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `camp_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`camp_id`),
  KEY `camp_id` (`camp_id`),
  CONSTRAINT `wishlists_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `wishlists_ibfk_2` FOREIGN KEY (`camp_id`) REFERENCES `camps` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=139 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlists`
--

LOCK TABLES `wishlists` WRITE;
/*!40000 ALTER TABLE `wishlists` DISABLE KEYS */;
INSERT INTO `wishlists` VALUES (2,1,1,'2023-05-24 06:24:00',NULL),(3,1,2,'2023-05-24 06:24:00',NULL),(4,2,3,'2023-05-24 06:24:00',NULL),(5,2,4,'2023-05-24 06:24:00',NULL),(6,3,5,'2023-05-24 06:24:00',NULL),(7,3,6,'2023-05-24 06:24:00',NULL),(8,4,7,'2023-05-24 06:24:00',NULL),(9,4,8,'2023-05-24 06:24:00',NULL),(10,5,9,'2023-05-24 06:24:00',NULL),(11,5,10,'2023-05-24 06:24:00',NULL),(12,6,11,'2023-05-24 06:24:00',NULL),(13,6,12,'2023-05-24 06:24:00',NULL),(14,7,13,'2023-05-24 06:24:00',NULL),(15,7,14,'2023-05-24 06:24:00',NULL),(16,8,15,'2023-05-24 06:24:00',NULL),(17,8,16,'2023-05-24 06:24:00',NULL),(18,9,17,'2023-05-24 06:24:00',NULL),(19,9,18,'2023-05-24 06:24:00',NULL),(20,10,19,'2023-05-24 06:24:00',NULL),(21,10,20,'2023-05-24 06:24:00',NULL),(22,11,21,'2023-05-24 06:24:09',NULL),(23,11,22,'2023-05-24 06:24:09',NULL),(24,12,23,'2023-05-24 06:24:09',NULL),(25,12,24,'2023-05-24 06:24:09',NULL),(26,13,25,'2023-05-24 06:24:09',NULL),(27,13,26,'2023-05-24 06:24:09',NULL),(28,14,27,'2023-05-24 06:24:09',NULL),(29,14,1,'2023-05-24 06:24:09',NULL),(30,15,2,'2023-05-24 06:24:09',NULL),(31,15,3,'2023-05-24 06:24:09',NULL),(32,16,4,'2023-05-24 06:24:09',NULL),(33,16,5,'2023-05-24 06:24:09',NULL),(34,17,6,'2023-05-24 06:24:09',NULL),(35,17,7,'2023-05-24 06:24:09',NULL),(36,18,8,'2023-05-24 06:24:09',NULL),(37,18,9,'2023-05-24 06:24:09',NULL),(38,19,10,'2023-05-24 06:24:09',NULL),(39,19,11,'2023-05-24 06:24:09',NULL),(40,20,12,'2023-05-24 06:24:09',NULL),(41,20,13,'2023-05-24 06:24:09',NULL),(120,1,14,'2023-05-24 06:25:57',NULL),(121,2,15,'2023-05-24 06:25:57',NULL),(122,3,16,'2023-05-24 06:25:57',NULL),(123,4,17,'2023-05-24 06:25:57',NULL),(124,5,18,'2023-05-24 06:25:57',NULL),(125,6,19,'2023-05-24 06:25:57',NULL),(126,7,20,'2023-05-24 06:25:57',NULL),(127,8,21,'2023-05-24 06:25:57',NULL),(128,9,22,'2023-05-24 06:25:57',NULL),(129,10,23,'2023-05-24 06:25:57',NULL),(130,11,24,'2023-05-24 06:25:57',NULL),(131,12,25,'2023-05-24 06:25:57',NULL),(132,13,27,'2023-05-24 06:25:57',NULL),(133,15,1,'2023-05-24 06:25:57',NULL),(134,16,2,'2023-05-24 06:25:57',NULL),(135,17,3,'2023-05-24 06:25:57',NULL),(136,18,4,'2023-05-24 06:25:57',NULL),(137,19,5,'2023-05-24 06:25:57',NULL),(138,20,6,'2023-05-24 06:25:57',NULL);
/*!40000 ALTER TABLE `wishlists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zone_size_options`
--

DROP TABLE IF EXISTS `zone_size_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `zone_size_options` (
  `id` int NOT NULL AUTO_INCREMENT,
  `additional_price` decimal(10,2) NOT NULL,
  `max_people` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zone_size_options`
--

LOCK TABLES `zone_size_options` WRITE;
/*!40000 ALTER TABLE `zone_size_options` DISABLE KEYS */;
/*!40000 ALTER TABLE `zone_size_options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zones_reservations`
--

DROP TABLE IF EXISTS `zones_reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `zones_reservations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reservation_id` int NOT NULL,
  `camping_zone_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `reservation_id` (`reservation_id`),
  KEY `camping_zone_id` (`camping_zone_id`),
  CONSTRAINT `zones_reservations_ibfk_1` FOREIGN KEY (`reservation_id`) REFERENCES `reservations` (`id`),
  CONSTRAINT `zones_reservations_ibfk_2` FOREIGN KEY (`camping_zone_id`) REFERENCES `camping_zones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zones_reservations`
--

LOCK TABLES `zones_reservations` WRITE;
/*!40000 ALTER TABLE `zones_reservations` DISABLE KEYS */;
/*!40000 ALTER TABLE `zones_reservations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-25 19:43:53

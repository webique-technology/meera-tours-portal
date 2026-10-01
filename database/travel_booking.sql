-- Meera Tours & Travels — MySQL schema + seed
CREATE DATABASE IF NOT EXISTS travel_booking
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
USE travel_booking;

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS booking_items;
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS enquiries;
DROP TABLE IF EXISTS contact_messages;
DROP TABLE IF EXISTS hotel_rooms;
DROP TABLE IF EXISTS package_destinations;
DROP TABLE IF EXISTS holiday_packages;
DROP TABLE IF EXISTS hotels;
DROP TABLE IF EXISTS flights;
DROP TABLE IF EXISTS bus_routes;
DROP TABLE IF EXISTS visa_services;
DROP TABLE IF EXISTS destinations;
DROP TABLE IF EXISTS testimonials;
DROP TABLE IF EXISTS offers;
DROP TABLE IF EXISTS banners;
DROP TABLE IF EXISTS users;

SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL UNIQUE,
  phone VARCHAR(20) DEFAULT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin','agent','customer') NOT NULL DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE destinations (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(80) NOT NULL UNIQUE,
  name VARCHAR(120) NOT NULL,
  country VARCHAR(80) NOT NULL,
  type VARCHAR(40) NOT NULL,
  tagline VARCHAR(180) DEFAULT NULL,
  image VARCHAR(400) DEFAULT NULL,
  starting_price INT UNSIGNED DEFAULT 0,
  packages INT UNSIGNED DEFAULT 0
) ENGINE=InnoDB;

CREATE TABLE flights (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  flight_code VARCHAR(20) NOT NULL UNIQUE,
  airline VARCHAR(80) NOT NULL,
  origin VARCHAR(8) NOT NULL,
  destination VARCHAR(8) NOT NULL,
  depart_time VARCHAR(8) NOT NULL,
  arrive_time VARCHAR(8) NOT NULL,
  duration VARCHAR(20) NOT NULL,
  stops TINYINT UNSIGNED DEFAULT 0,
  cabin VARCHAR(40) DEFAULT 'Economy',
  price INT UNSIGNED NOT NULL,
  seats INT UNSIGNED DEFAULT 0,
  aircraft VARCHAR(40) DEFAULT NULL,
  baggage VARCHAR(120) DEFAULT NULL,
  refundable TINYINT(1) DEFAULT 0
) ENGINE=InnoDB;

CREATE TABLE hotels (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(120) NOT NULL UNIQUE,
  name VARCHAR(180) NOT NULL,
  city VARCHAR(80) NOT NULL,
  country VARCHAR(80) NOT NULL,
  stars TINYINT UNSIGNED DEFAULT 4,
  rating DECIMAL(2,1) DEFAULT 4.5,
  reviews INT UNSIGNED DEFAULT 0,
  image VARCHAR(400) DEFAULT NULL,
  gallery JSON DEFAULT NULL,
  amenities JSON DEFAULT NULL,
  summary TEXT,
  price_from INT UNSIGNED NOT NULL
) ENGINE=InnoDB;

CREATE TABLE hotel_rooms (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  hotel_id INT UNSIGNED NOT NULL,
  name VARCHAR(120) NOT NULL,
  beds VARCHAR(80) DEFAULT NULL,
  guests TINYINT UNSIGNED DEFAULT 2,
  price INT UNSIGNED NOT NULL,
  CONSTRAINT fk_rooms_hotel FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE holiday_packages (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(120) NOT NULL UNIQUE,
  title VARCHAR(180) NOT NULL,
  destination VARCHAR(80) NOT NULL,
  country VARCHAR(80) NOT NULL,
  nights TINYINT UNSIGNED NOT NULL,
  days TINYINT UNSIGNED NOT NULL,
  price INT UNSIGNED NOT NULL,
  old_price INT UNSIGNED DEFAULT NULL,
  image VARCHAR(400) DEFAULT NULL,
  theme VARCHAR(40) DEFAULT NULL,
  rating DECIMAL(2,1) DEFAULT 4.6,
  highlights JSON DEFAULT NULL,
  itinerary JSON DEFAULT NULL,
  includes JSON DEFAULT NULL,
  excludes JSON DEFAULT NULL
) ENGINE=InnoDB;

CREATE TABLE package_destinations (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  package_id INT UNSIGNED NOT NULL,
  destination_id INT UNSIGNED NOT NULL,
  CONSTRAINT fk_pd_package FOREIGN KEY (package_id) REFERENCES holiday_packages(id) ON DELETE CASCADE,
  CONSTRAINT fk_pd_destination FOREIGN KEY (destination_id) REFERENCES destinations(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE bus_routes (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  route_code VARCHAR(40) NOT NULL UNIQUE,
  operator VARCHAR(120) NOT NULL,
  type VARCHAR(80) NOT NULL,
  origin VARCHAR(80) NOT NULL,
  destination VARCHAR(80) NOT NULL,
  depart_time VARCHAR(8) NOT NULL,
  arrive_time VARCHAR(8) NOT NULL,
  duration VARCHAR(20) NOT NULL,
  price INT UNSIGNED NOT NULL,
  seats INT UNSIGNED DEFAULT 0,
  amenities JSON DEFAULT NULL,
  boarding JSON DEFAULT NULL
) ENGINE=InnoDB;

CREATE TABLE visa_services (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(120) NOT NULL UNIQUE,
  country VARCHAR(120) NOT NULL,
  title VARCHAR(180) NOT NULL,
  type VARCHAR(80) NOT NULL,
  processing_days VARCHAR(60) DEFAULT NULL,
  price INT UNSIGNED NOT NULL,
  validity VARCHAR(60) DEFAULT NULL,
  image VARCHAR(400) DEFAULT NULL,
  documents JSON DEFAULT NULL,
  notes TEXT
) ENGINE=InnoDB;

CREATE TABLE bookings (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED DEFAULT NULL,
  booking_ref VARCHAR(24) NOT NULL UNIQUE,
  type ENUM('flight','hotel','holiday','bus','visa') NOT NULL,
  status ENUM('enquiry','hold','confirmed','cancelled') NOT NULL DEFAULT 'enquiry',
  total_amount INT UNSIGNED DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_bookings_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE booking_items (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  booking_id INT UNSIGNED NOT NULL,
  item_type VARCHAR(40) NOT NULL,
  item_ref VARCHAR(80) DEFAULT NULL,
  description VARCHAR(255) DEFAULT NULL,
  amount INT UNSIGNED DEFAULT 0,
  CONSTRAINT fk_items_booking FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE enquiries (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  type VARCHAR(40) NOT NULL,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  message TEXT,
  details JSON DEFAULT NULL,
  status ENUM('new','in_progress','closed') NOT NULL DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE contact_messages (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  subject VARCHAR(180) NOT NULL,
  message TEXT NOT NULL,
  status ENUM('new','replied','closed') NOT NULL DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE testimonials (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  place VARCHAR(80) DEFAULT NULL,
  rating TINYINT UNSIGNED DEFAULT 5,
  text TEXT NOT NULL,
  trip VARCHAR(120) DEFAULT NULL
) ENGINE=InnoDB;

CREATE TABLE offers (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(40) NOT NULL UNIQUE,
  title VARCHAR(180) NOT NULL,
  text VARCHAR(255) DEFAULT NULL,
  type VARCHAR(40) DEFAULT NULL,
  accent VARCHAR(20) DEFAULT 'navy'
) ENGINE=InnoDB;

CREATE TABLE banners (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(180) NOT NULL,
  subtitle VARCHAR(255) DEFAULT NULL,
  image VARCHAR(400) DEFAULT NULL,
  href VARCHAR(180) DEFAULT NULL,
  cta VARCHAR(60) DEFAULT NULL
) ENGINE=InnoDB;

INSERT INTO users (name, email, phone, password_hash, role) VALUES
('Meera Admin', 'admin@meeratourstravels.in', '+917507778070', '$2y$10$examplehashreplaceinproductionxx', 'admin');

INSERT INTO destinations (slug, name, country, type, tagline, image, starting_price, packages) VALUES
('goa', 'Goa', 'India', 'beach', 'Sun, sand and easy weekends', 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1400&q=80', 8999, 8),
('kerala', 'Kerala', 'India', 'nature', 'Backwaters and tea hills', 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1400&q=80', 14999, 6),
('dubai', 'Dubai', 'UAE', 'city', 'Skyline nights and desert days', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=80', 28999, 7),
('maldives', 'Maldives', 'Maldives', 'beach', 'Overwater villas, turquoise lagoons', 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1400&q=80', 54999, 5),
('manali', 'Manali', 'India', 'mountain', 'Snow peaks and pine valleys', 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1400&q=80', 11999, 4),
('singapore', 'Singapore', 'Singapore', 'city', 'Gardens, lights and food streets', 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1400&q=80', 32999, 5),
('thailand', 'Thailand', 'Thailand', 'beach', 'Temples, islands and street food', 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1400&q=80', 24999, 9),
('kashmir', 'Kashmir', 'India', 'mountain', 'Dal Lake and alpine meadows', 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1400&q=80', 16999, 4);

INSERT INTO flights (flight_code, airline, origin, destination, depart_time, arrive_time, duration, stops, cabin, price, seats, aircraft, baggage, refundable) VALUES
('AI-615', 'Air India', 'BOM', 'DEL', '06:15', '08:25', '2h 10m', 0, 'Economy', 4899, 12, 'A320neo', '15 kg check-in + 7 kg cabin', 1),
('6E-204', 'IndiGo', 'BOM', 'DEL', '09:40', '11:55', '2h 15m', 0, 'Economy', 4520, 8, 'A321neo', '15 kg check-in + 7 kg cabin', 0),
('UK-940', 'Vistara', 'DEL', 'GOI', '13:20', '16:05', '2h 45m', 0, 'Economy', 6120, 6, 'A320neo', '15 kg check-in + 7 kg cabin', 1),
('SG-118', 'SpiceJet', 'DEL', 'DXB', '22:10', '00:55', '3h 45m', 0, 'Economy', 14890, 9, 'B737-800', '30 kg check-in + 7 kg cabin', 0),
('EK-507', 'Emirates', 'BOM', 'DXB', '04:25', '06:10', '3h 15m', 0, 'Economy', 18650, 14, 'B777-300ER', '30 kg check-in + 7 kg cabin', 1),
('AI-430', 'Air India', 'DEL', 'BKK', '00:40', '06:20', '4h 10m', 0, 'Economy', 17200, 11, 'A350-900', '25 kg check-in + 8 kg cabin', 1),
('6E-881', 'IndiGo', 'BLR', 'SIN', '01:15', '08:10', '4h 25m', 0, 'Economy', 19800, 7, 'A321neo', '30 kg check-in + 7 kg cabin', 0),
('UK-877', 'Vistara', 'BOM', 'GOI', '15:35', '16:50', '1h 15m', 0, 'Economy', 3899, 16, 'A320neo', '15 kg check-in + 7 kg cabin', 1),
('AI-981', 'Air India', 'BOM', 'MLE', '10:05', '12:20', '2h 15m', 0, 'Economy', 21400, 5, 'A321', '25 kg check-in + 8 kg cabin', 1),
('6E-5302', 'IndiGo', 'PNQ', 'DEL', '07:50', '10:00', '2h 10m', 0, 'Economy', 4199, 10, 'A320neo', '15 kg check-in + 7 kg cabin', 0);

INSERT INTO hotels (slug, name, city, country, stars, rating, reviews, image, gallery, amenities, summary, price_from) VALUES
('taj-fort-aguada-goa', 'Taj Fort Aguada Resort & Spa', 'Goa', 'India', 5, 4.7, 2140,
 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80',
 '["https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80"]',
 '["Sea view","Spa","Infinity pool"]',
 'A cliff-top heritage resort overlooking the Arabian Sea.', 18900),
('the-leela-kovalam', 'The Leela Kovalam', 'Kovalam', 'India', 5, 4.6, 1688,
 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1400&q=80',
 '[]', '["Private beach","Ayurveda spa"]',
 'Terraced rooms on a laterite cliff with a private cove.', 16450),
('atlantis-the-palm-dubai', 'Atlantis The Palm', 'Dubai', 'UAE', 5, 4.5, 9800,
 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1400&q=80',
 '[]', '["Aquaventure","Private beach"]',
 'Iconic Palm Jumeirah resort with a waterpark.', 24500),
('conrad-maldives-rangali', 'Conrad Maldives Rangali Island', 'Rangali', 'Maldives', 5, 4.8, 3210,
 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=1400&q=80',
 '[]', '["Overwater villa","Spa"]',
 'Two private islands linked by a wooden bridge.', 62000),
('the-oberoi-wildflower-hall', 'The Oberoi Wildflower Hall', 'Shimla', 'India', 5, 4.9, 890,
 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=80',
 '[]', '["Mountain spa","Heated pool"]',
 'A cedar-wood lodge in a 22-acre forest above Mashobra.', 27800),
('marina-bay-sands', 'Marina Bay Sands', 'Singapore', 'Singapore', 5, 4.4, 15400,
 'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?auto=format&fit=crop&w=1400&q=80',
 '[]', '["Infinity pool","SkyPark"]',
 'Three towers with a sky park and rooftop pool.', 31200);

INSERT INTO hotel_rooms (hotel_id, name, beds, guests, price) VALUES
(1, 'Garden View Room', 'King', 2, 18900),
(1, 'Sea View Suite', 'King + sofa', 3, 26800),
(2, 'Pavilion Room', 'King', 2, 16450),
(3, 'Palm Room', 'Twin / King', 2, 24500),
(4, 'Water Villa', 'King', 2, 84500),
(5, 'Deluxe Room', 'King', 2, 27800),
(6, 'Deluxe Room', 'King', 2, 31200);

INSERT INTO holiday_packages (slug, title, destination, country, nights, days, price, old_price, image, theme, rating, highlights, itinerary, includes, excludes) VALUES
('goa-beach-escape', 'Goa Beach Escape', 'Goa', 'India', 4, 5, 18999, 22999,
 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1400&q=80',
 'Beach', 4.6,
 '["4 nights beach stay","Airport transfers","Breakfast"]',
 '[{"day":1,"title":"Arrive","detail":"Airport pickup and beach evening."}]',
 '["Hotel with breakfast","Private AC transfers"]',
 '["Flights","Personal expenses"]'),
('kerala-backwater-bliss', 'Kerala Backwater Bliss', 'Kerala', 'India', 6, 7, 32999, 37999,
 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1400&q=80',
 'Nature', 4.8,
 '["Munnar + Thekkady + Alleppey","Houseboat night"]',
 '[{"day":1,"title":"Cochin to Munnar","detail":"Scenic drive through tea estates."}]',
 '["Hotels + houseboat","Daily breakfast"]',
 '["Flights"]'),
('dubai-city-lights', 'Dubai City Lights', 'Dubai', 'UAE', 4, 5, 42999, 49999,
 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=80',
 'City', 4.7,
 '["Burj Khalifa","Desert safari"]',
 '[{"day":1,"title":"Arrive Dubai","detail":"Meet and greet and hotel check-in."}]',
 '["Hotel with breakfast","Shared sightseeing"]',
 '["International flights"]'),
('maldives-honeymoon', 'Maldives Honeymoon', 'Maldives', 'Maldives', 4, 5, 78999, 88999,
 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1400&q=80',
 'Honeymoon', 4.9,
 '["Water villa option","All meals"]',
 '[{"day":1,"title":"Male to resort","detail":"Speedboat or seaplane transfer."}]',
 '["Resort stay","All meals"]',
 '["Flights"]');

INSERT INTO package_destinations (package_id, destination_id) VALUES
(1, 1), (2, 2), (3, 3), (4, 4);

INSERT INTO bus_routes (route_code, operator, type, origin, destination, depart_time, arrive_time, duration, price, seats, amenities, boarding) VALUES
('bus-nsk-mum-01', 'Meera Volvo', 'AC Sleeper', 'Nashik', 'Mumbai', '22:30', '03:15', '4h 45m', 899, 18,
 '["Blanket","Charging point"]', '["CBS Thakkar Bazar","Mumbai Naka"]'),
('bus-nsk-pun-02', 'Meera Scania', 'AC Seater', 'Nashik', 'Pune', '06:00', '10:20', '4h 20m', 749, 22,
 '["Wi-Fi","Charging point"]', '["CBS","College Road"]'),
('bus-mum-goa-03', 'Coastal Travels', 'AC Sleeper', 'Mumbai', 'Goa', '19:00', '07:30', '12h 30m', 1499, 10,
 '["Blanket","Snacks"]', '["Dadar","Vashi"]'),
('bus-del-man-04', 'Himalayan Volvo', 'AC Sleeper', 'Delhi', 'Manali', '17:30', '08:00', '14h 30m', 1699, 8,
 '["Blanket","CCTV"]', '["Kashmere Gate"]');

INSERT INTO visa_services (slug, country, title, type, processing_days, price, validity, image, documents, notes) VALUES
('uae-tourist-visa', 'United Arab Emirates', 'UAE Tourist Visa', 'Tourist', '3–5 working days', 7500, '30 / 60 days',
 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=80',
 '["Passport scan","Photo","Return ticket"]',
 'We file 30-day and 60-day tourist visas.'),
('singapore-tourist-visa', 'Singapore', 'Singapore Tourist Visa', 'Tourist', '5–7 working days', 4200, '30 days',
 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1400&q=80',
 '["Passport","Photo","Bank statement"]',
 'Multiple-entry visas requested where travel history supports it.'),
('schengen-tourist-visa', 'Schengen / Europe', 'Schengen Tourist Visa', 'Tourist', '15–20 working days', 12500, 'As per embassy',
 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1400&q=80',
 '["Passport","Cover letter","Insurance","Bank statements"]',
 'Appointment booking and embassy filing support.');

INSERT INTO offers (code, title, text, type, accent) VALUES
('MEERAFLAT2000', 'Flat ₹2,000 off holidays', 'Use on any domestic package above ₹18,000.', 'holiday', 'coral'),
('SKYSTART', 'First flight enquiry perk', 'Complimentary seat preference request.', 'flight', 'navy'),
('STAYMORE', '4th night hotel offer', 'Ask us about participating beach properties.', 'hotel', 'gold');

INSERT INTO banners (title, subtitle, image, href, cta) VALUES
('Summer skies are open', 'Domestic fares from ₹3,899', 'https://images.unsplash.com/photo-1436491865331-4ffd6da5851e?auto=format&fit=crop&w=1800&q=80', '/flights', 'Search flights'),
('Monsoon Kerala, done right', 'Houseboats, tea hills and rain-washed forts', 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1800&q=80', '/holiday-packages/kerala-backwater-bliss', 'View package');

INSERT INTO testimonials (name, place, rating, text, trip) VALUES
('Ananya Deshpande', 'Pune', 5, 'They reissued our tickets the same evening after a family emergency.', 'Mumbai–Goa flights'),
('Rahul & Meera Shah', 'Nashik', 5, 'Our Maldives villa and transfers were exactly as promised.', 'Maldives honeymoon'),
('Sneha Kulkarni', 'Mumbai', 5, 'Schengen file was organised like a checklist I could actually follow.', 'Italy family visa');

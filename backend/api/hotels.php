<?php

require_once __DIR__ . '/../includes/bootstrap.php';
require_once __DIR__ . '/../controllers/HotelController.php';

$slug = $_GET['slug'] ?? null;
(new HotelController())->handle($slug);

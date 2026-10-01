<?php

require_once __DIR__ . '/../includes/bootstrap.php';
require_once __DIR__ . '/../controllers/PackageController.php';

$slug = $_GET['slug'] ?? null;
(new PackageController())->handle($slug);

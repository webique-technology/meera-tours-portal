<?php

require_once __DIR__ . '/../includes/bootstrap.php';
require_once __DIR__ . '/../controllers/VisaController.php';

$slug = $_GET['slug'] ?? null;
(new VisaController())->handle($slug);

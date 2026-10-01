<?php

require_once __DIR__ . '/../includes/bootstrap.php';
require_once __DIR__ . '/../controllers/FlightController.php';

$id = $_GET['id'] ?? null;
(new FlightController())->handle($id);

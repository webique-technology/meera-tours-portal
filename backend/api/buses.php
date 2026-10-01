<?php

require_once __DIR__ . '/../includes/bootstrap.php';
require_once __DIR__ . '/../controllers/BusController.php';

$id = $_GET['id'] ?? null;
(new BusController())->handle($id);

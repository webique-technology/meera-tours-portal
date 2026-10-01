<?php

require_once __DIR__ . '/../includes/bootstrap.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../includes/transformers.php';

try {
    $stmt = db()->query('SELECT * FROM destinations ORDER BY name');
    ApiResponse::send(array_map('transform_destination', $stmt->fetchAll()));
} catch (Throwable $e) {
    ApiResponse::fail($e->getMessage(), 500);
}

<?php

require_once __DIR__ . '/../includes/bootstrap.php';
require_once __DIR__ . '/../config/database.php';

$type = $_GET['type'] ?? 'offers';
$map = [
    'offers' => 'offers',
    'banners' => 'banners',
    'testimonials' => 'testimonials',
];

if (!isset($map[$type])) {
    ApiResponse::fail('Unknown content type.', 404);
}

try {
    $stmt = db()->query('SELECT * FROM ' . $map[$type]);
    ApiResponse::send($stmt->fetchAll());
} catch (Throwable $e) {
    ApiResponse::fail($e->getMessage(), 500);
}

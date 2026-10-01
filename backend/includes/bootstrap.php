<?php

declare(strict_types=1);

require_once __DIR__ . '/../middleware/cors.php';
require_once __DIR__ . '/Response.php';
require_once __DIR__ . '/Validator.php';

set_exception_handler(function (Throwable $e) {
    ApiResponse::fail('Server error: ' . $e->getMessage(), 500);
});

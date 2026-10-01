<?php

require_once __DIR__ . '/../includes/Response.php';
require_once __DIR__ . '/../includes/Validator.php';

abstract class BaseController
{
    protected function method(): string
    {
        return strtoupper($_SERVER['REQUEST_METHOD'] ?? 'GET');
    }

    protected function query(string $key, $default = null)
    {
        return $_GET[$key] ?? $default;
    }
}

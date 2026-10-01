<?php

class ApiResponse
{
    public static function send($data = null, $message = 'OK', $status = 200)
    {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode([
            'success' => $status < 400,
            'message' => $message,
            'data' => $data,
        ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }

    public static function fail($message, $status = 400, $data = null)
    {
        self::send($data, $message, $status);
    }
}

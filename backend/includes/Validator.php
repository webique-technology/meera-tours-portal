<?php

class Validator
{
    public static function enquiry(array $body, array $extra = []): array
    {
        $errors = [];
        $name = trim((string) ($body['name'] ?? ''));
        $email = trim((string) ($body['email'] ?? ''));
        $phone = preg_replace('/\s+/', '', (string) ($body['phone'] ?? ''));

        if (strlen($name) < 2) {
            $errors['name'] = 'Name is required.';
        }
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = 'A valid email is required.';
        }
        if (!preg_match('/^(\+91)?[6-9]\d{9}$/', $phone)) {
            $errors['phone'] = 'A valid 10-digit mobile number is required.';
        }

        foreach ($extra as $field) {
            if (!empty($field['required']) && trim((string) ($body[$field['name']] ?? '')) === '') {
                $errors[$field['name']] = ($field['label'] ?? $field['name']) . ' is required.';
            }
        }

        return $errors;
    }

    public static function body(): array
    {
        $raw = file_get_contents('php://input');
        $decoded = json_decode($raw, true);
        if (!is_array($decoded)) {
            ApiResponse::fail('Invalid JSON body.', 400);
        }
        return $decoded;
    }
}

<?php

require_once __DIR__ . '/BaseController.php';
require_once __DIR__ . '/../models/VisaService.php';
require_once __DIR__ . '/../includes/transformers.php';

class VisaController extends BaseController
{
    public function handle(?string $slug = null): void
    {
        $model = new VisaService();
        if ($this->method() !== 'GET') {
            ApiResponse::fail('Method not allowed.', 405);
        }
        if ($slug) {
            $row = $model->findBy('slug', $slug);
            if (!$row) {
                ApiResponse::fail('Visa service not found.', 404);
            }
            ApiResponse::send(transform_visa($row));
        }
        ApiResponse::send(array_map('transform_visa', $model->search($this->query('q'))));
    }
}

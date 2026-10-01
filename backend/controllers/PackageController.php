<?php

require_once __DIR__ . '/BaseController.php';
require_once __DIR__ . '/../models/HolidayPackage.php';
require_once __DIR__ . '/../includes/transformers.php';

class PackageController extends BaseController
{
    public function handle(?string $slug = null): void
    {
        $model = new HolidayPackage();
        if ($this->method() !== 'GET') {
            ApiResponse::fail('Method not allowed.', 405);
        }
        if ($slug) {
            $row = $model->findBy('slug', $slug);
            $row ? ApiResponse::send(transform_package($model->decode($row))) : ApiResponse::fail('Package not found.', 404);
        }
        ApiResponse::send(array_map('transform_package', $model->search($this->query('destination'), $this->query('theme'))));
    }
}

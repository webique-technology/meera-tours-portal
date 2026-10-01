<?php

require_once __DIR__ . '/BaseController.php';
require_once __DIR__ . '/../models/Hotel.php';
require_once __DIR__ . '/../includes/transformers.php';

class HotelController extends BaseController
{
    public function handle(?string $slug = null): void
    {
        $model = new Hotel();
        if ($this->method() !== 'GET') {
            ApiResponse::fail('Method not allowed.', 405);
        }
        if ($slug) {
            $row = $model->findBy('slug', $slug);
            $row ? ApiResponse::send(transform_hotel($model->withRooms($row))) : ApiResponse::fail('Hotel not found.', 404);
        }
        $rows = $model->search($this->query('city') ?: $this->query('q'));
        ApiResponse::send(array_map(fn($row) => transform_hotel($model->withRooms($row)), $rows));
    }
}

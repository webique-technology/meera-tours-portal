<?php

require_once __DIR__ . '/BaseController.php';
require_once __DIR__ . '/../models/Flight.php';
require_once __DIR__ . '/../includes/transformers.php';

class FlightController extends BaseController
{
    public function handle(?string $id = null): void
    {
        $model = new Flight();
        if ($this->method() !== 'GET') {
            ApiResponse::fail('Method not allowed.', 405);
        }
        if ($id) {
            $row = $model->find($id);
            $row ? ApiResponse::send(transform_flight($row)) : ApiResponse::fail('Flight not found.', 404);
        }
        ApiResponse::send(array_map('transform_flight', $model->search($this->query('from'), $this->query('to'))));
    }
}

<?php

require_once __DIR__ . '/BaseController.php';
require_once __DIR__ . '/../models/BusRoute.php';
require_once __DIR__ . '/../includes/transformers.php';

class BusController extends BaseController
{
    public function handle(?string $id = null): void
    {
        $model = new BusRoute();
        if ($this->method() !== 'GET') {
            ApiResponse::fail('Method not allowed.', 405);
        }
        if ($id) {
            $rows = $model->search(null, null);
            foreach ($rows as $row) {
                if ((string) $row['id'] === (string) $id || ($row['route_code'] ?? '') === $id) {
                    ApiResponse::send(transform_bus($row));
                }
            }
            ApiResponse::fail('Bus route not found.', 404);
        }
        ApiResponse::send(array_map('transform_bus', $model->search($this->query('from'), $this->query('to'))));
    }
}

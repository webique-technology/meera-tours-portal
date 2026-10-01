<?php

require_once __DIR__ . '/BaseModel.php';

class Hotel extends BaseModel
{
    protected string $table = 'hotels';

    public function search(?string $needle): array
    {
        if (!$needle) {
            return $this->all();
        }
        $stmt = $this->db->prepare(
            'SELECT * FROM hotels WHERE name LIKE :q OR city LIKE :q OR country LIKE :q'
        );
        $stmt->execute(['q' => '%' . $needle . '%']);
        return $stmt->fetchAll();
    }

    public function withRooms(array $hotel): array
    {
        $stmt = $this->db->prepare('SELECT * FROM hotel_rooms WHERE hotel_id = :id');
        $stmt->execute(['id' => $hotel['id']]);
        $hotel['rooms'] = $stmt->fetchAll();
        $hotel['amenities'] = $hotel['amenities'] ? json_decode($hotel['amenities'], true) : [];
        $hotel['gallery'] = $hotel['gallery'] ? json_decode($hotel['gallery'], true) : [];
        return $hotel;
    }
}

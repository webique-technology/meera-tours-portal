<?php

require_once __DIR__ . '/BaseModel.php';

class BusRoute extends BaseModel
{
    protected string $table = 'bus_routes';

    public function search(?string $from, ?string $to): array
    {
        $sql = 'SELECT * FROM bus_routes WHERE 1=1';
        $params = [];
        if ($from) {
            $sql .= ' AND origin = :from';
            $params['from'] = $from;
        }
        if ($to) {
            $sql .= ' AND destination = :to';
            $params['to'] = $to;
        }
        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        return array_map(function ($row) {
            $row['amenities'] = $row['amenities'] ? json_decode($row['amenities'], true) : [];
            $row['boarding'] = $row['boarding'] ? json_decode($row['boarding'], true) : [];
            return $row;
        }, $stmt->fetchAll());
    }
}

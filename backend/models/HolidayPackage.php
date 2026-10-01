<?php

require_once __DIR__ . '/BaseModel.php';

class HolidayPackage extends BaseModel
{
    protected string $table = 'holiday_packages';

    public function search(?string $destination, ?string $theme): array
    {
        $sql = 'SELECT * FROM holiday_packages WHERE 1=1';
        $params = [];
        if ($destination) {
            $sql .= ' AND destination = :destination';
            $params['destination'] = $destination;
        }
        if ($theme) {
            $sql .= ' AND theme = :theme';
            $params['theme'] = $theme;
        }
        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        return array_map([$this, 'decode'], $stmt->fetchAll());
    }

    public function decode(array $row): array
    {
        foreach (['highlights', 'itinerary', 'includes', 'excludes'] as $field) {
            $row[$field] = $row[$field] ? json_decode($row[$field], true) : [];
        }
        return $row;
    }
}

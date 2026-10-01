<?php

require_once __DIR__ . '/BaseModel.php';

class VisaService extends BaseModel
{
    protected string $table = 'visa_services';

    public function search(?string $q): array
    {
        $sql = 'SELECT * FROM visa_services';
        $params = [];
        if ($q) {
            $sql .= ' WHERE country LIKE :q OR title LIKE :q OR type LIKE :q';
            $params['q'] = '%' . $q . '%';
        }
        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        return array_map(function ($row) {
            $row['documents'] = $row['documents'] ? json_decode($row['documents'], true) : [];
            return $row;
        }, $stmt->fetchAll());
    }
}

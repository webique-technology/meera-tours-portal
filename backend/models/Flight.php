<?php

require_once __DIR__ . '/BaseModel.php';

class Flight extends BaseModel
{
    protected string $table = 'flights';
    protected string $primary = 'flight_code';

    public function search(?string $from, ?string $to): array
    {
        $sql = 'SELECT * FROM flights WHERE 1=1';
        $params = [];
        if ($from) {
            $sql .= ' AND origin = :from';
            $params['from'] = strtoupper($from);
        }
        if ($to) {
            $sql .= ' AND destination = :to';
            $params['to'] = strtoupper($to);
        }
        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll();
    }
}

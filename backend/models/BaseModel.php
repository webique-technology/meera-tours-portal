<?php

require_once __DIR__ . '/../config/database.php';

abstract class BaseModel
{
    protected PDO $db;
    protected string $table;
    protected string $primary = 'id';

    public function __construct()
    {
        $this->db = db();
    }

    public function all(array $filters = []): array
    {
        $sql = "SELECT * FROM {$this->table}";
        $params = [];
        $clauses = [];

        foreach ($filters as $column => $value) {
            if ($value === null || $value === '') {
                continue;
            }
            $clauses[] = "{$column} = :{$column}";
            $params[$column] = $value;
        }

        if ($clauses) {
            $sql .= ' WHERE ' . implode(' AND ', $clauses);
        }

        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll();
    }

    public function find($id): ?array
    {
        $stmt = $this->db->prepare("SELECT * FROM {$this->table} WHERE {$this->primary} = :id LIMIT 1");
        $stmt->execute(['id' => $id]);
        $row = $stmt->fetch();
        return $row ?: null;
    }

    public function findBy(string $column, $value): ?array
    {
        $stmt = $this->db->prepare("SELECT * FROM {$this->table} WHERE {$column} = :value LIMIT 1");
        $stmt->execute(['value' => $value]);
        $row = $stmt->fetch();
        return $row ?: null;
    }

    public function create(array $payload): array
    {
        $columns = array_keys($payload);
        $placeholders = array_map(fn($col) => ':' . $col, $columns);
        $sql = sprintf(
            'INSERT INTO %s (%s) VALUES (%s)',
            $this->table,
            implode(', ', $columns),
            implode(', ', $placeholders)
        );
        $stmt = $this->db->prepare($sql);
        $stmt->execute($payload);
        $id = $this->db->lastInsertId();
        return $this->find($id) ?? $payload;
    }

    public function update($id, array $payload): ?array
    {
        $sets = [];
        foreach ($payload as $column => $value) {
            $sets[] = "{$column} = :{$column}";
        }
        $payload['id'] = $id;
        $sql = sprintf(
            'UPDATE %s SET %s WHERE %s = :id',
            $this->table,
            implode(', ', $sets),
            $this->primary
        );
        $this->db->prepare($sql)->execute($payload);
        return $this->find($id);
    }

    public function delete($id): bool
    {
        $stmt = $this->db->prepare("DELETE FROM {$this->table} WHERE {$this->primary} = :id");
        return $stmt->execute(['id' => $id]);
    }
}

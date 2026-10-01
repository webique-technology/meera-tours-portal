<?php

function transform_flight(array $row): array
{
    return [
        'id' => $row['flight_code'] ?? $row['id'],
        'airline' => $row['airline'],
        'from' => $row['origin'],
        'to' => $row['destination'],
        'departTime' => $row['depart_time'],
        'arriveTime' => $row['arrive_time'],
        'duration' => $row['duration'],
        'stops' => (int) $row['stops'],
        'cabin' => $row['cabin'],
        'price' => (int) $row['price'],
        'seats' => (int) $row['seats'],
        'aircraft' => $row['aircraft'],
        'baggage' => $row['baggage'],
        'refundable' => (bool) $row['refundable'],
    ];
}

function transform_hotel(array $row): array
{
    return [
        'id' => (int) $row['id'],
        'slug' => $row['slug'],
        'name' => $row['name'],
        'city' => $row['city'],
        'country' => $row['country'],
        'stars' => (int) $row['stars'],
        'rating' => (float) $row['rating'],
        'reviews' => (int) $row['reviews'],
        'image' => $row['image'],
        'gallery' => is_array($row['gallery'] ?? null) ? $row['gallery'] : json_decode($row['gallery'] ?? '[]', true),
        'amenities' => is_array($row['amenities'] ?? null) ? $row['amenities'] : json_decode($row['amenities'] ?? '[]', true),
        'summary' => $row['summary'],
        'priceFrom' => (int) ($row['price_from'] ?? $row['priceFrom'] ?? 0),
        'rooms' => $row['rooms'] ?? [],
    ];
}

function transform_package(array $row): array
{
    $decode = function ($value) {
        return is_array($value) ? $value : json_decode($value ?? '[]', true);
    };
    return [
        'id' => (int) $row['id'],
        'slug' => $row['slug'],
        'title' => $row['title'],
        'destination' => $row['destination'],
        'country' => $row['country'],
        'nights' => (int) $row['nights'],
        'days' => (int) $row['days'],
        'price' => (int) $row['price'],
        'oldPrice' => $row['old_price'] !== null ? (int) $row['old_price'] : null,
        'image' => $row['image'],
        'theme' => $row['theme'],
        'rating' => (float) $row['rating'],
        'highlights' => $decode($row['highlights'] ?? []),
        'itinerary' => $decode($row['itinerary'] ?? []),
        'includes' => $decode($row['includes'] ?? []),
        'excludes' => $decode($row['excludes'] ?? []),
    ];
}

function transform_bus(array $row): array
{
    $decode = function ($value) {
        return is_array($value) ? $value : json_decode($value ?? '[]', true);
    };
    return [
        'id' => $row['route_code'] ?? $row['id'],
        'operator' => $row['operator'],
        'type' => $row['type'],
        'from' => $row['origin'],
        'to' => $row['destination'],
        'departTime' => $row['depart_time'],
        'arriveTime' => $row['arrive_time'],
        'duration' => $row['duration'],
        'price' => (int) $row['price'],
        'seats' => (int) $row['seats'],
        'amenities' => $decode($row['amenities'] ?? []),
        'boarding' => $decode($row['boarding'] ?? []),
    ];
}

function transform_visa(array $row): array
{
    return [
        'id' => (int) $row['id'],
        'slug' => $row['slug'],
        'country' => $row['country'],
        'title' => $row['title'],
        'type' => $row['type'],
        'processingDays' => $row['processing_days'],
        'price' => (int) $row['price'],
        'validity' => $row['validity'],
        'image' => $row['image'],
        'documents' => is_array($row['documents'] ?? null) ? $row['documents'] : json_decode($row['documents'] ?? '[]', true),
        'notes' => $row['notes'],
    ];
}

function transform_destination(array $row): array
{
    return [
        'id' => (int) $row['id'],
        'slug' => $row['slug'],
        'name' => $row['name'],
        'country' => $row['country'],
        'type' => $row['type'],
        'tagline' => $row['tagline'],
        'image' => $row['image'],
        'startingPrice' => (int) $row['starting_price'],
        'packages' => (int) $row['packages'],
    ];
}

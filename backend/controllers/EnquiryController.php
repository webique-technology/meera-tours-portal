<?php

require_once __DIR__ . '/BaseController.php';
require_once __DIR__ . '/../models/Enquiry.php';

class EnquiryController extends BaseController
{
    public function handle(): void
    {
        if ($this->method() !== 'POST') {
            ApiResponse::fail('Method not allowed.', 405);
        }
        $body = Validator::body();
        $errors = Validator::enquiry($body, [
            ['name' => 'type', 'label' => 'Enquiry type', 'required' => true],
        ]);
        if ($errors) {
            ApiResponse::fail('Please correct the form and try again.', 422, $errors);
        }

        $model = new Enquiry();
        $saved = $model->create([
            'type' => $body['type'],
            'name' => trim($body['name']),
            'email' => trim($body['email']),
            'phone' => trim($body['phone']),
            'message' => trim((string) ($body['message'] ?? '')),
            'details' => json_encode($body['details'] ?? new stdClass()),
            'status' => 'new',
        ]);
        ApiResponse::send($saved, 'Enquiry received. Our travel desk will contact you shortly.');
    }
}

class ContactController extends BaseController
{
    public function handle(): void
    {
        if ($this->method() !== 'POST') {
            ApiResponse::fail('Method not allowed.', 405);
        }
        $body = Validator::body();
        $errors = Validator::enquiry($body, [
            ['name' => 'subject', 'label' => 'Subject', 'required' => true],
            ['name' => 'message', 'label' => 'Message', 'required' => true],
        ]);
        if ($errors) {
            ApiResponse::fail('Please correct the form and try again.', 422, $errors);
        }

        $model = new ContactMessage();
        $saved = $model->create([
            'name' => trim($body['name']),
            'email' => trim($body['email']),
            'phone' => trim($body['phone']),
            'subject' => trim($body['subject']),
            'message' => trim($body['message']),
            'status' => 'new',
        ]);
        ApiResponse::send($saved, 'Message sent. We typically reply within a few hours.');
    }
}

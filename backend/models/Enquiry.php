<?php

require_once __DIR__ . '/BaseModel.php';

class Enquiry extends BaseModel
{
    protected string $table = 'enquiries';
}

class ContactMessage extends BaseModel
{
    protected string $table = 'contact_messages';
}

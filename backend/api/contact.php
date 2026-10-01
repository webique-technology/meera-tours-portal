<?php

require_once __DIR__ . '/../includes/bootstrap.php';
require_once __DIR__ . '/../controllers/EnquiryController.php';

(new ContactController())->handle();

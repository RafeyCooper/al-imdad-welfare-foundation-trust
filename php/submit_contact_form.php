<?php

require '../assets/PHPMailer-6.9.3/src/PHPMailer.php';
require '../assets/PHPMailer-6.9.3/src/SMTP.php';
require '../assets/PHPMailer-6.9.3/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $number = $_POST['number'] ?? '';
    $subject = $_POST['subject'] ?? '';
    $message = $_POST['message'] ?? '';


    if (empty($name) || empty($email) || empty($number) || empty($subject) || empty($message)) {
        echo json_encode(['status' => 'error', 'message' => 'All fields are required.']);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['status' => 'error', 'message' => 'Please enter a valid email address.']);
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host       = 'smtp.hostinger.com';
        $mail->SMTPAuth   = true; 
        $mail->Username   = 'contact@imdadtrust.com';
        $mail->Password   = 'pakistanIMDAD789+';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465;            

        // Recipients
        $mail->setFrom('contact@imdadtrust.com', 'Al-Imdad Foundation Trust');
        $mail->addAddress('contact@imdadtrust.com', 'Al-Imdad Foundation Trust');

        // Content
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = "
            <div style='font-family: Arial, sans-serif; color: #333;'>
                <div style='background-color: #048f40; padding: 15px; text-align: center;'>
                    <h2 style='color: #fff; margin: 0;'>Al-Imdad Foundation Trust</h2>
                </div>
                <div style='padding: 20px; background-color: #f8f9fa;'>
                    <p style='font-size: 16px;'><strong>Name:</strong> $name</p>
                    <p style='font-size: 16px;'><strong>Email:</strong> $email</p>
                    <p style='font-size: 16px;'><strong>Phone Number:</strong> $number</p>
                    <p style='font-size: 16px;'><strong>Subject:</strong> $subject</p>
                    <p style='font-size: 16px;'><strong>Message:</strong> $message</p>
                </div>
                <div style='text-align: center; background-color:rgb(255, 255, 255); padding: 0; border-top: 2px solid #048f40;'>
                </div>
            </div>
        ";

        $mail->send();
        echo json_encode(['status' => 'success', 'message' => 'Form submitted successfully']);

    } catch (Exception $e) {

        error_log('PHPMailer Error: ' . $e->getMessage());
        echo json_encode(['status' => 'error', 'message' => 'Email could not be sent. Error: ' . $mail->ErrorInfo]);
    }

} else {

    echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
}
?>
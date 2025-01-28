<?php

require '../assets/PHPMailer-6.9.3/src/PHPMailer.php';
require '../assets/PHPMailer-6.9.3/src/SMTP.php';
require '../assets/PHPMailer-6.9.3/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header('Content-Type: application/json');

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $fullName = isset($_POST['full_name']) ? $_POST['full_name'] : '';
    $emailAddress = isset($_POST['email_address']) ? $_POST['email_address'] : '';
    $donationAmount = isset($_POST['donation_amount']) ? $_POST['donation_amount'] : '';
    $purposeOfDonation = isset($_POST['purpose_of_donation']) ? $_POST['purpose_of_donation'] : '';
    $comment = isset($_POST['comment']) ? $_POST['comment'] : '';

    $mail = new PHPMailer(true);
    
    try {

        $mail->isSMTP();
        $mail->Host       = 'smtp.hostinger.com';
        $mail->SMTPAuth   = true; 
        $mail->Username   = 'donation@imdadtrust.com';
        $mail->Password   = 'pakistanIMDAD789@';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465;

        // Recipients
        $mail->setFrom('donation@imdadtrust.com', 'Al-Imdad Foundation Trust');
        $mail->addAddress('donation@imdadtrust.com', 'Al-Imdad Foundation Trust');

        // Handling file upload for the receipt
        if (isset($_FILES['receipt']) && $_FILES['receipt']['error'] == UPLOAD_ERR_OK) {
            $fileTmpPath = $_FILES['receipt']['tmp_name'];
            $fileOriginalName = $_FILES['receipt']['name'];
            $fileExtension = strtolower(pathinfo($fileOriginalName, PATHINFO_EXTENSION));
            $fileSize = $_FILES['receipt']['size']; 
        
            $allowedExtensions = ['jpg', 'jpeg', 'png'];
            $maxFileSize = 5 * 1024 * 1024;
        
            if (in_array($fileExtension, $allowedExtensions)) {

                if ($fileSize <= $maxFileSize) {
                    $uniqueId = uniqid('receipt_', true);
                    $randomFileName = $uniqueId . '.' . $fileExtension;
        
                    $filePath = '../uploads/' . $randomFileName;
        
                    if (!file_exists('../uploads')) {
                        mkdir('../uploads', 0777, true);
                    }
                    move_uploaded_file($fileTmpPath, $filePath);
                    $mail->addAttachment($filePath, $randomFileName);

                } else {
                    echo json_encode(['status' => 'error', 'message' => 'File size exceeds the maximum limit of 5MB.']);
                    exit();
                }
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Only JPG, JPEG, and PNG file types are allowed.']);
                exit();
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to upload the file.']);
            exit();
        }

        $mail->isHTML(true); // Set email format to HTML

        $mail->Subject = 'New Donation Received';
        $body = '
            <html>
            <head>
            <style>
                body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                color: #333;
                padding: 20px;
                }
                .email-container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                padding: 20px;
                border: 1px solid #e5e5e5;
                }
                .email-header {
                background-color: #048f40;
                color: #fff;
                padding: 20px;
                text-align: center;
                font-size: 24px;
                font-weight: bold;
                }
                .email-body {
                padding: 20px;
                color: #333;
                }
                .email-footer {
                background-color: #0e6a47;
                color: #fff;
                text-align: center;
                padding: 10px;
                font-size: 12px;
                }
                h3{
                font-weight: bold;
                }
            </style>
            </head>
            <body>
            <div class="email-container">
                <div class="email-body">
                <h3>New donation received:</h3>
                <br>
                <p><strong>Full Name:</strong> ' . $fullName . '</p>
                <p><strong>Email Address:</strong> ' . $emailAddress . '</p>
                <p><strong>Donation Amount:</strong> ' . $donationAmount . '</p>
                <p><strong>Purpose of Donation:</strong> ' . $purposeOfDonation . '</p>';
                
        if (!empty($comment)) {
            $body .= '<p><strong>Additional Comments:</strong> ' . $comment . '</p>';
        }

        $body .= '
                </div>
            </div>
            </body>
            </html>';

        $mail->Body = $body;


        // Send email
        if ($mail->send()) {
            echo json_encode(['status' => 'success', 'message' => 'Email sent successfully']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to sent email']);
        }

        // Optionally remove the uploaded file after sending email
        if (isset($filePath) && file_exists($filePath)) {
            unlink($filePath);
        }

    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => 'Message could not be sent. Mailer Error']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}
?>
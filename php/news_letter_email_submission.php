<?php
require_once 'db-connection.php';

if (isset($_POST['email'])) {

    $email = $_POST['email'];

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['status' => 'invalidemail']);
    } else {
        $check_stmt = $conn->prepare("SELECT * FROM subscribed_email WHERE email = ?");
        
        if ($check_stmt === false) {
            echo json_encode(['status' => 'error']);
            die("Prepare failed: " . $conn->error);
        }

        $check_stmt->bind_param("s", $email);
        $check_stmt->execute();
        $check_stmt->store_result();

        if ($check_stmt->num_rows > 0) {
            echo json_encode(['status' => 'exists']);
        } else {
            $stmt = $conn->prepare("INSERT INTO subscribed_email (email) VALUES (?)");

            if ($stmt === false) {
                echo json_encode(['status' => 'error']);
                die("Prepare failed: " . $conn->error);
            }

            $stmt->bind_param("s", $email);

            if ($stmt->execute()) {
                echo json_encode(['status' => 'success']);
            } else {
                echo json_encode(['status' => 'error']);
            }

            $stmt->close();
        }
        $check_stmt->close();
    }
}
$conn->close();
?>

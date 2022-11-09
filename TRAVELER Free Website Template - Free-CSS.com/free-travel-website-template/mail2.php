<?php 
if(isset($_POST['submit'])){
    $to = "assf@audumla.nl"; // this is your Email address
    $from = $_POST['email']; // this is the sender's Email address
    $name = $_POST['first_name'];
    $subject = $_POST['subject'];
    $subject2 = "Copy of your form submission";
    $message = $_POST['message'];
    

    $headers = "From:" . $from;
    $headers2 = "From:" . $to;
    mail($to,$subject,$message,$headers);
    // mail($from,$subject2,$message2,$headers2); // sends a copy of the message to the sender
    header("Location: http://www.audumla.nl/assf/mail_sent.html");
    exit();
    // You can also use header('Location: thank_you.php'); to redirect to another page.
    }
?>
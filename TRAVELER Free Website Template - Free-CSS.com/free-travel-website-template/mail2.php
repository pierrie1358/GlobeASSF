<?php 
if(isset($_POST['submit'])){
    $to = "assf@audumla.nl"; // this is your Email address
    $from = $_POST['email']; // this is the sender's Email address
    $name = $_POST['first_name'];
    $subject = "Site form";
    $subject2 = "Copy of your form submission";
    $message = $first_name . " " . $last_name . " Heeft het volgende geschreven:" . "\n\n" . $_POST['message'];
    $message2 = "We hebben je  " . $first_name . "\n\n" . $_POST['message'];

    $headers = "From:" . $from;
    $headers2 = "From:" . $to;
    mail($to,$subject,$message,$headers);
    // mail($from,$subject2,$message2,$headers2); // sends a copy of the message to the sender
    echo "Mail Sent. Thank you " . $first_name . ", we will contact you shortly.";
    // You can also use header('Location: thank_you.php'); to redirect to another page.
    }
?>
<?php
	$sent = 0;

	if(isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
	  $_SERVER['REMOTE_ADDR'] = $_SERVER['HTTP_X_FORWARDED_FOR'];
	}

	$filePath = 'recaptchalib.php';

	require_once($filePath);

	$siteKey = "6LdN6gITAAAAAOnRcQWgBHrvMg7DIIwOBQqsV4em";
	$secret = "6LdN6gITAAAAAMPz1oP0Bu5t9sejI0EMot2IN-MF";

	// The response from reCAPTCHA
	$resp = null;

	$reCaptcha = new ReCaptcha($secret);
	// Was there a reCAPTCHA response?
	if ($_POST["g-recaptcha-response"]) {
	    $resp = $reCaptcha->verifyResponse(
	        $_SERVER["REMOTE_ADDR"],
	        $_POST["g-recaptcha-response"]
	    );
	}

	if ($resp != null && $resp->success) {
		$requiredFields = array("email", "reason", "fullname", "message");
		$valid = true;

		foreach ($validFields as $value) {
			$valid = $valid && (array_key_exists($value, $_POST) && !empty($_POST[$value]));
		}

		if ($valid) {
			$allFields = array("email", "reason", "fullname", "phone", "message");

		 	$fields = array();
			foreach ($allFields as $value) {
				$fields[$value] = "";
				if (array_key_exists($value, $_POST) && !empty($_POST[$value])) {
					$str = mb_convert_encoding($_POST[$value], 'UTF-8', 'UTF-8');
					$str = htmlentities($str, ENT_QUOTES, 'UTF-8');
					$fields[$value] = strip_tags($str);
				}
			}

			$to = "contact@bradlysharpe.com.au";
			$reason = implode(" ", explode("-", $fields['reason']));
			$subject = "Contact Form - " . ucfirst($reason);
			$boundary = uniqid('np');

			$headers  = "MIME-Version: 1.0\r\n";
			$headers .= "From: " . $fields['email'] . "\r\n";
			$headers .= "Reply-To: ". $fields['email'] . "\r\n";
			$headers .= "Content-Type: multipart/alternative;boundary=" . $boundary . "\r\n";
			//$headers .= "CC: susan@example.com\r\n";


			//Plain text body
			$message  = "From: " . $fields['fullname'] . "\r\n";
			$message .= "Email: " . $fields['email'] . "\r\n";
			$message .= "Phone: " . $fields['phone'] . "\r\n";
			$message .= "Reason: " . $fields['reason'] . "\r\n";
			$message .= "Message: " . "\r\n" . "\r\n" . $fields['message'];
			$message .= "\r\n\r\n--" . $boundary . "\r\n";
			$message .= "Content-type: text/html;charset=utf-8\r\n\r\n";

			//Html body
			$message .= "<html>
	<body style='color:#333;'><h1>Contact Form Submission</h1>
		<table rules=\"all\" style=\"border: 1px solid #666;\" border=\"1\" cellpadding=\"10\" cellspacing=\"0\">
			<tr style=\"background: #eee;\">
				<td><strong>Name:</strong></td><td>" . $fields['fullname'] . "</td>
			</tr>
			<tr>
				<td><strong>Email:</strong></td><td>" . $fields['email'] . "</td>
			</tr>
			<tr style=\"background: #eee;\">
				<td><strong>Phone:</strong></td><td>" . $fields['phone'] . "</td>
			</tr>
			<tr>
				<td><strong>Reason:</strong></td><td>" . $reason . "</td>
			</tr>
		</table><br /><br />
		<strong>Message:</strong><br /><br />
		" . $fields['message'] . "
	</body>
</html>";
			$message .= "\r\n\r\n--" . $boundary . "--";

			//$sent = mail($to, $subject, $message, $headers);
			$sent = true;
		}

	} else {
		// echo "<br />Captcha Failed: " . $resp->errorCodes . "<br />";
	}
	$out = array();
	$out['sent'] = $sent;
	$out['captcha_response'] = $resp;

	echo json_encode($out);
<?php
session_start();
ini_set("display_errors",true);   //Fehlermeldungen einschalten
require __DIR__ .'/../vendor/autoload.php';

$response = Array();


/**
 * Schickt ein E-Mail mit den Formulardaten an
 * mail@joyofwhitewater.ch
 *
 */
function sendEMailToJoyOfWhitewater($data, $txt, $response) {
	$to = 'mail@joyofwhitewater.ch';
	$subject = $data->subject;
	$headers = "From: " . $data->email . "\r\n" . "CC: mail@joyofwhitewater.ch";
	
	mail($to, $subject, $txt, $headers);

	$row = Array();
	$row['receiver'] =$to;
	$row['subject'] = $subject;
	$row['content'] = $txt;
	$row['headers'] = $headers;

	array_push($response, $row);
	header("Content-type:application/json", true, 200);
	echo  json_encode($response);
}


// get posted data
$data = json_decode(file_get_contents("php://input"));

// eine Nachricht über das Kontaktformular
if (str_contains($data->subject, 'Nachricht')) {
	// Sanitize input data
	$data->firstName = filter_var($data->firstName, FILTER_SANITIZE_STRING);
	$data->surName = filter_var($data->surName, FILTER_SANITIZE_STRING);
	$data->email = filter_var($data->email, FILTER_SANITIZE_EMAIL);
	$data->message = filter_var($data->message, FILTER_SANITIZE_STRING);

	if ($data->firstName
		&& $data->surName
		&& $data->email
		&& $data->message
	) {
		$txt = "Eine Nachricht über das Kontakt-Formular von The Joy Of Whitewater: " . "\r\n" . "\r\n"
		. "Von:" . "\r\n"
		. $data->firstName . " " . $data->surName . "\r\n"
		. $data->email . "\r\n"
		. "Nachricht: " . "\r\n" . $data->message . "\r\n";

		// send email
		sendEMailToJoyOfWhitewater($data, $txt, $response);
	} else {
		$response['message'] = 'Missing data in message';

		header("Content-type:application/json", true, 400);
		echo  json_encode($response);
	}


// eine Anmeldung	
} elseif (str_contains($data->subject,'Anmeldung')) {
	// Sanitize input data
	$data->numberOfParticipants = filter_var($data->numberOfParticipants, FILTER_SANITIZE_NUMBER_INT);
	$data->plz = filter_var($data->plz, FILTER_SANITIZE_NUMBER_INT);
	$data->courseName = filter_var($data->courseName, FILTER_SANITIZE_STRING);
	$data->courseDate = filter_var($data->courseDate, FILTER_SANITIZE_STRING);
	$data->firstName = filter_var($data->firstName, FILTER_SANITIZE_STRING);
	$data->surName = filter_var($data->surName, FILTER_SANITIZE_STRING);
	$data->city = filter_var($data->city, FILTER_SANITIZE_STRING);
	$data->equipment = filter_var($data->equipment, FILTER_SANITIZE_STRING);
	$data->equipmentDetails = filter_var($data->equipmentDetails, FILTER_SANITIZE_STRING);
	$data->agb = filter_var($data->agb, FILTER_SANITIZE_STRING);
	$data->address = filter_var($data->address, FILTER_SANITIZE_STRING);
	$data->email = filter_var($data->email, FILTER_SANITIZE_EMAIL);
	$data->comment = filter_var($data->comment, FILTER_SANITIZE_STRING);

	if ($data->courseName
		&& $data->courseDate
		&& $data->numberOfParticipants
		&& $data->firstName
		&& $data->surName
		&& $data->address
		&& $data->plz
		&& $data->city
		&& $data->email
		&& $data->agb
		&& $data->equipment
	){
		$txt = "Eine Anmeldung über das Formular auf The Joy Of Whitewater: " . "\r\n" . "\r\n"
				. "Folgende Person hat sich angemeldet:" . "\r\n"
				. $data->firstName . " " . $data->surName . "\r\n"
				. $data->address . "\r\n"
				. $data->plz . " " . $data->city . "\r\n"
				. $data->email . "\r\n" . "\r\n"
				. $data->firstName . " " . $data->surName . " hat die AGB " . $data->agb
				. "\r\n" . "\r\n"

				. "Angemeldet für den Kurs:" . "\r\n"
				. "Kurs: " . $data->courseName . "\r\n"
				. "Datum: " .  $data->courseDate . "\r\n"
				. "Anzahl Personen: " . $data->numberOfParticipants . "\r\n"
				. "Ausrüstung: " . $data->equipment . "\r\n"
				. "Kommentare: " . $data->comment . "\r\n";

		if (!empty($data->equipmentDetails)) {
			$txt = $txt . "Benötigte Ausrüstung: " .  $data->equipmentDetails;
		}

		// send email
		sendEMailToJoyOfWhitewater($data, $txt,$response);
	} else {
		$response['message'] = 'Missing data in registration';

		header("Content-type:application/json", true, 400);
		echo  json_encode($response);
	}
} else {
	$response['message'] = 'Unknown message subject from TheJoyOfWhitewater';

	header("Content-type:application/json", true, 400);
	echo  json_encode($response);
}

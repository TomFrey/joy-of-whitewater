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
	$data->firstName = htmlspecialchars($data->firstName, ENT_COMPAT);
	$data->surName = htmlspecialchars($data->surName, ENT_COMPAT);
	$data->email = htmlspecialchars($data->email, ENT_QUOTES);
	$data->message = htmlspecialchars($data->message, ENT_QUOTES);

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
	$data->numberOfParticipants = htmlspecialchars($data->numberOfParticipants, ENT_QUOTES);
	$data->plz = htmlspecialchars($data->plz, ENT_QUOTES);
	$data->courseName = htmlspecialchars($data->courseName, ENT_QUOTES);
	$data->courseDate = htmlspecialchars($data->courseDate, ENT_QUOTES);
	$data->bootsTyp = htmlspecialchars($data->bootsTyp, ENT_QUOTES);
	$data->courseLevel = htmlspecialchars($data->courseLevel, ENT_QUOTES);

	$data->firstName = htmlspecialchars($data->firstName, ENT_COMPAT); //lässt ' zu aber keine "
	$data->surName = htmlspecialchars($data->surName, ENT_COMPAT);     //lässt ' zu aber keine "
	
	$data->city = htmlspecialchars($data->city, ENT_QUOTES);
	$data->equipment = htmlspecialchars($data->equipment, ENT_QUOTES);
	$data->equipmentDetails = htmlspecialchars($data->equipmentDetails, ENT_QUOTES);
	$data->agb = htmlspecialchars($data->agb, ENT_QUOTES);
	$data->address = htmlspecialchars($data->address, ENT_QUOTES);
	$data->email = htmlspecialchars($data->email, ENT_QUOTES);
	$data->comment = htmlspecialchars($data->comment, ENT_QUOTES);

	if ($data->courseName
		&& $data->courseDate
		&& $data->bootsTyp
		&& $data->courseLevel
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
				. "Boot: " .  $data->bootsTyp . "\r\n"
				. "Kursstufe: " .  $data->courseLevel . "\r\n"
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

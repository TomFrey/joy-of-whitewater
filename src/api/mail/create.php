<?php
session_start();
ini_set("display_errors",true);   //Fehlermeldungen einschalten
require __DIR__ .'/../vendor/autoload.php';

$response = Array();

// get posted data
$data = json_decode(file_get_contents("php://input"));

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
	$to = 'info@mitlinxlernen.ch';
	$subject = "Anmeldung auf the Joy of Whitewater";
	$headers = "From: " . $data->email . "\r\n" . "CC: joe@mitlinxlernen.ch";
	$txt = "Eine Anmeldung über das Formular auf the joy of whitewater: " . "\r\n" . "\r\n"
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
			. "Ausrüstung: " . $data->equipment . "\r\n";

	if (!empty($data->equipmentDetails)) {
		$txt = $txt . "Benötigte Ausrüstung: " .  $data->equipmentDetails;
	}

	// send email
	mail($to,$subject,$txt,$headers);

	$row = Array();
	$row['receiver'] =$to;
	$row['subject'] = $subject;
	$row['content'] = $txt;
	$row['headers'] = $headers;
	array_push($response, $row);
	header("Content-type:application/json", true, 200);
	echo  json_encode($response);

// es fehlen Daten
} else {
	$response['message'] = 'data is missing';

	header("Content-type:application/json", true, 400);
	echo  json_encode($response);
}

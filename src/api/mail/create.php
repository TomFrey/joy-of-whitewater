<?php
session_start();
ini_set("display_errors",true);   //Fehlermeldungen einschalten
require __DIR__ .'/../vendor/autoload.php';

$response = Array();

// get posted data
$data = json_decode(file_get_contents("php://input"));


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
	$subject = "Anmeldung über the Joy of Whitewater";
	$headers = "From: " . $data->email . "\r\n" . "CC: joe@mitlinxlernen.ch";
	$txt = "Eine Anmeldung über das Formular auf the joy of whitewater: " . "\r\n" . "\r\n"
			. $data->firstName . " " . $data->surName . "\r\n"
			. $data->address . "\r\n"
		 	. $data->plz . " " . $data->city . "\r\n"
			. $data->email . "\r\n"
			. "\r\n" . "\r\n"

			. "Kurs: " . $data->courseName . "\r\n"
			. "Datum: " .  $data->courseDate . "\r\n"
			. "Anzahl Personen: " . $data->numberOfParticipants . "\r\n"
			. "Ausrüstung: " . $data->equipment;


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
	$response['message'] = 'data is missinggg';

	header("Content-type:application/json", true, 400);
	echo  json_encode($response);
}

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


	$to = $data->email;
	$subject = "Anmeldebestätigung von the Joy of Whitewater";
	$headers = "From: joe@mitlinxlernen.ch" . "\r\n" . "CC: joe@mitlinxlernen.ch";
	$txt = "Hallo " . $data->firstName . "\r\n" .
		   "Danke für deine Anmeldung!" . "\r\n" .
			"Du hast dich für den Kurs " . $data->courseName . " am " .  $data->courseDate . " angemeldet.";


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

<?php
session_start();

ini_set("display_errors",true);   //Fehlermeldungen einschalten
require __DIR__ .'/vendor/autoload.php';


/**
 * Erzeugt aus der EMail ein Benutzerobjekt und gibt dieses zurück.
 *
 * @param $userEmail
 * @return array
 */
function createLoginResponse($userEmail) {
	$user = new User($userEmail);

	$response = Array();
	$row = Array();
	$row['id'] = $user->getId();
	$row['firstname'] = $user->getFirstname();
	$row['lastname'] = $user->getLastname();
	$row['email'] = $user->getEmail();
	array_push($response, $row);

	return $response;
}


$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST'){
	// get posted data
	$data = json_decode(file_get_contents("php://input"));

	if ($data->email && $data->password){
		$user = new User($data->email);

		if (password_verify($data->password, $user->getPassword())) {
			// Email in den Session Speicher des Servers schreiben, als ein Indiez, das der User korrekt eingeloggt ist.
			$_SESSION['userEMail'] = $user->getEmail();
			$response = createLoginResponse($user->getEmail());

			header("Content-type:application/json");
			echo  json_encode($response);

		} else {
			$response = Array();
			$response['message'] = 'password or username are wrong';

			header("Content-type:application/json", true, 400);
			echo  json_encode($response);
		}

	} else {
		$response = Array();
		$response['message'] = 'password or username are not provided';

		header("Content-type:application/json");
		echo  json_encode($response);
	}

} elseif ($method === 'GET') {

	if(isset($_SESSION['userEMail'])){
		$userEmail = $_SESSION['userEMail'];
		$response = createLoginResponse($userEmail);

		header("Content-type:application/json", true, 200);
		echo  json_encode($response);
	} else {
		$response = Array();
		$response['message'] = 'not logged in';

		header("Content-type:application/json", true, 400);
		echo  json_encode($response);
	}

// nur POST oder GET Methode sind zugelassen
} else {
	$response = Array();
	$response['message'] = 'forbidden method';

	header("Content-type:application/json", true, 403);
	echo  json_encode($response);
}



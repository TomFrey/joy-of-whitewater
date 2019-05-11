<?php
ini_set("display_errors",true);   //Fehlermeldungen einschalten
require __DIR__ .'/vendor/autoload.php';


$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
	case 'GET':
		// abfragen noch nicht implementiert
		break;

	case 'POST':
		include_once "mail/create.php";
		break;

	case 'DELETE':
		// löschen noch nicht implementiert
		//weil es in php kein delete gibt
		parse_str(file_get_contents("php://input", "r"), $_DELETE);
		break;

	case 'PUT':
		// ändern noch nicht implementiert
		//weil es in php kein put gibt
		parse_str(file_get_contents("php://input", "r"), $_PUT);
		break;
}

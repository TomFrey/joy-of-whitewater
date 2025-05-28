<?php
session_start();
ini_set("display_errors",true);   //Fehlermeldungen einschalten
require __DIR__ .'/../vendor/autoload.php';

$responseData = Array();


/**
 * Liefert ein Array mit allen Kursen.
 *
 * @return array
 */
function getAllPreises(){
	$stmtPreise = DB::get()->prepare(
		"select p.*, kp.kurs_id" .
        " from preis p" .
        " left join kurs_preis kp on kp.preis_id = p.id"
	);
	$stmtPreise->execute();

	$preise = [];
	foreach($stmtPreise->fetchAll(PDO::FETCH_ASSOC) as $preis){
		$preise[] = new Preis($preis['id'], $preis['kurs_id']);
	}
	return $preise;
}


/**
 * Liefert alle Preise.
 *
 * GET: api/preise.php
 */
	foreach(getAllPreises() as $preisTable){
		$row = Array();
		$row['id'] = $preisTable->getId();
		$row['kursId'] = $preisTable->getKursId();
		$row['anzahlPersonen'] = $preisTable->getAnzahlPersonen();
		$row['preis'] = $preisTable->getPreis();

		array_push($responseData, $row);
	}

	header("Content-type:application/json", true, 200);
	//TODO: delete this in production
	header("Access-Control-Allow-Origin: *");
	echo  json_encode($responseData);


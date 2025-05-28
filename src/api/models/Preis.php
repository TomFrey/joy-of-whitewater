<?php
require __DIR__ .'/../vendor/autoload.php';


class Preis
{
	private $id;
	private $kursId;
	private $anzahlPersonen;
	private $preis;

	public function __construct($id = false, $kurs_id = false)
	{
		if ($id) {
			$statement = DB::get()->prepare(
				"select p.*, kp.kurs_id from preis p" .
                " left join kurs_preis kp on kp.preis_id = p.id" .
				" where kp.kurs_id = :kurs_id and p.id = :id"
			);

			$statement->execute([
				':id' => $id,
                ':kurs_id' => $kurs_id
			]);

			$preisTable = $statement->fetch(PDO::FETCH_ASSOC);

			$this->setId($preisTable['id']);
			$this->setKursId($preisTable['kurs_id']);
			$this->setAnzahlPersonen($preisTable['anzahl_personen']);
			$this->setPreis($preisTable['preis']);
		}
	}


	public function getId()
	{
		return $this->id;
	}

	public function setId($id)
	{
		$this->id = $id;
	}


	public function getKursId()
	{
		return $this->kursId;
	}

	public function setKursId($kursId)
	{
		$this->kursId = $kursId;
	}


	public function getAnzahlPersonen()
	{
		return $this->anzahlPersonen;
	}

	public function setAnzahlPersonen($anzahlPersonen)
	{
		$this->anzahlPersonen = $anzahlPersonen;
	}


	public function getPreis()
	{
		return $this->preis;
	}

	public function setPreis($preis)
	{
		$this->preis = $preis;
	}
}

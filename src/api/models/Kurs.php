<?php
require __DIR__ .'/../vendor/autoload.php';

class Kurs
{
	private $id;
	private $name;
	private $beschreibung;
	private $treffpunkt;
	private $preisKurs;
	private $preisMaterial;
	private $vonDatum;
	private $bisDatum;
	private $ort;
	private $land;
	private $kursStufe;
	private $sportArt;
	private $typ;
	private $guide;


	public function __construct($id = false)
	{
		if ($id) {
			// Das select holt den Kurs mit der entsprechenden $id
			$statement = DB::get()->prepare(
				"select *" .
				" from kurs k" .
				" where k.id = :id"
			);

			$statement->execute([
				':id' => $id
			]);

			$kurs = $statement->fetch(PDO::FETCH_ASSOC);

			$this->setId($kurs['id']);
			$this->setName($kurs['name']);
			$this->setBeschreibung($kurs['beschreibung']);
			$this->setTreffpunkt($kurs['treffpunkt']);
			$this->setPreisKurs($kurs['preis_kurs']);
			$this->setPreisMaterial($kurs['preis_material']);
			$this->setVonDatum($kurs['von_datum']);
			$this->setBisDatum($kurs['bis_datum']);
			$this->setOrt($kurs['ort']);
			$this->setLand($kurs['land']);
			$this->setKursStufe($kurs['kurs_stufe']);
			$this->setSportArt($kurs['sport_art']);
			$this->setTyp($kurs['typ']);
			$this->setGuide($kurs['guide']);
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


	public function getName()
	{
		return $this->name;
	}

	public function setName($name)
	{
		$this->name = $name;
	}


	public function getBeschreibung()
	{
		return $this->beschreibung;
	}


	public function setBeschreibung($beschreibung)
	{
		$this->beschreibung = $beschreibung;
	}


	public function getTreffpunkt()
	{
		return $this->treffpunkt;
	}

	public function setTreffpunkt($treffpunkt)
	{
		$this->treffpunkt = $treffpunkt;
	}


	public function getPreisKurs()
	{
		return $this->preisKurs;
	}

	public function setPreisKurs($preisKurs)
	{
		$this->preisKurs = $preisKurs;
	}


	public function getPreisMaterial()
	{
		return $this->preisMaterial;
	}

	public function setPreisMaterial($preisMaterial)
	{
		$this->preisMaterial = $preisMaterial;
	}


	public function getVonDatum()
	{
		return $this->vonDatum;
	}

	public function setVonDatum($vonDatum)
	{
		$this->vonDatum = $vonDatum;
	}


	public function getBisDatum()
	{
		return $this->bisDatum;
	}

	public function setBisDatum($bisDatum)
	{
		$this->bisDatum = $bisDatum;
	}


	public function getOrt()
	{
		return $this->ort;
	}

	public function setOrt($ort)
	{
		$this->ort = $ort;
	}


	public function getLand()
	{
		return $this->land;
	}

	public function setLand($land)
	{
		$this->land = $land;
	}


	// B, F, K, alle
	public function getKursStufe()
	{
		return $this->kursStufe;
	}

	public function setKursStufe($kursStufe)
	{
		$this->kursStufe = $kursStufe;
	}


	//Kajak, Kanadier, alle
	public function getSportArt()
	{
		return $this->sportArt;
	}

	public function setSportArt($sportArt)
	{
		$this->sportArt = $sportArt;
	}


	//Paddelreise, Kanukurs
	public function getTyp()
	{
		return $this->typ;
	}

	public function setTyp($typ)
	{
		$this->typ = $typ;
	}


	public function getGuide()
	{
		return $this->guide;
	}

	public function setGuide($guide)
	{
		$this->guide = $guide;
	}
}

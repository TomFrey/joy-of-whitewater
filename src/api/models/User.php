<?php
require __DIR__ .'/../vendor/autoload.php';


class User
{
	private $id;
	private $passwort;
	private $email;
	private $vorname;
	private $nachname;

	public function __construct($email = false)
	{
		if ($email) {
			$statement = DB::get()->prepare(
				"select * from user where email = :email"
			);

			$statement->execute([
				':email' => $email
			]);

			$user = $statement->fetch(PDO::FETCH_ASSOC);

			$this->setId($user['id']);
			$this->setEmail($user['email']);
			$this->setPassword($user['passwort']);
			$this->setFirstname($user['vorname']);
			$this->setLastname($user['nachname']);
		}
	}


	public function create(){
		$statement = DB::get()->prepare("insert into user (passwort, email, vorname, nachname)".
			"values (:passwort, :email, :vorname, :nachname)");

		$statement->execute(array(
			':passwort' => $this->getPassword(),
			':email' => $this->getEmail(),
			':vorname' => $this->getFirstname(),
			':nachname' => $this->getLastname()
		));
	}


	public function getEmail()
	{
		return $this->email;
	}


	public function setEmail($email)
	{
		$this->email = $email;
	}


	public function getFirstname()
	{
		return $this->vorname;
	}

	public function setFirstname($vorname)
	{
		$this->vorname = $vorname;
	}


	public function getPassword()
	{
		return $this->passwort;
	}

	public function setPassword($passwort)
	{
		$this->passwort = $passwort;
	}


	public function getId()
	{
		return $this->id;
	}

	public function setId($id)
	{
		$this->id = $id;
	}


	public function getLastname()
	{
		return $this->nachname;
	}

	public function setLastname($nachname)
	{
		$this->nachname = $nachname;
	}
}

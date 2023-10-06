<?php 

header('Content-Type : application/json');
header('Access-Control-Allow-Origin:*');
header("Access-Control-Allow-Headers : *");
include("connexionToDB.php");

$requete = "SELECT * FROM taches";
$req = $bdd->query($requete);
$response = $req->fetchAll();

echo json_encode($response);
<?php 

header('Content-Type : application/json');
header('Access-Control-Allow-Origin:*');
header("Access-Control-Allow-Headers : *");
include("connexionToDB.php");


$requete = "DELETE FROM taches WHERE id =?";
$delete = $bdd->prepare($requete);
if($_SERVER["REQUEST_METHOD"] == "POST"){
     if(isset($_POST['id'])){
          $delete->execute([$_POST["id"]]);
     }
}
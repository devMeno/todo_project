<?php 

header('Content-Type : application/json');
header('Access-Control-Allow-Origin:*');
header("Access-Control-Allow-Headers : *");
include("connexionToDB.php");


$requete = "INSERT INTO taches(content,completed,deadline) VALUES(:task,:done,:deadline)";
$insert = $bdd->prepare($requete);
if($_SERVER["REQUEST_METHOD"] == "POST"){
     if(isset($_POST['tache'],$_POST['isDone'],$_POST['for'])){
          $data = $insert->execute(array(
               'task' => $_POST['tache'],
               'done' => $_POST['isDone'],
               'deadline' => $_POST['for']
          ));
          echo json_encode($_POST);
     }
}

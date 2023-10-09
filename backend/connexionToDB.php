<?php 

try{
     $bdd = new PDO('mysql:host=localhost;dbname=tqadhpof_to_do','tqadhpof_to_do','devmeno');
}catch(Exception $e){
     die('Erreur: '.$e->getMessage());
}
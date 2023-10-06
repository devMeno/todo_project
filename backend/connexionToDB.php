<?php 

try{
     $bdd = new PDO('mysql:host=localhost;dbname=to_do','root','');
}catch(Exception $e){
     die('Erreur: '.$e->getMessage());
}
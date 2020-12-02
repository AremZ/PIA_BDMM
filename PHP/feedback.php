<?php
require ('connection.php');

$method = $_POST['method']; 

if ($method == "deleteOldFeed"){
    $conn = connectDB();

    if($conn){
        $id=$_POST['id'];

        $query = "CALL sp_deleteOldFeed($id)";

        mysqli_query($conn, $query);
        $row = mysqli_affected_rows($conn);
        if($row!=0){
            echo json_encode(array("msg"=>true));       
        }
        else{
            echo json_encode(array("msg"=>false));
        }
        closeDB($conn);
    }
}  

if ($method == "getKeyNotID"){
    $conn = connectDB();

    if($conn){
      
        $idNot=$_POST['idNot'];

        $query  = "CALL sp_getKeywordsByNewsID($idNot);";
        $resultado = mysqli_query($conn, $query);
    
        $allKeywords = array();
        
        if($resultado){
            while ($row = mysqli_fetch_assoc($resultado)) {
                $keywords = array(
                  "idClv" => $row['id_PalabraClv'],
                  "content" => $row['pal_Clave'],
                  "idNot" => $row['id_NoticiaProp']
                );
                $allKeywords[] = $keywords;
              }             
             echo json_encode($allKeywords);
        }       
        closeDB($conn);
    }
}
?>
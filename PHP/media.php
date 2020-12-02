<?php
require ('connection.php');

$method = $_POST['method']; 

if ($method == "updateImage"){
    $conn = connectDB();

    if($conn){
        $userID=$_POST['id'];

        if (isset($_FILES['pfp'])){ 
            $image = mysqli_real_escape_string($conn, file_get_contents($_FILES['pfp']['tmp_name']));
            $imagetype = $_FILES['pfp']['type'];

            $ext = explode("/", $imagetype);

            $query  = "CALL sp_updateImg('$userID','$image', '$ext[1]');";
            mysqli_query($conn, $query);
            $fila=mysqli_affected_rows($conn);
            if($fila!=0){
                echo json_encode(array("msg"=>true));       
            }
            else{
                echo json_encode(array("msg"=>false));
            }
        }    
        else{
            echo json_encode(array("msg"=>false));
        }
        closeDB($conn);
    }
}

if ($method == "getImageMedia"){
    $conn = connectDB();

    if($conn){
        
        $idNot=$_POST['idNot'];

        $query  = "CALL sp_getMedia($idNot,'img');";
        $resultado = mysqli_query($conn, $query);
    
        $noticias = array();
        
        if($resultado){
            while ($row = mysqli_fetch_assoc($resultado)) {
                $notiRed = array(
                  "image" => base64_encode($row['contenido_media']),
                  "ext" => $row['blob_type']
                );
                $noticias[] = $notiRed;
              }             
             echo json_encode($noticias);
        }       
        closeDB($conn);
    }
}

if ($method == "getVideoMedia"){
    $conn = connectDB();

    if($conn){
        
        $idNot=$_POST['idNot'];

        $query  = "CALL sp_getMedia($idNot,'vid');";
        $resultado = mysqli_query($conn, $query);
    
        $noticias = array();
        
        if($resultado){
            while ($row = mysqli_fetch_assoc($resultado)) {
                $notiRed = array(
                  "video" => base64_encode($row['contenido_media']),
                  "ext" => $row['blob_type']
                );
                $noticias[] = $notiRed;
              }             
             echo json_encode($noticias);
        }       
        closeDB($conn);
    }
}
?>
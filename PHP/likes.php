<?php
require ('connection.php');

$method = $_POST['method']; 

if ($method == "countOfLikes"){
    $conn = connectDB();

    if($conn){
      
        $idNews=$_POST['idNews'];
      
        $query  = "CALL sp_getLikesNews($idNews);";
        $resultado = mysqli_query($conn, $query);
        if($resultado){
            $row = mysqli_fetch_assoc($resultado);          
            echo json_encode(array("totalLikes" => $row['totalLikes']));  
        }
        closeDB($conn);
    }
}

if ($method == "likeNoticia"){
    $conn = connectDB();

    if($conn){
      
        $idUser=$_POST['idUser'];
        $idNot=$_POST['idNot'];
      
        $query  = "CALL sp_LikeNoticia($idUser, $idNot);";
        mysqli_query($conn, $query);
        
        $fila=mysqli_affected_rows($conn);
        if($fila!=0){
            echo json_encode(array("msg"=>true));       
        }
        else{
            echo json_encode(array("msg"=>false));
        }
        closeDB($conn);
    }
}

if ($method == "deleteLike"){
    $conn = connectDB();

    if($conn){
      
        $idUser=$_POST['idUser'];
        $idNot=$_POST['idNot'];
      
        $query  = "CALL sp_deleteLike($idUser, $idNot);";
        mysqli_query($conn, $query);
        
        $fila=mysqli_affected_rows($conn);
        if($fila!=0){
            echo json_encode(array("msg"=>true));       
        }
        else{
            echo json_encode(array("msg"=>false));
        }
        closeDB($conn);
    }
}

if ($method == "updateLikeButt"){
    $conn = connectDB();

    if($conn){
      
        $idUser=$_POST['idUser'];
        $idNot=$_POST['idNot'];
        
        $query  = "CALL sp_isLiked($idUser, $idNot);";
        $resultado = mysqli_query($conn, $query);
        $row = mysqli_fetch_assoc($resultado);
        
        if($row['id_like'] != ""){     
            echo json_encode(array("msg"=>true));
        }
        else{
            echo json_encode(array("msg"=>false));
        }
        closeDB($conn);
    }
}
?>
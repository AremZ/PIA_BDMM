<?php
require ('connection.php');

$method = $_POST['method']; 

if ($method == "countOfComments"){
    $conn = connectDB();

    if($conn){
      
        $idNews=$_POST['idNews'];
      
        $query  = "CALL sp_getCommentsNews($idNews);";
        $resultado = mysqli_query($conn, $query);
        if($resultado){
            $row = mysqli_fetch_assoc($resultado);          
            echo json_encode(array("totalComms" => $row['totalComms']));  
        }
        closeDB($conn);
    }
}
if ($method == "postComment"){
    $conn = connectDB();

    if($conn){
      
        $idParent=$_POST['idParent'];
        $idUser=$_POST['idUser'];
        $idNews=$_POST['idNews'];
        $comment=$_POST['comment'];
      
        $query  = "CALL sp_insertComment($idParent, $idUser, $idNews, '$comment');";
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

if ($method == "getComments"){
    $conn = connectDB();

    if($conn){
      
        $idNews=$_POST['idNot'];
      
        $query  = "CALL sp_getNewsComments($idNews);";
        $resultado = mysqli_query($conn, $query);
        $comments = array();
        
        if($resultado){
            while ($row = mysqli_fetch_assoc($resultado)) {
                $comentario = array(
                    "userID" => $row['id_Usuario'],
                    "name" => $row['nombres'],
                    "apePat" => $row['apellido_P'],
                    "apeMat" => $row['apellido_M'],
                    "avatar" => base64_encode($row['foto_Perfil']),
                    "type" => $row['blob_type'],
                    "commentID" => $row['id_Comentario'],
                    "commentPadre" => $row['comentario_Dueno'],
                    "comment" => $row['contenido_Comentario'],
                    "dateComm" => $row['fecha_Comentario'],
                    "newsID" => $row['noticia_Comentario']
                );
                $comments[] = $comentario;
              }
              
             echo json_encode($comments);
        }       
        closeDB($conn);
    }
}

if ($method == "getCommentReplies"){
    $conn = connectDB();

    if($conn){
      
        $idNews=$_POST['idNot'];
        $idParent=$_POST['idParent'];
      
        $query  = "CALL sp_getRepliesComments($idNews, $idParent);";
        $resultado = mysqli_query($conn, $query);
        $replies = array();
        
        if($resultado){
            while ($row = mysqli_fetch_assoc($resultado)) {
                $respuestas = array(
                    "userID" => $row['id_Usuario'],
                    "name" => $row['nombres'],
                    "apePat" => $row['apellido_P'],
                    "apeMat" => $row['apellido_M'],
                    "avatar" => base64_encode($row['foto_Perfil']),
                    "type" => $row['blob_type'],
                    "commentID" => $row['id_Comentario'],
                    "commentPadre" => $row['comentario_Dueno'],
                    "comment" => $row['contenido_Comentario'],
                    "dateComm" => $row['fecha_Comentario'],
                    "newsID" => $row['noticia_Comentario']
                );
                $replies[] = $respuestas;
              }
              
             echo json_encode($replies);
        }       
        closeDB($conn);
    }
}

if ($method == "deleteComm"){
    $conn = connectDB();

    if($conn){
        $id=$_POST['id'];

        $query = "CALL sp_deleteComm($id)";

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
?>
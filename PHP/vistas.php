<?php
require ('connection.php');

$method = $_POST['method']; 

if ($method == "increaseViews"){
    $conn = connectDB();

    if($conn){
      
        $idNews=$_POST['idNews'];
      
        $query  = "CALL sp_oneMoreView($idNews);";
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
?>
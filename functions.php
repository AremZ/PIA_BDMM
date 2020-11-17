<?php 

$method = $_POST['method'];

if ($method == "userLogin"){
    //Creamos la conexion
    $conn = connectDB();

    if($conn){
        $email= $_POST['email'];
        $pass= $_POST['pass'];
        
        $query  = "CALL getUsersLogin('$email', '$pass');";
        $resultado = mysqli_query($conn, $query);
        $row = mysqli_fetch_assoc($resultado);
        
        if($row['email'] != ""){
            echo json_encode(array("msg"=>true));       
        }
        else{
            echo json_encode(array("msg"=>false));
        }
        closeDB($conn);
    }
}  

if ($method == "userSignUp"){
    //Creamos la conexion
    $conn = connectDB();

    if($conn){
        $name=$_POST['name'];
        $lastN=$_POST['lastName'];
        $lastN2=$_POST['lastName2'];
        $email= $_POST['email'];
        $tel=$_POST['numTel'];
        $pass= $_POST['pass'];
        
        $query  = "CALL sp_userSignUp('$name', '$lastN','$lastN2','$email', ' $tel','$pass');";
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

function connectDB(){
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "novadb";  
    
    $conn = mysqli_connect($servername, $username, $password, $dbname);

    if (!$conn) {
        die("Connection failed: " . msqli_connect_error());
    }
    else{
        return $conn;
    }
}

function closeDB($connection){
    mysqli_close($connection);   
}

?>
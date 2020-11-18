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
        $userType=$_POST['userType'];
        $name=$_POST['name'];
        $lastN=$_POST['lastName'];
        $lastN2=$_POST['lastName2'];
        $email= $_POST['email'];
        $tel=$_POST['numTel'];
        $pass= $_POST['pass'];

        $query  = "CALL sp_userSignUp('$userType','$name','$lastN','$lastN2','$email','$tel','$pass');";
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


if ($method == "getAllUsers"){
    $conn = connectDB();

    if($conn){
      
        $query  = "CALL sp_getAllUsers(0);";
        $resultado = mysqli_query($conn, $query);        
        $usuarios = array();
        
        if($resultado){
            while ($row = mysqli_fetch_assoc($resultado)) {
                $usser = array(
                    "id" => $row['id_Usuario'],
                    "tipoUsuario" => $row['tipo_Usuario'],
                    "name" => $row['nombres'],
                    "apellidoP" => $row['apellido_P'],
                    "apellidoM" => $row['apellido_M'],
                    "tel" => $row['telefono'],
                    "email" => $row['email'],
                    "password" => $row['contrasena']
                );
                $usuarios[] = $usser;
              }
              
             echo json_encode($usuarios);
        }       
        closeDB($conn);
    }
}

if ($method == "getAllReporteros"){
    $conn = connectDB();

    if($conn){
      
        $query  = "CALL sp_getAllUsers(1);";      
        $resultado = mysqli_query($conn, $query);        
        $usuarios = array();
        
        if($resultado){
            while ($row = mysqli_fetch_assoc($resultado)) {
                $usser = array(
                    "id" => $row['id_Usuario'],
                    "tipoUsuario" => $row['tipo_Usuario'],
                    "name" => $row['nombres'],
                    "apellidoP" => $row['apellido_P'],
                    "apellidoM" => $row['apellido_M'],
                    "tel" => $row['telefono'],
                    "email" => $row['email'],
                    "password" => $row['contrasena']
                );
                $usuarios[] = $usser;
              }
              
             echo json_encode($usuarios);
        }       
        closeDB($conn);
    }
}

if ($method == "editUsers"){
    $conn = connectDB();

    if($conn){
        $id=$_POST['id'];
        $userType=$_POST['userType'];
        $name=$_POST['name'];
        $lastN=$_POST['lastName'];
        $lastN2=$_POST['lastName2'];
        $email= $_POST['email'];
        $tel=$_POST['numTel'];
        $pass= $_POST['pass'];

        $query = "CALL sp_editUser($id, '$userType', '$name', '$lastN', '$lastN2', '$email', '$tel', '$pass')";

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

if ($method == "deleteUser"){
    $conn = connectDB();

    if($conn){
        $id=$_POST['id'];

        $query = "CALL sp_bajaUser($id)";

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

function connectDB(){
    $servername = "localhost"; 
    //$username = "root";
    $username = "PruebaDB3";
    //$password = "";
    $password = "password";
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


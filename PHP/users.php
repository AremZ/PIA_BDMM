<?php
require ('connection.php');

$method = $_POST['method'];

if ($method == "userLogin"){
    $conn = connectDB();

    if($conn){
        $email= $_POST['email'];
        $pass= $_POST['pass'];
        
        $query  = "CALL sp_getUsersLogin('$email', '$pass');";
        $resultado = mysqli_query($conn, $query);
        $row = mysqli_fetch_assoc($resultado);
        
        if($row['email'] != ""){
            $value =  $row['id_Usuario'];
            $cookie_name = "user";
            setcookie($cookie_name, $value, time() + (86400 * 30), "/"); // 86400 = 1 day*/
            echo json_encode($row);       
        }
        else{
            echo json_encode(array("msg"=>false));
        }
        closeDB($conn);
    }
}

if ($method == "userLogout"){
   
    setcookie ("user","", time()-3600, '/');
    echo json_encode(array("msg"=>true));       

}

if ($method == "userSignUp"){ 
    $conn = connectDB();
    if($conn){
            $userType=$_POST['userType'];
            $name=$_POST['name'];
            $lastN=$_POST['lastName'];
            $lastN2=$_POST['lastName2'];
            $email= $_POST['email'];
            $tel=$_POST['numTel'];
            $pass= $_POST['pass'];

            if (isset($_FILES['pfp'])){ 
                $image = mysqli_real_escape_string($conn, file_get_contents($_FILES['pfp']['tmp_name']));
                $imagetype = $_FILES['pfp']['type'];

                $ext = explode("/", $imagetype);

                $query  = "CALL sp_userSignUp('$userType','$name','$lastN','$lastN2','$email','$tel','$pass','$image', '$ext[1]');";
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
            echo json_encode(array("msg"=>true));
        }
        closeDB($conn);
    }
} 

if ($method == "editUsersSelf"){
    $conn = connectDB();

    if($conn){
        $id=$_POST['id'];
        $name=$_POST['name'];
        $lastN=$_POST['lastName'];
        $lastN2=$_POST['lastName2'];
        $email= $_POST['email'];
        $tel=$_POST['numTel'];
        $pass= $_POST['pass'];

        $query = "CALL sp_editUserSelf($id, '$name', '$lastN', '$lastN2', '$email', '$tel', '$pass')";

        mysqli_query($conn, $query);
        $row = mysqli_affected_rows($conn);
        if($row!=0){
            echo json_encode(array("msg"=>true));       
        }
        else{
            echo json_encode(array("msg"=>true));
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

if ($method == "getUserData"){
    $conn = connectDB();

    if($conn){
      
        $idUser=$_POST['idUser'];
      
        $query  = "CALL sp_getUserData($idUser);";
        $resultado = mysqli_query($conn, $query);        
        $usuario = array();
        
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
                    "password" => $row['contrasena'],
                    "avatar" => base64_encode($row['foto_Perfil']),
                    "imgType" => $row['blob_type']
                );
                $usuario[] = $usser;
              }
              
             echo json_encode($usuario);
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
                    "password" => $row['contrasena'],
                    "avatar" => base64_encode($row['foto_Perfil']),
                    "imgType" => $row['blob_type']
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
                    "password" => $row['contrasena'],
                    "avatar" => base64_encode($row['foto_Perfil']),
                    "imgType" => $row['blob_type']
                );
                $usuarios[] = $usser;
              }
              
             echo json_encode($usuarios);
        }       
        closeDB($conn);
    }
}

if ($method == "getLoggedUser"){
    
    $conn = connectDB();
    
    $cookie_name="user";

    if(!isset($_COOKIE[$cookie_name])){
        echo json_encode(array("msg"=>false));     
    }
    
    else{
    if($conn){
        $query  = "CALL sp_getUserData($_COOKIE[$cookie_name]);";
        $resultado = mysqli_query($conn, $query);        
        $usuarios = array();
        if($resultado){
            while ($row = mysqli_fetch_assoc($resultado)) {
                $usser = array(
                    "id" => $row['id_Usuario'],
                    "tipoUsuario" => $row['tipo_Usuario'],
                    "name" => $row['nombres']//,
                    //"avatar" => base64_encode($row['foto_Perfil']),
                   // "imgType" => $row['blob_type']
                );
                $usuarios[] = $usser;
              }
              
             echo json_encode($usuarios);
        }       
        closeDB($conn);
    }
}
}
?>


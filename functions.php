<?php

function userLogin($email, $pass){
    $servername = "localhost";
    $username = "PruebaDB3";
    $password = "password";
    $dbname = "novadb";

    //Creamos la conexion
    $conn = mysqli_connect($servername, $username, $password, $dbname);

    if(!$conn){
        die("Connection failed: " . msqli_connect_error());
    }
    else{
        $query  = "SELECT email, contrasena FROM usuario WHERE email = '$email' AND contrasena = '$pass';";
        $resultado = mysqli_query($conn, $query);
        $row = mysqli_fetch_assoc($resultado);
        
        if($row['email'] != ""){            
            echo '<script language="javascript">';
            echo ('alert("' . $row['email'] . ' ' . $row['contrasena'] . '");');
            echo '</script>';
            mysqli_close($conn);
        }
        else{
            echo '<script language="javascript">';
            echo 'alert("Vos sos pelotudo o que")';
            echo '</script>';
        }
    }
}
?>
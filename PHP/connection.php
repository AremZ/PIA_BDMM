<?php

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
<?php
require ('connection.php');

$method = $_POST['method']; 

if ($method == "getSearchResult"){
    $conn = connectDB();

    if($conn){

        $titulo=$_POST['tituloB'];
        $descrip=$_POST['descripB'];
        $clave=$_POST['claveB'];
        $fechaI=$_POST['fechaIB'];
        $fechaF=$_POST['fechaFB'];
      
        $query  = "CALL sp_Search('B','$titulo','$descrip','$clave','$fechaI','$fechaF');";
       
        $resultado = mysqli_query($conn, $query);
    
        $noticias = array();
        
        if($resultado){
            while ($row = mysqli_fetch_assoc($resultado)) {
                $noti = array(
                  "id" => $row['id_Noticia'],
                  "title" => $row['titulo_Noticia'],
                  "fePub" => $row['fecha_Publicacion'],
                  "descrSh" => $row['descripcion_Corta'],
                  "preview" => base64_encode($row['contenido_media']),
                  "ext" => $row['blob_type']
                );
                $noticias[] = $noti;
              }
              
             echo json_encode($noticias);
        }       
        closeDB($conn);
    }
}
?>
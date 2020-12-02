<?php
require ('connection.php');

$method = $_POST['method']; 

if ($method == "noticiaReg"){
    $conn = connectDB();

    if($conn){
        $idSec=$_POST['idSec'];
        $titleNot=$_POST['title'];
        $dateAcont=$_POST['dateAcont'];
        $lugAcont=$_POST['lugAcont'];
        $descrSh=$_POST['descrSh'];
        $descrLg= $_POST['descrLg'];
        $status= $_POST['status'];

        $sent= $_POST['sent'];

        $palClavArray=json_decode($_POST['arrayClv']);
        $imgMediaArray= json_decode($_POST['imgMedia']);
        $vidMediaArray= json_decode($_POST['vidMedia']);

        $query  = "CALL sp_noticiaRegister($idSec,'$titleNot', 3, '$dateAcont', '$lugAcont', '$descrSh', '$descrLg', '$status', $sent)";
        mysqli_query($conn, $query);
        $fila = mysqli_affected_rows($conn);
        if($fila!=0){  
                        
            $querylastID = "select LAST_INSERT_ID() AS 'LastID';";
            //$querylastID = "CALL sp_lastInsertedID();";
            $resultado = mysqli_query($conn, $querylastID);
            $rowID = mysqli_fetch_assoc($resultado);
            //$IDNot = mysqli_insert_id($conn);
            $IDNot = $rowID['LastID'];
            //$abc = $IDNot;

            foreach($palClavArray as $palClav)
            {
                $finalKey = strtolower($palClav);
                $queryClav  = "CALL sp_insertPalClav('$finalKey', $IDNot)";
                mysqli_query($conn, $queryClav);
                $row = mysqli_affected_rows($conn);
                if($row!=0){ 
                }
                else{
                    echo json_encode(array("msg"=>false));
                }
            }

            foreach($imgMediaArray as $imgMedia)
            {
                $image = mysqli_real_escape_string($conn, file_get_contents($imgMedia));

                $firstExp = explode(";base64", $imgMedia);
                $ext = explode("/", $firstExp[0]);

                $queryImg  = "CALL sp_insertMedia('$image', '$ext[1]', $IDNot);";
                mysqli_query($conn, $queryImg);
                $rowImg = mysqli_affected_rows($conn);
                if($rowImg!=0){ 
                }
                else{
                    echo json_encode(array("msg"=>false));
                }
            }

            foreach($vidMediaArray as $vidMedia)
            {
                $video = mysqli_real_escape_string($conn, file_get_contents($vidMedia));

                $firstExp = explode(";base64", $vidMedia);
                $ext = explode("/", $firstExp[0]);

                $queryVid  = "CALL sp_insertMedia('$video', '$ext[1]', $IDNot);";
                mysqli_query($conn, $queryVid);
                $rowVid = mysqli_affected_rows($conn);
                if($rowVid!=0){ 
                }
                else{
                    echo json_encode(array("msg"=>false));
                }
            }
            echo json_encode(array("msg"=>true, /*"aa"=>$IDNot*/));
        }
        else{
            echo json_encode(array("msg"=>false));
        }
        closeDB($conn);
    }
} 

if ($method == "noticiaUpd"){
    $conn = connectDB();

    if($conn){
        $idNot=$_POST['idNot'];
        $idSec=$_POST['idSec'];
        $titleNot=$_POST['title'];
        $dateAcont=$_POST['dateAcont'];
        $lugAcont=$_POST['lugAcont'];
        $descrSh=$_POST['descrSh'];
        $descrLg= $_POST['descrLg'];
        $newStatus= $_POST['status'];
        
        $sent= $_POST['sent'];

        $palClavArray=json_decode($_POST['arrayClv']);
        $imgMediaArray= json_decode($_POST['imgMedia']);
        $vidMediaArray= json_decode($_POST['vidMedia']);

        $query  = "CALL sp_noticiaUpdate($idNot,$idSec,'$titleNot','$dateAcont','$lugAcont','$descrSh','$descrLg','$newStatus', $sent)";
        mysqli_query($conn, $query);
        $fila = mysqli_affected_rows($conn);

        foreach($palClavArray as $palClav)
        {
            $finalKey = strtolower($palClav);
            $queryClav  = "CALL sp_insertPalClav('$finalKey', $idNot)";
            mysqli_query($conn, $queryClav);
            $row = mysqli_affected_rows($conn);
            if($row!=0){ 
            }
            else{
                echo json_encode(array("msg"=>false));
            }
        }   

        foreach($imgMediaArray as $imgMedia)
        {
            $image = mysqli_real_escape_string($conn, file_get_contents($imgMedia));

            $firstExp = explode(";base64", $imgMedia);
            $ext = explode("/", $firstExp[0]);

            $queryImg  = "CALL sp_insertMedia('$image', '$ext[1]', $idNot);";
            mysqli_query($conn, $queryImg);
            $rowImg = mysqli_affected_rows($conn);
            if($rowImg!=0){ 
            }
            else{
                echo json_encode(array("msg"=>false));
            }
        }  

        foreach($vidMediaArray as $vidMedia)
        {
            $video = mysqli_real_escape_string($conn, file_get_contents($vidMedia));

            $queryVid  = "CALL sp_insertMedia('$video', 'mp4', $idNot);";
            mysqli_query($conn, $queryVid);
            $rowVid = mysqli_affected_rows($conn);
            if($rowVid!=0){ 
            }
            else{
                echo json_encode(array("msg"=>false));
            }
        }
        echo json_encode(array("msg"=>true));

        closeDB($conn);
    }
} 

if ($method == "displayPubNotis"){
    $conn = connectDB();

    if($conn){
      
        $query  = "CALL sp_getRecentNews();";
        $resultado = mysqli_query($conn, $query);
    
        $noticias = array();
        
        if($resultado){
            while ($row = mysqli_fetch_assoc($resultado)) {
                $notiRed = array(
                  "id" => $row['id_Noticia'],
                  "title" => $row['titulo_Noticia'],
                  "fePub" => $row['fecha_Publicacion'],
                  "descrSh" => $row['descripcion_Corta'],
                  "preview" => base64_encode($row['contenido_media']),
                  "ext" => $row['blob_type']
                );
                $noticias[] = $notiRed;
              }             
             echo json_encode($noticias);
        }       
        closeDB($conn);
    }
}

if ($method == "displayMostViewed"){
    $conn = connectDB();

    if($conn){
      
        $query  = "CALL sp_getMostViewed();";
        $resultado = mysqli_query($conn, $query);
    
        $noticias = array();
        
        if($resultado){
            while ($row = mysqli_fetch_assoc($resultado)) {
                $notiRed = array(
                  "id" => $row['id_Noticia'],
                  "title" => $row['titulo_Noticia'],
                  "fePub" => $row['fecha_Publicacion'],
                  "descrSh" => $row['descripcion_Corta'],
                  "preview" => base64_encode($row['contenido_media']),
                  "ext" => $row['blob_type']
                );
                $noticias[] = $notiRed;
              }             
             echo json_encode($noticias);
        }       
        closeDB($conn);
    }
}

if ($method == "newsBySection"){
    $conn = connectDB();

    if($conn){
      
        $id=$_POST['idSection'];
        $limit=$_POST['limit'];

        $query  = "CALL sp_getNewsBySection($id, $limit);";
        $resultado = mysqli_query($conn, $query);
    
        $noticias = array();
        
        if($resultado){
            while ($row = mysqli_fetch_assoc($resultado)) {
                $notiRed = array(
                  "id" => $row['id_Noticia'],
                  "title" => $row['titulo_Noticia'],
                  "fePub" => $row['fecha_Publicacion'],
                  "descrSh" => $row['descripcion_Corta'],
                  "preview" => base64_encode($row['contenido_media']),
                  "ext" => $row['blob_type']
                );
                $noticias[] = $notiRed;
              }             
             echo json_encode($noticias);
        }       
        closeDB($conn);
    }
}

if ($method == "deleteNoti"){
    $conn = connectDB();

    if($conn){
        $id=$_POST['id'];

        $query = "CALL sp_deleteNoticia($id)";

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

if ($method == "getNoticiasRed"){
    $conn = connectDB();

    if($conn){
      
        $query  = "CALL sp_getNoti(3,'redaccion');";
        $resultado = mysqli_query($conn, $query);
    
        $noticias = array();
        
        if($resultado){
            while ($row = mysqli_fetch_assoc($resultado)) {
                $notiRed = array(
                  "id" => $row['id_Noticia'],
                  "idSecc" => $row['seccion_Noticia'],
                  "title" => $row['titulo_Noticia'],
                  "idAutor" => $row['reportero_Autor'],
                  "feCreacion" => $row['fecha_Creacion'],
                  "feAcont" => $row['fecha_Acontecimiento'],
                  "feEnvio" => $row['fecha_Envio'],
                  "feDevo" => $row['fecha_Devo'],
                  "lugAcont" => $row['lugar_Acontecimiento'],
                  "descrSh" => $row['descripcion_Corta'],
                  "descrLg" => $row['descripcion_Larga'],
                  "status" => $row['estado'],
                  "preview" => base64_encode($row['contenido_media']),
                  "ext" => $row['blob_type']
                );
                $noticias[] = $notiRed;
              }             
             echo json_encode($noticias);
        }       
        closeDB($conn);
    }
} 

if ($method == "getNoticiasPend"){
    $conn = connectDB();

    if($conn){
      
        $query  = "CALL sp_getNoti(3,'terminada');";
        $resultado = mysqli_query($conn, $query);
    
        $noticias = array();
        
        if($resultado){
            while ($row = mysqli_fetch_assoc($resultado)) {
                $notiRed = array(
                  "id" => $row['id_Noticia'],
                  "idSecc" => $row['seccion_Noticia'],
                  "title" => $row['titulo_Noticia'],
                  "idAutor" => $row['reportero_Autor'],
                  "feCreacion" => $row['fecha_Creacion'],
                  "feAcont" => $row['fecha_Acontecimiento'],
                  "feEnvio" => $row['fecha_Envio'],
                  "feDevo" => $row['fecha_Devo'],
                  "lugAcont" => $row['lugar_Acontecimiento'],
                  "descrSh" => $row['descripcion_Corta'],
                  "descrLg" => $row['descripcion_Larga'],
                  "status" => $row['estado'],
                  "preview" => base64_encode($row['contenido_media']),
                  "ext" => $row['blob_type']
                );
                $noticias[] = $notiRed;
              }             
             echo json_encode($noticias);
        }       
        closeDB($conn);
    }
} 

if ($method == "getNoticiasDev"){
    $conn = connectDB();

    if($conn){
      
        $query  = "CALL sp_getNotiDev(3);";
        $resultado = mysqli_query($conn, $query);
    
        $noticias = array();
        
        if($resultado){
            while ($row = mysqli_fetch_assoc($resultado)) {
                $notiRed = array(
                  "id" => $row['id_Noticia'],
                  "idSecc" => $row['seccion_Noticia'],
                  "title" => $row['titulo_Noticia'],
                  "idAutor" => $row['reportero_Autor'],
                  "feCreacion" => $row['fecha_Creacion'],
                  "feAcont" => $row['fecha_Acontecimiento'],
                  "feEnvio" => $row['fecha_Envio'],
                  "feDevo" => $row['fecha_Devo'],
                  "lugAcont" => $row['lugar_Acontecimiento'],
                  "descrSh" => $row['descripcion_Corta'],
                  "descrLg" => $row['descripcion_Larga'],
                  "status" => $row['estado'],
                  "idfeed" => $row['id_NotFeed'],
                  "feedback" => $row['feedback'],
                  "preview" => base64_encode($row['contenido_media']),
                  "ext" => $row['blob_type']
                );
                $noticias[] = $notiRed;
              }             
             echo json_encode($noticias);
        }       
        closeDB($conn);
    }
}   

if ($method == "getNoticiasEnv"){
    $conn = connectDB();

    if($conn){
      
        $query  = "CALL sp_getSentNotis('terminada');";
        $resultado = mysqli_query($conn, $query);
    
        $noticias = array();
        
        if($resultado){
            while ($row = mysqli_fetch_assoc($resultado)) {
                $notiRed = array(
                  "id" => $row['id_Noticia'],
                  "idSecc" => $row['seccion_Noticia'],
                  "title" => $row['titulo_Noticia'],
                  "idAutor" => $row['reportero_Autor'],
                  "feCreacion" => $row['fecha_Creacion'],
                  "feAcont" => $row['fecha_Acontecimiento'],
                  "feEnvio" => $row['fecha_Envio'],
                  "feDevo" => $row['fecha_Devo'],
                  "lugAcont" => $row['lugar_Acontecimiento'],
                  "descrSh" => $row['descripcion_Corta'],
                  "descrLg" => $row['descripcion_Larga'],
                  "status" => $row['estado'],
                  "name" => $row['nombres'],
                  "apePat" => $row['apellido_P'],
                  "apeMat" => $row['apellido_M'],
                  "sectionName" => $row['nombre_Seccion'],
                  "sectionColor" => $row['color_Seccion'],
                  "preview" => base64_encode($row['contenido_media']),
                  "ext" => $row['blob_type']
                );
                $noticias[] = $notiRed;
              }             
             echo json_encode($noticias);
        }       
        closeDB($conn);
    }
} 

if ($method == "getNoticiasPub"){
    $conn = connectDB();

    if($conn){
      
        $query  = "CALL sp_getNoti(3,'publicada');";
        $resultado = mysqli_query($conn, $query);
    
        $noticias = array();
        
        if($resultado){
            while ($row = mysqli_fetch_assoc($resultado)) {
                $notiRed = array(
                  "id" => $row['id_Noticia'],
                  "idSecc" => $row['seccion_Noticia'],
                  "title" => $row['titulo_Noticia'],
                  "idAutor" => $row['reportero_Autor'],
                  "feCreacion" => $row['fecha_Creacion'],
                  "feAcont" => $row['fecha_Acontecimiento'],
                  "feEnvio" => $row['fecha_Envio'],
                  "fePub" => $row['fecha_Publicacion'],
                  "feDevo" => $row['fecha_Devo'],
                  "lugAcont" => $row['lugar_Acontecimiento'],
                  "descrSh" => $row['descripcion_Corta'],
                  "descrLg" => $row['descripcion_Larga'],
                  "status" => $row['estado'],
                  "preview" => base64_encode($row['contenido_media']),
                  "ext" => $row['blob_type']
                );
                $noticias[] = $notiRed;
              }             
             echo json_encode($noticias);
        }       
        closeDB($conn);
    }
} 

if ($method == "noticiaUpdStatus"){
    $conn = connectDB();

    if($conn){
        $idNot=$_POST['idNot'];
        $status=$_POST['status'];

        $query  = "CALL sp_updateNotStatus($idNot,'$status')";
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

if ($method == "noticiaUpdStatusFeedback"){
    $conn = connectDB();

    if($conn){
        $idNot=$_POST['idNot'];
        $status=$_POST['status'];
        $idEditor=$_POST['idEditor'];
        $comment=$_POST['comment'];

        $query  = "CALL sp_updateNotStatus($idNot,'$status')";
        mysqli_query($conn, $query);
        $row = mysqli_affected_rows($conn);
        if($row!=0){           
            $query2  = "CALL sp_saveComment($idEditor,$idNot,'$comment')";
            mysqli_query($conn, $query2);
            $row = mysqli_affected_rows($conn);
            if($row!=0){
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

if ($method == "getNewsData"){
    $conn = connectDB();

    if($conn){
      
        $idNews=$_POST['idNews'];
      
        $query  = "CALL sp_getFullNews($idNews);";
        $resultado = mysqli_query($conn, $query);
        
        if($resultado){
            while ($row = mysqli_fetch_assoc($resultado)) {
                $noticia = array(
                    "id" => $row['id_Noticia'],
                    "title" => $row['titulo_Noticia'],
                    "fePubli" => $row['fecha_Publicacion'],
                    "feCreacion" => $row['fecha_Creacion'],
                    "feAcont" => $row['fecha_Acontecimiento'],
                    "lugAcont" => $row['lugar_Acontecimiento'],
                    "descrSh" => $row['descripcion_Corta'],
                    "descrLg" => $row['descripcion_Larga'],
                    "name" => $row['nombres'],
                    "apePat" => $row['apellido_P'],
                    "apeMat" => $row['apellido_M'],
                    "sectionColor" => $row['color_Seccion']
                );
              }
              
             echo json_encode($noticia);
        }       
        closeDB($conn);
    }
}

if ($method == "getNewsByIDDisplay"){
    $conn = connectDB();

    if($conn){
      
        $idNews=$_POST['idNews'];
      
        $query  = "CALL sp_getNewsByID($idNews);";
        $resultado = mysqli_query($conn, $query);
    
        $noticias = array();
        
        if($resultado){
            while ($row = mysqli_fetch_assoc($resultado)) {
                $notiRed = array(
                  "id" => $row['id_Noticia'],
                  "title" => $row['titulo_Noticia'],
                  "fePub" => $row['fecha_Publicacion'],
                  "descrSh" => $row['descripcion_Corta'],
                  "preview" => base64_encode($row['contenido_media']),
                  "ext" => $row['blob_type']
                );
                $noticias[] = $notiRed;
              }             
             echo json_encode($noticias);
        }       
        closeDB($conn);
    }
}

if ($method == "getPublishedNotes"){
    $conn = connectDB();

    if($conn){
            
        $query  = "CALL sp_getPubNews();";
        $resultado = mysqli_query($conn, $query);
        if($resultado){
            $row = mysqli_fetch_assoc($resultado);          
            echo json_encode(array("totalNews" => $row['totalNews']));  
        }
        closeDB($conn);
    }
} 

if ($method == "getRelated"){
    $conn = connectDB();

    if($conn){
      
        $keyword=$_POST['keyword'];
        $idNot=$_POST['actualNot'];

        $query  = "CALL sp_getRelated('$keyword', $idNot);";
        $resultado = mysqli_query($conn, $query);       
        $relatedNots = array();
        
        if($resultado){
            while ($row = mysqli_fetch_assoc($resultado)) {
                $newsRel = array(
                    "idNot" => $row['id_Noticia'],
                    "palClav" => $row['pal_Clave']
                );
                $relatedNots[] = $newsRel;
              }
              
             echo json_encode($relatedNots);
        }       
        closeDB($conn);
    }
}
?>
<?php 

$method = $_POST['method'];

if ($method == "userLogin"){
    //Creamos la conexion
    $conn = connectDB();

    if($conn){
        $email= $_POST['email'];
        $pass= $_POST['pass'];
        
        $query  = "CALL sp_getUsersLogin('$email', '$pass');";
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


if ($method == "userSignUp")
{ 
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

if ($method == "updateImage"){
    $conn = connectDB();

    if($conn){
        $userID=$_POST['id'];

        if (isset($_FILES['pfp'])){ 
            $image = mysqli_real_escape_string($conn, file_get_contents($_FILES['pfp']['tmp_name']));
            $imagetype = $_FILES['pfp']['type'];

            $ext = explode("/", $imagetype);

            $query  = "CALL sp_updateImg('$userID','$image', '$ext[1]');";
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

if ($method == "addSection"){
    //Creamos la conexion
       //Creamos la conexion
       $conn = connectDB();

       if($conn){
           $sectionName=$_POST['nameS'];
           $sectionColor=$_POST['color'];
           $orderNumber=$_POST['order'];

           $query  = "CALL sp_addSection('$sectionName','$sectionColor',$orderNumber);";
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

if ($method == "getSecciones"){
    //Creamos la conexion
    $conn = connectDB();

    if($conn){
      
        $query  = "CALL sp_getSections();";
        $resultado = mysqli_query($conn, $query);
    
        $secciones = array();
        
        if($resultado){
            while ($row = mysqli_fetch_assoc($resultado)) {
                $sect = array(
                  "id" => $row['id_Seccion'],
                  "name" => $row['nombre_Seccion'],
                  "color" => $row['color_Seccion']
                  /*,
                  "apellidoP" => $row['apellido_P'],
                  "apellidoM" => $row['apellido_M'],
                  "tipoUsuario" => $row['tipo_Usuario']*/
                );
                $secciones[] = $sect;
              }
              
             echo json_encode($secciones);
        }       
        closeDB($conn);
    }
} 

if ($method == "noticiaReg"){
    //Creamos la conexion
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
            $IDNot = $rowID['LastID'];

            foreach($palClavArray as $palClav)
            {
                $queryClav  = "CALL sp_insertPalClav('$palClav', $IDNot)";
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
            echo json_encode(array("msg"=>true));
        }
        else{
            echo json_encode(array("msg"=>false));
        }
        closeDB($conn);
    }
} 

if ($method == "noticiaUpd"){
    //Creamos la conexion
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
            $queryClav  = "CALL sp_insertPalClav('$palClav', $idNot)";
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

            $firstExp = explode(";base64", $vidMedia);
            $ext = explode("/", $firstExp[0]);

            $queryVid  = "CALL sp_insertMedia('$video', '$ext[1]', $idNot);";
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

if ($method == "setOrden"){
    //Creamos la conexion
    $conn = connectDB();

    if($conn){
        
         
        $newOrden=$_POST['newOrden'];
        $idSeccion=$_POST['idSeccion'];

        $query  = "CALL sp_setOrdenSeccion('$newOrden','$idSeccion');";
        mysqli_query($conn, $query);
        $fila=mysqli_affected_rows($conn);
        if($fila==1){
            echo json_encode(array("msg"=>true));       
        }
        else{
            echo json_encode(array("msg"=>false));
        }
        closeDB($conn);
    }
} 

if ($method == "getSectionName"){
    //Creamos la conexion
    $conn = connectDB();

    if($conn){
        
         
        $idSeccion=$_POST['idSeccionE'];
        $query  = "CALL sp_askDeleteSeccion('$idSeccion');";
        $resultado=mysqli_query($conn, $query);
        $query  = "CALL sp_getSeccion('$idSeccion');";
        $resultado=mysqli_query($conn, $query);

        $secciones = array();
        if($resultado){
            while ($row = mysqli_fetch_assoc($resultado)) {
                $sec = array(
                   "id" => $row['id_Seccion'],
                  "nombreSection" => $row['nombre_Seccion']
                );
                $secciones[] = $sec;
              }             
             echo json_encode($secciones);
        }       
        closeDB($conn);
    }
} 

if ($method == "regresarSeccion"){
    //Creamos la conexion
    $conn = connectDB();

    if($conn){
        
         
        $idSeccion=$_POST['idSeccionE'];
        $query  = "CALL sp_sectionTo1('$idSeccion');";
        $resultado=mysqli_query($conn, $query);
       

        $secciones = array();
        if($resultado){
            while ($row = mysqli_fetch_assoc($resultado)) {
                $sec = array(
                   "id" => $row['id_Seccion'],
                  "nombreSection" => $row['nombre_Seccion']
                );
                $secciones[] = $sec;
              }             
             echo json_encode($secciones);
        }       
        closeDB($conn);
    }
} 

if ($method == "updateSeccion"){
    //Creamos la conexion
       //Creamos la conexion
       $conn = connectDB();

       if($conn){
            $idSeccion=$_POST['idSeccionE'];
           $sectionName=$_POST['nameS'];
           $sectionColor=$_POST['color'];
           

           $query  = "CALL sp_updateSeccion('$idSeccion','$sectionName','$sectionColor');";
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

if ($method == "deleteSeccion"){
    //Creamos la conexion
       //Creamos la conexion
       $conn = connectDB();

       if($conn){
            $idSeccion=$_POST['idSeccionE'];

           $query  = "CALL sp_deleteSeccion('$idSeccion');";
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

if ($method == "getSeccionesEliminar"){
    //Creamos la conexion
       //Creamos la conexion
       $conn = connectDB();

       if($conn){
            //$idSeccion=$_POST['idSeccionE'];

           $query  = "CALL sp_getSectionsEliminarPend();";
           $resultado=mysqli_query($conn, $query);

           $secciones = array();
           if($resultado){
            while ($row = mysqli_fetch_assoc($resultado)) {
                $sect = array(
                  "id" => $row['id_Seccion'],
                  "name" => $row['nombre_Seccion']
                );
                $secciones[] = $sect;
              }
             echo json_encode($secciones);
        }
           closeDB($conn);
    }
}

if ($method == "getNoticiasRed"){
    //Creamos la conexion
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
    //Creamos la conexion
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
    //Creamos la conexion
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
    //Creamos la conexion
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
    //Creamos la conexion
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

if ($method == "getImageMedia"){
    //Creamos la conexion
    $conn = connectDB();

    if($conn){
        
        $idNot=$_POST['idNot'];

        $query  = "CALL sp_getMedia($idNot,'img');";
        $resultado = mysqli_query($conn, $query);
    
        $noticias = array();
        
        if($resultado){
            while ($row = mysqli_fetch_assoc($resultado)) {
                $notiRed = array(
                  "image" => base64_encode($row['contenido_media']),
                  "ext" => $row['blob_type']
                );
                $noticias[] = $notiRed;
              }             
             echo json_encode($noticias);
        }       
        closeDB($conn);
    }
}

if ($method == "getVideoMedia"){
    //Creamos la conexion
    $conn = connectDB();

    if($conn){
        
        $idNot=$_POST['idNot'];

        $query  = "CALL sp_getMedia($idNot,'vid');";
        $resultado = mysqli_query($conn, $query);
    
        $noticias = array();
        
        if($resultado){
            while ($row = mysqli_fetch_assoc($resultado)) {
                $notiRed = array(
                  "video" => base64_encode($row['contenido_media']),
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
    //Creamos la conexion
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
    //Creamos la conexion
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

if ($method == "deleteOldFeed"){
    $conn = connectDB();

    if($conn){
        $id=$_POST['id'];

        $query = "CALL sp_deleteOldFeed($id)";

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

if ($method == "getKeyNotID"){
    //Creamos la conexion
    $conn = connectDB();

    if($conn){
      
        $idNot=$_POST['idNot'];

        $query  = "CALL sp_getKeywordsByNewsID($idNot);";
        $resultado = mysqli_query($conn, $query);
    
        $allKeywords = array();
        
        if($resultado){
            while ($row = mysqli_fetch_assoc($resultado)) {
                $keywords = array(
                  "idClv" => $row['id_PalabraClv'],
                  "content" => $row['pal_Clave'],
                  "idNot" => $row['id_NoticiaProp']
                );
                $allKeywords[] = $keywords;
              }             
             echo json_encode($allKeywords);
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

function connectDB(){
    $servername = "localhost"; 
    $username = "root";
    //$username = "PruebaDB3";
    $password = "";
    //$password = "password";
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


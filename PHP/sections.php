<?php
require ('connection.php');

$method = $_POST['method'];

if ($method == "getSecciones"){
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
                );
                $secciones[] = $sect;
              }
              
             echo json_encode($secciones);
        }       
        closeDB($conn);
    }
} 

if ($method == "getSeccionesByID"){
    $conn = connectDB();

    if($conn){
      
        $query  = "CALL sp_getSectionsByID();";
        $resultado = mysqli_query($conn, $query);
    
        $secciones = array();
        
        if($resultado){
            while ($row = mysqli_fetch_assoc($resultado)) {
                $sect = array(
                  "id" => $row['id_Seccion'],
                  "name" => $row['nombre_Seccion'],
                  "color" => $row['color_Seccion']
                );
                $secciones[] = $sect;
              }
              
             echo json_encode($secciones);
        }       
        closeDB($conn);
    }
}  

if ($method == "addSection"){
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

if ($method == "setOrden"){
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

if ($method == "getSectionData"){

    $conn = connectDB();

    if($conn){
      
        $id=$_POST['idSection'];
      
        $query  = "CALL sp_getSeccionData($id);";
        $resultado = mysqli_query($conn, $query);
        
        if($resultado){
            while ($row = mysqli_fetch_assoc($resultado)) {
                $section = array(
                    "id" => $row['id_Seccion'],
                    "name" => $row['nombre_Seccion'],
                    "color" => $row['color_Seccion']
                );
              }
              
             echo json_encode($section);
        }       
        closeDB($conn);
    }
} 

if ($method == "getSeccionesEliminar"){
       $conn = connectDB();

       if($conn){
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

if ($method == "regresarSeccion"){
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
?>
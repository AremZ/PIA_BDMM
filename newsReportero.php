<?php
$phpVar = 0;
if(!isset($_COOKIE['user'])){
     $phpVar = $_COOKIE['user'];
    
    $cookie_name = "user";
    setcookie($cookie_name, $phpVar, time() + (86400 * 30), "/"); // 86400 = 1 day*/
}
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nova | Escritorio de Reportero</title>

    <link rel="stylesheet" href="CSS/fullpage.css">
    <link rel="stylesheet" href="CSS/generales.css">
    <link rel="shortcut icon" type="image/x-icon" href="Sources/LogoPag.png" />
    <script src="JS/functions.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"
    integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">

    <script>
        $(document).ready(function(){       
            var user = getLogged();
            if (user[2] != 'reportero'){
                window.location = 'main.php'
            }

            var theID = getUrlParameter('id');

            getSeccionesToNavbar();
            getSeccionesNoti();
            setupImage('agregarFoto', 'displayImg', '.preview-image');
            setupNewsImage('imagesNoticia', 'carousel-images', 'imgIndi');
            setupNewsVideo('videosNoticia', 'carousel-videos', 'vidIndi');
            
            getNoticiasRed(theID);
            getNoticiasPend(theID);
            getNoticiasDev(theID);
            getNoticiasPub(theID);
        
            document.getElementById("btnSendinNot").addEventListener("click", function() {
                checkNoticia('#editorNoticia', 1, theID);
            })
        
            document.getElementById("btnSaveinNot").addEventListener("click", function() {
                checkNoticia('#editorNoticia', 0, theID);
            })
        
            document.getElementById("btnSendSavedNot").addEventListener("click", function() {
                checkNoticia('#editorNoticia', 3, theID);
            })
        
            document.getElementById("btnSaveChangNot").addEventListener("click", function() {
                checkNoticia('#editorNoticia', 2, theID);
            })
        });
    </script>
</head>

<body>

<!------ Barra de Navegacion & Searchbar ------>

<nav class="navbar navbar-expand-lg navbar-light bg-light" id="navBar">
    <div class="container-fluid">
        <a class="navbar-brand" href="main.php"><img src="Sources/Header/LogoBar.png"></a>
        <button class="navbar-toggler bg-dangerf" type="button" data-toggle="collapse" data-target="#navBarColl">
            <span class="navbar-toggler-icon"></span>
        </button>           
        <div class="collapse navbar-collapse" id="navBarColl">
            <ul class="navbar-nav ml-auto">
                <li>
                    <form class="form-inline my-2 my-lg-0" method="GET" action="searchResult.php">
                        <input class="form-control mr-sm-2" placeholder="Buscar..." aria-label="Buscar"
                            id="BRSearch">
                            <button class="btn btn-outline-danger" type="button" id="BTSearch" onclick="search();">Buscar</button>
                    </form>
                </li>                  
            </ul>

    
        </div>
    </div>
</nav>

<nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top" id="navBarSecciones">
    <div class="container-fluid">
        <div class="collapse navbar-collapse">
        <ul id="seccionesNavB" class="navbar-nav mr-auto ml-auto seccionesNav">
        <!--
                <li class="nav-item active">
                    <a class="nav-link" href="main.html">Seccion 1</a>
                </li>

                -->
            </ul>
            <ul class="navbar-nav ml-auto">
            <label id="nombreUsuario">¡ Hola!</label>
             <div id="displayAvatar">
                 <img src="" class="preview-image">
             </div>
                <li class="nav-item" id="btnLogin">
                    <a class="nav-link" href="" data-toggle="modal" data-target="#modLogin" onclick="cleanInput('emailLog'), cleanInput('pwdLog')">Iniciar Sesion</a>
                </li>
           
                <li class="nav-item dropdown" id="btnProfile" style="position: relative;">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMA" role="button"
                        data-toggle="dropdown" >Mi Cuenta</a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMA" id="dropOpcionesAccount">
                    </div>
                    
                </li>  
            </ul>
        </div>
    </div>
</nav>


<!------ Login ------>
<div id="modLogin" class="modal fade">
    <div class="modal-dialog" id="modLogIn">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header" id="hLogin">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body" id="bLogin">

                <ul class="nav nav-pills nav-justified" id="pills-tab" role="tablist">
                    <li class="nav-item" id="pillLog">
                        <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#login" role="tab"
                            aria-controls="pills-home" aria-selected="true" onclick="cleanInput('emailLog'), cleanInput('pwdLog')">Inicio de Sesion</a>
                    </li>
                    <li class="nav-item" id="pillReg">
                        <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#register" role="tab"
                            aria-controls="pills-profile" aria-selected="false"onclick="cleanInput('fnameLog'),
                            cleanInput('snameLog'), cleanInput('lnameLog'), cleanInput('emailRLog'),
                            cleanInput('telLog'), cleanInput('pwdRLog'), cleanInput('rpwdLog')">Registrarse</a>
                    </li>
                </ul>
                <hr>

                <div class="tab-content" id="pills-tabContent">

                    <div id="login" class="tab-pane fade show active">
                        <form action="">
                            <div class="form-group">
                                <label for="email">Correo Electronico:</label>
                                <div id="mailContainer">
                                <input type="email" class="form-control" id="emailLog" onfocus="limpiar(0)">
                              </div>
                            </div>
                            <div class="form-group">
                                <label for="pwd">Contraseña:</label>
                                <div id="passContainer">
                                <input type="password" class="form-control" id="pwdLog" onfocus="limpiar(1)">
                              </div>
                            </div>
                        </form>
                        <hr>
                        <button id="logMeIn" type="button" class="btn btn-outline-danger" 
                            style="float:right" onclick="validaciones(1)"><i class="fa fa-check"></i>Iniciar Sesion</button>
                    </div>
  
                    <div id="register" class="tab-pane fade">
                        
                            <div class="row">
                                <div class="col-md-1"></div>
                                <div class="col-md-10">
                                    <div class="row">                                             
                                        <div class="col-md-4">
                                            <label for="fname">Nombre(s):</label>
                                            <div id="nameContainer">
                                            <input type="text" class="form-control" id="fnameLog" onfocus="limpiar(2)">
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <label for="sname">Apellido Paterno:</label>
                                            <div id="snameContainer">
                                            <input type="text" class="form-control" id="snameLog" onfocus="limpiar(3)">
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <label for="lname">Apellido Materno:</label>
                                            <div id="lnameContainer">
                                            <input type="text" class="form-control" id="lnameLog" onfocus="limpiar(4)">
                                            </div>
                                        </div>
    
                                        <div class="col-md-6">
                                            <label for="email">Correo Electronico:</label>
                                            <div id="mailRContainer">
                                            <input type="email" class="form-control" id="emailRLog" onfocus="limpiar(5)">
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <label for="rpwd">Telefono:</label>
                                            <div id="telContainer">
                                            <input type="number" class="form-control" id="telLog" onfocus="limpiar(6)">
                                            </div>
                                        </div>  
    
                                        <div class="col-md-6">
                                            <label for="pwd">Contraseña:</label>
                                            <div id="passRContainer">
                                            <input type="password" class="form-control" id="pwdRLog" onfocus="limpiar(7)">
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <label for="rpwd">Confirme su contraseña:</label>
                                            <div id="rpassContainer">
                                            <input type="password" class="form-control" id="rpwdLog" onfocus="limpiar(8)">
                                            </div>
                                        </div>
                                        <div class="col-md-6" id="displayImg">
                                            <img src="sources/default-image.png" class="preview-image">
                                        </div>
                                        <div class="col-md-6">
                                            <form accept-charset="utf-8" method="POST"  id="sentImg" enctype="multipart/form-data">  
                                                <label for="agregarFoto" class="custom-file-upload">Agregar una foto de perfil...</label>                         
                                                <input type="file" name="agregarFoto" id="agregarFoto" accept="image/jpeg, image/png">
                                            </form>                                                                          
                                        </div>    
                                    </div>
                                </div>
                                <div class="col-md-1"></div>
                            </div>
                            <hr>
                            <button type="button" class="btn btn-outline-danger" style="float:right" onclick="validaciones(2)" type="submit"><i class="fa fa-check"></i>Registrarme</button>                       
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <button class="btn btn-outline-danger topBarNew" data-toggle="modal" data-target="#editorNoticia"
                onclick="nuevaNoticia()"><i class="fa fa-plus-circle"></i>Nueva noticia</button>
            </div>
        </div>
    </div>

    <hr class="topNews">

    <div class="container-fluid padding">
        <div class="row">
            <div class="col-lg-8" id='notiDevueltas'>
                <div class="col-lg-12" id="DevRev">
                    <h2>Notas devueltas de revision</h2>
                </div>       
            </div>
            
            <div class="col-lg-4" id="notiPendientes">
                <div class="col-lg-12" id="EnvRev">
                    <h2>Notas enviadas a revision</h2>
                </div>
                

            </div>
         </div>
     </div>    

    <div class="container-fluid padding">
        <div class="row">
            <div class="col-lg-12" id="EnRed">
                <h1>Notas en redaccion</h1>
            </div>
            <div class="col-lg-12">
                <div class="row" id="notiRedaccion">

                </div>  
            </div>
        </div>
    </div>

    <div class="container-fluid padding">
        <div class="row">
            <div class="col-lg-12" id="NotPub">
                <h1>Notas publicadas</h1>
            </div>
            
            <div class="container-fluid padding">
                <div class="row" id="NotiPubli">
                    

                </div>
            </div>
        </div>
    </div>   

    <!------ Modales ------>
        
               <!------ Nueva noticia ------>

    <div id="editorNoticia" class="modal fade">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                
                <div class="modal-body">
                    <div class="container-fluid padding">          
                        <div class="row">
                            <div class="col-md-12">   
                                <div class="row">      
                                    <div class="col-md-12" id="EditNot">
                                        Editor de Noticias
                                    </div>
                                </div>
                                <div class="row" id="noticiaBGVista">
     
                                    <div class="col-md-12" id="inputNoticia">
                                        <textarea name="notasNoticia" id="notEdiNoticia" rows="3" readonly>Notas del Editor</textarea>
                                    </div>
                                    <div class="col-md-12">
                                        <hr id="sepNotes">
                                    </div>
                                    <div class="col-md-12" id="inputNoticia">
                                        <textarea name="header" id="headerNot" placeholder="Escriba el titulo..." rows="1" onfocus="cleanTextarea('headerNot')"></textarea>
                                    </div>
                                    <div class="col-md-6" id="inputNoticia">
                                        <input type="date" name="" id="infoNotFe" class="col-md-6" onfocus="cleanTextarea('infoNotFe')">
                                        <input type="time" name="" id="infoNotHo" class="col-md-5" onfocus="cleanTextarea('infoNotHo')">
                                    </div>    
                                    <div class="col-md-6" id="inputNoticia">
                                        <textarea name="lugNoticia" id="infoNotlug" placeholder="Escriba el lugar del acontecimiento..." rows="1" onfocus="cleanTextarea('infoNotlug')"></textarea>
                                    </div>     
                                    <div class="col-md-12" id="inputNoticia">
                                        <textarea name="descCortNoticia" id="descNoticia" placeholder="Escriba una descripcion corta..." rows="3" onfocus="cleanTextarea('descNoticia')"></textarea>
                                    </div>
                                    <div class="col-md-12">
                                        <hr>
                                    </div>
                                    <div class="col-md-12" id="inputNoticia">
                                        <textarea name="compNoticia" id="bodyNoticia" placeholder="Escriba la noticia completa..." rows="8" onfocus="cleanTextarea('bodyNoticia')"></textarea>
                                    </div>
                                    <input type="text" name="" id="idNoti" style="display: none">
                                    <input type="text" name="" id="idFeed" style="display: none">



                                    <div class="col-md-9">
                                        <!--Slider img-->
                                        <div id="carruselImg" class="carousel slide carousel-fade" data-ride="carousel">
                                            <ul class="carousel-indicators" id="imgIndi">
                                            </ul>
                                            <div class="carousel-inner">
                                                <div id="carousel-images">
                                                </div>
                                                <a class="carousel-control-prev" href="#carruselImg" role="button" data-slide="prev">
                                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                                    <span class="sr-only">Anterior</span>
                                                </a>
                                                <a class="carousel-control-next" href="#carruselImg" role="button" data-slide="next">
                                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                    <span class="sr-only">Siguiente</span>
                                                </a>
                                            </div>
                                         </div>
                                    </div>
                                    <div class="col-md-3">
                                        <label for="imagesNoticia" class="custom-file-upload" id="imagesNoticiaLbl"><i class="fa fa-upload"></i>Agregar fotos a la noticia</label>                                
                                        <input type="file" id="imagesNoticia" accept="image/jpeg, image/png">
                                        <button class="btn btn-outline-danger buttEditor btnDeleteSlide" id="neededBtn"
                                        onclick="deleteActualSlide('#carousel-images', '#imgIndi','img');"><i class="fa fa-window-close">
                                        </i>Eliminar slide actual</button>
                                    </div>


                                    <div class="col-md-9">
                                        <!--Slider vid-->
                                        <div id="carruselVid" class="carousel slide carousel-fade" data-ride="carousel">
                                            <ul class="carousel-indicators" id="vidIndi">
                                            </ul>
                                            <div class="carousel-inner">
                                                <div id="carousel-videos">
                                                </div>
                                                <!--<a class="carousel-control-prev" href="#carruselVid" role="button" data-slide="prev">
                                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                                    <span class="sr-only">Anterior</span>
                                                </a>
                                                <a class="carousel-control-next" href="#carruselVid" role="button" data-slide="next">
                                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                    <span class="sr-only">Siguiente</span>
                                                </a>-->
                                            </div>
                                         </div>
                                    </div>
                                    <div class="col-md-3">
                                        <label for="videosNoticia" class="custom-file-upload" id="videosNoticiaLbl"><i class="fa fa-upload"></i>Agregar videos a la noticia</label>                                
                                        <input type="file" id="videosNoticia" accept="video/mp4">
                                        <button class="btn btn-outline-danger buttEditor btnDeleteSlide" onclick="deleteActualSlide('#carousel-videos', '#vidIndi', 'vid');"><i class="fa fa-window-close"></i>Eliminar slide actual</button>
                                           
                                        <div class="col-md-12" id="SeccionSel">
                                            <label for="selectSeccion">Elija la seccion de la noticia</label>                                
                                            <select class="form-control" id="selectSeccion">
                                            </select>
                                        </div>
                                    </div>


                                    <div class="col-md-12" id="inputNoticia">
                                        <textarea name="palClavNoticia" id="infoNotpalClav" placeholder="Palabras clave. Ejemplo: noticia,popular,asalto,famosos,etc..." rows="1" onfocus="cleanTextarea('infoNotpalClav')"></textarea>
                                    </div>  
                                    <div class="col-md-12">
                                        <hr>
                                        <button class="btn btn-outline-danger buttEditor" id="btnSendinNot"><i class="fa fa-paper-plane"></i>Enviar a revision</button>
                                        <button class="btn btn-outline-danger buttEditor" id="btnSaveinNot"><i class="fa fa-floppy-o"></i>Guardar</button>
                                        <button class="btn btn-outline-danger buttEditor" id="btnSendSavedNot"><i class="fa fa-paper-plane"></i>Enviar a revision</button>
                                        <button class="btn btn-outline-danger buttEditor" id="btnSaveChangNot"><i class="fa fa-floppy-o"></i>Guardar cambios</button>
                                        <button class="btn btn-outline-danger buttEditor" id="btnDeleteNot" onclick="deleteNoticiaIn()"><i class="fa fa-trash"></i>Eliminar noticia</button>
                                        <button class="btn btn-outline-danger buttEditor" data-toggle="modal" data-target="#editorNoticia" id="btnCancelinNot"><i class="fa fa-times"></i>Cancelar</button>
                                    </div>

                                </div>
                            </div>   
                        </div>      
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="confirmDeleteNoticia" class="modal fade">
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body">

                    <h5>¿Está seguro que desea eliminar esta noticia?</h5>
                
                    <hr>
                    <button type="button" class="btn btn-outline-danger" style="float:left" id="btnConfirmDelNot"
                    onclick="confirmDeleteNoticia();"></a><i class="fa fa-fire"> </i>Eliminar Noticia</button>

                    <input type="text" name="" id="idNoticiaDelete" style="display: none">

                    <button type="button" class="btn btn-outline-danger" 
                        style="float:right" id="btnCancelDel" data-toggle="modal" data-target="#confirmDeleteNoticia"><i class="fa fa-times"></i>Cancelar</button>
                
                </div>
            </div>
        </div>
    </div>

    <!------ Footer ------>
    <footer>
        <div class="container-fluid padding">
            <div class="row text-center">
                <div class="col-12">
                    <img src="Sources/Header/LogoBar.png">
                    <hr class="Light-100" id="last">
                    <h5>&copy; novanoticias.com</h5>
                </div>
            </div>
        </div>
    </footer>
</body>

</html>
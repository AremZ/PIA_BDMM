<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nova | Gestor de Noticias</title>

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
            if (user[2] != 'editor'){
                window.location = 'main.php'
            }

            getSeccionesToNavbar();
            getNoticiasEnv();
            setupImage('agregarFoto', 'displayImg', '.preview-image');
            getPublishedNotes();
          
            document.getElementById("devNot").addEventListener("click", function() {
                devolverNoticia(user[0]);
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
            <span id="publishedNews">
                Noticias publicadas en el sitio:
            </span>
        </div>
    </div>

    <hr class="topNews">
    <div class="containder-fluid padding">
        <div class="row">
            <div class="col-lg-11" id="hTitle">
                <h1>Notas pendientes de revision</h1>
            </div>
        </div>
    </div>

    <div class="container-fluid padding">
        <div class="row padding" id="notiEnviadas">
            

                    
        </div>
    </div>

    <div id="sendComments" class="modal fade">
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
                                    <input type="text" name="" id="idNotiSentComm" style="display: none"> 
                                    <div class="col-md-1" id="sectionCommentVista"></div>        
                                    <div class="col-md-11" id="tituloCommentVista">
                                        <div class="row">  
                                            <div class="col-md-5" id="nomReporteroVistaComm"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row" id="noticiaBGVista">
                                    <div class="col-md-12" id="ingreseComentario">
                                        Realice sus comentarios al reportero de la noticia en la siguiente seccion:
                                    </div>
                                    <div class="col-md-12" id="inputComments">
                                        <textarea name="editorComments" id="eComments" placeholder="Ingrese sus comentarios..." rows="10" onfocus="cleanTextarea('eComments')"></textarea>
                                    </div>      
                                            <div class="col-md-12">
                                                <hr>
                                                <button class="btn btn-outline-danger" id="devNot"><i class="fa fa-paper-plane-o"></i>Enviar</button>
                                                <button class="btn btn-outline-danger" onclick="switchModals('#sendComments', '#seeNoticia')"><i class="fa fa-newspaper-o"></i>Volver a Noticia</button>
                                            </div>
                                        </div>
                                    </div>   
                                </div>      
                            </div>
                        </div>
                    </div>
                 </div>
            </div>
        </div>
    </div>

    <div id="seeNoticia" class="modal fade">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                
                <div class="modal-body">
                    <div class="container-fluid padding">          
                        <div class="row">
                            <input type="text" name="" id="idNotiSent" style="display: none">
                            <div class="col-md-12">   
                                <div class="row">        
                                    <div class="col-md-1" id="sectionHeaderVista"></div>        
                                    <div class="col-md-11" id="tituloNoticiaVista">
                                        
                                        <div class="row">  
                                            <div class="col-md-5" id="nomReporteroVista"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row" id="noticiaBGVista">
                                    <div class="col-md-12" id="datosAcontecimientoVista">
                                    </div>
                                    <div class="col-md-12" id="noticiaBodyVista">
                                        <div class="row">
                                            <div class="col-md-12" id="descripcionVista">
                                                 
                                            </div>
                                            <div class="col-md-12">
                                                <hr>
                                            </div>
                                            <div class="col-md-12">
                                                <!--Slider -->
                                                <div id="carruselImg" class="carousel slide carousel-fade" data-ride="carousel">
                                                    <ul class="carousel-indicators" id="imgIndiRev">
                                                    </ul>
                                                    <div class="carousel-inner">
                                                        <div id="carousel-images-rev">
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
                                                
                                                <div class="row">
                                                    <div class="col-md-12" id="fullBodyVista">
                                                   
                                                    </div>
                                                </div>       

                                                <div class="col-md-12">
                                                    <!--Slider vid-->
                                                    <div id="carruselVid" class="carousel slide carousel-fade" data-ride="carousel">
                                                        <ul class="carousel-indicators" id="vidIndiRev">
                                                        </ul>
                                                        <div class="carousel-inner">
                                                            <div id="carousel-videos-rev">
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
                                                                  
                                            </div>         
                                            <div class="col-md-12" id="fechaCreacionVista">
                                                
                                            </div>                 
                                            <div class="col-md-12">
                                                <hr>
                                                <button class="btn btn-outline-danger" onclick="aprobarNoticia()"><i class="fa fa-check"></i>Aprobar</button>
                                                <button class="btn btn-outline-danger"  onclick="switchModals('#seeNoticia', '#sendComments')"><i class="fa fa-comment-o"></i>Enviar comentarios</button>
                                            </div>
                                        </div>
                                    </div>   
                                </div>      
                            </div>
                        </div>
                    </div>
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
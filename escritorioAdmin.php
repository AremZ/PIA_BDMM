<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nova | Escritorio de Administrador</title>

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
            //$("#btnProfile").toggle();
            get();
            getAllUsers();
            confirmarEliminarSeccion();
            getSeccionesToNavbar();
            setupImage('agregarFoto', 'displayImg', '.preview-image');
            setupImage('agregarFotoAdmin', 'displayImgAdmin', '.preview-image');
        });

        function set(){
          <?php 
          $phpVar =  $_COOKIE['user'];
          $cookie_name = "user";
          setcookie($cookie_name, $phpVar, time() + (86400 * 30), "/"); // 86400 = 1 day
          ?>
          //alert("done");
        }
        function get(){
            <?php
            $currentUser= $_COOKIE["user"];
            $currentType=$_COOKIE["type"];
            $currentName=$_COOKIE["name"];
            ?>
            var currentU="<?php echo $currentUser ?>";
            var currentT="<?php echo $currentType ?>";
            var currentN="<?php echo $currentName ?>";
            //alert(currentU);
            if(currentU==0||currentU==null)
                $("#btnProfile").toggle();
            
            else{
                document.getElementById("nombreUsuario").innerHTML="¡ Hola "+currentN+" !";
                $("#btnLogin").toggle();
                if(currentT=="usuario"){
                    $("#btnEscritorio").toggle();
                    $("#btnSeccion").toggle();
                }
                else if(currentT=="reportero")
                    $("#btnSeccion").toggle();
            }
                
        }
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
                        <button class="btn btn-outline-danger" type="submit" id="BTSearch">Buscar</button>
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
                <li class="nav-item" id="btnLogin">
                    <a class="nav-link" href="" data-toggle="modal" data-target="#modLogin" onclick="cleanInput('emailLog'), cleanInput('pwdLog')">Iniciar Sesion</a>
                </li>
            <label id="nombreUsuario"></label>
                <li class="nav-item dropdown" id="btnProfile" style="position: relative;">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMA" role="button"
                        data-toggle="dropdown" >Mi Cuenta</a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMA" >
                        <a class="dropdown-item" href="profile.php">Mi Perfil</a>
                        <a id="btnEscritorio" class="dropdown-item" href="newsReportero.php">Escritorio</a>
                        <a id="btnSeccion"class="dropdown-item" href="sectionAdm.php">Gestionar Seccion</a>
                        <a class="dropdown-item" onclick="cerrarSesion(); set();">Cerrar Sesion</a>
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

    <div class="container-fluid padding">
        <div class="row">
            <div class="col-lg-10">
                <h1 id="escrAdmin">Escritorio de Administrador</h1>
            </div>
            <div class="col-lg-2">
                <button class="btn btn-outline-danger newUser" data-toggle="modal" data-target="#modRegister"
                onclick="cleanInput('fnameAdmin'), cleanInput('snameAdmin'), cleanInput('lnameAdmin'), cleanInput('emailRAdmin'),
                cleanInput('telAdmin'), cleanInput('pwdAdmin'), cleanInput('rpwdAdmin'), createUsuario()"><i class="fa fa-plus-circle"></i>Crear usuario</button>
            </div>
        </div>
    </div>
    <hr class="topAdmin">

    <div class="container-fluid padding">
        <div class="row">
            <div class="col-lg-1"></div>
            <div class="col-lg-10">
                <ul class="list-group allUsers" id="usersList">
                    <li class="list-group-item active">
                        <div class="row">
                            <span class="col-lg-4">
                                Nombre del usuario
                            </span>
                            <span class="col-lg-4">
                                Tipo de Usuario
                            </span>
                            <span class="col-lg-4">
                                Acciones
                            </span>
                        </div>
                    </li>                    
                </ul>
            </div>
        </div>
    </div>

    <!------ Registro de Usuarios ------>
    <div id="modRegister" class="modal fade">
        <div class="modal-dialog" id="registroUsuarios">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header" id="hLogin">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <div id="registerAdmin" class="modal-body">
                    <div>
                        <h1 id="titleAdmin">Panel de usuario</h1>
                        <hr>
                    </div>
                   <form action="/action_page.php">
                       <div class="row">
                           <div class="col-md-1"></div>
                           <div class="col-md-10">
                               <div class="row">
                                   <div class="col-md-4 form-group">
                                       <label for="fname">Nombre(s):</label>
                                       <div id="nameContainerAdmin">
                                         <input type="text" class="form-control" id="fnameAdmin" onfocus="cleanInputClass('fnameAdmin')">
                                       </div>
                                   </div>
                                   <div class="col-md-4 form-group">
                                       <label for="sname">Apellido Paterno:</label>
                                       <div id="snameContainerAdmin">
                                         <input type="text" class="form-control" id="snameAdmin" onfocus="cleanInputClass('snameAdmin')">
                                       </div>
                                   </div>
                                   <div class="col-md-4 form-group">
                                       <label for="lname">Apellido Materno:</label>
                                       <div id="lnameContainerAdmin">
                                         <input type="text" class="form-control" id="lnameAdmin" onfocus="cleanInputClass('lnameAdmin')">
                                       </div>
                                   </div>
      
                                   <div class="col-md-6 form-group">
                                       <label for="email">Correo Electronico:</label>
                                       <div id="mailRContainerAdmin">
                                         <input type="email" class="form-control" id="emailRAdmin" onfocus="cleanInputClass('emailRAdmin')">
                                       </div>
                                   </div>
                                   <div class="col-md-6 form-group">
                                       <label for="rpwd">Telefono:</label>
                                       <div id="telContainerAdmin">
                                         <input type="number" class="form-control" id="telAdmin" onfocus="cleanInputClass('telAdmin')">
                                       </div>
                                   </div>  
      
                                   <div class="col-md-6 form-group">
                                       <label for="pwd">Contraseña:</label>
                                       <div id="passRContainerAdmin">
                                         <input type="password" class="form-control" id="pwdAdmin" onfocus="cleanInputClass('pwdAdmin')">
                                       </div>
                                   </div>
                                   <div class="col-md-6 form-group">
                                       <label for="rpwd">Confirme su contraseña:</label>
                                       <div id="rpassContainerAdmin">
                                         <input type="password" class="form-control" id="rpwdAdmin" onfocus="cleanInputClass('rpwdAdmin')">
                                       </div>
                                   </div>
                                   <div class="col-md-4 form-group" id="displayImgAdmin">
                                       <img src="sources/13.jpg" id="dispImg" class="preview-image">
                                   </div>
                                   <div class="col-md-4 form-group">
                                       <label for="agregarFotoAdmin" class="custom-file-upload">Agregar una foto de perfil...</label>                                
                                       <input type="file" id="agregarFotoAdmin" accept="image/jpeg, image/png">
                                   </div>
                                   <div class="col-md-4 form-group" id="UsuarioSel">
                                    <label for="selectUsuario">Elija el tipo de cuenta</label>                                
                                    <select class="form-control" id="selectUsuario">
                                        <option>Usuario</option>
                                        <option>Reportero</option>
                                        <option>Editor</option>
                                    </select>
                                   </div>
                                   <input type="text" name="" id="idUser" style="display: none">
                               </div>
                           </div>
                           <div class="col-md-1"></div>
                       </div>
                   </form>
                   <hr>
                   <button type="button" class="btn btn-outline-danger" 
                       style="float:right" onclick="validaciones(3)" id="registerUserAdmin"><i class="fa fa-check"></i>Registrar
                   </button>
                   <button type="button" class="btn btn-outline-danger" 
                       style="float:right" id="cancelUserAdmin" data-toggle="modal" data-target="#modRegister"><i class="fa fa-times"></i>Cancelar
                   </button>
                   <button type="button" class="btn btn-outline-danger" 
                       style="float:right" onclick="validaciones(5)" id="saveUserAdmin"><i class="fa fa-floppy-o"></i>Guardar cambios
                   </button>
                </div>
            </div>
        </div>
    </div>

    <div id="confirmDeleteAdmin" class="modal fade">
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body">

                    <h5>¿Está seguro que desea eliminar esta cuenta?</h5>
                
                    <hr>
                    <button type="button" class="btn btn-outline-danger" style="float:left" id="btnConfirmDelAdmin"
                    onclick="confirmDeleteUsuario();"></a><i class="fa fa-fire"> </i>Dar cuenta de baja</button>

                    <input type="text" name="" id="idUserDelete" style="display: none">

                    <button type="button" class="btn btn-outline-danger" 
                        style="float:right" id="btnCancelDel" data-toggle="modal" data-target="#confirmDeleteAdmin"><i class="fa fa-times"></i>Cancelar</button>
                
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
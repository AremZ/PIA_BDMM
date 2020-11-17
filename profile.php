<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nova | Mi Perfil</title>

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
            $("#btnProfile").toggle();
            $("#btnSaveDat").toggle();
            $("#btnCancelDat").toggle();
            $("#btnCambiarFoto").toggle();
            $("#rpwdPerfil").toggle();
            $("#lblrpwdPerfil").toggle();
            
        });
    </script>
</head>

<body>

    <!------ Barra de Navegacion & Searchbar ------>
    
    <nav class="navbar navbar-expand-lg navbar-light bg-light" id="navBar">
        <div class="container-fluid">
            <a class="navbar-brand" href="main.html"><img src="Sources/Header/LogoBar.png"></a>
            <button class="navbar-toggler bg-dangerf" type="button" data-toggle="collapse" data-target="#navBarColl">
                <span class="navbar-toggler-icon"></span>
            </button>           
            <div class="collapse navbar-collapse" id="navBarColl">
                <ul class="navbar-nav ml-auto">
                    <li>
                        <form class="form-inline my-2 my-lg-0" method="GET" action="searchResult.html">
                            <input class="form-control mr-sm-2" placeholder="Buscar..." aria-label="Buscar"
                                id="BRSearch">
                            <button class="btn btn-outline-danger" type="submit" id="BTSearch">Buscar</button>
                        </form>
                    </li>                  
                </ul>

                <ul class="navbar-nav ml-auto">
                    <li class="nav-item" id="btnLogin">
                        <a class="nav-link" href="" data-toggle="modal" data-target="#modLogin" onclick="cleanInput('emailLog'), cleanInput('pwdLog')">Iniciar Sesion</a>
                    </li>

                    <li class="nav-item dropdown" id="btnProfile">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMA" role="button"
                            data-toggle="dropdown">Mi Cuenta</a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdownMA">
                            <a class="dropdown-item" href="profile.html">Mi Perfil</a>
                            <a class="dropdown-item" href="newsReportero.html">Escritorio</a>
                            <a class="dropdown-item" href="sectionAdm.html">Gestionar Seccion</a>
                            <a class="dropdown-item" onclick="cerrarSesion()">Cerrar Sesion</a>
                        </div>
                    </li>         
                </ul>
            </div>
        </div>
    </nav>

    <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top" id="navBarSecciones">
        <div class="container-fluid">
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav mr-auto ml-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="main.html">Seccion 1</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Seccion 2</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Seccion 3</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Seccion 4</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Seccion 5</a>
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
                            <form action="/action_page.php">
                                <div class="form-group">
                                    <label for="email">Correo Electronico:</label>
                                    <div id="mailContainer">
                                    <input type="email" class="form-control" id="emailLog" name="email" onfocus="limpiar(0)">
                                  </div>
                                </div>
                                <div class="form-group">
                                    <label for="pwd">Contraseña:</label>
                                    <div id="passContainer">
                                    <input type="password" class="form-control" id="pwdLog" name="pwd" onfocus="limpiar(1)">
                                  </div>
                                </div>
                            </form>
                            <hr>
                            <button id="logMeIn" type="button" class="btn btn-outline-danger" 
                                style="float:right" onclick="validaciones(1)"><i class="fa fa-check"></i>Iniciar Sesion</button>
                        </div>
      
                        <div id="register" class="tab-pane fade">
                            <form action="/action_page.php">
                                <div class="row">
                                    <div class="col-md-1"></div>
                                    <div class="col-md-10">
                                        <div class="row">
                                            <div class="col-md-4 form-group">
                                                <label for="fname">Nombre(s):</label>
                                                <div id="nameContainer">
                                                  <input type="text" class="form-control" id="fnameLog" onfocus="limpiar(2)">
                                                </div>
                                            </div>
                                            <div class="col-md-4 form-group">
                                                <label for="sname">Apellido Paterno:</label>
                                                <div id="snameContainer">
                                                  <input type="text" class="form-control" id="snameLog" onfocus="limpiar(3)">
                                                </div>
                                            </div>
                                            <div class="col-md-4 form-group">
                                                <label for="lname">Apellido Materno:</label>
                                                <div id="lnameContainer">
                                                  <input type="text" class="form-control" id="lnameLog" onfocus="limpiar(4)">
                                                </div>
                                            </div>
      
                                            <div class="col-md-6 form-group">
                                                <label for="email">Correo Electronico:</label>
                                                <div id="mailRContainer">
                                                  <input type="email" class="form-control" id="emailRLog" onfocus="limpiar(5)">
                                                </div>
                                            </div>
                                            <div class="col-md-6 form-group">
                                                <label for="rpwd">Telefono:</label>
                                                <div id="telContainer">
                                                  <input type="number" class="form-control" id="telLog" onfocus="limpiar(6)">
                                                </div>
                                            </div>  
      
                                            <div class="col-md-6 form-group">
                                                <label for="pwd">Contraseña:</label>
                                                <div id="passRContainer">
                                                  <input type="password" class="form-control" id="pwdRLog" onfocus="limpiar(7)">
                                                </div>
                                            </div>
                                            <div class="col-md-6 form-group">
                                                <label for="rpwd">Confirme su contraseña:</label>
                                                <div id="rpassContainer">
                                                  <input type="password" class="form-control" id="rpwdLog" onfocus="limpiar(8)">
                                                </div>
                                            </div>
                                            <div class="col-md-6 form-group" id="displayImg">
                                                <img src="sources/13.jpg">
                                            </div>
                                            <div class="col-md-6 form-group">
                                                <label for="agregarFoto" class="custom-file-upload">Agregar una foto de perfil...</label>                                
                                                <input type="file" id="agregarFoto">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-1"></div>
                                </div>
                            </form>
                            <hr>
                            <button type="button" class="btn btn-outline-danger" 
                                style="float:right" onclick="validaciones(2)"><i class="fa fa-check"></i>Registrarme</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container-fluid padding">
        <div class="row">
            <div class="col-lg-12">
                <h1 id="datosPerfil">Datos del Perfil</h1>
            </div>
        </div>
    </div>
    <hr class="topProfile">

    <div class="container-fluid padding">
        <div class="row">
            <div class="col-lg-3" id="displaypfp">
                <img src="sources/11.jpg">
                <hr class="imgProfile">
                <div class="col-md-12 form-group">
                    <div class="row">   
                        <div class="col-md-12">
                            <button class="btn btn-outline-danger btnBarProfile" data-toggle="modal" data-target="#confirmDelete" id="btnDelAcc"><i class="fa fa-fire"></i>Dar cuenta de baja</button>
                        </div>   
                        <div class="col-md-12">
                            <label for="cambiarFoto" class="custom-file-upload-pfp" id="btnCambiarFoto"><i class="fa fa-upload"></i>Cambiar foto de perfil</label>                                
                            <input type="file" id="cambiarFoto"> 
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-8 container-datos">
                <div class="row">
                    <div class="col-md-4 form-group">
                        <label for="fname">Nombre(s):</label>
                        <input type="text" class="form-control" id="fnamePerfil" onfocus="cleanTextarea('fnamePerfil')" disabled>
                    </div>
                    <div class="col-md-4 form-group">
                        <label for="sname">Apellido Paterno:</label>
                        <input type="text" class="form-control" id="snamePerfil" onfocus="cleanTextarea('snamePerfil')" disabled>
                    </div>
                    <div class="col-md-4 form-group">
                        <label for="lname">Apellido Materno:</label>
                        <input type="text" class="form-control" id="lnamePerfil" onfocus="cleanTextarea('lnamePerfil')" disabled>
                    </div>
                    <div class="col-md-6 form-group">
                        <label for="email">Correo Electronico:</label>
                        <input type="email" class="form-control" id="emailPerfil" onfocus="cleanTextarea('emailPerfil')" disabled>
                    </div>
                    <div class="col-md-6 form-group">
                        <label for="rpwd">Telefono:</label>
                        <input type="number" class="form-control" id="telPerfil" onfocus="cleanTextarea('telPerfil')" disabled>
                    </div>  

                    <div class="col-md-12 form-group">
                        <label for="pwd">Contraseña:</label>
                        <input type="password" class="form-control" id="pwdPerfil" onfocus="cleanTextarea('pwdPerfil')" disabled>
                    </div>
                    <div class="col-md-12 form-group">
                        <label for="rpwd" id="lblrpwdPerfil">Confirme su contraseña:</label>
                        <input type="password" class="form-control" id="rpwdPerfil" onfocus="cleanTextarea('rpwdPerfil')">
                    </div>
                    <div class="col-md-12">
                        <button class="btn btn-outline-danger btnBarData" id="btnModDat" onclick="modificarDatos()"><i class="fa fa-pencil"></i>Modificar Datos</button>
                        <button class="btn btn-outline-danger btnBarData" onclick="verificarDatos()" id="btnSaveDat"><i class="fa fa-floppy-o"></i>Guardar</button> 
                        <button class="btn btn-outline-danger btnBarData" onclick="cancelarDatos()" id="btnCancelDat"><i class="fa fa-times"></i>Cancelar</button> 
                    </div>
                </div>
            </div> 

        </div> 
    </div>

    <div id="confirmDelete" class="modal fade">
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body">

                    <h5>¿Está seguro que desea eliminar su cuenta?</h5>
                
                    <hr>
                    <button type="button" class="btn btn-outline-danger" style="float:left" id="btnConfirmDel"
                    data-toggle="modal" data-target="#confirmDelete" onclick="javascript:window.location.href='main.html';"></a><i class="fa fa-fire">                        
                    </i>Dar cuenta de baja</button>

                    <button type="button" class="btn btn-outline-danger" 
                        style="float:right" id="btnCancelDel" data-toggle="modal" data-target="#confirmDelete"><i class="fa fa-times"></i>Cancelar</button>
                
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
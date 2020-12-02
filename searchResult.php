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
    <title>Nova | Resultados</title>

    <link rel="stylesheet" href="CSS/generales.css">
    <link rel="stylesheet" href="CSS/searchResult.css">
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
          get();
          displayMostViewed("#displayMostViewed");
          setupImage('agregarFoto', 'displayImg', '.preview-image');
          getSeccionesToNavbar();
          var palabraBuscar = getUrlParameter('palabra');
          document.getElementById("palabraB").innerHTML="Resultados de: "+palabraBuscar; 
          document.getElementById("BRSearch").value=palabraBuscar;
          //document.getElementById("rangoFinalFechaBuscar").datepicker( "option", "gotoCurrent", true );
          var date=(curday('-'));
          var dateMinus=(curdayminus('-'));
          document.getElementById("rangoFinalFechaBuscar").value = date;
          document.getElementById("rangoInicialFechaBuscar").value = dateMinus;
          if(palabraBuscar!="")
            displaySearchResults(palabraBuscar, palabraBuscar, palabraBuscar, dateMinus, date);
          
        });

        function set(){
          <?php 
          //$phpVar=0;
          if(!isset($_COOKIE['user']))
            if($_COOKIE['user']!=0){
                $phpVar =  $_COOKIE['user'];

                $cookie_name = "user";
                setcookie($cookie_name, $phpVar, time() + (86400 * 30), "/"); // 86400 = 1 day*/
            }
          ?>
          //alert("done");
        }
       
       
        function get(){
            <?php
            $cookie_name="user";
            $cookie_value = 0;
            if(!isset($_COOKIE[$cookie_name])) {
                setcookie($cookie_name, $cookie_value, time() + (86400 * 30), "/"); // 86400 = 1 day
            }
            $currentUser =$_COOKIE["user"];
            ?>
            var currentU = "<?php echo $currentUser ?>";
            //alert(currentU);
            if(currentU==0||currentU==null||currentU=="")
                $("#btnProfile").toggle();
            
            else{
                getLogged(currentU);
                $("#btnLogin").toggle();
            }
        }




        var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};
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

                <li class="nav-item" id="btnLogin">
                    <a class="nav-link" href="" data-toggle="modal" data-target="#modLogin" onclick="cleanInput('emailLog'), cleanInput('pwdLog')">Iniciar Sesion</a>
                </li>
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


<!--Cuerpo-->


    <!------ Title ------>

<div class="container-fluid padding" id="cuerpoNot">          
    <div class="row">
        <div class="col-md-9">             
            <div class="row" id="headerDisplay">          
                <div class="col-md-1"></div>             
                <div class="col-md-10" id="searchHeader">
                    <label id="palabraB"> Resultados de: </label>
                    <div id="contenedorDatePicker datepicker-container">
                        <label for="rangoInicialFechaBuscar" class="stylerDate">Desde: </label>
                        <input type="date" name="rangoInicialFechaBuscar" id="rangoInicialFechaBuscar" class="dateInputs" onfocus="cleanTextarea('rangoInicialFechaBuscar')">
                        <label for="rangoFinalFechaBuscar" class="stylerDate">Hasta: </label>
                        <input type="date" name="rangoFinalFechaBuscar" id="rangoFinalFechaBuscar" class="dateInputs" onfocus="cleanTextarea('rangoFinalFechaBuscar')">
                        <input type="checkbox" name="filtroTitulo" id="fT" value="1" class="checkboxes-f" checked="true"> Título
                        <input type="checkbox" name="filtroDesc" id="fD" value="2" class="checkboxes" checked="true"> Descripción
                        <input type="checkbox" name="filtroClave" id="fC" value="3" class="checkboxes" checked="true"> Palabra clave
                        <button class="btn btn-outline-danger" onclick="getSearchDataFiltros()" id="BTSearchFiltros">Aceptar</button>
                    </div>
                </div>
            </div>
            <div class="col-md-11" id="noticiaBG">          
                <div class="row" id="displayNews">
            
                </div>  
            </div>
            </div>
    
    <!--Populares-->
            <div class="col-md-3">
                <div class="row">
                    <div class="col-md-11" id="masVisto">
                        Populares
                    </div>
                </div>
                
                <div class="col-md-12" id="masVistoBG">          
                    <div class="row" id="displayMostViewed">


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
            <!--
            <div class="col-lg-4">
                <img src="Sources/Header/LogoBar.png">
                <hr class="Light">
                <p>305-696-0419</p>
                <p>LAOrnamental@Aol.com</p>
                <p>3708 NW 82nd Street</p>
                <p>Miami, Florida</p>
            </div>

            
            <div class="col-lg-4">
                <hr class="Light">
                <h5>Our hours</h5>
                <hr class="Light">
                <p>Monday to Friday: 10am to 7pm</p>
                <p>Saturday: 10am to 9pm</p>
                <p>Sunday: Closed</p>
            </div>

            <div class="col-md-4">
                <hr class="Light">
                <h5>Service Area</h5>
                <hr class="Light">
                <p>Miami, Florida 33147</p>
                <p>Laredo, Texas 78040</p>
                <p>Chicago, Illinois 60007</p>
                <p>Los Angeles, California 90001</p>
            </div>-->

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
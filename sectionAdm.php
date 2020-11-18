<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nova | Administrador de Secciones</title>

    <link rel="stylesheet" href="CSS/generales.css">
    <link rel="stylesheet" href="CSS/main.css">
    <link rel="stylesheet" href="CSS/sectionAdm.css">
    <link rel="shortcut icon" type="image/x-icon" href="Sources/LogoPag.png" />
    <script src="JS/functions.js"></script>
    <script src="JS/sectionAdm.js"></script>
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

            getSecciones();
            $("body").on("click", ".column",function(){
                alert("¡Todo funciona!");
                var index = ($( "li" ).index( this ))-9;
               alert("order is: "+index);
			});
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

    
    <!--Cuerpo-->

    <div class="container-fluid padding" id="cuerpoNot">          
        <div class="row">
            <div class="col-md-12">   
                <div class="row" id="noticiaHeader">        
                    <div class="col-md-1" id="sectionHeader"></div>        
                    <div class="col-md-11" id="tituloNoticia">
                        Secciones
                        
                    </div>
                </div>
                <div class="row" id="noticiaBG">
                    <!--<div class="col-md-10" id="datosAcontecimiento"> <br> 09 de Octubre del 2020 a las 19:00pm,
                                                                    Guadalupe, Nuevo Leon
                    </div>-->
                    <div class="col-md-10" id="noticiaBody">
                        <div class="listaSeccion">
                        <ul id="columns" class="allSections" >
                            <li class="column" draggable="true">   
                                <header>
                                    <label id="nombreSec">Nacionales</label>
                                    <button class="btn btn-outline-danger btnEdit" data-toggle="modal" data-target="#modChangeN">Cambiar nombre</button>
                                    <button class="btn btn-outline-danger btnDel" onclick="deleteSec()">Eliminar</button>
                                </header>
                            </li>
                            <li class="column" draggable="true">   
                                <header>
                                    <label>Internacionales</label>
                                    <button class="btn btn-outline-danger btnEdit" data-toggle="modal" data-target="#modChangeN">Cambiar nombre</button>
                                    <button class="btn btn-outline-danger btnDel" onclick="deleteSec()">Eliminar</button>
                                </header>
                            </li>
                            <li class="column" draggable="true">   
                                <header>
                                    <label>Cultura</label>
                                    <button class="btn btn-outline-danger btnEdit" data-toggle="modal" data-target="#modChangeN">Cambiar nombre</button>
                                    <button class="btn btn-outline-danger btnDel" onclick="deleteSec()">Eliminar</button>
                                </header>
                            </li>
                            <li class="column" draggable="true">   
                                <header>
                                    <label>Economía</label>
                                    <button class="btn btn-outline-danger btnEdit" data-toggle="modal" data-target="#modChangeN">Cambiar nombre</button>
                                    <button class="btn btn-outline-danger btnDel" onclick="deleteSec()">Eliminar</button>
                                </header>
                            </li>
                          </ul>
                        </div>
                          <script id="rendered-js">
                              
var dragSrcEl = null;

function handleDragStart(e) {
  // Target (this) element is the source node.
  dragSrcEl = this;

  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.outerHTML);

  this.classList.add('dragElem');
}
function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault(); // Necessary. Allows us to drop.
  }
  this.classList.add('over');

  e.dataTransfer.dropEffect = 'move'; // See the section on the DataTransfer object.

  return false;
}

function handleDragEnter(e) {
  // this / e.target is the current hover target.
}

function handleDragLeave(e) {
  this.classList.remove('over'); // this / e.target is previous target element.
}

function handleDrop(e) {
  // this/e.target is current target element.

  if (e.stopPropagation) {
    e.stopPropagation(); // Stops some browsers from redirecting.
  }

  // Don't do anything if dropping the same column we're dragging.
  if (dragSrcEl != this) {
    // Set the source column's HTML to the HTML of the column we dropped on.
    //alert(this.outerHTML);
    //dragSrcEl.innerHTML = this.innerHTML;
    //this.innerHTML = e.dataTransfer.getData('text/html');
    this.parentNode.removeChild(dragSrcEl);
    var dropHTML = e.dataTransfer.getData('text/html');
    this.insertAdjacentHTML('beforebegin', dropHTML);
    var dropElem = this.previousSibling;
    addDnDHandlers(dropElem);

  }
  this.classList.remove('over');
  return false;
}

function handleDragEnd(e) {
  // this/e.target is the source node.
  this.classList.remove('over');

  /*[].forEach.call(cols, function (col) {
                                   col.classList.remove('over');
                                 });*/
}

function addDnDHandlers(elem) {
  elem.addEventListener('dragstart', handleDragStart, false);
  elem.addEventListener('dragenter', handleDragEnter, false);
  elem.addEventListener('dragover', handleDragOver, false);
  elem.addEventListener('dragleave', handleDragLeave, false);
  elem.addEventListener('drop', handleDrop, false);
  elem.addEventListener('dragend', handleDragEnd, false);

}

var cols = document.querySelectorAll('#columns .column');
[].forEach.call(cols, addDnDHandlers);
//# sourceURL=pen.js
    
                          </script>

                          <div id="modChangeN" class="modal fade">
                    <div class="modal-dialog" id="modChangeN">
            
                        <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header" id="hLogin">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div class="modal-body" id="bLogin">
            
                                <ul class="nav nav-pills nav-justified" id="pills-tab" role="tablist">
                                    <li class="nav-item" id="pillLog">
                                        <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#login" role="tab"
                                            aria-controls="pills-home" aria-selected="true">Nuevo nombre</a>
                                    </li>
                                   
                                </ul>
                                <hr>
            
                                <div class="tab-content" id="pills-tabContent">
            
                                    <div id="login" class="tab-pane fade show active">
                                        <form action="/action_page.php">
                                            <div class="form-group">
                                                <label for="nameNewSec">Nombre de sección:</label>
                                                <div id="mailContainer">
                                                <input type="text" class="form-control" id="nameNewSec">
                                              </div>
                                              <select id="colorSeccionM">
                                        <option id="option-1" value="1">Rojo</option>
                                        <option id="option-2" value="2">Verde</option>
                                        <option id="option-3" value="3">Amarillo</option>
                                        <option id="option-4" value="4">Azul</option>
                                        <option id="option-5" value="5">Rosa</option>
                                      </select>
                                            </div>
                                        </form>
                                        <!--<span>Forgot your password?</span>-->
                                        <hr>
                                        <button id="logMeIn" type="button" class="btn btn-outline-danger" 
                                            style="float:right">Aceptar</button>
                                    </div>
                  
                                  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>             



                <button class="btn btn-outline-danger btnAdd" data-toggle="modal" data-target="#modAddS">Agregar Sección</button>    
                <div id="modAddS" class="modal fade">
                    <div class="modal-dialog" id="modAddS">
            
                        <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header" id="hLogin">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div class="modal-body" id="bLogin">
            
                                <ul class="nav nav-pills nav-justified" id="pills-tab" role="tablist">
                                    <li class="nav-item" id="pillLog">
                                        <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#login" role="tab"
                                            aria-controls="pills-home" aria-selected="true">Añadir nueva sección</a>
                                    </li>
                                   
                                </ul>
                                <hr>
            
                                <div class="tab-content" id="pills-tabContent">
            
                                    <div id="login" class="tab-pane fade show active">
                                        <form action="/action_page.php">
                                        <div class="form-group">
                                                <label for="nameNewSec">Nombre de sección:</label>
                                                <div id="mailContainer">
                                                <input type="text"  id="sect" class="form-control">
                                              </div>
                                              <select id="colorSeccionR">
                                        <option id="option-1" value="1">Rojo</option>
                                        <option id="option-2" value="2">Verde</option>
                                        <option id="option-3" value="3">Amarillo</option>
                                        <option id="option-4" value="4">Azul</option>
                                        <option id="option-5" value="5">Rosa</option>
                                      </select>
                                            </div>
                                        </form>
                                        <!--<span>Forgot your password?</span>-->
                                        <hr>
                                        <button id="addSectionBtn" type="button" class="btn btn-outline-danger" 
                                            style="float:right" onclick="addSection()">Añadir</button>
                                    </div>
                  
                                  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            

                <button id="addSectionBtn" type="button" class="btn btn-outline-danger" 
                                            style="float:right" >Guardar orden</button>
                
                   
                </div>
                
               
            </div>
            
        </div>




    </div>


    <!--FOOTER-->
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

<script src="https://static.codepen.io/assets/common/stopExecutionOnTimeout-157cd5b220a5c80d4ff8e0e70ac069bffd87a61252088146915e8726e5d9f147.js"></script>
</body>
</html>
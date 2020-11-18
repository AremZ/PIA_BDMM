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
          $("#btnProfile").toggle();
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


    <!------ Title ------>

    <div class="container-fluid padding" id="cuerpoNot">          
        <div class="row">
            <div class="col-md-9">   
                <div class="row" id="noticiaHeader">        
                    <div class="col-md-1" id="sectionHeader"></div>        
                    <div class="col-md-11" id="tituloNoticia">
                        Resultados de "palabra"
                        
                    </div>
                </div>
                <div class="row" id="noticiaBG">
                    <div class="col-md-12" id="noticiaBody">
                        <div class="row">
                            <div class="col-md-12">
                                <hr>
                            </div>
                                 <!-- TARJETA HORIZONTAL -->
                                 <div class="card mb-6 tarjetaResult" style="border-color: black;">
                                    <div class="row no-gutters">
                                      <div class="col-md-3 imgTarjeta"><br>
                                        <img src="http://via.placeholder.com/150x100" class="card-img" alt="...">
                                      </div>
                                      <div class="col-md-9">
                                        <div class="card-body">
                                          <h5 class="card-title"><a href="">TITULO NOTICIA</a> </h5>
                                          <p class="card-text">NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA
                                            NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA
                                          </p>              
                                          <div class="col-md-9" id="datePublicacion">10 de Octubre del 2020 a las 8:18am</div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                            <div class="col-md-12">
                                <hr>
                            </div>
                        </div>
                    </div>              
                   
                </div>
                
                <div class="row" id="noticiaBG">
                    <div class="col-md-12" id="noticiaBody">
                        <div class="row">
                            <div class="col-md-12">
                                <hr>
                            </div>
                                 <!-- TARJETA HORIZONTAL -->
                                 <div class="card mb-6 tarjetaResult" style="border-color: black;">
                                    <div class="row no-gutters">
                                      <div class="col-md-3 imgTarjeta"><br>
                                        <img src="http://via.placeholder.com/150x100" class="card-img" alt="...">
                                      </div>
                                      <div class="col-md-9">
                                        <div class="card-body">
                                          <h5 class="card-title"><a href="">TITULO NOTICIA</a> </h5>
                                          <p class="card-text">NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA
                                            NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA
                                          </p>
                                          <div class="col-md-9" id="datePublicacion">10 de Octubre del 2020 a las 8:18am</div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-md-12">
                                    <hr>
                                </div>        
                        </div>
                    </div>              
                   
                </div>
                
                <div class="row" id="noticiaBG">
                    <div class="col-md-12" id="noticiaBody">
                        <div class="row">
                            <div class="col-md-12">
                                <hr>
                            </div>
                                 <!-- TARJETA HORIZONTAL -->
                                 <div class="card mb-6 tarjetaResult" style="border-color: black;">
                                    <div class="row no-gutters">
                                      <div class="col-md-3 imgTarjeta"><br>
                                        <img src="http://via.placeholder.com/150x100" class="card-img" alt="...">
                                      </div>
                                      <div class="col-md-9">
                                        <div class="card-body">
                                          <h5 class="card-title"><a href="">TITULO NOTICIA</a> </h5>
                                          <p class="card-text">NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA
                                            NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA
                                          </p>
                                          <div class="col-md-9" id="datePublicacion">10 de Octubre del 2020 a las 8:18am</div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-md-12">
                                    <hr>
                                </div>
                            </div>
                    </div>              
                   
                </div>


                <div class="row" id="noticiaBG">
                    <div class="col-md-12" id="noticiaBody">
                        <div class="row">
                            <div class="col-md-12">
                                <hr>
                            </div>
                                 <!-- TARJETA HORIZONTAL -->
                                 <div class="card mb-6 tarjetaResult" style="border-color: black;">
                                    <div class="row no-gutters">
                                      <div class="col-md-3 imgTarjeta"><br>
                                        <img src="http://via.placeholder.com/150x100" class="card-img" alt="...">
                                      </div>
                                      <div class="col-md-9">
                                        <div class="card-body">
                                          <h5 class="card-title"><a href="">TITULO NOTICIA</a> </h5>
                                          <p class="card-text">NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA
                                            NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA NOTICIA
                                          </p>
                                          <div class="col-md-9" id="datePublicacion">10 de Octubre del 2020 a las 8:18am</div>
                                        </div>
                                      </div>
                                    </div>
                                  
                                    </div>
                                    <div class="col-md-12">
                                        <hr>
                                    </div>
                            </div>
                    </div>              
                   
                </div>


            </div>
            <!--Populares-->
            <div class="col-md-3 tarjetaPrincAside">
                <br>
                <h3 id="tituloPopulares">Más populares</h3><br>
                <!-- TARJETA HORIZONTAL -->
                <div class="row listaPopu">   
                <div class="card mb-3">
                    <div class="row no-gutters">
                      <div class="col-md-4">
                          <div class=" img-popular">
                        <img src="http://via.placeholder.com/100x150" class="card-img" alt="...">
                        </div>
                      </div>
                      <div class="col-md-8">
                        <div class="card-body">
                          <h6 class="card-title">NOTICIA</h6>
                          <p class="card-text card-horizontalT">POPULAR POPULAR POPULAR POPULAR </p>
                          <a href="product.html" class="btn btn-outline-danger ">Ver noticia</a>
                          
                        </div>
                      </div>
                    </div>
                </div>

              


                  <div class="card mb-3" style="max-width: 540px;">
                    <div class="row no-gutters">
                      <div class="col-md-4">
                          <div class=" img-popular">
                        <img src="http://via.placeholder.com/100x150" class="card-img" alt="...">
                    </div>
                      </div>
                      <div class="col-md-8">
                        <div class="card-body">
                          <h6 class="card-title">NOTICIA</h6>
                          <p class="card-text card-horizontalT">POPULAR POPULAR POPULAR POPULAR </p>
                          <a href="product.html" class="btn btn-outline-danger ">Ver noticia</a>
                          
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="card mb-3" style="max-width: 540px;">
                    <div class="row no-gutters">
                      <div class="col-md-4">
                          <div class=" img-popular">
                        <img src="http://via.placeholder.com/100x150" class="card-img" alt="...">
                    </div>
                      </div>
                      <div class="col-md-8">
                        <div class="card-body">
                          <h6 class="card-title">NOTICIA</h6>
                          <p class="card-text card-horizontalT">POPULAR POPULAR POPULAR POPULAR </p>
                          <a href="product.html" class="btn btn-outline-danger ">Ver noticia</a>
                          
                        </div>
                      </div>
                    </div>
                  </div>    
               

                  <div class="card mb-3" style="max-width: 540px;">
                    <div class="row no-gutters">
                      <div class="col-md-4">
                          <div class=" img-popular">
                        <img src="http://via.placeholder.com/100x150" class="card-img" alt="...">
                    </div>
                      </div>
                      <div class="col-md-8">
                        <div class="card-body">
                          <h6 class="card-title">NOTICIA</h6>
                          <p class="card-text card-horizontalT">POPULAR POPULAR POPULAR POPULAR </p>
                          <a href="product.html" class="btn btn-outline-danger ">Ver noticia</a>
                          
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
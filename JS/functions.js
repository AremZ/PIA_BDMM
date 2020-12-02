var seccionPorEliminar="";
var idSeccionPorEliminar=0;
var changedPhoto = false;

function setupImage(input, display, theClass){
    const addPhoto = document.getElementById(input);
    const container =  document.getElementById(display);
    const previewImage = container.querySelector(theClass);

    addPhoto.addEventListener("change", function(){
        const file = this.files[0];

        if(file){
            const reader = new FileReader();
            changedPhoto = true;

            reader.addEventListener("load", function(){
                previewImage.setAttribute("src", this.result);
            });

            reader.readAsDataURL(file);

        }
    });
}

var indexSlidesImg = 0;
var indexSlidesVid = 0;

function setupNewsImage(input, carousel, slidesCarousel){
    const addPhoto = document.getElementById(input);
    const container =  document.getElementById(carousel);
    const sliders = document.getElementById(slidesCarousel);

    addPhoto.addEventListener("change", function(){
        const file = this.files[0];

        if(file){
            const reader = new FileReader();
            reader.addEventListener("load", function(){
                container.innerHTML += '<div class="carousel-item"><img src="' + this.result +'"></div>';
                $("#" + carousel + " div").last().addClass("active");
                $("#" + carousel + " div:not(:last-child)").removeClass("active");

                sliders.innerHTML += '<li data-target="#carruselImg" data-slide-to="'+ indexSlidesImg +'"></li>';
                $("#" + slidesCarousel + " li").last().addClass("active");
                $("#" + slidesCarousel + " li:not(:last-child)").removeClass("active");
                indexSlidesImg++;
            });

            reader.readAsDataURL(file);

        }
    });
}

function setupNewsVideo(input, carousel, slidesCarousel){
    const addPhoto = document.getElementById(input);
    const container =  document.getElementById(carousel);
    const sliders = document.getElementById(slidesCarousel);

    addPhoto.addEventListener("change", function(){
        const file = this.files[0];

        if(file){
            const reader = new FileReader();

            reader.addEventListener("load", function(){
                //var fileUrl = window.URL.createObjectURL(file);
                container.innerHTML += '<div class="carousel-item"><video class="video-fluid" onplay="pauseCar();" onpause="playCar();" controls><source src="' +
                this.result + '" type="video/mp4"></video></div>';
                $("#" + carousel + " div").last().addClass("active");
                $("#" + carousel + " div:not(:last-child)").removeClass("active");
                
                //sliders.innerHTML += '<li data-target="#carruselVid" data-slide-to="'+ indexSlidesVid +'"></li>';
                //$("#" + slidesCarousel + " li").last().addClass("active");
                //$("#" + slidesCarousel + " li:not(:last-child)").removeClass("active");
                //indexSlidesVid++;
            });

            reader.readAsDataURL(file);

        }
    });
}

function pauseCar(){ 
    $('#carruselVid').carousel('pause');
}

function playCar(){
    $('#carruselVid').carousel('cycle');
}

function deleteActualSlide(carousel, slidesCarousel, whatIs){
    $(carousel).find('.active').remove();
    $(carousel).find('.carousel-item').first().addClass("active");
    $(slidesCarousel + " li").last().remove();
    $(slidesCarousel + " li").first().addClass("active");
    $(slidesCarousel + " li:not(:first-child)").removeClass("active");       
    
    if(whatIs == 'img')
        indexSlidesImg--;
    else if(whatIs == 'vid');
        //indexSlidesImg--;
}

var curday = function(sp){
  today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //As January is 0.
  var yyyy = today.getFullYear();

  if(dd<10) dd='0'+dd;
  if(mm<10) mm='0'+mm;
  return (yyyy+sp+mm+sp+dd);
};

var curdayminus = function(sp){
  today = new Date();
  today.setDate(today.getDate()-7);
  var dd = today.getDate();
  var mm = today.getMonth()+1; //As January is 0.
  var yyyy = today.getFullYear();

  if(dd<10) dd='0'+dd;
  if(mm<10) mm='0'+mm;
  return (yyyy+sp+mm+sp+dd);
};

function search(){
    var palabraBuscar=document.getElementById("BRSearch").value;
    url = 'searchResult.php?palabra=' + palabraBuscar;
    //window.location.replace(url);
    window.location = url;
    //alert("Palabra: "+palabraBuscar);
}

function getSearchDataFiltros(){
  var palabraBuscar=document.getElementById("BRSearch").value;
  var rangoInicial=document.getElementById("rangoInicialFechaBuscar").value;
  var rangoFinal=document.getElementById("rangoFinalFechaBuscar").value;
  //alert("Fecha inicial: "+rangoInicial+" Fecha final: "+rangoFinal);

  var titulo="null";
  if($("#fT").prop("checked"))
    titulo=palabraBuscar;

  var desc="null";
  if($("#fD").prop("checked"))
    desc=palabraBuscar;

  var clave="null";
  if($("#fC").prop("checked"))
    clave=palabraBuscar;
  
  displaySearchResults(titulo, desc, clave, rangoInicial, rangoFinal);
  
}

function validaciones(mod){
    
    if (mod==1){
        var campoEmail = document.getElementById("emailLog");
        var inputEmail = false;
        var inputPass = false;
        
        if(campoEmail.value==""){
            document.getElementById("mailContainer").className=document.getElementById("mailContainer").className+" error";
            inputEmail = false;
        }
        
        else{
            if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(campoEmail.value))){
                document.getElementById("mailContainer").className=document.getElementById("mailContainer").className+" error";
                alert("Dirección de correo inválida.")
                inputEmail = false;
            }
            else{
                inputEmail = true;
            }
        }
        
        var campoPass = document.getElementById("pwdLog");
        if(campoPass.value==""){
            document.getElementById("passContainer").className=document.getElementById("passContainer").className+" error";
            inputPass = false;
        }
        else{
            inputPass = true;
        }
                    
        if (inputEmail && inputPass) {
            
            $.ajax({
                url: "PHP/users.php",
                type: "post",
                dataType: "json",
                data: {method: 'userLogin', email: campoEmail.value, pass: campoPass.value},
                success: function (row) {
                    if(row){
                        alert("¡Sesion iniciada exitosamente!");    
                        document.cookie = "user="+row.id_Usuario;
                        document.getElementById("nombreUsuario").innerHTML="¡ Hola "+row.nombres+" !";
                        $('#modLogin').modal('toggle');
                        $("#btnLogin").toggle();
                        $("#btnProfile").toggle();
                    }
                    else
                        alert("Verifique sus datos.");
                }
            });
        }

        else{
            document.getElementById("mailContainer").className=document.getElementById("mailContainer").className+" error";
            document.getElementById("passContainer").className=document.getElementById("passContainer").className+" error";
        }
    }

    else if (mod==2){
        var campo;
        var datosCorrec=true;
        campo = document.getElementById("fnameLog");
        if(campo.value==""){
            document.getElementById("nameContainer").className=document.getElementById("nameContainer").className+" error";
            datosCorrec=false;
        }
        campo = document.getElementById("snameLog");
        if(campo.value==""){
            document.getElementById("snameContainer").className=document.getElementById("snameContainer").className+" error";
            datosCorrec=false;
        }
        campo = document.getElementById("lnameLog");
        if(campo.value==""){
            document.getElementById("lnameContainer").className=document.getElementById("lnameContainer").className+" error";
            datosCorrec=false;
        }
        campo = document.getElementById("emailRLog");
        if(campo.value==""){
            document.getElementById("mailRContainer").className=document.getElementById("mailRContainer").className+" error";
            datosCorrec=false;
            }
            else{
                if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(campo.value))){
                    document.getElementById("mailRContainer").className=document.getElementById("mailRContainer").className+" error";
                    datosCorrec=false;
                    alert("Dirección de correo inválida.")
            }
        }
        campo = document.getElementById("telLog");
        if(campo.value==""){
            document.getElementById("telContainer").className=document.getElementById("telContainer").className+" error";
            datosCorrec=false;
        }
            else{
                if(isNaN(campo.value)||campo.value.length<8||campo.value.length>10){
                    alert("Número telefónico inválido.")
                    document.getElementById("telContainer").className=document.getElementById("telContainer").className+" error";
                    datosCorrec=false;
            }

        }
        campo = document.getElementById("pwdRLog");
        if(campo.value==""){
            document.getElementById("passRContainer").className=document.getElementById("passRContainer").className+" error";   
            datosCorrec=false;
        }
        var campo2 = document.getElementById("rpwdLog");
        if((campo2.value=="") || (campo2.value!=campo.value)){
            document.getElementById("rpassContainer").className=document.getElementById("rpassContainer").className+" error";   
            datosCorrec=false;
        }
        
        campo = document.getElementById('agregarFoto').value;
        if (campo == ""){
            alert("Seleccione una imagen por favor.")   
            datosCorrec=false;
        }

        if(datosCorrec){
            var campoName = document.getElementById("fnameLog");
            var campoLN = document.getElementById("snameLog");
            var campoLN2 = document.getElementById("lnameLog");
            var campoEmail = document.getElementById("emailRLog");
            var campoTel = document.getElementById("telLog");
            var campoPass = document.getElementById("pwdRLog");
            var avatar = document.getElementById("agregarFoto").files[0];

            var theForm = new FormData();
            theForm.append("method", 'userSignUp');
            theForm.append("userType", 'usuario');
            theForm.append("name", campoName.value);
            theForm.append("lastName", campoLN.value);
            theForm.append("lastName2", campoLN2.value);
            theForm.append("email", campoEmail.value);
            theForm.append("numTel", campoTel.value);
            theForm.append("pass", campoPass.value);
            theForm.append("pfp", avatar);

            $.ajax({
                url: "PHP/users.php",
                type: "post",
                dataType: "json",
                data: theForm,
                contentType: false,
                processData: false,
                success: function (result) {
                    if(result.msg){
                        alert("¡Registro exitoso! Inicia sesión.");
                        document.getElementById("fnameLog").value="";
                        document.getElementById("snameLog").value="";
                        document.getElementById("lnameLog").value="";
                        document.getElementById("emailRLog").value="";
                        document.getElementById("telLog").value="";
                        document.getElementById("pwdRLog").value="";
                        document.getElementById("rpwdLog").value="";                    
                        $('#modLogin').modal('toggle');
                        //$("#btnLogin").toggle();
                        //$("#btnProfile").toggle()
                    }
                    else
                        alert("Correo ya registrado.");
                }
            });
        }
    }

    else if (mod==3){
        var datosCorrec=true;
        campo = document.getElementById("fnameAdmin");
        if(campo.value==""){
            document.getElementById("nameContainerAdmin").className=document.getElementById("nameContainerAdmin").className+" error";
            datosCorrec=false;
        }
        campo = document.getElementById("snameAdmin");
        if(campo.value==""){
            document.getElementById("snameContainerAdmin").className=document.getElementById("snameContainerAdmin").className+" error";
            datosCorrec=false;
        }
        campo = document.getElementById("lnameAdmin");
        if(campo.value==""){
            document.getElementById("lnameContainerAdmin").className=document.getElementById("lnameContainerAdmin").className+" error";
            datosCorrec=false;
        }
        campo = document.getElementById("emailRAdmin");
        if(campo.value==""){
            document.getElementById("mailRContainerAdmin").className=document.getElementById("mailRContainerAdmin").className+" error";
            datosCorrec=false;
            }
            else{
                if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(campo.value))){
                    document.getElementById("mailRContainerAdmin").className=document.getElementById("mailRContainerAdmin").className+" error";
                    alert("Dirección de correo inválida.")
            }
        }
        campo = document.getElementById("telAdmin");
        if(campo.value==""){
            document.getElementById("telContainerAdmin").className=document.getElementById("telContainerAdmin").className+" error";
            datosCorrec=false;
        }
            else{
                if(isNaN(campo.value)||campo.value.length<8||campo.value.length>10){
                    alert("Número telefónico inválido.")
                    document.getElementById("telContainerAdmin").className=document.getElementById("telContainerAdmin").className+" error";
            }

        }
        campo = document.getElementById("pwdAdmin");
        if(campo.value==""){
            document.getElementById("passRContainerAdmin").className=document.getElementById("passRContainerAdmin").className+" error";   
            datosCorrec=false;
        }
        var campo2 = document.getElementById("rpwdAdmin");
        if((campo2.value=="") || (campo2.value!=campo.value)){
            document.getElementById("rpassContainerAdmin").className=document.getElementById("rpassContainerAdmin").className+" error";   
            datosCorrec=false;
        }
        
        campo = document.getElementById('agregarFotoAdmin').value;
        if (campo == ""){
            alert("Seleccione una imagen por favor.")   
            datosCorrec=false;
        }

        if(datosCorrec){         
            var campoName = document.getElementById("fnameAdmin");
            var campoLN = document.getElementById("snameAdmin");
            var campoLN2 = document.getElementById("lnameAdmin");
            var campoEmail = document.getElementById("emailRAdmin");
            var campoTel = document.getElementById("telAdmin");
            var campoPass = document.getElementById("pwdAdmin");
            
            var indexUser = document.getElementById("selectUsuario").selectedIndex;
            var type = 0;
            if(indexUser == 0)
                type = 'usuario';              
            else if(indexUser == 1)
                type = 'reportero';                        
            else if(indexUser == 2)
                type = 'editor';

            var avatar = document.getElementById("agregarFotoAdmin").files[0]; 

            var theForm = new FormData();
            theForm.append("method", 'userSignUp');
            theForm.append("userType", type);
            theForm.append("name", campoName.value);
            theForm.append("lastName", campoLN.value);
            theForm.append("lastName2", campoLN2.value);
            theForm.append("email", campoEmail.value);
            theForm.append("numTel", campoTel.value);
            theForm.append("pass", campoPass.value);
            theForm.append("pfp", avatar);
            
            $.ajax({
                url: "PHP/users.php",
                type: "post",
                dataType: "json",
                data: theForm,
                contentType: false,
                processData: false,
                success: function (result) {
                    if (result.msg) {
                        alert("¡Registro exitoso!");
                        document.getElementById("fnameAdmin").value = "";
                        document.getElementById("snameAdmin").value = "";
                        document.getElementById("lnameAdmin").value = "";
                        document.getElementById("emailRAdmin").value = "";
                        document.getElementById("telAdmin").value = "";
                        document.getElementById("pwdAdmin").value = "";
                        document.getElementById("rpwdAdmin").value = "";
                        emptyList('usersList');
                        getAllUsers();
                        $('#modRegister').modal('toggle');
                    } else
                        alert("Correo ya registrado.");
                }
            });
            
        }     
    }
    
    else if (mod == 4) {
        var datosCorrec = true;
        campo = document.getElementById("fnameEditor");
        if (campo.value == "") {
            document.getElementById("nameContainerEditor").className = document.getElementById("nameContainerEditor").className + " error";
            datosCorrec = false;
        }
        campo = document.getElementById("snameEditor");
        if (campo.value == "") {
            document.getElementById("snameContainerEditor").className = document.getElementById("snameContainerEditor").className + " error";
            datosCorrec = false;
        }
        campo = document.getElementById("lnameEditor");
        if (campo.value == "") {
            document.getElementById("lnameContainerEditor").className = document.getElementById("lnameContainerEditor").className + " error";
            datosCorrec = false;
        }
        campo = document.getElementById("emailREditor");
        if (campo.value == "") {
            document.getElementById("mailRContainerEditor").className = document.getElementById("mailRContainerEditor").className + " error";
            datosCorrec = false;
        } else {
            if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(campo.value))) {
                document.getElementById("mailRContainerEditor").className = document.getElementById("mailRContainerEditor").className + " error";
                alert("Dirección de correo inválida.")
            }
        }
        campo = document.getElementById("telEditor");
        if (campo.value == "") {
            document.getElementById("telContainerEditor").className = document.getElementById("telContainerEditor").className + " error";
            datosCorrec = false;
        } else {
            if (isNaN(campo.value) || campo.value.length < 8 || campo.value.length > 10) {
                alert("Número telefónico inválido.")
                document.getElementById("telContainerEditor").className = document.getElementById("telContainerEditor").className + " error";
            }

        }
        campo = document.getElementById("pwdEditor");
        if (campo.value == "") {
            document.getElementById("passRContainerEditor").className = document.getElementById("passRContainerEditor").className + " error";
            datosCorrec = false;
        }
        var campo2 = document.getElementById("rpwdEditor");
        if ((campo2.value == "") || (campo2.value != campo.value)) {
            document.getElementById("rpassContainerEditor").className = document.getElementById("rpassContainerEditor").className + " error";
            datosCorrec = false;
        }

        campo = document.getElementById('agregarFotoEditor').value;
        if (campo == "") {
            alert("Seleccione una imagen por favor.")
            datosCorrec = false;
        }

        if (datosCorrec) {
            var campoName = document.getElementById("fnameEditor");
            var campoLN = document.getElementById("snameEditor");
            var campoLN2 = document.getElementById("lnameEditor");
            var campoEmail = document.getElementById("emailREditor");
            var campoTel = document.getElementById("telEditor");
            var campoPass = document.getElementById("pwdEditor");

            var avatar = document.getElementById("agregarFotoEditor").files[0]; 

            var theForm = new FormData();
            theForm.append("method", 'userSignUp');
            theForm.append("userType", 'reportero');
            theForm.append("name", campoName.value);
            theForm.append("lastName", campoLN.value);
            theForm.append("lastName2", campoLN2.value);
            theForm.append("email", campoEmail.value);
            theForm.append("numTel", campoTel.value);
            theForm.append("pass", campoPass.value);
            theForm.append("pfp", avatar);
            
            $.ajax({
                url: "PHP/users.php",
                type: "post",
                dataType: "json",
                data: theForm,
                contentType: false,
                processData: false,
                success: function (result) {
                    if (result.msg) {
                        alert("¡Registro exitoso!");
                        document.getElementById("fnameEditor").value = "";
                        document.getElementById("snameEditor").value = "";
                        document.getElementById("lnameEditor").value = "";
                        document.getElementById("emailREditor").value = "";
                        document.getElementById("telEditor").value = "";
                        document.getElementById("pwdEditor").value = "";
                        document.getElementById("rpwdEditor").value = "";
                        emptyList('reportList');
                        getAllReporteros();
                        $('#modRegister').modal('toggle');
                    } else
                        alert("Correo ya registrado.");
                }
            });
        }
    }

    else if (mod==5){
        var datosCorrec=true;
        campo = document.getElementById("fnameAdmin");
        if(campo.value==""){
            document.getElementById("nameContainerAdmin").className=document.getElementById("nameContainerAdmin").className+" error";
            datosCorrec=false;
        }
        campo = document.getElementById("snameAdmin");
        if(campo.value==""){
            document.getElementById("snameContainerAdmin").className=document.getElementById("snameContainerAdmin").className+" error";
            datosCorrec=false;
        }
        campo = document.getElementById("lnameAdmin");
        if(campo.value==""){
            document.getElementById("lnameContainerAdmin").className=document.getElementById("lnameContainerAdmin").className+" error";
            datosCorrec=false;
        }
        campo = document.getElementById("emailRAdmin");
        if(campo.value==""){
            document.getElementById("mailRContainerAdmin").className=document.getElementById("mailRContainerAdmin").className+" error";
            datosCorrec=false;
            }
            else{
                if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(campo.value))){
                    document.getElementById("mailRContainerAdmin").className=document.getElementById("mailRContainerAdmin").className+" error";
                    alert("Dirección de correo inválida.")
            }
        }
        campo = document.getElementById("telAdmin");
        if(campo.value==""){
            document.getElementById("telContainerAdmin").className=document.getElementById("telContainerAdmin").className+" error";
            datosCorrec=false;
        }
            else{
                if(isNaN(campo.value)||campo.value.length<8||campo.value.length>10){
                    alert("Número telefónico inválido.")
                    document.getElementById("telContainerAdmin").className=document.getElementById("telContainerAdmin").className+" error";
            }

        }
        campo = document.getElementById("pwdAdmin");
        if(campo.value==""){
            document.getElementById("passRContainerAdmin").className=document.getElementById("passRContainerAdmin").className+" error";   
            datosCorrec=false;
        }
        var campo2 = document.getElementById("rpwdAdmin");
        if((campo2.value=="") || (campo2.value!=campo.value)){
            document.getElementById("rpassContainerAdmin").className=document.getElementById("rpassContainerAdmin").className+" error";   
            datosCorrec=false;
        }

        if(datosCorrec){         
            var campoName = document.getElementById("fnameAdmin");
            var campoLN = document.getElementById("snameAdmin");
            var campoLN2 = document.getElementById("lnameAdmin");
            var campoEmail = document.getElementById("emailRAdmin");
            var campoTel = document.getElementById("telAdmin");
            var campoPass = document.getElementById("pwdAdmin");

            var usuarioID = document.getElementById("idUser");
            
            var indexUser = document.getElementById("selectUsuario").selectedIndex;
            var type = 0;
            if(indexUser == 0)
                type = 'usuario';              
            else if(indexUser == 1)
                type = 'reportero';                        
            else if(indexUser == 2)
                type = 'editor';                
                
            $.ajax({
                url: "PHP/users.php",
                type: "post",
                dataType: "json",
                data: {method: 'editUsers', userType: type, id: usuarioID.value, name: campoName.value, lastName: campoLN.value, lastName2: campoLN2.value, email: campoEmail.value, numTel: campoTel.value, pass: campoPass.value},
                success: function (result) {
                    if (result.msg) {
                        if(changedPhoto){
                            var avatar = document.getElementById("agregarFotoAdmin").files[0];
                            var theForm = new FormData();
                            theForm.append("method", 'updateImage');
                            theForm.append("id", usuarioID.value);
                            theForm.append("pfp", avatar);
                                  
                            $.ajax({
                                url: "PHP/media.php",
                                type: "post",
                                dataType: "json",
                                data: theForm,
                                contentType: false,
                                processData: false,
                                success: function (result) {
                                    if (result.msg) {
                                        alert("Cambios hechos exitosamente!");
                                    } else
                                        alert("Ocurrio un error al guardar la imagen, los demas datos se actualizaron correctamente.");
                                }
                            });
                        }
                        else
                            alert("Cambios hechos exitosamente!");

                        document.getElementById("fnameAdmin").value = "";
                        document.getElementById("snameAdmin").value = "";
                        document.getElementById("lnameAdmin").value = "";
                        document.getElementById("emailRAdmin").value = "";
                        document.getElementById("telAdmin").value = "";
                        document.getElementById("pwdAdmin").value = "";
                        document.getElementById("rpwdAdmin").value = "";
                        document.getElementById("idUser").value = "";
                        emptyList('usersList');
                        setTimeout(function () {
                            getAllUsers();
                        }, 200);
                        $('#modRegister').modal('toggle');
                    } else
                        alert("Ocurrio un error actualizando los datos.");
                }
            });
        }     
    }

    else if (mod == 6) {
        var datosCorrec = true;
        campo = document.getElementById("fnameEditor");
        if (campo.value == "") {
            document.getElementById("nameContainerEditor").className = document.getElementById("nameContainerEditor").className + " error";
            datosCorrec = false;
        }
        campo = document.getElementById("snameEditor");
        if (campo.value == "") {
            document.getElementById("snameContainerEditor").className = document.getElementById("snameContainerEditor").className + " error";
            datosCorrec = false;
        }
        campo = document.getElementById("lnameEditor");
        if (campo.value == "") {
            document.getElementById("lnameContainerEditor").className = document.getElementById("lnameContainerEditor").className + " error";
            datosCorrec = false;
        }
        campo = document.getElementById("emailREditor");
        if (campo.value == "") {
            document.getElementById("mailRContainerEditor").className = document.getElementById("mailRContainerEditor").className + " error";
            datosCorrec = false;
        } else {
            if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(campo.value))) {
                document.getElementById("mailRContainerEditor").className = document.getElementById("mailRContainerEditor").className + " error";
                alert("Dirección de correo inválida.")
            }
        }
        campo = document.getElementById("telEditor");
        if (campo.value == "") {
            document.getElementById("telContainerEditor").className = document.getElementById("telContainerEditor").className + " error";
            datosCorrec = false;
        } else {
            if (isNaN(campo.value) || campo.value.length < 8 || campo.value.length > 10) {
                alert("Número telefónico inválido.")
                document.getElementById("telContainerEditor").className = document.getElementById("telContainerEditor").className + " error";
            }

        }
        campo = document.getElementById("pwdEditor");
        if (campo.value == "") {
            document.getElementById("passRContainerEditor").className = document.getElementById("passRContainerEditor").className + " error";
            datosCorrec = false;
        }
        var campo2 = document.getElementById("rpwdEditor");
        if ((campo2.value == "") || (campo2.value != campo.value)) {
            document.getElementById("rpassContainerEditor").className = document.getElementById("rpassContainerEditor").className + " error";
            datosCorrec = false;
        }

        if (datosCorrec) {
            var campoName = document.getElementById("fnameEditor");
            var campoLN = document.getElementById("snameEditor");
            var campoLN2 = document.getElementById("lnameEditor");
            var campoEmail = document.getElementById("emailREditor");
            var campoTel = document.getElementById("telEditor");
            var campoPass = document.getElementById("pwdEditor");

            var usuarioID = document.getElementById("idReportero");

            $.ajax({
                url: "PHP/users.php",
                type: "post",
                dataType: "json",
                data: {method: 'editUsers', userType: 'reportero', id: usuarioID.value, name: campoName.value, lastName: campoLN.value,
                lastName2: campoLN2.value, email: campoEmail.value, numTel: campoTel.value, pass: campoPass.value},
                success: function (result) {
                    if (result.msg) {
                        if(changedPhoto){
                            var avatar = document.getElementById("agregarFotoEditor").files[0];
                            var theForm = new FormData();
                            theForm.append("method", 'updateImage');
                            theForm.append("id", usuarioID.value);
                            theForm.append("pfp", avatar);
                                  
                            $.ajax({
                                url: "PHP/media.php",
                                type: "post",
                                dataType: "json",
                                data: theForm,
                                contentType: false,
                                processData: false,
                                success: function (result) {
                                    if (result.msg) {
                                        alert("Cambios hechos exitosamente!");
                                    } else
                                        alert("Ocurrio un error al guardar la imagen, los demas datos se actualizaron correctamente.");
                                }
                            });
                        }
                        else
                            alert("Cambios hechos exitosamente!");

                        document.getElementById("fnameEditor").value = "";
                        document.getElementById("snameEditor").value = "";
                        document.getElementById("lnameEditor").value = "";
                        document.getElementById("emailREditor").value = "";
                        document.getElementById("telEditor").value = "";
                        document.getElementById("pwdEditor").value = "";
                        document.getElementById("rpwdEditor").value = "";
                        emptyList('reportList');
                        setTimeout(function () {
                            getAllReporteros();
                        }, 200);
                        $('#modRegister').modal('toggle');
                    } else
                        alert("Correo ya registrado.");
                }
            });
        }
    }
}

function getLogged(userID){
    $.ajax({
        url: "PHP/users.php",
        type: "post",
        dataType: "json",
        data: {method: 'getUserData', idUser: userID},
        success: function (usuario, usser) {
            if (usuario != null){
                var name = usuario[0].name;
                var type = usuario[0].tipoUsuario;
                document.getElementById("nombreUsuario").innerHTML="¡ Hola "+name+" !";
                if(type=="usuario"){
                    $("#btnEscritorio").toggle();
                    $("#btnSeccion").toggle();
                }
                else if(type=="reportero")
                    $("#btnSeccion").toggle();
            }   
        },
        error: function (result) {
            alert("Ocurrio un error durante la obtencion de datos.");
        }

    });
}

function cerrarSesion(){
    $("#btnLogin").toggle();
    $("#btnProfile").toggle();
    document.getElementById("nombreUsuario").innerHTML="¡ Hola !";
    document.cookie = "user=0";
}

function limpiar(mod){
    if(mod==0)
        document.getElementById("mailContainer").className=document.getElementById("mailContainer").className.replace(" error","");
    if(mod==1)
        document.getElementById("passContainer").className=document.getElementById("passContainer").className.replace(" error","");
    if(mod==2)
        document.getElementById("nameContainer").className=document.getElementById("nameContainer").className.replace(" error","");
    if(mod==3)
        document.getElementById("snameContainer").className=document.getElementById("snameContainer").className.replace(" error","");
    if(mod==4)
        document.getElementById("lnameContainer").className=document.getElementById("lnameContainer").className.replace(" error","");
    if(mod==5)
        document.getElementById("mailRContainer").className=document.getElementById("mailRContainer").className.replace(" error","");
    if(mod==6)
        document.getElementById("telContainer").className=document.getElementById("telContainer").className.replace(" error","");
    if(mod==7)
        document.getElementById("passRContainer").className=document.getElementById("passRContainer").className.replace(" error","");
    if(mod==8)
        document.getElementById("rpassContainer").className=document.getElementById("rpassContainer").className.replace(" error","");
}

function cleanInput(idInput){
    document.getElementById(idInput).value = "";
    var parentDiv = document.getElementById(idInput).parentNode.id;
    document.getElementById(parentDiv).className = document.getElementById(parentDiv).className.replace(" error","");
}

function cleanInputClass(idInput){
    var parentDiv = document.getElementById(idInput).parentNode.id;
    document.getElementById(parentDiv).className = document.getElementById(parentDiv).className.replace(" error","");
}

function popUpComm(){
    //document.getElementById('carousel-videos').innerHTML = "";
    //$(".containerReply").innerHTML();
}

function switchModals(id1, id2){
    $(id1).modal('toggle');

    setTimeout(function () {
            $(id2).modal('toggle');
    }, 400);
}

function checkTextarea(idTxt, toggleWindow){
    var campo = document.getElementById(idTxt);
    if (campo.value == "")
        document.getElementById(idTxt).className=document.getElementById(idTxt).className+" error";
    else if (toggleWindow != "")
        $(toggleWindow).modal('toggle');
}

function checkNoticia(toggleWindow, action){
    var campo;
    var error = 0;
    
    campo = document.getElementById('headerNot');
    if (campo.value == ""){
        document.getElementById('headerNot').className=document.getElementById('headerNot').className+" error";
        error = 1;
    }
    
    campo = document.getElementById('infoNotFe');
    if (campo.value == ""){
        document.getElementById('infoNotFe').className=document.getElementById('infoNotFe').className+" error";
        error = 1;
    }
    
    campo = document.getElementById('infoNotHo');
    if (campo.value == ""){
        document.getElementById('infoNotHo').className=document.getElementById('infoNotHo').className+" error";
        error = 1;
    }
    
    campo = document.getElementById('infoNotlug');
    if (campo.value == ""){
        document.getElementById('infoNotlug').className=document.getElementById('infoNotlug').className+" error";
        error = 1;
    }
    
    campo = document.getElementById('descNoticia');
    if (campo.value == "" || campo.value.length > 200){
        document.getElementById('descNoticia').className=document.getElementById('descNoticia').className+" error";
        if(campo.value.length > 200)
            alert('El campo no debe exceder los 200 caracteres de longitud, tiene: ' + campo.value.length)
        error = 1;
    }
    
    campo = document.getElementById('bodyNoticia');
    if (campo.value == ""){
        document.getElementById('bodyNoticia').className=document.getElementById('bodyNoticia').className+" error";
        error = 1;
    }
    
    campo = document.getElementById('infoNotpalClav');
    if (campo.value == ""){
        document.getElementById('infoNotpalClav').className=document.getElementById('infoNotpalClav').className+" error";
        error = 1;
    }

    campo = $('#carousel-images').find('.carousel-item');

    if(campo.length == 0){
        alert("Seleccione una imagen por favor.")
        error = 1;
    }

    campo = $('#carousel-videos').find('.carousel-item');

    if(campo.length == 0){
        alert("Seleccione un video por favor.")
        error = 1;
    }

    if (error == 0){                
        var idNot = document.getElementById("idNoti").value;
        var titNot = document.getElementById("headerNot").value;
        var feInput = document.getElementById("infoNotFe").value;
        var hoInput = document.getElementById("infoNotHo").value;
        var lugNot = document.getElementById("infoNotlug").value;
        var shNot = document.getElementById("descNoticia").value;
        var lgNot = document.getElementById("bodyNoticia").value;
        var clvInput = document.getElementById("infoNotpalClav").value;
 
        var clvNot = clvInput.split(",");

        var select = document.getElementById("selectSeccion");
        var textSelect = select.options[select.selectedIndex].text; 
        var idSection = textSelect.split(" ");

        var allVideos = [];
        $('.carousel-item video source').each( function(){
            allVideos.push($(this).attr("src"));
        });

        var allImages = [];
        $('.carousel-item img').each( function(){
            allImages.push($(this).attr("src"));
        });
        
        var mediaForm = new FormData();
        mediaForm.append("idSec", idSection[0]);
        mediaForm.append("title", titNot);
        mediaForm.append("lugAcont", lugNot);
        mediaForm.append("descrSh", shNot);
        mediaForm.append("descrLg", lgNot);
        mediaForm.append("arrayClv", JSON.stringify(clvNot));
        mediaForm.append("imgMedia", JSON.stringify(allImages));
        mediaForm.append("vidMedia", JSON.stringify(allVideos));

        if (action == 0){
            var feAcont = feInput + " " + hoInput + ":00";
            var newEstado = 'redaccion';
            var isSent = 0;

            mediaForm.append("method", 'noticiaReg');
            mediaForm.append("dateAcont", feAcont);
            mediaForm.append("status", newEstado);
            mediaForm.append("sent", isSent);

            $.ajax({
                url: "PHP/noticias.php",
                type: "post",
                dataType: "json",
                contentType: false,
                processData: false,
                data: mediaForm,
                success: function (result) {
                    if (result.msg) {
                    //alert(result.aa);
                    alert("Noticia creada exitosamente!");
                    emptyBlock('notiRedaccion');
                    getNoticiasRed();
                    $(toggleWindow).modal('toggle');                       
                    } else
                        alert("Ocurrio un error durante la ejecucion.");
                }
            }); 
        }

        if (action == 1){
            var feAcont = feInput + " " + hoInput + ":00";
            var newEstado = 'terminada';
            var isSent = 1;

            mediaForm.append("method", 'noticiaReg');
            mediaForm.append("dateAcont", feAcont);
            mediaForm.append("status", newEstado);
            mediaForm.append("sent", isSent);
            
            $.ajax({
                url: "PHP/noticias.php",
                type: "post",
                dataType: "json",
                contentType: false,
                processData: false,
                data: mediaForm,
                success: function (result) {
                    if (result.msg) {
                        alert("Noticia enviada exitosamente!");
                        emptyBlock('notiRedaccion');
                        getNoticiasRed();
                        emptyBlockEnRev('notiPendientes');
                        getNoticiasPend();
                        $(toggleWindow).modal('toggle');
                    } else
                        alert("Ocurrio un error durante la ejecucion.");
                }
            }); 
        }

        if (action == 2){
            var feAcont = feInput + " " + hoInput;
            var newEstado = 'redaccion';
            var isSent = 0;

            mediaForm.append("method", 'noticiaUpd');
            mediaForm.append("idNot", idNot);
            mediaForm.append("dateAcont", feAcont);
            mediaForm.append("status", newEstado);
            mediaForm.append("sent", isSent);

            $.ajax({
                url: "PHP/noticias.php",
                type: "post",
                dataType: "json",
                contentType: false,
                processData: false,
                data: mediaForm,
                success: function (result) {
                    if (result.msg) {
                        alert("Noticia editada exitosamente!");
                        emptyBlock('notiRedaccion');
                        getNoticiasRed();
                        $(toggleWindow).modal('toggle');
                    } else
                        alert("Ocurrio un error durante la ejecucion.");
                }
            }); 
        }

        if (action == 3){
            var feAcont = feInput + " " + hoInput;
            var newEstado = 'terminada';
            var isSent = 1;
            var oldFeedID = document.getElementById("idFeed").value;
            if (oldFeedID != "")
                cleanOldFeedback(oldFeedID);

            mediaForm.append("method", 'noticiaUpd');
            mediaForm.append("idNot", idNot);
            mediaForm.append("dateAcont", feAcont);
            mediaForm.append("status", newEstado);
            mediaForm.append("sent", isSent);

            $.ajax({
                url: "PHP/noticias.php",
                type: "post",
                dataType: "json",
                contentType: false,
                processData: false,
                data: mediaForm,
                success: function (result) {
                    if (result.msg) {
                        alert("Noticia enviada exitosamente!");
                        emptyBlock('notiRedaccion');
                        getNoticiasRed();
                        emptyBlockEnRev('notiPendientes');
                        getNoticiasPend();
                        emptyBlockDev('notiDevueltas');
                        getNoticiasDev();
                        document.getElementById("idFeed").value = '';
                        $(toggleWindow).modal('toggle');
                    } else
                        alert("Ocurrio un error durante la ejecucion.");
                }
            }); 
        }
    }
}

function cleanTextarea(idTxt){
    document.getElementById(idTxt).className=document.getElementById(idTxt).className.replace(" error","");
}

function modificarDatos(){
    changedPhoto = false;

    $("#btnModDat").toggle();
    $("#btnSaveDat").toggle();
    $("#btnCancelDat").toggle();
    $("#btnDelAcc").toggle();
    $("#btnCambiarFoto").toggle();
    $("#rpwdPerfil").toggle();
    $("#lblrpwdPerfil").toggle();

    document.getElementById("fnamePerfil").disabled=false;
    document.getElementById("snamePerfil").disabled=false;
    document.getElementById("lnamePerfil").disabled=false;
    document.getElementById("emailPerfil").disabled=false;
    document.getElementById("telPerfil").disabled=false;
    document.getElementById("pwdPerfil").disabled=false;

    document.getElementById("rpwdPerfil").value="";
}

function cancelarDatos(){
    var aa = document.getElementById("idDataUser").value
    getUserData(aa);

    $("#btnModDat").toggle();
    $("#btnSaveDat").toggle();
    $("#btnCancelDat").toggle();
    $("#btnDelAcc").toggle();
    $("#btnCambiarFoto").toggle();
    $("#rpwdPerfil").toggle();
    $("#lblrpwdPerfil").toggle();

    document.getElementById("fnamePerfil").disabled=true;
    document.getElementById("snamePerfil").disabled=true;
    document.getElementById("lnamePerfil").disabled=true;
    document.getElementById("emailPerfil").disabled=true;
    document.getElementById("telPerfil").disabled=true;
    document.getElementById("pwdPerfil").disabled=true;
}

function verificarDatos(){

    var error = 0;
    var campo;
    campo = document.getElementById("fnamePerfil");
    if(campo.value == ""){
        document.getElementById("fnamePerfil").className=document.getElementById("fnamePerfil").className+" error";
        error = 1;
    }

    campo = document.getElementById("snamePerfil");
    if(campo.value == ""){
        document.getElementById("snamePerfil").className=document.getElementById("snamePerfil").className+" error";
        error = 1;
    }

    campo = document.getElementById("lnamePerfil");
    if(campo.value == ""){
        document.getElementById("lnamePerfil").className=document.getElementById("lnamePerfil").className+" error";
        error = 1;
    }

    campo = document.getElementById("emailPerfil");
    if(campo.value == ""){
        document.getElementById("emailPerfil").className=document.getElementById("emailPerfil").className+" error";
        error = 1;
    }
    else if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(campo.value))){
        document.getElementById("emailPerfil").className=document.getElementById("emailPerfil").className+" error";
        alert("Dirección de correo inválida.")
        error = 1;
    }

    campo = document.getElementById("telPerfil");
    if(campo.value == ""){
        document.getElementById("telPerfil").className=document.getElementById("telPerfil").className+" error";
        error = 1;
    }
    else if (isNaN(campo.value)||campo.value.length<8||campo.value.length>10){
        document.getElementById("telPerfil").className=document.getElementById("telPerfil").className+" error";
        alert("Número telefónico inválido.")
        error = 1;
    }

    campo = document.getElementById("pwdPerfil");
    if(campo.value == ""){
        document.getElementById("pwdPerfil").className=document.getElementById("pwdPerfil").className+" error";
        error = 1;
    }

    campoRep = document.getElementById("rpwdPerfil");
    if(campoRep.value == ""){
        document.getElementById("rpwdPerfil").className=document.getElementById("rpwdPerfil").className+" error";
        error = 1;
    }
    else if (campo.value != campoRep.value){
        document.getElementById("rpwdPerfil").className=document.getElementById("rpwdPerfil").className+" error";
        alert("Las contraseñas no son iguales.")
        error = 1;
    }

    if (error == 0){        
        var userID = document.getElementById("idDataUser").value;
        var firstName = document.getElementById("fnamePerfil").value;
        var secondName = document.getElementById("snamePerfil").value;
        var lastName = document.getElementById("lnamePerfil").value;
        var email = document.getElementById("emailPerfil").value;
        var phone = document.getElementById("telPerfil").value;
        var pwd = document.getElementById("pwdPerfil").value;

        $.ajax({
            url: "PHP/users.php",
            type: "post",
            dataType: "json",
            data: {method: 'editUsersSelf', id: userID, name: firstName, lastName: secondName,
            lastName2: lastName, email: email, numTel: phone, pass: pwd},
            success: function (result) {
                if (result.msg) {
                    if(changedPhoto){
                        var avatar = document.getElementById("cambiarFoto").files[0];
                        var theForm = new FormData();
                        theForm.append("method", 'updateImage');
                        theForm.append("id", userID);
                        theForm.append("pfp", avatar);
                              
                        $.ajax({
                            url: "PHP/media.php",
                            type: "post",
                            dataType: "json",
                            data: theForm,
                            contentType: false,
                            processData: false,
                            success: function (result) {
                                if (result.msg) {
                                    alert("Cambios hechos exitosamente!");
                                } else
                                    alert("Ocurrio un error al guardar su imagen, los demas datos se actualizaron correctamente.");
                            }
                        });
                    }
                    else
                        alert("Cambios hechos exitosamente!");

                    $("#btnModDat").toggle();
                    $("#btnSaveDat").toggle();
                    $("#btnCancelDat").toggle();
                    $("#btnDelAcc").toggle();
                    $("#btnCambiarFoto").toggle();
                    $("#rpwdPerfil").toggle();
                    $("#lblrpwdPerfil").toggle();
                    document.getElementById("fnamePerfil").disabled=true;
                    document.getElementById("snamePerfil").disabled=true;
                    document.getElementById("lnamePerfil").disabled=true;
                    document.getElementById("emailPerfil").disabled=true;
                    document.getElementById("telPerfil").disabled=true;
                    document.getElementById("pwdPerfil").disabled=true;   
                } else
                    alert("Ocurrio un error actualizando los datos.");
            }
        });      
    }
}

function deleteSelf(){
    $('#confirmDelete').modal('toggle');
}
function confirmDeleteSelf(){
    var userID = document.getElementById("idDataUser").value;

    $.ajax({
        url: "PHP/users.php",
        type: "post",
        dataType: "json",
        data: {method: 'deleteUser', id: userID},
        success: function (result) {
            if (result.msg) {
                alert("Su perfil ha sido eliminado exitosamente!");
                $('#confirmDelete').modal('toggle');
                window.location.href='main.php';
            }
        }
    });
}

function nuevaNoticia(){
    document.getElementById("idFeed").value = "";
    
    document.getElementById("notEdiNoticia").hidden=true;
    document.getElementById("sepNotes").hidden=true;

    document.getElementById("idNoti").value = "";
    document.getElementById("notEdiNoticia").value="";
    document.getElementById("headerNot").value="";
    document.getElementById("infoNotFe").value="";
    document.getElementById("infoNotHo").value="";
    document.getElementById("infoNotlug").value="";
    document.getElementById("descNoticia").value="";
    document.getElementById("bodyNoticia").value="";
    document.getElementById("infoNotpalClav").value="";

    document.getElementById("btnSendinNot").hidden=false;
    document.getElementById("btnSendSavedNot").hidden=true;
    document.getElementById("btnSaveinNot").hidden=false;
    document.getElementById("btnSaveChangNot").hidden=true;
    document.getElementById("btnDeleteNot").hidden=true;
    document.getElementById("btnCancelinNot").hidden=false;

    document.getElementById("selectSeccion").selectedIndex=0;
    
    document.getElementById('carousel-images').innerHTML = "";
    document.getElementById('imgIndi').innerHTML = "";
    document.getElementById('carousel-videos').innerHTML = "";
    indexSlidesImg = 0;
}

function verRetro(idFeed ,feedback, idNot, title, feAcont, luAcont, descrSh, descrLg, idSecc){
    document.getElementById('carousel-images').innerHTML = "";
    document.getElementById('imgIndi').innerHTML = "";
    document.getElementById('carousel-videos').innerHTML = "";
    indexSlidesImg = 0;

    $('#editorNoticia').modal('toggle');

    document.getElementById("notEdiNoticia").value = feedback;
    document.getElementById("idFeed").value = idFeed;
    

    var index = 0;
    Array.from(document.querySelector("#selectSeccion").options).forEach(function(option_element) {        
        var textSelect = option_element.text; 
        var idSection = textSelect.split(" ");
        idSection = idSection[0];
        if (idSection == idSecc){
            document.getElementById("selectSeccion").selectedIndex = index;
        }
        index++;
    });

    var dateAcont = feAcont.slice(0,10);
    var hoAcont = feAcont.slice(11);
    
    document.getElementById("idNoti").value = idNot;
    document.getElementById("headerNot").value = title;
    document.getElementById("infoNotFe").value=dateAcont;
    document.getElementById("infoNotHo").value=hoAcont
    document.getElementById("infoNotlug").value=luAcont;
    document.getElementById("descNoticia").value=descrSh;
    document.getElementById("bodyNoticia").value=descrLg;

    getImageMedia(idNot, 'carousel-images', 'imgIndi');
    getVideoMedia(idNot, 'carousel-videos');
 
    $.ajax({
        url: "PHP/feedback.php",
        type: "post",
        dataType: "json",
        data: {method: 'getKeyNotID', idNot: idNot},
        success: function (allKeywords) {
            var contentClv = "";
            $.each(allKeywords, function(idx, keywords){
                contentClv += allKeywords[idx].content + ",";
            });
            contentClv = contentClv.substring(0, contentClv.length - 1);
            document.getElementById("infoNotpalClav").value=contentClv;
        }
    });

    document.getElementById("notEdiNoticia").hidden=false;
    document.getElementById("sepNotes").hidden=false;
    document.getElementById("btnSendinNot").hidden=true;
    document.getElementById("btnSendSavedNot").hidden=false;
    document.getElementById("btnSaveinNot").hidden=true;
    document.getElementById("btnSaveChangNot").hidden=true;
    document.getElementById("btnDeleteNot").hidden=false;
    document.getElementById("btnCancelinNot").hidden=false;
}

function editarNoticia(idNot, title, feAcont, luAcont, descrSh, descrLg, idSecc){  

    document.getElementById('carousel-images').innerHTML = "";
    document.getElementById('imgIndi').innerHTML = "";
    document.getElementById('carousel-videos').innerHTML = "";
    indexSlidesImg = 0;

    document.getElementById("idFeed").value = "";

    $('#editorNoticia').modal('toggle');

    document.getElementById("idNoti").value = idNot;

    document.getElementById("notEdiNoticia").value="";
    document.getElementById("headerNot").value = title;

    var dateAcont = feAcont.slice(0,10);
    var hoAcont = feAcont.slice(11);

    var index = 0;
    Array.from(document.querySelector("#selectSeccion").options).forEach(function(option_element) {        
        var textSelect = option_element.text; 
        var idSection = textSelect.split(" ");
        idSection = idSection[0];
        if (idSection == idSecc){
            document.getElementById("selectSeccion").selectedIndex = index;
        }
        index++;
    });
 
    $.ajax({
        url: "PHP/feedback.php",
        type: "post",
        dataType: "json",
        data: {method: 'getKeyNotID', idNot: idNot},
        success: function (allKeywords) {
            var contentClv = "";
            $.each(allKeywords, function(idx, keywords){
                contentClv += allKeywords[idx].content + ",";
            });
            contentClv = contentClv.substring(0, contentClv.length - 1);
            document.getElementById("infoNotpalClav").value=contentClv;
        }
    });

    getImageMedia(idNot, 'carousel-images', 'imgIndi');
    getVideoMedia(idNot, 'carousel-videos');

    document.getElementById("infoNotFe").value=dateAcont;
    document.getElementById("infoNotHo").value=hoAcont
    document.getElementById("infoNotlug").value=luAcont;
    document.getElementById("descNoticia").value=descrSh;
    document.getElementById("bodyNoticia").value=descrLg;

    document.getElementById("btnSendinNot").hidden=true;
    document.getElementById("btnSendSavedNot").hidden=false;
    document.getElementById("btnSaveinNot").hidden=true;
    document.getElementById("btnSaveChangNot").hidden=false;
    document.getElementById("btnDeleteNot").hidden=false;
    document.getElementById("btnCancelinNot").hidden=false;

    document.getElementById("notEdiNoticia").hidden=true;
    document.getElementById("sepNotes").hidden=true;
}

function deleteNoticia(idNoticia){                      
    $('#confirmDeleteNoticia').modal('toggle');
    document.getElementById("idNoticiaDelete").value=idNoticia;
}

function deleteNoticiaIn(){                     
    document.getElementById("idNoticiaDelete").value = document.getElementById("idNoti").value;    
    switchModals('#editorNoticia', '#confirmDeleteNoticia');
}

function confirmDeleteNoticia(){
    var noticiaDelete = document.getElementById("idNoticiaDelete").value;

    $.ajax({
        url: "PHP/noticias.php",
        type: "post",
        dataType: "json",
        data: {method: 'deleteNoti', id: noticiaDelete},
        success: function (result) {
            if (result.msg) {
                alert("Noticia eliminada exitosamente!");
                document.getElementById("idNoticiaDelete").value = "";
                emptyBlock('notiRedaccion');
                getNoticiasRed();
                emptyBlockDev('notiDevueltas');
                getNoticiasDev();
                $('#confirmDeleteNoticia').modal('toggle');
            }
        }
    });  
}

function editUsuario(idUser, userType, name, apePat, apeMat, tel, email, pass, avatar, imagetype){
    document.getElementById("registerUserAdmin").hidden=true;
    document.getElementById("saveUserAdmin").hidden=false;
    document.getElementById("cancelUserAdmin").hidden=false;

    changedPhoto = false;

    if (userType == "usuario")
        document.getElementById("selectUsuario").selectedIndex = "0";
    else if (userType == "reportero")
        document.getElementById("selectUsuario").selectedIndex = "1";
    else if (userType == "editor")
        document.getElementById("selectUsuario").selectedIndex = "2";

    document.getElementById("idUser").value=idUser;
    document.getElementById("fnameAdmin").value=name;
    document.getElementById("snameAdmin").value=apePat;
    document.getElementById("lnameAdmin").value=apeMat;
    document.getElementById("telAdmin").value=tel;
    document.getElementById("emailRAdmin").value=email;
    document.getElementById("pwdAdmin").value=pass;
    
    $("#dispImg").attr('src','data:image/' + imagetype + ';base64,' + avatar);
}

function createUsuario(){
    document.getElementById("registerUserAdmin").hidden=false;
    document.getElementById("saveUserAdmin").hidden=true;
    document.getElementById("cancelUserAdmin").hidden=true; 
    document.getElementById("selectUsuario").selectedIndex = "0";   
    $("#dispImg").attr('src','sources/default-image.png');
}

function deleteUsuario(idUser){                      
    $('#confirmDeleteAdmin').modal('toggle');
    document.getElementById("idUserDelete").value=idUser;
}

function confirmDeleteUsuario(){
    var userDelete = document.getElementById("idUserDelete").value;

    $.ajax({
        url: "PHP/users.php",
        type: "post",
        dataType: "json",
        data: {method: 'deleteUser', id: userDelete},
        success: function (result) {
            if (result.msg) {
                alert("Usuario eliminado exitosamente!");
                document.getElementById("idUserDelete").value = "";
                emptyList('usersList');
                getAllUsers();
                $('#confirmDeleteAdmin').modal('toggle');
            }
        }
    });  
}

function editReportero(idUser, name, apePat, apeMat, tel, email, pass, avatar, imagetype){
    changedPhoto = false;

    document.getElementById("registerUserEditor").hidden=true;
    document.getElementById("saveUserEditor").hidden=false;
    document.getElementById("cancelUserEditor").hidden=false;

    document.getElementById("idReportero").value=idUser;
    document.getElementById("fnameEditor").value=name;
    document.getElementById("snameEditor").value=apePat;
    document.getElementById("lnameEditor").value=apeMat;
    document.getElementById("telEditor").value=tel;
    document.getElementById("emailREditor").value=email;
    document.getElementById("pwdEditor").value=pass;

    $("#dispImg").attr('src','data:image/' + imagetype + ';base64,' + avatar);
}

function createReportero(){
    document.getElementById("registerUserEditor").hidden=false;
    document.getElementById("saveUserEditor").hidden=true;
    document.getElementById("cancelUserEditor").hidden=true;   
    $("#dispImg").attr('src','sources/default-image.png');
}

function deleteReportero(idReportero){                      
    $('#confirmDeleteAdmin').modal('toggle');
    document.getElementById("idReporteroDelete").value=idReportero;
}

function confirmDeleteReportero(){
    var userDelete = document.getElementById("idReporteroDelete").value;
``
    $.ajax({
        url: "PHP/users.php",
        type: "post",
        dataType: "json",
        data: {method: 'deleteUser', id: userDelete},
        success: function (result) {
            if (result.msg) {
                alert("Usuario eliminado exitosamente!");
                document.getElementById("idUserDelete").value = "";
                emptyList('reportList');
                getAllReporteros();
                $('#confirmDeleteAdmin').modal('toggle');
            }
        }
    });  
}

function getAllUsers(){
    var userLogo;
    var upperFirst;
    $.ajax({
        url: "PHP/users.php",
        type: "post",
        dataType: "json",
        data: {method: 'getAllUsers'},
        success: function (usuarios) {
            $.each(usuarios, function(idx, usser){
                if (usuarios[idx].tipoUsuario == "usuario"){
                    userLogo = "<i class='fa fa-user'></i>";        
                } 
                else if (usuarios[idx].tipoUsuario == "reportero"){
                    userLogo = "<i class='fa fa-file-text-o'></i>";       
                }
                else if (usuarios[idx].tipoUsuario == "editor"){
                    userLogo = "<i class='fa fa-clipboard'></i>";       
                }

                upperFirst = usuarios[idx].tipoUsuario;
                upperFirst = upperFirst.charAt(0).toUpperCase() + upperFirst.slice(1)

                $( ".allUsers" ).append("<li class='list-group-item'>" + 
                "<div class='row'><span class='col-lg-4 displayName'><i class='fa fa-user-circle'></i><span>"
                + usuarios[idx].name + " " + usuarios[idx].apellidoP + " " + usuarios[idx].apellidoM +
                "</span> </span><span class='col-lg-4 displayType'>" + userLogo +
                upperFirst + "</span><span class='col-lg-4 displayActions'><button class=" +
                "'btn btn-outline-danger col-lg-5 actionsAdmin' data-toggle='modal' data-target='#modRegister'" +
                ' onclick="editUsuario(' + usuarios[idx].id + ",'" + usuarios[idx].tipoUsuario + "','" + 
                usuarios[idx].name + "','" + usuarios[idx].apellidoP + "','" +  usuarios[idx].apellidoM + "','" +
                usuarios[idx].tel + "','" + usuarios[idx].email + "','" +  usuarios[idx].password + "','" +
                usuarios[idx].avatar + "','" +  usuarios[idx].imgType +
                "'" + ')">' + "<i class='fa fa-pencil'></i>Editar</button><button" +
                " class='btn btn-outline-danger col-lg-5 actionsAdmin' onclick='deleteUsuario(" + usuarios[idx].id + ")'" + 
                "><i class='fa fa-times'></i>Eliminar</button></span></div> </li>" );
              });
        }

    }); 
}

function getAllReporteros(){
    var userLogo;
    var upperFirst;
    $.ajax({
        url: "PHP/users.php",
        type: "post",
        dataType: "json",
        data: {method: 'getAllReporteros'},
        success: function (usuarios) {
            $.each(usuarios, function(idx, usser){

                if (usuarios[idx].tipoUsuario == "usuario"){
                    userLogo = "<i class='fa fa-user'></i>";        
                } 
                else if (usuarios[idx].tipoUsuario == "reportero"){
                    userLogo = "<i class='fa fa-file-text-o'></i>";       
                }
                else if (usuarios[idx].tipoUsuario == "editor"){
                    userLogo = "<i class='fa fa-clipboard'></i>";       
                }

                upperFirst = usuarios[idx].tipoUsuario;
                upperFirst = upperFirst.charAt(0).toUpperCase() + upperFirst.slice(1)

                $( ".allReporteros" ).append("<li class='list-group-item'>" + 
                "<div class='row'><span class='col-lg-4 displayName'><i class='fa fa-user-circle'></i><span>"
                + usuarios[idx].name + " " + usuarios[idx].apellidoP + " " + usuarios[idx].apellidoM +
                "</span> </span><span class='col-lg-4 displayType'>" + userLogo +
                upperFirst + "</span><span class='col-lg-4 displayActions'><button class=" +
                "'btn btn-outline-danger col-lg-5 actionsAdmin' data-toggle='modal' data-target='#modRegister'" +
                ' onclick="editReportero(' + usuarios[idx].id + ",'" + 
                usuarios[idx].name + "','" + usuarios[idx].apellidoP + "','" +  usuarios[idx].apellidoM + "','" +
                usuarios[idx].tel + "','" + usuarios[idx].email + "','" +  usuarios[idx].password + "','" +
                usuarios[idx].avatar + "','" +  usuarios[idx].imgType + "'" +
                ')">' + "<i class='fa fa-pencil'></i>Editar</button><button" +
                " class='btn btn-outline-danger col-lg-5 actionsAdmin' onclick='deleteReportero(" + usuarios[idx].id + ")'" + 
                "><i class='fa fa-times'></i>Eliminar</button></span></div> </li>" );
              });
        }

    }); 
}

function emptyList(idList){
    document.getElementById(idList).innerHTML = "<li class='list-group-item active'><div class='row'>" +
        '<span class="col-lg-4"> Nombre del usuario </span><span class="col-lg-4"> Tipo de Usuario </span>' +
        '<span class="col-lg-4"> Acciones </span> </div> </li>';
}


function emptyListSeccion(){
    document.getElementById("sortableList").innerHTML = "";
    document.getElementById("seccionesNavB").innerHTML = "";
    getSecciones();
    getSeccionesToNavbar();
}

function emptyBlock(idBlock){
    document.getElementById(idBlock).innerHTML = "";
}

function emptyBlockEnRev(idBlock){
    document.getElementById(idBlock).innerHTML = '<div class="col-lg-12" id="EnvRev"><h2>Notas enviadas a revision</h2></div>'
}

function emptyBlockDev(idBlock){
    document.getElementById(idBlock).innerHTML = '<div class="col-lg-12" id="DevRev"><h2>Notas devueltas de revision</h2></div>'
}


/*////////////////////////////////////////*/

function addSection(){
    var name=document.getElementById("sect");

    var e = document.getElementById("colorSeccionR");
    var colorS;
    if(e.value==1)
        colorS="rojo";
    if(e.value==2)
        colorS="verde";
    if(e.value==3)
        colorS="amari";
    if(e.value==4)
        colorS="azul";
    if(e.value==5)
        colorS="rosa";
 

    var nuevoUltimo=document.getElementById("sortableList").getElementsByTagName("li").length;
    nuevoUltimo+=1;
    
    if(name.value.length>0){
    $.ajax({
        url: "PHP/sections.php",
        type: "post",
        dataType: "json",
        data: {method: 'addSection',nameS: name.value,color:colorS, order:nuevoUltimo},
        success: function (result) {
            if(result.msg){
                alert("¡Sección añadida!");
                emptyListSeccion();    
                $('#modAddS').modal('toggle');

            }
            else
                alert("No se puede repetir sección.");
        }

    });  
}
else
alert("Campo vacío.")  
}


function getSecciones(){
    $.ajax({
        url: "PHP/sections.php",
        type: "post",
        dataType: "json",
        data: {method: 'getSecciones'},
        success: function (secciones) {
            $.each(secciones, function(idx, sect){
   
                $( ".allSections" ).append(
                    "<li class='column' draggable='true'>" +
                    "<header>" +
                    "<label class='ordenSec' style='display: none'>"+secciones[idx].id+"</label>"+
                    "<label id='nombreSec'>"+secciones[idx].name+"</label>"+
                        "<button class='btn btn-outline-danger btnEdit' data-toggle='modal' data-target='#modChangeN' >Editar</button>"+
                        "<button class='btn btn-outline-danger btnDel' >Eliminar</button>"+
                        "</header>"+
                    "</li>");
              });
             
        }

    }); 
}

function getSeccionesToNavbar(){
    $.ajax({
        url: "PHP/sections.php",
        type: "post",
        dataType: "json",
        data: {method: 'getSecciones'},
        success: function (secciones) {
            $.each(secciones, function(idx, sect){

                $( ".seccionesNav" ).append(
                    //"<li id='"+secciones[idx].id+"' class='nav-item active'><a class='nav-link seccionNav' style='color:"+colorSeccion +"!important;' href='main.html'>"+secciones[idx].name+"</a></li>");
                    "<li id='"+secciones[idx].id+"' class='nav-item active "+secciones[idx].color+"'><a class='nav-link seccionNav'" + 
                    "onclick='sendtoSectionPage(" + secciones[idx].id + ")'>"+ secciones[idx].name+ "</a></li>");
              });
        }

    }); 
}

function setOrden(){
    var error = false;
    $("ol.allSections li").each(function() {
       
        //alert("Orden: "+index+"idSeccion: "+id );
        var index = ($( "li" ).index( this ))-8;
        var id = $(this).find(".ordenSec").text();
        $.ajax({
            url: "PHP/sections.php",
            type: "post",
            dataType: "json",
            data: {method: 'setOrden',newOrden: index,idSeccion:id},
            success: function (result) {
                if(result.msg){
                    error = false; 
                }
                else
                    error = true;
            }
            
          
        });  
    });

    if (!error){
        alert("Cambios guardados");
        emptyListSeccion();
    }
    else
        alert("Error en la actualización.");
    
}
var secEditar;

function getSeccionEDT(idSectionEditar){
    secEditar=idSectionEditar;
    var seccionName=document.getElementById("sectM");
    $.ajax({
        url: "PHP/sections.php",
        type: "post",
        dataType: "json",
        data: {method: 'getSectionName', idSeccionE: idSectionEditar},
        success: function (secciones) {
            if (secciones != null){
                    seccionName.value=secciones[0].nombreSection;
                   
            }    
        }
    }); 
}

function updateSeccion(){
    var nameS=document.getElementById("sectM");
    var es = document.getElementById("colorSeccionM");
    var colorSe;

    if(es.value==1)
        colorSe="rojo";
    if(es.value==2)
        colorSe="verde";
    if(es.value==3)
        colorSe="amari";
    if(es.value==4)
        colorSe="azul";
    if(es.value==5)
        colorSe="rosa";

    if(nameS.value.length>0){
            $.ajax({
                url: "PHP/sections.php",
                type: "post",
                dataType: "json",
                data: {method: 'updateSeccion',idSeccionE:secEditar,nameS: nameS.value,color:colorSe},
                success: function (result) {
                    if(result.msg){
                        alert("¡Sección actualizada!");
                        //emptyListSeccion();    
                        $('#modChangeN').modal('toggle');
                        emptyListSeccion();    
                    }
                    else
                        alert("No se puede repetir sección.");
                }
        
            });  
        }
        else
        alert("Campo vacío.")  

}

function confirmarEliminarSeccion(){
    $.ajax({
        url: "PHP/sections.php",
        type: "post",
        dataType: "json",
        data: {method: 'getSeccionesEliminar'},
        success: function (secciones) {
            $.each(secciones, function(idx, sect){
                var id=secciones[idx].id;
                var name=secciones[idx].name;
                var eliminar=confirm("Se quiere eliminar la sección: "+name+". ¿Proceder?");

                if(eliminar)
                    deleteSeccion(id);
                    
                
                else
                    regresarSeccion(id);
              });
        }

    }); 
}
function regresarSeccion(id){
    $.ajax({
        url: "PHP/sections.php",
       type: "post",
        dataType: "json",
        data: {method: 'regresarSeccion',idSeccionE:id},
       success: function (result) {
            if(result.msg){
                alert("¡Sección restaurada!");
            }
            else
                alert("Error en el proceso.");
         }
    });  
}
function deleteSeccion(idEliminar){
    var confirmD=confirm("¿Eliminar sección?");
    if(confirmD){
        $.ajax({
            url: "PHP/sections.php",
           type: "post",
            dataType: "json",
            data: {method: 'deleteSeccion',idSeccionE:idEliminar},
           success: function (result) {
                if(result.msg){
                    alert("¡Sección eliminada!");
                    $('#modChangeN').modal('toggle');
                }
                else
                    alert("Error en el proceso.");
             }

        });  
    }
}

function getSeccionPendienteElim(id){
    if(id!=0){
            $.ajax({
                url: "PHP/sections.php",
                type: "post",
                dataType: "json",
                data: {method: 'getSectionName', idSeccionE: id},
                success: function (secciones) {
                    if (secciones != null){
                        alert("Petición enviada. Se quiere eliminar: "+secciones[0].nombreSection);
                    }    
                }
            }); 
    }
}

function pedirEliminarSeccion(idEliminar){
   
    getSeccionPendienteElim(idEliminar); 
}


function getSeccionesNoti(){
    var index = 0;
    $.ajax({
        url: "PHP/sections.php",
        type: "post",
        dataType: "json",
        data: {method: 'getSeccionesByID'},
        success: function (secciones) {
            if (secciones != null){
                $.each(secciones, function(idx, sect){
                    $( "#selectSeccion" ).append(
                        "<option value=" + index + ">" + secciones[idx].id + " - " + secciones[idx].name +"</option>"
                        );
                        index++;
                });
            }
             
        }

    }); 
}

function nuevaSeccion(){
    $('#modAddS').modal('toggle');
    document.getElementById("sect").value = "";
    document.getElementById("colorSeccionR").selectedIndex = "0";

}

function getNoticiasRed(){
    $.ajax({
        url: "PHP/noticias.php",
        type: "post",
        dataType: "json",
        data: {method: 'getNoticiasRed'},
        success: function (noticias) {
            if (noticias != null){            
                $.each(noticias, function(idx, notiRed){
                    $( "#notiRedaccion" ).append(
                        '<div class="col-md-12"><div class="card enRed"><div class="row no-gutters"><div class="col-md-4"><img class="card-img" ' + 
                        'src=data:image/' + noticias[idx].ext + ';base64,' + noticias[idx].preview + '></div>' +
                        '<div class="col-md-8"><div class="card-body"><h2 class="col-md-12 card-title titleEnRed">' + noticias[idx].title + '</h2>' +
                        '<p class="card-text bodyEnRed">' + noticias[idx].descrSh + '</p><div class="row buttons"><button class="btn btn-outline-danger barBut" type="submit" id="btnEdit"' +
                        'onclick="editarNoticia('+ noticias[idx].id + ",'" + noticias[idx].title + "','" + noticias[idx].feAcont + "','" +
                        noticias[idx].lugAcont + "','" + noticias[idx].descrSh + "','" + noticias[idx].descrLg + "'," + noticias[idx].idSecc
                        + ')">' + '<i class="fa fa-pencil"></i>Editar</button><button class="btn btn-outline-danger barBut" type="submit" id="btnDelete"' +
                        'onclick="deleteNoticia('+ noticias[idx].id  + ')">' + '<i class="fa fa-trash"></i>Eliminar</button></div></div></div></div></div></div>'
                )}); 
            }    
        }

    }); 
}

function getNoticiasPend(){
    $.ajax({
        url: "PHP/noticias.php",
        type: "post",
        dataType: "json",
        data: {method: 'getNoticiasPend'},
        success: function (noticias) {
            if (noticias != null){
                $.each(noticias, function(idx, notiRed){
                    $( "#notiPendientes" ).append(
                        '<div class="col-lg-12"><div class="card EnvRev"><img class="card-img" ' + 
                        'src=data:image/' + noticias[idx].ext + ';base64,' + noticias[idx].preview + '><div class="card-body">' +
                        '<h5 class="col-md-10 card-title titleEnvRev">' + noticias[idx].title + '</h5><h5 class="card-title col-md-6" id="PublicEnv">' +
                        'Enviado el: '+ noticias[idx].feEnvio.slice(8,10) + ' de ' + whichMonth(noticias[idx].feEnvio.slice(5,7)) + ' del ' +
                        noticias[idx].feEnvio.slice(0,4) + '</h5></div></div></div>'         
                )});
            }     
        }

    }); 
}

function getNoticiasEnv(){
    $.ajax({
        url: "PHP/noticias.php",
        type: "post",
        dataType: "json",
        data: {method: 'getNoticiasEnv'},
        success: function (noticias) {           
            if (noticias != null){
            $.each(noticias, function(idx, notiRed){
                var fullName = noticias[idx].name + ' ' + noticias[idx].apePat + ' ' + noticias[idx].apeMat;
                $( "#notiEnviadas" ).append(
                    '<div class="col-md-3"><div class="card revisionNoticias"><img class="card-img-top" ' + 
                    'src=data:image/' + noticias[idx].ext + ';base64,' + noticias[idx].preview + '><div class="card-body">' +
                    '<h4 class="card-title" class="titleNoticia">' + noticias[idx].title + '</h4><p class="card-text" class="bodyNoticia">' + noticias[idx].descrSh +
                    '</p><h4 class="card-title" id="Reportero">Reportero: ' + fullName  + '</h4><h4 class="card-title" id="Publicacion">Enviado el: ' +
                    noticias[idx].feEnvio.slice(8,10) + ' de ' + whichMonth(noticias[idx].feEnvio.slice(5,7)) + ' del ' + noticias[idx].feEnvio.slice(0,4) + '</h4>' +
                    '<div class="row"><div class="col-lg-12"><button class="btn btn-outline-danger editorVisual"' +
                    ' onclick="seeNoticia(' + noticias[idx].id + ",'" + noticias[idx].sectionColor + "','" + noticias[idx].title + "','" + fullName + "','" +
                    noticias[idx].feAcont + "','" + noticias[idx].lugAcont + "','" + noticias[idx].descrSh + "','" + noticias[idx].descrLg + "','" + 
                    noticias[idx].feCreacion + "'"+ ')">' + '<i class="fa fa-newspaper-o"></i>Ver noticia</button></div><div class="col-lg-12">' +
                    '<button class="btn btn-outline-danger editorVisual"' + ' onclick="sendComms(' + noticias[idx].id + ",'" +
                    noticias[idx].sectionColor + "','" + noticias[idx].title + "','" + fullName + "','" +
                    noticias[idx].feAcont + "','" + noticias[idx].lugAcont + "','" + noticias[idx].descrSh + "','" + noticias[idx].descrLg + "','" + 
                    noticias[idx].feCreacion + "'"+ ')">' + '<i class="fa fa-comment-o"></i>Dar comentarios</button></div></div></div></div></div>'        
            )});
        }             
        }
    }); 
}

function getNoticiasDev(){
    $.ajax({
        url: "PHP/noticias.php",
        type: "post",
        dataType: "json",
        data: {method: 'getNoticiasDev'},
        success: function (noticias) {
            if (noticias != null){
                $.each(noticias, function(idx, notiRed){
                    $( "#notiDevueltas" ).append(
                        '<div class="col-lg-12"><div class="card pendRev"><div class="row no-gutters"><div class="col-md-4"><img class="card-img" ' + 
                        'src=data:image/' + noticias[idx].ext + ';base64,' + noticias[idx].preview + '></div><div class="col-md-8"><div class="card-body"><h4 class="col-md-10 card-title titleNotRev">' +
                        noticias[idx].title + '</h4><p class="card-text bodyNotRev">' + noticias[idx].descrSh + '</p><div class="row">' +
                        '<h4 class="card-title col-md-6" id="PublicRev">Devuelto el: ' + noticias[idx].feDevo.slice(8,10) + ' de ' +
                        whichMonth(noticias[idx].feDevo.slice(5,7)) + ' del ' + noticias[idx].feDevo.slice(0,4) + '</h4>' +
                        '<button class="btn btn-outline-danger col-md-4 verCom"' +
                        'onclick="verRetro('+ noticias[idx].idfeed + ",'" + noticias[idx].feedback + "'," + noticias[idx].id + ",'" + noticias[idx].title +
                        "','" + noticias[idx].feAcont + "','" + noticias[idx].lugAcont + "','" + noticias[idx].descrSh + "','" + noticias[idx].descrLg +
                        "'," + noticias[idx].idSecc + ')">' + '<i class="fa fa-eye"></i>Ver retroalimentacion</button></div></div></div></div></div></div>'   
                )});
            }           
        }
    }); 
}

function getNoticiasPub(){
    $.ajax({
        url: "PHP/noticias.php",
        type: "post",
        dataType: "json",
        data: {method: 'getNoticiasPub'},
        success: function (noticias) {
            if (noticias != null){
                $.each(noticias, function(idx, notiRed){
                    $( "#NotiPubli" ).append(
                        '<div class="col-md-3"><div class="card notPub"><img class="card-img-top" ' + 
                        'src=data:image/' + noticias[idx].ext + ';base64,' + noticias[idx].preview + '><div class="card-body">' +
                        '<h4 class="card-title titleNotPub">' + noticias[idx].title + '</h4><p class="card-text bodyNotPub">' + noticias[idx].descrSh +
                        '</p><h4 class="card-title" id="pubNotPub">Publicado el: ' + noticias[idx].fePub.slice(8,10) + ' de ' +
                        whichMonth(noticias[idx].fePub.slice(5,7)) + ' del ' + noticias[idx].fePub.slice(0,4) + '</h4><div class="row"><div class="col-lg-12">' +
                        '<button class="btn btn-outline-danger barBut" id="btnSeeNot" onclick="sendtoFullPage(' + noticias[idx].id + ')">' + 
                        '<i class="fa fa-newspaper-o"></i>Ver noticia</button></form></div></div></div></div></div>'  
                )});       
            }           
        }
    }); 
}

function displayPubNots(appendTo){
    $.ajax({
        url: "PHP/noticias.php",
        type: "post",
        dataType: "json",
        data: {method: 'displayPubNotis'},
        success: function (noticias) {
            if (noticias != null){
                $.each(noticias, function(idx, notiRed){
                    $(appendTo).append(
                        '<div class="col-md-4"><div class="card publishedNews"><img class="card-img-top"' + 
                        'src=data:image/' + noticias[idx].ext + ';base64,' + noticias[idx].preview + '><div class="card-body">' +
                        '<h4 class="card-title title">' + noticias[idx].title + '</h4><p class="card-text">' + noticias[idx].descrSh +
                        '</p><h4 class="card-title pubDate">Publicado el: ' + noticias[idx].fePub.slice(8,10) + ' de ' +
                        whichMonth(noticias[idx].fePub.slice(5,7)) + ' del ' + noticias[idx].fePub.slice(0,4) + '</h4>' +
                        '<button class="btn btn-outline-danger barBut" onclick="sendtoFullPage(' + noticias[idx].id + ')"><i class="fa fa-newspaper-o"></i>  Ver noticia</button></div></div></div>'   
                )});       
            }           
        }
    }); 
}

function displayMostViewed(appendTo){
    $.ajax({
        url: "PHP/noticias.php",
        type: "post",
        dataType: "json",
        data: {method: 'displayMostViewed'},
        success: function (noticias) {
            if (noticias != null){
                $.each(noticias, function(idx, notiRed){
                    var splitDescr = noticias[idx].descrSh.split(" ");
                    var shorterDesc = "";
                    splitDescr.forEach(function(actual, index){
                        if (index < 9)
                            shorterDesc += actual + " ";
                        else if (index == 9){
                            shorterDesc += actual + "...";
                        }
                    });

                    $(appendTo).append(
                        '<div class="col-md-12"><div class="card mostViewed"><img class="card-img-top"' + 
                        'src=data:image/' + noticias[idx].ext + ';base64,' + noticias[idx].preview + '><div class="card-body">' +
                        '<h4 class="card-title title">' + noticias[idx].title + '</h4><p class="card-text">' + shorterDesc +
                        '</p><h4 class="card-title pubDate">Publicado el: ' + noticias[idx].fePub.slice(8,10) + ' de ' +
                        whichMonth(noticias[idx].fePub.slice(5,7)) + ' del ' + noticias[idx].fePub.slice(0,4) + '</h4>' +
                        '<button class="btn btn-outline-danger barBut" onclick="sendtoFullPage(' + noticias[idx].id + ')"><i class="fa fa-newspaper-o"></i>  Ver noticia</button></div></div></div>'   
                )});  
            }           
        }
    }); 
}

function displaySections(appendTo){
    $.ajax({
        url: "PHP/sections.php",
        type: "post",
        dataType: "json",
        data: {method: 'getSecciones'},
        success: function (secciones) {
            if (secciones != null){
                $.each(secciones, function(idx, sect){
                    
                    var selectedColor;
                    switch(secciones[idx].color){
                        case 'rojo':
                            selectedColor = "#aa281d";
                        break;
                        case 'verde':
                            selectedColor = "#147c17";
                        break;
                        case 'amari':
                            selectedColor = "#FADA5E";          
                        break;
                        case 'azul':
                            selectedColor = "#0b81d6";
                        break;
                        case 'rosa':
                            selectedColor = "#eb75c9";
                        break;
                    }

                    $(appendTo).append(
                        '<div class="row"><div class="col-md-12"><div class="row" id="sectionHeader"><div class="col-md-1 sectionColor" ' +
                        'style="background-color:' +  selectedColor + ';"></div><div class="col-md-11 tituloSeccion">' + secciones[idx].name +
                        '<button class="btn btn-outline-danger butMoreInfo" onclick="sendtoSectionPage(' + secciones[idx].id + ')">Ver más...' + 
                        '</button></div></div><div class="row BGSection" id="section' + secciones[idx].id +'"></div></div></div>' 
                    )
                    
                    $.ajax({
                        url: "PHP/noticias.php",
                        type: "post",
                        dataType: "json",
                        data: {method: 'newsBySection', idSection: secciones[idx].id, limit: 4},
                        success: function (noticias) {
                            if (noticias != null){
                                $.each(noticias, function(idy, notiRed){
                                    $('#section' + secciones[idx].id).append(
                                        '<div class="col-md-3"><div class="card sectionNews"><img class="card-img-top" ' + 
                                        'src=data:image/' + noticias[idy].ext + ';base64,' + noticias[idy].preview + '><div class="card-body">' +
                                        '<h4 class="card-title title">' + noticias[idy].title + '</h4><p class="card-text">' + noticias[idy].descrSh +
                                        '</p><h4 class="card-title pubDate">Publicado el: ' + noticias[idy].fePub.slice(8,10) + ' de ' +
                                        whichMonth(noticias[idy].fePub.slice(5,7)) + ' del ' + noticias[idy].fePub.slice(0,4) + '</h4>' +
                                        '<button class="btn btn-outline-danger barBut" onclick="sendtoFullPage(' + noticias[idy].id + ')"><i class="fa fa-newspaper-o"></i>  Ver noticia</button></div></div></div>'
                                    ) 
                                })
                            }
                            else{
                                alert("Ocurrio un error durante la obtencion de datos.")
                            }  
                        }
                    })
                })  
            }
            else {
                alert("Ocurrio un error durante la obtencion de datos.")
            }          
        }
    }) 
}

function displayNewsBySection(appendTo, sectionID){
    $.ajax({
        url: "PHP/noticias.php",
        type: "post",
        dataType: "json",
        data: {method: 'newsBySection', idSection: sectionID, limit: 0},
        success: function (noticias) {
            if (noticias != null){
                $.each(noticias, function(idx, notiRed){
                    $(appendTo).append(
                        '<div class="col-md-4"><div class="card publishedNews"><img class="card-img-top"' + 
                        'src=data:image/' + noticias[idx].ext + ';base64,' + noticias[idx].preview + '><div class="card-body">' +
                        '<h4 class="card-title title">' + noticias[idx].title + '</h4><p class="card-text">' + noticias[idx].descrSh +
                        '</p><h4 class="card-title pubDate">Publicado el: ' + noticias[idx].fePub.slice(8,10) + ' de ' +
                        whichMonth(noticias[idx].fePub.slice(5,7)) + ' del ' + noticias[idx].fePub.slice(0,4) + '</h4>' +
                        '<button class="btn btn-outline-danger barBut" onclick="sendtoFullPage(' + noticias[idx].id + ')"><i class="fa fa-newspaper-o"></i>  Ver noticia</button></div></div></div>'   
                )});       
            }           
        }
    }); 
}

function getSectionData(sectionID){
    $.ajax({
        url: "PHP/sections.php",
        type: "post",
        dataType: "json",
        data: {method: 'getSectionData', idSection: sectionID},
        success: function (section) {
            if (section != null){
                document.getElementById('topSection').innerHTML = section.name;
                
                var selectedColor;
                switch(section.color){
                    case 'rojo':
                        selectedColor = "#aa281d";
                    break;
                    case 'verde':
                        selectedColor = "#147c17";
                    break;
                    case 'amari':
                        selectedColor = "#FADA5E";          
                    break;
                    case 'azul':
                        selectedColor = "#0b81d6";
                    break;
                    case 'rosa':
                        selectedColor = "#eb75c9";
                    break;
                }

                document.getElementById("sectColor").style.background = selectedColor;                
            }           
        }
    }); 

}

function seeNoticia(idNot, colorSection, titleNot, nameReportero, feAcont, lugAcont, descrSh, descrLg, feCreacion){
    document.getElementById('carousel-images-rev').innerHTML = "";
    document.getElementById('imgIndiRev').innerHTML = "";
    document.getElementById('carousel-videos-rev').innerHTML = "";
    indexSlidesImg = 0;

    $('#seeNoticia').modal('toggle');   
    cleanInput('eComments');

    getImageMedia(idNot, 'carousel-images-rev', 'imgIndiRev');
    getVideoMedia(idNot, 'carousel-videos-rev');
    
    document.getElementById("idNotiSent").value = idNot;
    document.getElementById("idNotiSentComm").value = idNot;
    var selectedColor;
    switch(colorSection){
        case 'rojo':
            selectedColor = "#aa281d";
        break;
        case 'verde':
            selectedColor = "#147c17";
        break;
        case 'amari':
            selectedColor = "#FADA5E";          
        break;
        case 'azul':
            selectedColor = "#0b81d6";
        break;
        case 'rosa':
            selectedColor = "#eb75c9";
        break;
    }

    document.getElementById("sectionCommentVista").style.background = selectedColor;
    document.getElementById("tituloCommentVista").innerHTML = titleNot + '<div class="row"><div class="col-md-5" id="nomReporteroVistaComm"></div></div>';
    document.getElementById("nomReporteroVistaComm").innerHTML = 'Nota por: ' + nameReportero;
    
    document.getElementById("sectionHeaderVista").style.background = selectedColor;
    document.getElementById("tituloNoticiaVista").innerHTML = titleNot + '<div class="row"><div class="col-md-5" id="nomReporteroVista"></div></div>';
    document.getElementById("nomReporteroVista").innerHTML = 'Nota por: ' + nameReportero;
    document.getElementById("datosAcontecimientoVista").innerHTML = feAcont.slice(8,10) + ' de ' +whichMonth(feAcont.slice(5,7)) +' del ' + 
    feAcont.slice(0,4) + ' a las ' + feAcont.slice(11,16) + ', ' + lugAcont;
    document.getElementById("descripcionVista").innerHTML = descrSh;
    document.getElementById("fullBodyVista").innerHTML = descrLg;
    document.getElementById("fechaCreacionVista").innerHTML = 'Nota creada el ' + feCreacion.slice(8,10) + ' de ' +whichMonth(feCreacion.slice(5,7)) +
    ' del ' + feCreacion.slice(0,4);    
}

function sendComms(idNot, colorSection, titleNot, nameReportero, feAcont, lugAcont, descrSh, descrLg, feCreacion){
    document.getElementById('carousel-images-rev').innerHTML = "";
    document.getElementById('imgIndiRev').innerHTML = "";
    document.getElementById('carousel-videos-rev').innerHTML = "";
    indexSlidesImg = 0;

    $('#sendComments').modal('toggle');   
    cleanInput('eComments');

    getImageMedia(idNot, 'carousel-images-rev', 'imgIndiRev');
    getVideoMedia(idNot, 'carousel-videos-rev');
    
    document.getElementById("idNotiSent").value = idNot;
    document.getElementById("idNotiSentComm").value = idNot;
    var selectedColor;
    switch(colorSection){
        case 'rojo':
            selectedColor = "#aa281d";
        break;
        case 'verde':
            selectedColor = "#147c17";
        break;
        case 'amari':
            selectedColor = "#FADA5E";          
        break;
        case 'azul':
            selectedColor = "#0b81d6";
        break;
        case 'rosa':
            selectedColor = "#eb75c9";
        break;
    }

    document.getElementById("sectionCommentVista").style.background = selectedColor;
    document.getElementById("tituloCommentVista").innerHTML = titleNot + '<div class="row"><div class="col-md-5" id="nomReporteroVistaComm"></div></div>';
    document.getElementById("nomReporteroVistaComm").innerHTML = 'Nota por: ' + nameReportero;
        
    document.getElementById("sectionHeaderVista").style.background = selectedColor;
    document.getElementById("tituloNoticiaVista").innerHTML = titleNot + '<div class="row"><div class="col-md-5" id="nomReporteroVista"></div></div>';
    document.getElementById("nomReporteroVista").innerHTML = 'Nota por: ' + nameReportero;
    document.getElementById("datosAcontecimientoVista").innerHTML = feAcont.slice(8,10) + ' de ' +whichMonth(feAcont.slice(5,7)) +' del ' + 
    feAcont.slice(0,4) + ' a las ' + feAcont.slice(11,16) + ', ' + lugAcont;
    document.getElementById("descripcionVista").innerHTML = descrSh;
    document.getElementById("fullBodyVista").innerHTML = descrLg;
    document.getElementById("fechaCreacionVista").innerHTML = 'Nota creada el ' + feCreacion.slice(8,10) + ' de ' +whichMonth(feCreacion.slice(5,7)) +
    ' del ' + feCreacion.slice(0,4);
}

function aprobarNoticia(){
    var notID = document.getElementById("idNotiSent").value;              
    $.ajax({
        url: "PHP/noticias.php",
        type: "post",
        dataType: "json",
        data: {method: 'noticiaUpdStatus', idNot: notID, status: 'publicada'},
        success: function (result) {
            if (result.msg) {
                alert("Noticia publicada exitosamente!");
                emptyBlock('notiEnviadas');
                getNoticiasEnv();
                $('#seeNoticia').modal('toggle');
            } else
                alert("Ocurrio un error durante la ejecucion.");
        }
    });
}

function devolverNoticia(){  
    var comment = document.getElementById('eComments').value;
    if (comment == "")
        document.getElementById('eComments').className=document.getElementById('eComments').className+" error";
    else {
        var notID = document.getElementById("idNotiSentComm").value;              
        $.ajax({
            url: "PHP/noticias.php",
            type: "post",
            dataType: "json",
            data: {method: 'noticiaUpdStatusFeedback', idNot: notID, status: 'devuelta', idEditor: 3, comment: comment},
            success: function (result) {
                if (result.msg) {
                    alert("Noticia devuelta exitosamente!");
                    emptyBlock('notiEnviadas');
                    getNoticiasEnv();
                    $('#sendComments').modal('toggle');
                } else
                    alert("Ocurrio un error durante la ejecucion.");
            }
        });
    }
}

function getUserData(userID){
    $.ajax({
        url: "PHP/users.php",
        type: "post",
        dataType: "json",
        data: {method: 'getUserData', idUser: userID},
        success: function (usuario, usser) {
            if (usuario != null){
                document.getElementById("fnamePerfil").value = usuario[0].name;
                document.getElementById("snamePerfil").value = usuario[0].apellidoP;
                document.getElementById("lnamePerfil").value = usuario[0].apellidoM;
                document.getElementById("emailPerfil").value = usuario[0].email;
                document.getElementById("telPerfil").value = usuario[0].tel;
                document.getElementById("pwdPerfil").value = usuario[0].password;
                $("#dispImgProfile").attr('src','data:image/' + usuario[0].imgType + ';base64,' + usuario[0].avatar);
            }   
        },
        error: function (result) {
            alert("Ocurrio un error durante la obtencion de datos.");
        }

    });
}

function getNewsData(newsID){
    $.ajax({
        url: "PHP/noticias.php",
        type: "post",
        dataType: "json",
        data: {method: 'getNewsData', idNews: newsID},
        success: function (noticia) {
            if (noticia != null){
                
                var selectedColor;
                switch(noticia.sectionColor){
                    case 'rojo':
                        selectedColor = "#aa281d";
                    break;
                    case 'verde':
                        selectedColor = "#147c17";
                    break;
                    case 'amari':
                        selectedColor = "#FADA5E";          
                    break;
                    case 'azul':
                        selectedColor = "#0b81d6";
                    break;
                    case 'rosa':
                        selectedColor = "#eb75c9";
                    break;
                }

                document.getElementById("sectionHeader").style.background = selectedColor; 

                document.getElementById("tituloNoticia").innerHTML = noticia.title + '<div class="row"><div class="col-md-5" id="nomReportero">' +
                '</div><div class="col-md-7" id="datePublicacion"></div></div>';
                document.getElementById("nomReportero").innerHTML = 'Nota por ' + noticia.name + " " + noticia.apePat + " " + noticia.apeMat;
                document.getElementById("datePublicacion").innerHTML =  'Publicado el ' + noticia.fePubli.slice(8,10) + ' de ' + 
                whichMonth(noticia.fePubli.slice(5,7)) + ' del ' + noticia.fePubli.slice(0,4) + ' a las ' + noticia.fePubli.slice(11,16);  
                document.getElementById("datosAcontecimiento").innerHTML = noticia.feAcont.slice(8,10) + ' de ' + 
                whichMonth(noticia.feAcont.slice(5,7)) + ' del ' + noticia.feAcont.slice(0,4) + ' a las ' + noticia.feAcont.slice(11,16) +
                ', ' + noticia.lugAcont;
                document.getElementById("descripcion").innerHTML = noticia.descrSh;
                document.getElementById("fullBody").innerHTML = noticia.descrLg;
                document.getElementById("fechaCreacion").innerHTML = 'Nota creada el ' + noticia.feCreacion.slice(8,10) + ' de ' + 
                whichMonth(noticia.feCreacion.slice(5,7)) + ' del ' + noticia.feCreacion.slice(0,4);

                getImageMedia(newsID, 'carousel-images-display', 'imgIndiDisplay');
                getVideoMedia(newsID, 'carousel-videos-display');
            }   
        },
        error: function (result) {
            alert("Ocurrio un error durante la obtencion de datos.");
        }

    });
}

function upViews(newsID){
    $.ajax({
        url: "PHP/vistas.php",
        type: "post",
        dataType: "json",
        data: {method: 'increaseViews', idNews: newsID},
        success: function (result) {
            if (result.msg) {
            }
        }
    });
}

function getTotalComments(newsID){
    $.ajax({
        url: "PHP/comments.php",
        type: "post",
        dataType: "json",
        data: {method: 'countOfComments', idNews: newsID},
        success: function (result) {
            if (result != null){
                var theMsg;
                if (result.totalComms == 1)
                    theMsg = result.totalComms + ' Comentario.'
                else
                theMsg = result.totalComms + ' Comentarios.'

                document.getElementById("totalComments").innerHTML = theMsg;
            }   
        },
        error: function (result) {
            alert("Ocurrio un error durante la obtencion de datos.");
        }

    });
}

function getPublishedNotes(){
    $.ajax({
        url: "PHP/noticias.php",
        type: "post",
        dataType: "json",
        data: {method: 'getPublishedNotes'},
        success: function (result) {
            if (result != null){
                document.getElementById("publishedNews").innerHTML = 'Noticias publicadas en el sitio: ' + result.totalNews;
            }   
        },
        error: function (result) {
            alert("Ocurrio un error durante la obtencion de datos.");
        }

    });
}

function cleanOldFeedback(idFeed){
    $.ajax({
        url: "PHP/feedback.php",
        type: "post",
        dataType: "json",
        data: {method: 'deleteOldFeed', id: idFeed},
        success: function (result) {
            if (result.msg) {
            }
        }
    });  
}

function publicarComentario(idUser, idNews){
    var comentario = document.getElementById("contentComment").value;

    $.ajax({
        url: "PHP/comments.php",
        type: "post",
        dataType: "json",
        data: {method: 'postComment', idParent: 0, idUser: idUser, idNews: idNews, comment: comentario},
        success: function (result) {
            if (result.msg) { 
                document.getElementById("contentComment").value = "";   
                document.getElementById("allComments").innerHTML = "";
                getNewsComments(idNews);
                getTotalComments(idNews);
                alert("Comentario enviado.");                   
            } 
            else
                alert("Ocurrio un error durante la ejecucion.");
        }
    }); 

}

function responderComentario(idParent, idUser, idNews){
    var comentario = document.getElementById('inputNo' + idParent).value;

    $.ajax({
        url: "PHP/Comments.php",
        type: "post",
        dataType: "json",
        data: {method: 'postComment', idParent: idParent, idUser: idUser, idNews: idNews, comment: comentario},
        success: function (result) {
            if (result.msg) { 
                document.getElementById("contentComment").value = "";   
                document.getElementById("allComments").innerHTML = "";
                getNewsComments(idNews);
                getTotalComments(idNews);
                alert("Comentario enviado.");                   
            } 
            else
                alert("Ocurrio un error durante la ejecucion.");
        }
    }); 

}

function getImageMedia(idNoticia, carrusel_add, slides){
    $.ajax({
        url: "PHP/media.php",
        type: "post",
        dataType: "json",
        data: {method: 'getImageMedia', idNot: idNoticia},
        success: function (noticias) {
            if (noticias != null){

                const container =  document.getElementById(carrusel_add);
                const sliders = document.getElementById(slides);

                $.each(noticias, function(idx, notiRed){
                    container.innerHTML += '<div class="carousel-item"><img src=data:image/' + noticias[idx].ext +
                    ';base64,' + noticias[idx].image + '></div>';
                    $("#" + carrusel_add + " div").last().addClass("active");
                    $("#" + carrusel_add + " div:not(:last-child)").removeClass("active");
    
                    sliders.innerHTML += '<li data-target="#carruselImg" data-slide-to="'+ indexSlidesImg +'"></li>';
                    $("#" + slides + " li").last().addClass("active");
                    $("#" + slides + " li:not(:last-child)").removeClass("active");
                    indexSlidesImg++;       
                });       
                
            }           
        }
    }); 
}

function getVideoMedia(idNoticia, carrusel_add){
    $.ajax({
        url: "PHP/media.php",
        type: "post",
        dataType: "json",
        data: {method: 'getVideoMedia', idNot: idNoticia},
        success: function (noticias) {
            if (noticias != null){
                const container =  document.getElementById(carrusel_add);
                $.each(noticias, function(idx, notiRed){
                    container.innerHTML += '<div class="carousel-item"><video class="video-fluid" onplay="pauseCar();" onpause="playCar();" controls>' +
                    '<source src=data:video/' + noticias[idx].ext + ';base64,' + noticias[idx].video + ' type="video/mp4"></video></div>';
                    $("#" + carrusel_add + " div").last().addClass("active");
                    $("#" + carrusel_add + " div:not(:last-child)").removeClass("active");    
                });       
                
            }           
        }
    }); 
}

function getNewsComments(idNoticia){
    $.ajax({
        url: "PHP/comments.php",
        type: "post",
        dataType: "json",
        data: {method: 'getComments', idNot: idNoticia},
        success: function (comments) {
            if (comments != null){
                $.each(comments, function(idx, comentario){
                    $('#allComments').append(                       
                        '<div class="comment-box"><span class="commenter-pic"><img class="img-fluid" ' + 
                        'src=data:image/' + comments[idx].type + ';base64,' + comments[idx].avatar + '></span>' +
                        '<span class="commenter-name"><a>' + comments[idx].name + " " + comments[idx].apePat + " " + comments[idx].apeMat +
                        '</a><span class="comment-time">' + whichMonth(comments[idx].dateComm.slice(5,7)) + ' ' + comments[idx].dateComm.slice(8,10) +
                        ', ' + comments[idx].dateComm.slice(0,4) + ' a las ' + comments[idx].dateComm.slice(11,16) + '</span></span>' +
                        '<p class="comment-txt">' + comments[idx].comment + '</p><div class="comment-meta">' +
                        '<button class="comment-reply btn btn-outline-danger reply-popup" id="replyToComm">' +
                        '<i class="fa fa-reply-all" aria-hidden="true"></i> Responder</button>' +
                        '<button class="comment-reply btn btn-outline-danger delete-comm" onclick="deleteComm('+ idNoticia + ',' + comments[idx].commentID +')">' +
                        '<i class="fa fa-trash-o" aria-hidden="true"></i> Borrar</button></div>' +
                        '<div class="containerReply"></div><div id="idComment" style="display: none">' + comments[idx].commentID +
                        '</div><div id="replies' + comments[idx].commentID + '"></div>'
                    )

                    var idParent = comments[idx].commentID;

                    $.ajax({
                        url: "PHP/comments.php",
                        type: "post",
                        dataType: "json",
                        data: {method: 'getCommentReplies', idNot: idNoticia, idParent: idParent},
                        success: function (replies) {
                            if (replies != null){
                                $.each(replies, function(idz, respuestas){
                                    $('#replies' + idParent).append(
                                    '<div class="comment-box replied"><span class="commenter-pic"><img class="img-fluid" ' +
                                    'src=data:image/' + replies[idz].type + ';base64,' + replies[idz].avatar + '></span>' +
                                    '<span class="commenter-name"><a>' + replies[idz].name + " " + replies[idz].apePat + " " +
                                    replies[idz].apeMat + '</a><span class="comment-time">' + whichMonth(replies[idz].dateComm.slice(5,7)) +
                                    ' ' + replies[idz].dateComm.slice(8,10) + ', ' + replies[idz].dateComm.slice(0,4) + ' a las ' +
                                    replies[idz].dateComm.slice(11,16) + '</span></span><p class="comment-txt">' + replies[idz].comment + '</p>' +
                                    '<button class="comment-reply btn btn-outline-danger delete-comm" onclick="deleteComm('+ idNoticia + ',' +
                                    replies[idz].commentID +')">' + '<i class="fa fa-trash-o" aria-hidden="true"></i> Borrar</button></div>'
                                    )    
                                });
                            }           
                        }
                    });

                    $('#allComments').append(                       
                        '</div>'
                    )      
                });
            }           
        }
    }); 
}

function deleteComm(idNot, idComm){
    $.ajax({
        url: "PHP/comments.php",
        type: "post",
        dataType: "json",
        data: {method: 'deleteComm', id: idComm},
        success: function (result) {
            if (result.msg) {
                alert("Comentario eliminado exitosamente!");   
                document.getElementById("allComments").innerHTML = "";
                getNewsComments(idNot);
                getTotalComments(idNews);
            }
        }
    });

}

function likeNoticia(idUser, idNot){
    var classes = $("#BTLike").attr("class");
    var likedClass = classes.split(" ");

    if(likedClass[1]== "btn-outline-danger"){
        $("#BTLike").removeClass("btn-outline-danger");
        $("#BTLike").html('<i class="fa fa-thumbs-up"></i>Te Gusta');
        $("#BTLike").addClass("btn-danger");

        $.ajax({
            url: "PHP/likes.php",
            type: "post",
            dataType: "json",
            data: {method: 'likeNoticia', idUser: idUser, idNot: idNot},
            success: function (result) {
                if (result.msg) { 
                    getTotalLikes(idNot);
                } 
                else
                    alert("Ocurrio un error durante la ejecucion.");
            }
        });    
    }
    else if(likedClass[1]== "btn-danger"){
        $("#BTLike").removeClass("btn-danger");
        $("#BTLike").html('<i class="fa fa-thumbs-up"></i>Me Gusta');
        $("#BTLike").addClass("btn-outline-danger");

        $.ajax({
            url: "PHP/likes.php",
            type: "post",
            dataType: "json",
            data: {method: 'deleteLike', idUser: idUser, idNot: idNot},
            success: function (result) {
                if (result.msg) { 
                    getTotalLikes(idNot);
                } 
                else
                    alert("Ocurrio un error durante la ejecucion.");
            }
        }); 
    }   
}

function updateLikeButt(idUser, idNot){
    $.ajax({
        url: "PHP/likes.php",
        type: "post",
        dataType: "json",
        data: {method: 'updateLikeButt', idUser: idUser, idNot: idNot},
        success: function (result) {
            if (result.msg) { 
                $("#BTLike").removeClass("btn-outline-danger");
                $("#BTLike").html('<i class="fa fa-thumbs-up"></i>Te Gusta');
                $("#BTLike").addClass("btn-danger");
            } 
        }
    });
}

function getTotalLikes(newsID){
    $.ajax({
        url: "PHP/likes.php",
        type: "post",
        dataType: "json",
        data: {method: 'countOfLikes', idNews: newsID},
        success: function (result) {
            if (result != null){
                var theMsg;
                if (result.totalLikes == 1)
                    theMsg = "A " + result.totalLikes + ' persona le gusta esto.'
                else
                    theMsg = "A " + result.totalLikes + ' personas les gusta esto.'

                document.getElementById("liked").innerHTML = theMsg;
            }   
        },
        error: function () {
            alert("Ocurrio un error durante la obtencion de datos.");
        }
    });
}

function getNotKeywords(idNot){
    var arrayIDRelated = [];

    $.ajax({
        url: "PHP/feedback.php",
        type: "post",
        dataType: "json",
        async: false,   
        data: {method: 'getKeyNotID', idNot: idNot},
        success: function (allKeywords) {

            $.each(allKeywords, function(idx){
                $.ajax({
                    url: "PHP/noticias.php",
                    type: "post",
                    dataType: "json",
                    async: false,   
                    data: {method: 'getRelated', keyword: allKeywords[idx].content, actualNot: idNot},
                    success: function (relatedNots) {
                        $.each(relatedNots, function(idz, NoticiasSimilares){
                            arrayIDRelated.push(relatedNots[idz].idNot);
                        });

                    }
                })
            });

        }
    });
    var counts = {};
    arrayIDRelated.forEach(function(x) { counts[x] = (counts[x] || 0) + 1; });

    var IDCoincidencias = [];
    IDCoincidencias = Object.entries(counts).sort((a,b) => b[1]-a[1]).map(el=>el[0]).slice(0,5);

    
    IDCoincidencias.forEach(function(actual){
        $.ajax({
            url: "PHP/noticias.php",
            type: "post",
            dataType: "json",
            data: {method: 'getNewsByIDDisplay', idNews: actual},
            success: function (noticia) {
                if (noticia != null){
                    
                    var splitDescr = noticia[0].descrSh.split(" ");
                    var shorterDesc = "";
                    splitDescr.forEach(function(actual, index){
                        if (index < 9)
                            shorterDesc += actual + " ";
                        else if (index == 9){
                            shorterDesc += actual + "...";
                        }
                    });

                    $('#displayMostViewed').append(
                        '<div class="col-md-12"><div class="card relatedNew"><img class="card-img-top"' + 
                        'src=data:image/' + noticia[0].ext + ';base64,' + noticia[0].preview + '><div class="card-body">' +
                        '<h4 class="card-title title">' + noticia[0].title + '</h4><p class="card-text">' + shorterDesc +
                        '</p><h4 class="card-title pubDate">Publicado el: ' + noticia[0].fePub.slice(8,10) + ' de ' +
                        whichMonth(noticia[0].fePub.slice(5,7)) + ' del ' + noticia[0].fePub.slice(0,4) + '</h4>' +
                        '<button class="btn btn-outline-danger barBut" onclick="sendtoFullPage(' + noticia[0].id + ')"><i class="fa fa-newspaper-o"></i>  Ver noticia</button></div></div></div>'   
                    )
                }   
            },
            error: function (result) {
                alert("Ocurrio un error durante la obtencion de datos.");
            }
        });
    })
}

function sendtoFullPage(idNot){
    url = 'fullpage.php?id=' + idNot;
    window.location = url;
}

function sendtoSectionPage(IdSect){
    url = 'noticiasSeccion.php?id=' + IdSect;
    window.location = url;
}

function whichMonth(number){
    if (number == 1)
        return 'Enero'
    
    if (number == 2)
        return 'Febrero'
        
    if (number == 3)
        return 'Marzo'
    
    if (number == 4)
        return 'Abril'
        
    if (number == 5)
        return 'Mayo'
    
    if (number == 6)
        return 'Junio'
        
    if (number == 7)
        return 'Julio'
    
    if (number == 8)
        return 'Agosto'
        
    if (number == 9)
        return 'Septiembre'
    
    if (number == 10)
        return 'Octubre'
        
    if (number == 11)
        return 'Noviembre'
    
    if (number == 12)
        return 'Diciembre' 
}

function getUrlParameter(sParam) {
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

function displaySearchResults(palabraT, palabraD, palabraC, fechaInicial, fechaFinal){
    document.getElementById("displayNews").innerHTML = "";
    $.ajax({
        url: "PHP/busqueda.php",
        type: "post",
        dataType: "json",
        data: {method: 'getSearchResult',tituloB:palabraT,descripB:palabraD,claveB:palabraC,fechaIB:fechaInicial,fechaFB:fechaFinal},
        success: function (noticias) {
            $.each(noticias, function(idx, noti){
                
                //alert(noticias[idx].id);
                $( "#displayNews").append(
                    
                    '<div class="col-md-4"><div class="card searchResult"><img class="card-img-top"' + 
                    'src=data:image/' + noticias[idx].ext + ';base64,' + noticias[idx].preview + '><div class="card-body">' +
                    '<h4 class="card-title title">' + noticias[idx].title + '</h4><p class="card-text">' + noticias[idx].descrSh +
                    '</p><h4 class="card-title pubDate">Publicado el: ' + noticias[idx].fePub.slice(8,10) + ' de ' +
                    whichMonth(noticias[idx].fePub.slice(5,7)) + ' del ' + noticias[idx].fePub.slice(0,4) + '</h4>' +
                    '<button class="btn btn-outline-danger barBut" onclick="sendtoFullPage(' + noticias[idx].id + ')"><i class="fa fa-newspaper-o"></i>  Ver noticia</button></div></div></div>'
                );
              
                });
             
        }
    }); 
}






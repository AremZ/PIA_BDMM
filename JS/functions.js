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
                url: "functions.php",
                type: "post",
                dataType: "json",
                data: {method: 'userLogin', email: campoEmail.value, pass: campoPass.value},
                success: function (result) {
                    if(result.msg){
                        alert("Sesion iniciada exitosamente!");                        
                        $('#modLogin').modal('toggle');
                        $("#btnLogin").toggle();
                        $("#btnProfile").toggle()
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
                url: "functions.php",
                type: "post",
                dataType: "json",
                data: theForm,
                contentType: false,
                processData: false,
                success: function (result) {
                    if(result.msg){
                        alert("¡Registro exitoso!");
                        document.getElementById("fnameLog").value="";
                        document.getElementById("snameLog").value="";
                        document.getElementById("lnameLog").value="";
                        document.getElementById("emailRLog").value="";
                        document.getElementById("telLog").value="";
                        document.getElementById("pwdRLog").value="";
                        document.getElementById("rpwdLog").value="";                    
                        $('#modLogin').modal('toggle');
                        $("#btnLogin").toggle();
                        $("#btnProfile").toggle()
                    }
                    else
                        alert("Correo ya registrado.");
                }
            });

            /*var formData = new FormData(document.getElementById("sentImg"));
            formData.append("method", 'setImage')

            $.ajax({
                url: "functions.php",
                type: "POST",
                dataType: "HTML",
                data: formData,
                cache: false,
                contentType: false,
                processData: false
            }).done(function(echo){
                alert(echo);
            });*/
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
                url: "functions.php",
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
                url: "functions.php",
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
                url: "functions.php",
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
                                url: "functions.php",
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
                url: "functions.php",
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
                                url: "functions.php",
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

function cerrarSesion(){
    $("#btnLogin").toggle();
    $("#btnProfile").toggle();
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
    $(".reply-box").toggle();
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

    campo = document.getElementById('archivosNoticia').value;
    if (campo != ""){
        var startIndex = (campo.indexOf('\\') >= 0 ? campo.lastIndexOf('\\') : campo.lastIndexOf('/'));
        var filename = campo.substring(startIndex);
        if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
            filename = filename.substring(1);
        }
        alert(filename);
    }
    else{
        alert("Seleccione una imagen por favor.")
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

        if (action == 0){
            var feAcont = feInput + " " + hoInput + ":00";
            var newEstado = 'redaccion';
            var isSent = 0;
            $.ajax({
                url: "functions.php",
                type: "post",
                dataType: "json",
                data: {method: 'noticiaReg', idSec: idSection[0], title: titNot, dateAcont: feAcont, lugAcont: lugNot, descrSh: shNot,
                        descrLg: lgNot, arrayClv: clvNot, status: newEstado, sent: isSent},
                success: function (result) {
                    if (result.msg) {
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
            $.ajax({
                url: "functions.php",
                type: "post",
                dataType: "json",
                data: {method: 'noticiaReg', idSec: idSection[0], title: titNot, dateAcont: feAcont, lugAcont: lugNot, descrSh: shNot,
                        descrLg: lgNot, arrayClv: clvNot, status: newEstado, sent: isSent},
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
            $.ajax({
                url: "functions.php",
                type: "post",
                dataType: "json",
                data: {method: 'noticiaUpd', idNot: idNot,idSec: idSection[0], title: titNot, dateAcont: feAcont, lugAcont: lugNot, descrSh: shNot,
                        descrLg: lgNot, arrayClv: clvNot, status: newEstado, sent: isSent},
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

            $.ajax({
                url: "functions.php",
                type: "post",
                dataType: "json",
                data: {method: 'noticiaUpd', idNot: idNot,idSec: idSection[0], title: titNot, dateAcont: feAcont, lugAcont: lugNot, descrSh: shNot,
                        descrLg: lgNot, arrayClv: clvNot, status: newEstado, sent: isSent},
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
            url: "functions.php",
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
                            url: "functions.php",
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
        url: "functions.php",
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
}

function verRetro(idFeed ,feedback, idNot, title, feAcont, luAcont, descrSh, descrLg, idSecc){
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
 
    $.ajax({
        url: "functions.php",
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
        url: "functions.php",
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
        url: "functions.php",
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
        url: "functions.php",
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
        url: "functions.php",
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
        url: "functions.php",
        type: "post",
        dataType: "json",
        data: {method: 'getAllUsers'},
        success: function (usuarios) {
            $.each(usuarios, function(idx, usser){
                // picture.pic_location
                // picture.name
                // picture.age
                // picture.gender
                //alert(usuarios[idx].name);
                //console.log(usuarios[idx].name+" "+usuarios[idx].apellidoP+" "+usuarios[idx].apellidoM);

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
        url: "functions.php",
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
    getSecciones();
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
        url: "functions.php",
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
        url: "functions.php",
        type: "post",
        dataType: "json",
        data: {method: 'getSecciones'},
        success: function (secciones) {
            $.each(secciones, function(idx, sect){
   

               /* upperFirst = secciones[idx].name;
                upperFirst = upperFirst.charAt(0).toUpperCase() + upperFirst.slice(1)*/

                $( ".allSections" ).append(
                    "<li class='column' draggable='true'>" +
                    "<header>" +
                    "<label class='ordenSec' style='display: none'>"+secciones[idx].id+"</label>"+
                    "<label id='nombreSec'>"+secciones[idx].name+"</label>"+
                        "<button class='btn btn-outline-danger btnEdit' data-toggle='modal' data-target='#modChangeN' >Editar</button>"+
                        "<button class='btn btn-outline-danger btnDel' >Eliminar</button>"+
                        "</header>"+
                    "</li>");
                    
              //$(".draggable").draggable();
              });
             
        }

    }); 
}

function setOrden(){
    $("ol.allSections li").each(function() {
       
        //alert("Orden: "+index+"idSeccion: "+id );
        var index = ($( "li" ).index( this ))-9;
        var id = $(this).find(".ordenSec").text();
        $.ajax({
            url: "functions.php",
            type: "post",
            dataType: "json",
            data: {method: 'setOrden',newOrden: index,idSeccion:id},
            success: function (result) {
                if(result.msg){
                    //alert("Cambios guardados");    
    
                }
                else
                    alert("Error en la actualización.");
            }
    
        });  

        alert("Cambios guardados");    
    });
    
}
var secEditar;

function getSeccionEDT(idSectionEditar){
    secEditar=idSectionEditar;
    var seccionName=document.getElementById("sectM");
    $.ajax({
        url: "functions.php",
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
                url: "functions.php",
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
        url: "functions.php",
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
        url: "functions.php",
       type: "post",
        dataType: "json",
        data: {method: 'regresarSeccion',idSeccionE:id},
       success: function (result) {
            if(result.msg){
                alert("¡Sección restaurada!");
                //emptyListSeccion();    
                //$('#modChangeN').modal('toggle');
                //emptyListSeccion();    
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
            url: "functions.php",
           type: "post",
            dataType: "json",
            data: {method: 'deleteSeccion',idSeccionE:idEliminar},
           success: function (result) {
                if(result.msg){
                    alert("¡Sección eliminada!");
                    //emptyListSeccion();    
                    $('#modChangeN').modal('toggle');
                    //emptyListSeccion();    
                }
                else
                    alert("Error en el proceso.");
             }

        });  
    }
}

function getSeccionPendienteElim(id){
    //var eliminar=false;
    //var seccion;
    if(id!=0){
        //eliminar=confirm("Se quiere eliminar la sección: "+seccionPorEliminar);
       // if(eliminar){

            $.ajax({
                url: "functions.php",
                type: "post",
                dataType: "json",
                data: {method: 'getSectionName', idSeccionE: id},
                success: function (secciones) {
                    if (secciones != null){
                        
                        alert("Petición enviada. Se quiere eliminar: "+secciones[0].nombreSection);
                        //return seccion;
                    }    
                }
            }); 

        //}
            //deleteSeccion(idSeccionPorEliminar);
    }
}

function pedirEliminarSeccion(idEliminar){
   
    getSeccionPendienteElim(idEliminar); 
}


function getSeccionesNoti(){
    var index = 0;
    $.ajax({
        url: "functions.php",
        type: "post",
        dataType: "json",
        data: {method: 'getSecciones'},
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
        url: "functions.php",
        type: "post",
        dataType: "json",
        data: {method: 'getNoticiasRed'},
        success: function (noticias) {
            if (noticias != null){            
                $.each(noticias, function(idx, notiRed){
                    $( "#notiRedaccion" ).append(
                        '<div class="col-md-12"><div class="card enRed"><div class="row no-gutters"><div class="col-md-4"><img class="card-img" src="Sources/Note3.jpg"></div>' +
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
        url: "functions.php",
        type: "post",
        dataType: "json",
        data: {method: 'getNoticiasPend'},
        success: function (noticias) {
            if (noticias != null){
                $.each(noticias, function(idx, notiRed){
                    $( "#notiPendientes" ).append(
                        '<div class="col-lg-12"><div class="card EnvRev"><img class="card-img" src="Sources/Note2.jpg"><div class="card-body">' +
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
        url: "functions.php",
        type: "post",
        dataType: "json",
        data: {method: 'getNoticiasEnv'},
        success: function (noticias) {           
            if (noticias != null){
            $.each(noticias, function(idx, notiRed){
                var fullName = noticias[idx].name + ' ' + noticias[idx].apePat + ' ' + noticias[idx].apeMat;
                $( "#notiEnviadas" ).append(
                    '<div class="col-md-3"><div class="card revisionNoticias"><img class="card-img-top" src="Sources/Note1.jpg"><div class="card-body">' +
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
        url: "functions.php",
        type: "post",
        dataType: "json",
        data: {method: 'getNoticiasDev'},
        success: function (noticias) {
            if (noticias != null){
                $.each(noticias, function(idx, notiRed){
                    $( "#notiDevueltas" ).append(
                        '<div class="col-lg-12"><div class="card pendRev"><div class="row no-gutters"><div class="col-md-4"><img class="card-img"' +
                        'src="Sources/Note3.jpg"></div><div class="col-md-8"><div class="card-body"><h4 class="col-md-10 card-title titleNotRev">' +
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
        url: "functions.php",
        type: "post",
        dataType: "json",
        data: {method: 'getNoticiasPub'},
        success: function (noticias) {
            if (noticias != null){
                $.each(noticias, function(idx, notiRed){
                    $( "#NotiPubli" ).append(
                        '<div class="col-md-3"><div class="card notPub"><img class="card-img-top" src="Sources/Note3.jpg"><div class="card-body">' +
                        '<h4 class="card-title titleNotPub">' + noticias[idx].title + '</h4><p class="card-text bodyNotPub">' + noticias[idx].descrSh +
                        '</p><h4 class="card-title" id="pubNotPub">Publicado el: ' + noticias[idx].fePub.slice(8,10) + ' de ' +
                        whichMonth(noticias[idx].fePub.slice(5,7)) + ' del ' + noticias[idx].fePub.slice(0,4) + '</h4><div class="row"><div class="col-lg-12">' +
                        '<form action="fullpage.php"><button class="btn btn-outline-danger barBut" type="submit" id="btnSeeNot"><i class="fa fa-newspaper-o"></i>Ver noticia</button>' +
                        '</form></div></div></div></div></div>'  
                )});       
            }           
        }
    }); 
}

function seeNoticia(idNot, colorSection, titleNot, nameReportero, feAcont, lugAcont, descrSh, descrLg, feCreacion){
    $('#seeNoticia').modal('toggle');   
    cleanInput('eComments');
    
    document.getElementById("idNotiSent").value = idNot;
    document.getElementById("idNotiSentComm").value = idNot;
    var selectedColor;
    switch(colorSection){
        case 'rojo':
            selectedColor = "#7c1d14";
        break;
        case 'verde':
            selectedColor = "#147c17";
        break;
        case 'amari':
            selectedColor = "#00FF00";          
        break;
        case 'azul':
            selectedColor = "#0b81d6";
        break;
        case 'rosa':
            selectedColor = "#ff70d7";
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
    $('#sendComments').modal('toggle');   
    cleanInput('eComments');
    
    document.getElementById("idNotiSent").value = idNot;
    document.getElementById("idNotiSentComm").value = idNot;
    var selectedColor;
    switch(colorSection){
        case 'rojo':
            selectedColor = "#7c1d14";
        break;
        case 'verde':
            selectedColor = "#147c17";
        break;
        case 'amari':
            selectedColor = "#00FF00";          
        break;
        case 'azul':
            selectedColor = "#0b81d6";
        break;
        case 'rosa':
            selectedColor = "#ff70d7";
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
        url: "functions.php",
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
            url: "functions.php",
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
        url: "functions.php",
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

function cleanOldFeedback(idFeed){
    $.ajax({
        url: "functions.php",
        type: "post",
        dataType: "json",
        data: {method: 'deleteOldFeed', id: idFeed},
        success: function (result) {
            if (result.msg) {
            }
        }
    });  
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


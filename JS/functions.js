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
            $.ajax({
                url: "functions.php",
                type: "post",
                dataType: "json",
                data: {method: 'userSignUp', userType: 'usuario',name: campoName.value,lastName:campoLN.value,lastName2:campoLN2.value,email: campoEmail.value,numTel:campoTel.value, pass: campoPass.value},
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
            
            if(indexUser == 0){
                $.ajax({
                    url: "functions.php",
                    type: "post",
                    dataType: "json",
                    data: {method: 'userSignUp', userType: 'usuario', name: campoName.value, lastName: campoLN.value, lastName2: campoLN2.value, email: campoEmail.value, numTel: campoTel.value, pass: campoPass.value},
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
                            $('#modRegister').modal('toggle');
                        } else
                            alert("Correo ya registrado.");
                    }
                });               
            }
            else if (indexUser == 1){
                $.ajax({
                    url: "functions.php",
                    type: "post",
                    dataType: "json",
                    data: {method: 'userSignUp', userType: 'reportero', name: campoName.value, lastName: campoLN.value, lastName2: campoLN2.value, email: campoEmail.value, numTel: campoTel.value, pass: campoPass.value},
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
                            $('#modRegister').modal('toggle');
                        } else
                            alert("Correo ya registrado.");
                    }
                });                
            }
            else if (indexUser == 2){
                $.ajax({
                    url: "functions.php",
                    type: "post",
                    dataType: "json",
                    data: {method: 'userSignUp', userType: 'editor', name: campoName.value, lastName: campoLN.value, lastName2: campoLN2.value, email: campoEmail.value, numTel: campoTel.value, pass: campoPass.value},
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
                            $('#modRegister').modal('toggle');
                        } else
                            alert("Correo ya registrado.");
                    }
                });                
            }
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

            $.ajax({
                url: "functions.php",
                type: "post",
                dataType: "json",
                data: {method: 'userSignUp', userType: 'reportero', name: campoName.value, lastName: campoLN.value, lastName2: campoLN2.value, email: campoEmail.value, numTel: campoTel.value, pass: campoPass.value},
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

function checkNoticia(id, toggleWindow){
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
    if (campo.value == ""){
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

    if (error == 0)
        $(toggleWindow).modal('toggle');
}

function cleanTextarea(idTxt){
    document.getElementById(idTxt).className=document.getElementById(idTxt).className.replace(" error","");
}

function modificarDatos(){
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
        alert("Datos cambiados exitosamente.")

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
}

function nuevaNoticia(){
    document.getElementById("notEdiNoticia").hidden=true;
    document.getElementById("sepNotes").hidden=true;
    document.getElementById("btnDeleteinNot").hidden=true;
}

function verRetro(){
    document.getElementById("notEdiNoticia").hidden=false;
    document.getElementById("sepNotes").hidden=false;
    document.getElementById("btnDeleteinNot").hidden=false;
}

function editarNoticia(){
    document.getElementById("notEdiNoticia").hidden=true;
    document.getElementById("sepNotes").hidden=true;
    document.getElementById("btnDeleteinNot").hidden=false;
}

function editUsuario(){
    document.getElementById("registerUserAdmin").hidden=true;
    document.getElementById("saveUserAdmin").hidden=false;
    document.getElementById("cancelUserAdmin").hidden=false;
}

function createUsuario(){
    document.getElementById("registerUserAdmin").hidden=false;
    document.getElementById("saveUserAdmin").hidden=true;
    document.getElementById("cancelUserAdmin").hidden=true;
}

function editReportero(){
    document.getElementById("registerUserEditor").hidden=true;
    document.getElementById("saveUserEditor").hidden=false;
    document.getElementById("cancelUserEditor").hidden=false;
}

function createReportero(){
    document.getElementById("registerUserEditor").hidden=false;
    document.getElementById("saveUserEditor").hidden=true;
    document.getElementById("cancelUserEditor").hidden=true;
}
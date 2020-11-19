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
                            emptyList('usersList');
                            getAllUsers();
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
                            emptyList('usersList');
                            getAllUsers();
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
                            emptyList('usersList');
                            getAllUsers();
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

            var usuarioID = document.getElementById("idUser");
            
            var indexUser = document.getElementById("selectUsuario").selectedIndex;
            
            if(indexUser == 0){
                $.ajax({
                    url: "functions.php",
                    type: "post",
                    dataType: "json",
                    data: {method: 'editUsers', userType: 'usuario', id: usuarioID.value, name: campoName.value, lastName: campoLN.value, lastName2: campoLN2.value, email: campoEmail.value, numTel: campoTel.value, pass: campoPass.value},
                    success: function (result) {
                        if (result.msg) {
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
                            getAllUsers();
                            $('#modRegister').modal('toggle');
                        } else
                            alert("Correo ya registrado.");
                    }
                });               
            }
            if(indexUser == 1){
                $.ajax({
                    url: "functions.php",
                    type: "post",
                    dataType: "json",
                    data: {method: 'editUsers', userType: 'reportero', id: usuarioID.value, name: campoName.value, lastName: campoLN.value, lastName2: campoLN2.value, email: campoEmail.value, numTel: campoTel.value, pass: campoPass.value},
                    success: function (result) {
                        if (result.msg) {
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
                            getAllUsers();
                            $('#modRegister').modal('toggle');
                        } else
                            alert("Correo ya registrado.");
                    }
                });               
            }
            if(indexUser == 2){
                $.ajax({
                    url: "functions.php",
                    type: "post",
                    dataType: "json",
                    data: {method: 'editUsers', userType: 'editor', id: usuarioID.value, name: campoName.value, lastName: campoLN.value, lastName2: campoLN2.value, email: campoEmail.value, numTel: campoTel.value, pass: campoPass.value},
                    success: function (result) {
                        if (result.msg) {
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
                            getAllUsers();
                            $('#modRegister').modal('toggle');
                        } else
                            alert("Correo ya registrado.");
                    }
                });               
            }
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

            var usuarioID = document.getElementById("idReportero");

            $.ajax({
                url: "functions.php",
                type: "post",
                dataType: "json",
                data: {method: 'editUsers', userType: 'reportero', id: usuarioID.value, name: campoName.value, lastName: campoLN.value, lastName2: campoLN2.value, email: campoEmail.value, numTel: campoTel.value, pass: campoPass.value},
                success: function (result) {
                    if (result.msg) {
                        alert("Cambios hechos exitosamente!");
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

    if (error == 0){        
        var titNot = document.getElementById("headerNot").value;
        var feNot = document.getElementById("infoNotFe").value;
        var hoNot = document.getElementById("infoNotHo").value;
        var lugNot = document.getElementById("infoNotlug").value;
        var shNot = document.getElementById("descNoticia").value;
        var lgNot = document.getElementById("bodyNoticia").value;
        var clvNot = document.getElementById("infoNotpalClav").value;

        var feAcont = feNot + " " + hoNot + ":00";

        var select = document.getElementById("selectSeccion");
        var textSelect = select.options[select.selectedIndex].text; 
        var idSection = textSelect.split(" ");

        $.ajax({
            url: "functions.php",
            type: "post",
            dataType: "json",
            data: {method: 'noticiaReg', idNot: idSection[0], title: titNot, dateAcont: feAcont, lugAcont: lugNot, descrSh: shNot, descrLg: lgNot},
            success: function (result) {
                if (result.msg) {
                    alert("Noticia creada exitosamente!");
                    $(toggleWindow).modal('toggle');
                } else
                    alert("Correo ya registrado.");
            }
        }); 

    }
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

    document.getElementById("notEdiNoticia").value="";
    document.getElementById("headerNot").value="";
    document.getElementById("infoNotFe").value="";
    document.getElementById("infoNotHo").value="";
    document.getElementById("infoNotlug").value="";
    document.getElementById("descNoticia").value="";
    document.getElementById("bodyNoticia").value="";
    document.getElementById("infoNotpalClav").value="";

    getSeccionesNoti();
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

function editUsuario(idUser, userType, name, apePat, apeMat, tel, email, pass){
    document.getElementById("registerUserAdmin").hidden=true;
    document.getElementById("saveUserAdmin").hidden=false;
    document.getElementById("cancelUserAdmin").hidden=false;

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
}

function createUsuario(){
    document.getElementById("registerUserAdmin").hidden=false;
    document.getElementById("saveUserAdmin").hidden=true;
    document.getElementById("cancelUserAdmin").hidden=true; 
    document.getElementById("selectUsuario").selectedIndex = "0";   
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

function editReportero(idUser, name, apePat, apeMat, tel, email, pass){
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
}

function createReportero(){
    document.getElementById("registerUserEditor").hidden=false;
    document.getElementById("saveUserEditor").hidden=true;
    document.getElementById("cancelUserEditor").hidden=true;
}

function deleteReportero(idReportero){                      
    $('#confirmDeleteAdmin').modal('toggle');
    document.getElementById("idReporteroDelete").value=idReportero;
}

function confirmDeleteReportero(){
    var userDelete = document.getElementById("idReporteroDelete").value;

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
                usuarios[idx].tel + "','" + usuarios[idx].email + "','" +  usuarios[idx].password +
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

                $( ".allReporteros" ).append("<li class='list-group-item'>" + 
                "<div class='row'><span class='col-lg-4 displayName'><i class='fa fa-user-circle'></i><span>"
                + usuarios[idx].name + " " + usuarios[idx].apellidoP + " " + usuarios[idx].apellidoM +
                "</span> </span><span class='col-lg-4 displayType'>" + userLogo +
                upperFirst + "</span><span class='col-lg-4 displayActions'><button class=" +
                "'btn btn-outline-danger col-lg-5 actionsAdmin' data-toggle='modal' data-target='#modRegister'" +
                ' onclick="editReportero(' + usuarios[idx].id + ",'" + 
                usuarios[idx].name + "','" + usuarios[idx].apellidoP + "','" +  usuarios[idx].apellidoM + "','" +
                usuarios[idx].tel + "','" + usuarios[idx].email + "','" +  usuarios[idx].password +
                "'" + ')">' + "<i class='fa fa-pencil'></i>Editar</button><button" +
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
                        "<button class='btn btn-outline-danger btnEdit' data-toggle='modal' data-target='#modChangeN'>Editar</button>"+
                        "<button class='btn btn-outline-danger btnDel' onclick='deleteSec()'>Eliminar</button>"+
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

function getSeccionesNoti(){
    var index = 0;
    $.ajax({
        url: "functions.php",
        type: "post",
        dataType: "json",
        data: {method: 'getSecciones'},
        success: function (secciones) {
            $.each(secciones, function(idx, sect){
                $( "#selectSeccion" ).append(
                    "<option value=" + index + ">" + secciones[idx].id + " - " + secciones[idx].name +"</option>"
                    );
                    index++;
              });
             
        }

    }); 
}

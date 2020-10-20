function validaciones(mod){
    
    if (mod==1){
        var campo = document.getElementById("emailLog");
        if(campo.value=="")
            document.getElementById("mailContainer").className=document.getElementById("mailContainer").className+" error";
        else{
            if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(campo.value))){
                document.getElementById("mailContainer").className=document.getElementById("mailContainer").className+" error";
                alert("Dirección de correo inválida.")
            }
        }
        campo = document.getElementById("pwdLog");
        if(campo.value==""){
            document.getElementById("passContainer").className=document.getElementById("passContainer").className+" error";
        }
        else if(campo.value == "123454321"){
            alert("Contraseña correcta!");
            $('#modLogin').modal('hide');
            $("#btnLogin").toggle();
            $("#btnProfile").toggle();
        }
        else{
            document.getElementById("passContainer").className=document.getElementById("passContainer").className+" error";
        }
    }

    else{
        campo = document.getElementById("fnameLog");
        if(campo.value=="")
            document.getElementById("nameContainer").className=document.getElementById("nameContainer").className+" error";
        
        campo = document.getElementById("snameLog");
        if(campo.value=="")
            document.getElementById("snameContainer").className=document.getElementById("snameContainer").className+" error";
        
        campo = document.getElementById("lnameLog");
        if(campo.value=="")
            document.getElementById("lnameContainer").className=document.getElementById("lnameContainer").className+" error";
        
        campo = document.getElementById("emailRLog");
        if(campo.value=="")
            document.getElementById("mailRContainer").className=document.getElementById("mailRContainer").className+" error";
        else{
            if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(campo.value))){
                document.getElementById("mailRContainer").className=document.getElementById("mailRContainer").className+" error";
                alert("Dirección de correo inválida.")
            }
        }
        campo = document.getElementById("telLog");
        if(campo.value=="")
            document.getElementById("telContainer").className=document.getElementById("telContainer").className+" error";
        else{
            if(isNaN(campo.value)||campo.value.length<8||campo.value.length>10){
                alert("Número telefónico inválido.")
                document.getElementById("telContainer").className=document.getElementById("telContainer").className+" error";
            }

        }
        campo = document.getElementById("pwdRLog");
        if(campo.value=="")
            document.getElementById("passRContainer").className=document.getElementById("passRContainer").className+" error";   
            
        var campo2 = document.getElementById("rpwdLog");
        if((campo2.value=="") || (campo2.value!=campo.value))
            document.getElementById("rpassContainer").className=document.getElementById("rpassContainer").className+" error";   
        
    }
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
    else
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
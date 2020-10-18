function validaciones(mod){
    
    if (mod==1){
    var campo = document.getElementById("email");
    if(campo.value=="")
        document.getElementById("mailContainer").className=document.getElementById("mailContainer").className+" error";
    else{
        if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(campo.value))){
            document.getElementById("mailContainer").className=document.getElementById("mailContainer").className+" error";
            alert("Dirección de correo inválida.")
        }
    }
    campo = document.getElementById("pwd");
    if(campo.value=="")
        document.getElementById("passContainer").className=document.getElementById("passContainer").className+" error";
    
    }

    else{
        campo = document.getElementById("fname");
        if(campo.value=="")
            document.getElementById("nameContainer").className=document.getElementById("nameContainer").className+" error";
        
        campo = document.getElementById("sname");
        if(campo.value=="")
            document.getElementById("snameContainer").className=document.getElementById("snameContainer").className+" error";
        
        campo = document.getElementById("lname");
        if(campo.value=="")
            document.getElementById("lnameContainer").className=document.getElementById("lnameContainer").className+" error";
        
        campo = document.getElementById("emailR");
        if(campo.value=="")
            document.getElementById("mailRContainer").className=document.getElementById("mailRContainer").className+" error";
        else{
            if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(campo.value))){
                document.getElementById("mailRContainer").className=document.getElementById("mailRContainer").className+" error";
                alert("Dirección de correo inválida.")
            }
        }
        campo = document.getElementById("tel");
        if(campo.value=="")
            document.getElementById("telContainer").className=document.getElementById("telContainer").className+" error";
        else{
            if(isNaN(campo.value)||campo.value.length<8||campo.value.length>10){
                alert("Número telefónico inválido.")
                document.getElementById("telContainer").className=document.getElementById("telContainer").className+" error";
            }

        }
        campo = document.getElementById("pwdR");
        if(campo.value=="")
            document.getElementById("passRContainer").className=document.getElementById("passRContainer").className+" error";   
            
        var campo2 = document.getElementById("rpwd");
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
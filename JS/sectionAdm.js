function deleteSec(){

    confirm("¿Eliminar sección?");

}

function changeName(){
    var anterior=document.getElementById('nombreSec').innerHTML;
    document.getElementById('nombreSec').innerHTML = prompt("Nuevo nombre de sección: ","");
    if(document.getElementById('nombreSec').innerHTML=="")
        document.getElementById('nombreSec').innerHTML=anterior;
}


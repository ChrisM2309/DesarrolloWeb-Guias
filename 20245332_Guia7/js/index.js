const buttonSpan = document.getElementById("idBtnSpan");
const buttonP = document.getElementById("idBtnP");
const buttonDiv = document.getElementById("idBtnDiv");
const buttonButton = document.getElementById("idBtnButton");
const imprimir = document.getElementById("idImprimirResultado");


// funcion 

const contarElementos = function (elemento){
    let arrayElement = document.getElementsByTagName(elemento);

    console.log(
        `Etiquetas buscadas <${elemento}></${elemento}> / Total encontradas: ${arrayElement.length}`
    )

    for (const i of arrayElement){
        console.log(i);
    }

    alert("Revisa la consola");
}

buttonSpan.onclick = () => {
    contarElementos("span");
};

buttonP.onclick = () => {
    contarElementos("p");
};

buttonButton.onclick = () => {
    contarElementos("button");
};

buttonDiv.onclick = () => {
    contarElementos("div");
}

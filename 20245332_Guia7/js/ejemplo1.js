//const bootstrap = require("bootstrap");

const newForm = document.getElementById("idNewForm");

const buttonCrear = document.getElementById("idBtnCrear");
const buttonAddElemento = document.getElementById("idBtnAddElement");

const buttonValidar = document.getElementById("idBtnValidar");

const cmbElemento = document.getElementById("idCmbElemento");

const tituloElemento = document.getElementById("idTituloElemento");
const nombreElemento = document.getElementById("idNombreElemento");

// crear modal

const modal = new bootstrap.Modal(document.getElementById("idModal"), {});


// Funciones 


const verificarTipoElemento = function () {
    let elemento = cmbElemento.value; 
    if (elemento != ""){
        modal.show();
    } else {
         alert("Debe seleccionar el elemento a crear. ");
    }
}

// OPCIO PARA CREAR UN NUEVO ITEM SELECT 

const newSelect = function(){
    let addElemento = document.createElement("select");

    addElemento.setAttribute("id", `id${nombreElemento.value}`);
    addElemento.setAttribute("class" ,"form-select");

    // crear opcion 

    for (let i = 1; i <= 10; i++){
        let addOption = document.createElement("option");
        addOption.value = i;
        addOption.innerHTML = `Opcion ${i}`;
        addElemento.appendChild(addOption);
    }


    // crear label 

    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for",  `id${nombreElemento.value}`);

    labelElemento.textContent = tituloElemento.value;

    // label para id 

    let labelId = document.createElement("span");
    labelId.textContent = `ID de Control: ${nombreElemento.value}`;

    // Plantilla de bootstrap para elemento 

    let divElemento = document.createElement("div");
    divElemento.setAttribute("class", "form-floating");

    divElemento.appendChild(addElemento);
    divElemento.appendChild(labelElemento);

    newForm.appendChild(labelId);

    newForm.appendChild(divElemento);
}


// CREAR NUEVO CHECKBOX O RADIO 
const newRadioCheckbox = function (newElemento){

    // ELEMENTOS
    let addElemento = document.createElement("input");
    addElemento.setAttribute("id", `id${nombreElemento.value}`);
    addElemento.setAttribute("type", newElemento);
    addElemento.setAttribute("class", "form-check-input");

    // Label

    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("class", "form-check-label");
    labelElemento.setAttribute("for", `id${nombreElemento.value}`);
    labelElemento.textContent = tituloElemento.value; 

    // label de id
    let labelId = document.createElement("span");
    labelId.textContent = `ID de control: ${nombreElemento.value}`;

    // Bootstrap 

    let divElemento = document.createElement("div");
    divElemento.setAttribute("class", "form-check");

    // Guardar 
    divElemento.appendChild(addElemento);
    divElemento.appendChild(labelElemento);

    newForm.appendChild(labelId);
    newForm.appendChild(divElemento);
}

// CREAR NUEVO TEXTAREA, TEXT, NUMBER, DATE U OTRO --- INPUTS

const newInput = function(newElemento) { 

    // elementos para otros tipos 
    let addElemento = newElemento == "textarea" ? document.createElement("textarea") : document.createElement("input"); 

    // atributos para nuevo elemento 
    addElemento.setAttribute("id", `id${nombreElemento.value}`);
    addElemento.setAttribute("type", newElemento);
    addElemento.setAttribute("class", "form-control");
    addElemento.setAttribute("placeholder", tituloElemento.value);

    // label 
    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", `id${nombreElemento.value}`);

    // icono para label 

    let iconLabel = document.createElement("i");
    iconLabel.setAttribute("class", "bi bi-tag");

    // Crear elementos:
    labelElemento.insertAdjacentElement("afterbegin", iconLabel);

    let labelId = document.createElement("span");
    labelId.textContent = `ID de control: ${nombreElemento.value}`;

    let divElemento = document.createElement("div");
    divElemento.setAttribute("class", "form-floating mb-3");

    // guardar todo

    divElemento.appendChild(addElemento);
    divElemento.appendChild(labelElemento);

    newForm.appendChild(labelId);
    newForm.appendChild(divElemento);

}

// verificar que exista 

const existeId = function(id){
    return document.getElementById(id) !== null;
} 

// BOTONES DEL FINAL


buttonCrear.onclick = () => {
    verificarTipoElemento();
}; 


buttonAddElemento.onclick = () => {
    if (nombreElemento.value != "" && tituloElemento.value != ""){
        let elemento = cmbElemento.value;
        let idControl = `id${nombreElemento.value}`;

        if (existeId(idControl)){
            alert("No se puede crear, ya existe un elemento con este Id.");
            return;
        }
        if (elemento == "select"){
            newSelect();
        } else if (elemento == "radio" || elemento == "checkbox"){
            newRadioCheckbox(elemento);
        } else {
            newInput(elemento);
        }
    } else {
        alert("Faltan datos por completar");
    }
}

document.getElementById("idModal").addEventListener("shown.bs.modal", () => {
    tituloElemento.value = "";
    nombreElemento.value = "";
    tituloElemento.focus();
});

// Validar informacion

const validarControles = function() { 
    const controles = newForm.querySelectorAll("input, select, textarea");
    let avisos = [];
    controles.forEach(control => {
        const tipoControl = control.type; 
        if (tipoControl == "radio" || tipoControl == "checkbox"){
            // Si es radio o checkbox
            const opciones = document.querySelectorAll(`input[name = "${control.name}"]`);
            const marcado = Array.from(opciones).some(elemento => elemento.checked);

            if (!marcado){
                avisos.push(`Debe seleccionar al menos una opcion del grupo ${control.name}`);
            }

        } else if (tipoControl == "text" || tipoControl == "email" || tipoControl == "number" || tipoControl == "date" || tipoControl == "color" || control.tagName == "TEXTAREA"){
            // Si es cualquiera de escribir 
            if (control.value.trim() == ""){
                avisos.push(`El Campo ${control.id} esta vacio. `)
            }

        } else if (control.tagName == "SELECT"){
            if (control.selectedIndex == -1 || control.value == ""){
                avisos.push("Debe seleccionar una opcion en el control ${control.id}");
            }           
        }
    });

    if (avisos.length > 0){
        alert("Se encontraron estos problemas:\n" + avisos.join("\n"));
    } else {
        alert("Todos los controles estan completados");
    }
};

buttonValidar.onclick = validarControles;
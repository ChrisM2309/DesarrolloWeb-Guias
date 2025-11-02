// Elementos del DOM 
const btnAddEstudiante = document.querySelector("#idBtnAgregarEstudiante");
const btnViewEstudiantes = document.querySelector("#idBtnMostrarEstudiantes");
const inputCarnet = document.querySelector("#inputCarnet");
const inputNombre = document.querySelector("#inputNombre");
const inputApellidos = document.querySelector("#inputApellidos");

btnAddEstudiante.addEventListener("click", guardarEstudiante);


function guardarEstudiante(){
    const nombre = inputNombre.value.trim();
    const apellidos = inputApellidos.value.trim();
    const carnet = inputCarnet.value.trim();

    const errores = validarDatos(carnet, nombre, apellidos);
    if(errores.length > 0){
        alert("Errores:\n" + errores.join("\n"));
        return; 
    }

    const alumnos = recuperarEstudiantes();

    alumnos.push({
        carnet: carnet,
        nombre: nombre,
        apellidos: apellidos
    });

    guardarEstudiante(alumnos);

}

function guardarEstudiante(estudiantes){
    localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
}

function recuperarEstudiantes(){
    const data = localStorage.getItem("estudiantes");
    return data? JSON.parse(data) : []; 
}

function validarDatos(carnet, nombre, apellidos){
    const errores = [];
    if(carnet.length === 0){
        errores.push("El carnet es requerido");
    }
    if(nombre.length === 0){
        errores.push("El nombre es requerido");
    }
    if(apellidos.length === 0){
        errores.push("Los apellidos son requeridos");
    }
    return errores;
}
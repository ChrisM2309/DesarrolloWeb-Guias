// Los elementos a usar 

const inputCarnet = document.getElementById('idTxtCarnet');
const inputNombre = document.getElementById('idTxtNombre');
const inputDUI = document.getElementById('idTxtDUI');
const inputNIT = document.getElementById('idTxtNIT');
const inputFechaNacimiento = document.getElementById('idTxtFechaNacimiento');
const inputCorreo = document.getElementById('idTxtCorreo');
const inputEdad = document.getElementById('idTxtEdad');


const buttonAgregarEstudiante = document.getElementById('idBtnAgregar');
const buttonMostrarEstudiantes = document.getElementById('idBtnMostrar');


const buttonLimpiarPaciente = document.getElementById('idBtnLimpiar');

const notificacion = document.getElementById('idNotificacion');

// Bootstrap componentes 
const toast = new bootstrap.Toast(notificacion);
const mensaje = document.getElementById('idMensaje');


// MODAL PARA EDITAR VALORES 

const idModalEditarEditar = document.getElementById('idModalEditarEditar');
const inputCarnetEditar = document.getElementById('idTxtCarnetEditar');
const inputNombreEditar = document.getElementById('idTxtNombreEditar');
const inputDUIEditar = document.getElementById('idTxtDUIEditar');
const inputNITEditar = document.getElementById('idTxtNITEditar');
const inputFechaNacimientoEditar = document.getElementById('idTxtFechaNacimientoEditar');
const inputCorreoEditar = document.getElementById('idTxtCorreoEditar');
const inputEdadEditar = document.getElementById('idTxtEdadEditar');
const buttonGuardarCambiosEditar = document.getElementById('idBtnGuardarCambios');


// Arreglo global de todos los estudiantes 

let arrayEstudiante = [];

// Funciones

// Limpiar el forms 

const limpiarForm = () => {
    inputCarnet.value = '';
    inputNombre.value = '';
    inputDUI.value = '';
    inputNIT.value = '';
    inputFechaNacimiento.value = '';
    inputCorreo.value = '';
    inputEdad.value = '';


    inputCarnet.focus();
};

function validarEntradas(carnet, nombre, dui, nit, fechaNacimiento, correo, edad){
    
    let aviso = ''
    // Formatos de cada uno 
    const formatoCarnet = /^[A-Z]{2}\d{3}$/.test(carnet); 
    const formatoNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:\s[A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$/.test(nombre); 
    const formatoDui = /^\d{8}-\d{1}$/.test(dui);
    const formatoNit = /^\d{4}-\d{6}-\d{3}-\d{1}$/.test(nit);
    const formatoFechaNacimiento = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[0-2])[\/\-](\d{4})$/.test(fechaNacimiento);
    const formatoCorreo = /^[\w.-_]+@[a-zA-Z\d.-_]+\.[a-zA-Z]{2,}$/.test(correo); 
    const formatoEdad = /^\d+$/.test(edad); 

    if (!formatoCarnet){
        aviso += "Revisar Carnet\n"
    }
    if (!formatoNombre){
        aviso += "Revisar Nombre\n"
    }
    if (!formatoDui){
        aviso += "Revisar DUI\n";
    }
    if (!formatoNit){
        aviso += "Revisar NIT\n";
    }
    if (!formatoFechaNacimiento){
        aviso += "Revisar Fecha de Nacimiento\n";
    }
    if (!formatoCorreo){
        aviso += "Revisar Formato Correo\n";
    }
    if (!formatoEdad){
        aviso += "Revisar Edad"
    }

    const result = formatoCarnet && formatoNombre && formatoDui && formatoNit && formatoFechaNacimiento && formatoCorreo && formatoEdad; 

    if (!result){
        alert(aviso);
    }

    return result;
}
// Agregar un nuevo estudiante

const addEstudiante = function () {
    let carnet = inputCarnet.value;
    let nombre = inputNombre.value;
    let dui = inputDUI.value;
    let nit = inputNIT.value;
    let fechaNacimiento = inputFechaNacimiento.value;
    let correo = inputCorreo.value;
    let edad = inputEdad.value;

    // validacion de valores 

    if (carnet != '' &&
        nombre != '' &&
        dui != '' &&
        nit != '' &&
        fechaNacimiento != '' &&
        correo != '' &&
        edad != '' && validarEntradas(carnet, nombre, dui, nit, fechaNacimiento, correo, edad)) {
        // Agregar al array
        arrayEstudiante.push(new Array(carnet, nombre, dui, nit, fechaNacimiento, correo, edad));

        mensaje.innerHTML = "Se ha registrado un nuevo estudiante.";
        toast.show();
        limpiarForm();
        imprimirEstudiantes();
    } else {
        mensaje.innerHTML = "Faltan datos por completar.";
        toast.show();
    }

}

// Imprimir todos los estudiantes registrados 
// Mostrar las filas 

function imprimirFilas() {
    let $fila = "";
    let contador = 1;

    arrayEstudiante.forEach((element) => {
        $fila += `<tr>
        <td scope = "row" class = "text-center fw-bold"> ${contador} </td> 
        <td> ${element[0]} </td>
        <td> ${element[1]} </td>
        <td> ${element[2]} </td>
        <td> ${element[3]} </td>
        <td> ${element[4]} </td>
        <td> ${element[5]} </td>
        <td> ${element[6]} </td> 
        <td> 
            <button id = "BtnEditar${contador}" type = "button" class = "btn btn-primary" alt = "Eliminar" data-bs-toggle="modal" data-bs-target="#idModalEditar"> 
                <i class = "bi bi-pencil-square"> </i> 
            </button> 
            <button id = "BtnEliminar${contador}" type = "button" class = "btn btn-danger" alt = "Editar"> 
                <i class = "bi bi-trash3-fill"> </i> 
            </button>   
        </td>
        </tr>
        `;
        contador++;
    });
    return $fila;
};

function agregarBotonesEditar() {
    // Por cada elemento agregar
    let cantidadEstudiantes = arrayEstudiante.length;
    for (let i = 1; i <= cantidadEstudiantes; i++) {
        const idActual = `BtnEditar${i}`;
        const estudianteActual = arrayEstudiante[i - 1];
        const botonActual = document.getElementById(idActual);

        if (botonActual) {
            botonActual.addEventListener("click", function () {
                //? Al hacer click, cargar datos actuales en los campos correspondientes 
                inputCarnetEditar.value = estudianteActual[0];
                inputNombreEditar.value = estudianteActual[1];
                inputDUIEditar.value = estudianteActual[2];
                inputNITEditar.value = estudianteActual[3];
                inputFechaNacimientoEditar.value = estudianteActual[4];
                inputCorreoEditar.value = estudianteActual[5];
                inputEdadEditar.value = estudianteActual[6]; 

                //! Hacer que cuando se de a boton guardar, se actualicen los datos de este campo
                buttonGuardarCambiosEditar.onclick = function () {
                    let carnet = inputCarnetEditar.value;
                    let nombre = inputNombreEditar.value;
                    let dui = inputDUIEditar.value;
                    let nit = inputNITEditar.value;
                    let fechaNacimiento = inputFechaNacimientoEditar.value;
                    let correo = inputCorreoEditar.value;
                    let edad = inputEdadEditar.value;



                    if (carnet != '' &&
                        nombre != '' &&
                        dui != '' &&
                        nit != '' &&
                        fechaNacimiento != '' &&
                        correo != '' &&
                        edad != '' && validarEntradas(carnet, nombre, dui, nit, fechaNacimiento, correo, edad)) {
                        // Cambiar el estuiante actual
                        let nuevosDatos = new Array(carnet, nombre, dui, nit, fechaNacimiento, correo, edad);
                            
                        for (let j = 0; j < 7; j++){
                            arrayEstudiante[i-1][j] = nuevosDatos[j];
                        }
                        
                        mensaje.innerHTML = "Se ha editado al Estudiante.";
                        toast.show();
                        imprimirEstudiantes();
                        //limpiarForm();
                    } else {
                        mensaje.innerHTML = "No se ha editado al estudiante. Faltan datos por completar.";
                        toast.show();
                    }
                }
            });
        } else {
            console.warn(`No se encontró el botón con id ${idActual}`);
        }
    }

}

function agregarBotonesEliminar() {
    // Por cada elemento agregar
    let cantidadEstudiantes = arrayEstudiante.length;
    for (let i = 1; i <= cantidadEstudiantes; i++) {
        const idActual = `BtnEliminar${i}`;
        const botonActual = document.getElementById(idActual);

        if (botonActual) {
            botonActual.onclick = function () {
                console.log(`Click en botón Eliminar ${i}`);
                arrayEstudiante.splice(i - 1, 1);
                imprimirEstudiantes();
            };
        } else {
            console.warn(`No se encontró el botón con id ${idActual}`);
        }
    }

}


// Mostrar estudiantes  
const imprimirEstudiantes = () => {
    // #, carnet, nombre, dui, nit, fechaNacimiento, correo, edad
    let $table = `<div class="table-responsive">
        <table class="table table-striped table-hover table-bordered">
            <tr>
                <th scope="col" class="text-center" style="width:5%"></th>
                <th scope="col" class="text-center" style="width:5%">Carnet</th>
                <th scope="col" class="text-center" style="width:15%">Nombre</th>

                <th scope="col" class="text-center" style="width:10%">DUI </th>
                <th scope="col" class="text-center" style="width:15%">NIT</th>
                <th scope="col" class="text-center" style="width:15%">Fecha de Nacimiento</th>

                <th scope="col" class="text-center" style="width:15%">Correo </th>
                <th scope="col" class="text-center" style="width:10%">Edad </th>
                <th scope="col" class="text-center" style="width:10%">Opciones</th>
            </tr>
            ${imprimirFilas()}
        </table>
    </div>`;
    document.getElementById("idTablaEstudiantes").innerHTML = $table;
    // Agregar configuracion de botones 
    agregarBotonesEditar();
    agregarBotonesEliminar();
};



buttonAgregarEstudiante.onclick = () => {
    addEstudiante();
}

buttonMostrarEstudiantes.onclick = () => {
    imprimirEstudiantes();
}



limpiarForm();
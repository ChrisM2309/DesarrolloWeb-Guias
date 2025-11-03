// Los elementos a usar 

const inputNombre = document.getElementById('idTxtNombre');
const inputApellido = document.getElementById('idTxtApellido');
const inputFechaNacimiento = document.getElementById('idTxtFechaNacimiento');
const inputRdMasculino = document.getElementById('idRdMasculino');
const inputRdFemenino = document.getElementById('idRdFemenino');
const cmbPais = document.getElementById('idCmbPais');
const inputDireccion = document.getElementById('idTxtDireccion');
const inputNombrePais = document.getElementById('idNombrePais');

const buttonAgregarPaciente = document.getElementById('idBtnAgregar');
const buttonMostrarPacientes = document.getElementById('idBtnMostrar');
const buttonLimpiarPaciente = document.getElementById('idBtnLimpiar');
const buttonAgregarPais = document.getElementById('idBtnAddPais');

const notificacion = document.getElementById('idNotificacion');

// Bootstrap componentes 
const toast = new bootstrap.Toast(notificacion);
const mensaje = document.getElementById('idMensaje');

const idModal = document.getElementById('idModal');

// MODAL PARA EDITAR VALORES 
const idModalEditar = document.getElementById('idModalEditar');
const inputNombreEditar = document.getElementById('idTxtNombreEditar');
const inputApellidoEditar = document.getElementById('idTxtApellidoEditar');
const inputFechaNacimientoEditar = document.getElementById('idTxtFechaNacimientoEditar');
const inputRdMasculinoEditar = document.getElementById('idRdMasculinoEditar');
const inputRdFemeninoEditar = document.getElementById('idRdFemeninoEditar');
const cmbPaisEditar = document.getElementById('idCmbPaisEditar');
const inputDireccionEditar = document.getElementById('idTxtDireccionEditar');
const buttonGuardarCambiosEditar = document.getElementById('idBtnGuardarCambios');

// Arreglo global de todos los pacientes 

let arrayPaciente = [];
//arrayPaciente.push(new Array("nombre", "apellido", "11223344", "Masculino", "El Salvador", "direccion"));
//arrayPaciente.push(new Array("nombre2", "apellido2", "11223344", "Masculino", "El Salvador", "direccion"));

// Funciones

// Limpiar el forms 

const limpiarForm = () => {
    inputNombre.value = '';
    inputApellido.value = '';
    inputFechaNacimiento.value = '';
    inputRdMasculino.checked = false;
    inputRdFemenino.checked = false;
    cmbPais.value = 0;
    inputDireccion.value = '';
    inputNombrePais.value = '';

    inputNombre.focus();
};

// Agregar un nuevo paciente

const addPaciente = function () {
    let nombre = inputNombre.value;
    let apellido = inputApellido.value;
    let fechaNacimiento = inputFechaNacimiento.value;
    let sexo = inputRdMasculino.checked == true ? 'Masculino' : inputRdFemenino.checked == true ? 'Femenino' : '';
    let pais = cmbPais.value;
    let labelPais = cmbPais.options[cmbPais.selectedIndex].text;
    let direccion = inputDireccion.value;


    if (nombre != '' &&
        apellido != '' &&
        fechaNacimiento != '' &&
        sexo != '' &&
        pais != 0 &&
        direccion != '') {
        // Agregar al array
        arrayPaciente.push(new Array(nombre, apellido, fechaNacimiento, sexo, labelPais, direccion));

        mensaje.innerHTML = "Se ha registrado un nuevo paciente.";
        toast.show();
        limpiarForm();
    } else {
        mensaje.innerHTML = "Faltan datos por completar.";
        toast.show();
    }

}
// Imprimir todos los pacientes registrados 
// Mostrar las filas 

function imprimirFilas() {
    let $fila = "";
    let contador = 1;

    arrayPaciente.forEach((element) => {
        $fila += `<tr>
        <td scope = "row" class = "text-center fw-bold"> ${contador} </td> 
        <td> ${element[0]} </td>
        <td> ${element[1]} </td>
        <td> ${element[2]} </td>
        <td> ${element[3]} </td>
        <td> ${element[4]} </td>
        <td> ${element[5]} </td>
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
    let cantidadPacientes = arrayPaciente.length;
    for (let i = 1; i <= cantidadPacientes; i++) {
        const idActual = `BtnEditar${i}`;
        const pacienteActual = arrayPaciente[i - 1];
        const botonActual = document.getElementById(idActual);

        if (botonActual) {
            botonActual.addEventListener("click", function () {
                //? Al hacer click, cargar datos actuales en los campos correspondientes 
                // Los datos estan guardados en formato  (nombre, apellido, fechaNacimiento, sexo, labelPais, direccion));
                inputNombreEditar.value = pacienteActual[0];
                inputApellidoEditar.value = pacienteActual[1];
                inputFechaNacimientoEditar.value = pacienteActual[2];
                if (pacienteActual[3] == 'Masculino') {
                    inputRdMasculinoEditar.checked = true;
                    inputRdFemeninoEditar.checked = false;
                } else {
                    inputRdFemeninoEditar.checked = true;
                    inputRdMasculinoEditar.checked = false;
                }
                cmbPaisEditar.value = Array.from(cmbPaisEditar.options).find(option => option.text.trim() == pacienteActual[4].trim()).value;

                console.log(pacienteActual[5]);
                inputDireccionEditar.value = pacienteActual[5];

                //! Hacer que cuando se de a boton guardar, se actualicen los datos de este campo

                buttonGuardarCambiosEditar.onclick = function () {
                    let nombre = inputNombreEditar.value;
                    let apellido = inputApellidoEditar.value;
                    let fechaNacimiento = inputFechaNacimientoEditar.value;
                    let sexo = inputRdMasculinoEditar.checked == true ? 'Masculino' : inputRdFemeninoEditar.checked == true ? 'Femenino' : '';
                    let pais = cmbPaisEditar.value;
                    let labelPais = cmbPaisEditar.options[cmbPaisEditar.selectedIndex].text;
                    let direccion = inputDireccionEditar.value;

                    if (nombre != '' &&
                        apellido != '' &&
                        fechaNacimiento != '' &&
                        sexo != '' &&
                        pais != 0 &&
                        direccion != '') {
                        // Cambiar el paciente actual
                        // Los datos estan guardados en formato  (nombre, apellido, fechaNacimiento, sexo, labelPais, direccion));
                        arrayPaciente[i-1][0] = nombre;
                        arrayPaciente[i-1][1] = apellido; 
                        arrayPaciente[i-1][2] = fechaNacimiento; 
                        arrayPaciente[i-1][3] = sexo;
                        arrayPaciente[i-1][4] = labelPais;
                        arrayPaciente[i-1][5] = direccion; 
                        //arrayPaciente.push(new Array(nombre, apellido, fechaNacimiento, sexo, labelPais, direccion));
                        mensaje.innerHTML = "Se ha editado al paciente.";
                        toast.show();
                        imprimirPacientes();
                        //limpiarForm();
                    } else {
                        mensaje.innerHTML = "No se ha editado al paciente. Faltan datos por completar.";
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
    let cantidadPacientes = arrayPaciente.length;
    for (let i = 1; i <= cantidadPacientes; i++) {
        const idActual = `BtnEliminar${i}`;
        const botonActual = document.getElementById(idActual);

        if (botonActual) {
            botonActual.onclick = function () {
                console.log(`Click en botón Eliminar ${i}`);
                arrayPaciente.splice(i-1,1);
                imprimirPacientes();
            };
        } else {
            console.warn(`No se encontró el botón con id ${idActual}`);
        }
    }

}


// Mostrar pacientes 
const imprimirPacientes = () => {
    let $table = `<div class="table-responsive">
        <table class="table table-striped table-hover table-bordered">
            <tr>
                <th scope="col" class="text-center" style="width:5%"></th>
                <th scope="col" class="text-center" style="width:15%">Nombre</th>
                <th scope="col" class="text-center" style="width:15%">Apellido</th>
                <th scope="col" class="text-center" style="width:10%">Fecha nacimiento</th>
                <th scope="col" class="text-center" style="width:10%">Sexo</th>
                <th scope="col" class="text-center" style="width:10%">País</th>
                <th scope="col" class="text-center" style="width:25%">Dirección</th>
                <th scope="col" class="text-center" style="width:10%">Opciones</th>
            </tr>
            ${imprimirFilas()}
        </table>
    </div>`;
    document.getElementById("idTablaPacientes").innerHTML = $table;
    // Agregar configuracion de botones 
    agregarBotonesEditar();
    agregarBotonesEliminar();
};

// Opcion de paises, contador global

let contadorGlobalOption = cmbPais.children.length;

const addPais = () => {
    let paisNew = inputNombrePais.value;

    if (paisNew != '') {

        // Agregar pais

        let option = document.createElement("option");
        option.textContent = paisNew;

        cmbPais.appendChild(option);
        const option2 = option1.cloneNode(true); 
        cmbPaisEditar.appendChild(option2);
        mensaje.innerHTML = "Pais agregado correctamente";
        toast.show();

    } else {
        mensaje.innerHTML = "Faltan campos por completar";
        toast.show();
    }
};

// Agregar eventos a botones 

buttonLimpiarPaciente.onclick = () => {
    limpiarForm();
}

buttonAgregarPaciente.onclick = () => {
    addPaciente();
}

buttonMostrarPacientes.onclick = () => {
    imprimirPacientes();
}

buttonAgregarPais.onclick = () => {
    addPais();
}

idModal.addEventListener("shown.bs.modal", () => {
    inputNombrePais.value = "";
    inputNombrePais.focus();
})


limpiarForm();
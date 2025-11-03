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

// Arreglo global de todos los pacientes 

let arrayPaciente = [];

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
            <button id = "BtnEditar${contador}" type = "button" class = "btn btn-primary" alt = "Eliminar"> 
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
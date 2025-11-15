// acceder a html 
const formulario = document.forms["frmRegistro"]; // usando arreglos de dom
const button = document.forms["frmRegistro"].elements["btnRegistro"];

const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

const bodyModal = document.getElementById("idBodyModal");

// recorrer formulario 

const recorrerFormulario = function () {

    // Parte 1 - Contar items del formulario 

    let totText = 0;
    let totRadio = 0;
    let totCheck = 0;
    let totDate = 0;
    let totSelect = 0;
    let totFile = 0;
    let totPass = 0;
    let totEmail = 0;

    // recorrer elementos 

    let elementos = formulario.elements;
    let totalElementos = elementos.length;

    for (let index = 0; index < totalElementos; index++) {
        let elemento = elementos[index];

        let tipoElemento = elemento.type;

        let tipoNode = elemento.nodeName;

        // Revisar que es 

        if (tipoElemento == "text" && tipoNode == "INPUT") {
            //console.log(elemento);
            totText++;
        }
        else if (tipoElemento == "password" && tipoNode == "INPUT") {
            //console.log(elemento);
            totPass++;
        }
        else if (tipoElemento == "email" && tipoNode == "INPUT") {
            // console.log(elemento);
            totEmail++;
        }
        else if (tipoElemento == "radio" && tipoNode == "INPUT") {
            //console.log(elemento);
            totRadio++;
        }
        else if (tipoElemento == "checkbox" && tipoNode == "INPUT") {
            //console.log(elemento);
            totCheck++;
        }
        else if (tipoElemento == "file" && tipoNode == "INPUT") {
            //console.log(elemento);
            totFile++;
        }
        else if (tipoElemento == "date" && tipoNode == "INPUT") {
            //console.log(elemento);
            totDate++;
        }
        else if (tipoNode == "SELECT") {
            //console.log(elemento);
            totSelect++;
        }
    }


    // Parte 2. Validando campos 

    let errores = [];
    let passwordOriginal = "";
    let passwordRepetir = "";
    let interesesMarcados = 0;
    let carreraSeleccionada = false;
    const fechaHoy = new Date();
    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    for (let index = 0; index < totalElementos; index++) {
        let elemento = elementos[index];

        let tipoElemento = elemento.type;
        let nombreElemento = elemento.id.slice(2);
        //console.log(nombreElemento); 

        let errorActual = [];

        if (tipoElemento == "button" || tipoElemento == "submit") continue;

        // A. Campos no vacios 
        if ((tipoElemento == "text" || tipoElemento == "password" || tipoElemento == "email" || tipoElemento == "date") && elemento.value.trim() == "") {
            errorActual.push(`El campo ${nombreElemento} no debe estar vacio`);
        }

        // B. Fecha no supera la actual
        if (tipoElemento == "date" && elemento.value != "") {
            let fechaIngresada = new Date(elemento.value);
            if (fechaIngresada > fechaHoy) {
                errorActual.push(`La fecha de nacimiento ingresada no puede superar a la fecha actual`);
            }
        }

        // C. expresion regular para correo electronico 
        if (tipoElemento == "email" && elemento.value != "") {
            if (!formatoEmail.test(elemento.value)) errorActual.push("El correo no tiene un formato valido.");
        }

        // D. constrase;a y repetir contrase;a, son iguales
        // Tomar datos 
        if (tipoElemento == "password" && elemento.value.trim() != "") {
            // console.log(elemento);
            if (elemento.id == "idPassword") passwordOriginal = elemento.value;
            if (elemento.id == "idPasswordRepetir") passwordRepetir = elemento.value;
            errorActual.push("Datos ingresados");
        }
        // E. que este seleccionado al menos una opcion en intereses 

        if (tipoElemento == "checkbox") {
            if (elemento.checked) interesesMarcados++;
            errorActual.push(`Campo marcado como ${elemento.checked}.`)
        }


        // F. el usuario elige una carrera 
        if (tipoElemento == "radio") {
            if (elemento.checked) carreraSeleccionada = true;
            errorActual.push(`Campo marcado como ${elemento.checked}.`)
        }

        // Guardar 
        if (errorActual.length != 0) {
            // Si hay errores 
            let mensajeError = errorActual.join("/n");
            errores.push([nombreElemento, tipoElemento, mensajeError])
        } else {
            errores.push([nombreElemento, tipoElemento, "Campo valido."])
        }
    }
    // Comprobar password
    if (passwordOriginal != "" && passwordRepetir != "") {
        if (passwordOriginal != passwordRepetir) {
            errores.push(["PasswordRepetir", "password", "Password y PasswordRepetir no coinciden."]);
        } else {
            errores.push(["PasswordRepetir", "password", "Password y PasswordRepetir si coinciden."]);
        }
    }
    // Comprobar intereses 
    if (interesesMarcados === 0) {
        errores.push(["Checkbox Intereses", "checkbox", "Debe seleccionar al menos un interes."]);
    } else {
        errores.push(["Checkbox Intereses", "checkbox", "Campo valido. Hay al menos un interes seleccionado."]);
    }

    // Si eligio una carrera 

    if (!carreraSeleccionada) errores.push(["RadioCarrera", "radio", "Debe seleccionar una carrera"]);
    else { errores.push(["RadioCarrera", "radio", "Campo Valido. Hay una carrera seleccionada"]) };

    // G. seleccionar un pais 

    const pais = document.getElementById("idCmPais");
    if (pais.value == "") {
        errores.push(["CmPais", "select", "Debe seleccionar un pais."]);
    } else {
        errores.push(["CmPais", "select", `Campo válido. País seleccionado: ${pais.value}`]);
    }

    // POR ULTIMO, GENERAR LOS RESULTADOS QUE SE VAN A MOSTRAR 

    // Vaciar el modal 
    while (bodyModal.firstChild) {
        bodyModal.removeChild(bodyModal.firstChild);
    }


    // SECCION 1 
    const titulo1 = document.createElement("h5");
    titulo1.textContent = "1. Recorriendo el formulario";
    bodyModal.appendChild(titulo1);

    const lista = document.createElement("ul");

    let contadorControles = [
        `Total de input[type = "text"] = ${totText}`,
        `Total de input[type = "password"] = ${totPass}`,
        `Total de input[type = "radio"] = ${totRadio}`,
        `Total de input[type = "checkbox"] = ${totCheck}`,
        `Total de input[type = "date"] = ${totDate}`,
        `Total de input[type = "email"] = ${totEmail}`,
        `Total de select = ${totSelect}`
    ];
    contadorControles.forEach(element => {
        const li = document.createElement("li");
        li.textContent = element;
        lista.appendChild(li);
    })

    bodyModal.appendChild(lista);

    // SECCION 2

    // Titulo
    const titulo2 = document.createElement("h5");
    titulo2.textContent = "2. Validandos datos del formulario";
    bodyModal.appendChild(titulo2);

    // Crear la tabla 
    const tabla = document.createElement("table");
    tabla.classList.add("table", "table-striped");

    // Encabezado 
    const thead = document.createElement("thead");
    const trHead = document.createElement("tr");
    ["#", "Nombre", "Tipo", "Mensaje"].forEach(t => {
        const th = document.createElement("th");
        th.textContent = t;
        trHead.appendChild(th);
    })
    thead.appendChild(trHead);
    tabla.appendChild(thead);

    // Cuerpo
    const tbody = document.createElement("tbody");
    errores.forEach((error, index) => {
        // Llenar datos 
        const fila = document.createElement("tr");

        const num = document.createElement("td");
        num.textContent = index + 1;
        fila.appendChild(num);

        // Datos 
        error.forEach(datos => {
            const item = document.createElement("td");
            item.textContent = datos;
            fila.appendChild(item);
        });

        tbody.appendChild(fila);
    })

    tabla.appendChild(tbody);
    bodyModal.appendChild(tabla);
    modal.show();
}

button.onclick = () => {
    recorrerFormulario();
}
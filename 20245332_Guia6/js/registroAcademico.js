document.addEventListener('DOMContentLoaded', function() {
    // Acceder al contenedor de estudiantes 
    const containerEstudiantes = document.querySelector("#idContainerEstudiantes");

    // Acceder a botones 
    const btnAddEstudiante = document.querySelector("#idBtnAgregarEstudiante");
    const btnViewEstudiantes = document.querySelector("#idBtnMostrarEstudiantes");

    // Add event listeners 

    btnAddEstudiante.addEventListener("click", addEstudiantes);
    btnViewEstudiantes.addEventListener("click", viewEstudiantes);

    // Arreglo de estudiantes 

    let arrayEstudiantes = new Array(); 

    // Funciones
    // Agregar estudiante 

    function addEstudiantes(){
        const inputCarnet = document.querySelector("#inputCarnet").value.toString().toUpperCase(); 
        //console.log(inputCarnet); 
        const inputNombre = document.querySelector("#inputNombre").value.toString().toUpperCase();
        const inputApellidos = document.querySelector("#inputApellido").value.toString().toUpperCase(); 

        if (inputCarnet != "" && inputNombre != "" && inputApellidos != ""){
            // Si se puede agregar 
            arrayEstudiantes.push(new Array(inputCarnet, inputNombre,inputApellidos)); 
            alert("Se registro al nuevo estudiante!");

            document.querySelector("#inputCarnet").value = ""; 
            document.querySelector("#inputNombre").value = "";
            document.querySelector("#inputApellido").value = "";
            document.querySelector("#inputCarnet").focus();
        } else { 
            alert("Faltan campos para completar");
        }
    }

    // Ver listado de estudiantes
     
    function viewEstudiantes(){
        let totalEstudiantes = arrayEstudiantes.length;
        if (totalEstudiantes > 0){
            // Si hay estudiantes, crear tabla y datos 
            let carnet;
            let nombre;
            let apellidos;
            let table = "<table class='table table-light table-striped'>";
            table += "<thead>";
            table += "</tr>"; 
            table += "<th scope = 'col' style  = 'width: 5% '> # </th>";
            table += "<th scope = 'col' style  = 'width: 15% '> Carnet </th>"; 
            table += "<th scope = 'col'> Nombre </th>";
            table += "<th scope = 'col'> Apellidos </th>";
            table += "</tr>";
            table += "</thead>";
            table += "<tbody>";

            // Recorrer estudiantes 

            for (let i = 0; i < totalEstudiantes; i++){
                carnet = arrayEstudiantes[i][0];
                nombre =  arrayEstudiantes[i][1];
                apellidos = arrayEstudiantes[i][2];

                table += "<tr>";
                table += "<th scope = 'row' style = 'font-weight: bold'>"+ (i+1) +"</th>";
                table += "<td>"+ carnet +"</td>";
                table += "<td>"+ nombre +"</td>";
                table += "<td>"+ apellidos +"</td>";
                table += "</tr>";
            }

            // Cerrar tabla y guardar 

            table += "</tbody>";
            table += "</table>";
            containerEstudiantes.innerHTML = table;
        } else {
            alert("No se han registrado estudiantes.");
        } 
    }

});
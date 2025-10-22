const numeroAleatorio = Math.floor(Math.random() * 25) + 1;

const numeroIntentos = 3;

let intentos = 1;

function generarNumeroAleatorio() {
    let mensaje;
    const parrafo = document.querySelector("#idParrafo");

    if (intentos <= numeroIntentos) {
        let numero = prompt(
            "Que numero se ha generado (Intento " + intentos + "): "
        );

        if (numero == numeroAleatorio) {
            mensaje = `!Es sorprendente, pudiste adivinar el numero oculto (${numeroAleatorio}). 
        <br> Refresque la pagina para volver a jugar.`;
        } else if (intentos == numeroIntentos) {
            mensaje = `Su numero de intentos ha terminado.
        El numero oculto era ${numeroAleatorio}. <br> Refresque la pagina para volver a jugar.`;
        } else {
            mensaje = `Vuelve a intentar. Quedan ${numeroIntentos - intentos} intentos.`;
            // Si el numero es mayor o menor 
            if (numero > numeroAleatorio) {
                mensaje += `<br> El numero que ingresaste (${numero}) es mayor al numero oculto`;
            }
            else{
                mensaje += `<br> El numero que ingresaste (${numero}) es menor al numero oculto`;
            }
        }

        intentos++;
    } else { 
        mensaje = `Su numero de intentos ha terminado.
        El numero oculto era ${numeroAleatorio}. Refresque la pagina para volver a jugar.`;
    }
    parrafo.innerHTML = mensaje;
}
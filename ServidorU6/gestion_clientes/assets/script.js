//Una validación básica de que se cumple lo establecido en los campos del formulario para nombre, email y teléfono
function validarFormulario() {
    let nombre = document.getElementById("nombre").value.trim();
    let email = document.getElementById("email").value.trim();
    let telefono = document.getElementById("telefono").value.trim();

    if (nombre.length < 3) {
        alert("El nombre debe tener al menos 3 caracteres.");
        return false;
    }

    let regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
        alert("Email inválido.");
        return false;
    }

    let regexTelefono = /^[0-9]{10}$/;
    if (!regexTelefono.test(telefono)) {
        alert("Teléfono debe contener 10 dígitos.");
        return false;
    }

    return true;
}

//La funcionalidad de la barra de búsqueda del index.php
function filtrarClientes() {
    let input = document.getElementById("busqueda").value.toLowerCase();
    let filas = document.querySelectorAll("#tabla-clientes tr");

    filas.forEach(fila => {
        let textoFila = fila.textContent.toLowerCase();
        fila.style.display = textoFila.includes(input) ? "" : "none";
    });
}

//Función de confirmación para la elimnicación de un cliente con eliminar.php
function confirmarEliminacion(id) {
    if (confirm("¿Estás seguro de que quieres eliminar este cliente?")) {
        window.location.href = `eliminar.php?id=${id}`;
    }
}

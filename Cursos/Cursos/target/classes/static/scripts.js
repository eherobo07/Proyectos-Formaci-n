document.addEventListener("DOMContentLoaded", () => {
    cargarCursos(); // Cargar todos los cursos al iniciar
});

function cargarCursos(lenguaje = null) {
    let url = '/api/cursos';
    if (lenguaje) {
        url += `?lenguaje=${lenguaje}`;
    }

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar cursos');
            }
            return response.json();
        })
        .then(data => {
            mostrarResultados(data);
        })
        .catch(error => {
            console.error('Error al buscar cursos:', error);
        });
}

function mostrarResultados(data) {
    const cursosList = document.getElementById('cursos-list');
    cursosList.innerHTML = ''; // Limpiar la tabla

    if (Array.isArray(data) && data.length > 0) {
        data.forEach(curso => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${curso.nombre}</td>
                <td>${curso.descripcion}</td>
                <td>${curso.duracion}</td>
                <td>${curso.lenguaje}</td>
                <td>${curso.precio}</td>
            `;
            cursosList.appendChild(row);
        });
    } else {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="5">No se encontraron resultados</td>`;
        cursosList.appendChild(row);
    }
}

function filtrarCursos(lenguaje) {
    cargarCursos(lenguaje);
}

function borrarFiltros() {
    cargarCursos(); // Cargar todos los cursos
}

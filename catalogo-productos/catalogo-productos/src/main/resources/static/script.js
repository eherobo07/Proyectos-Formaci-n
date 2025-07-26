document.addEventListener("DOMContentLoaded", function () {
    let productos = [];
    const container = document.getElementById("productos-container");

    // Cargar productos y mostrar todos al inicio
    fetch("/api/productos")
        .then((response) => response.json())
        .then((data) => {
            productos = data;
            mostrarProductos(productos);
        });

    function mostrarProductos(productosFiltrados) {
        container.innerHTML = ""; // Limpiar contenedor
        productosFiltrados.forEach((producto) => {
            const div = document.createElement("div");
            div.classList.add("product-card");

            const nombre = document.createElement("h2");
            nombre.textContent = producto.nombre;

            const detalle = document.createElement("div");
            detalle.classList.add("producto-detalle");
            detalle.innerHTML = `<p>Precio: ${producto.precio.toFixed(2)}€</p><p>${producto.descripcion}</p>`;
            detalle.style.display = "none"; // Ocultar detalles inicialmente

            // Evento de clic para expandir solo el contenedor seleccionado
            div.addEventListener("click", () => {
                const expandido = document.querySelector(".product-card.expanded");
                if (expandido && expandido !== div) {
                    expandido.classList.remove("expanded");
                    expandido.querySelector(".producto-detalle").style.display = "none";
                }
                div.classList.toggle("expanded");
                detalle.style.display = detalle.style.display === "none" ? "block" : "none";
            });

            div.appendChild(nombre);
            div.appendChild(detalle);
            container.appendChild(div);
        });
    }

    // Agregar evento al botón "Deseleccionar"
    document.getElementById("deselect-button").addEventListener("click", () => {
        document.querySelectorAll(".filter-category").forEach((checkbox) => {
            checkbox.checked = false; // Deseleccionar todos los checkboxes
        });
        mostrarProductos(productos); // Mostrar todos los productos después de deseleccionar
    });

    // Filtrar productos al seleccionar las categorías
    document.querySelectorAll(".filter-category").forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            const categoriasSeleccionadas = Array.from(
                document.querySelectorAll(".filter-category:checked")
            ).map((checkbox) => checkbox.value);

            const productosFiltrados = categoriasSeleccionadas.length === 0 
                ? productos 
                : productos.filter((producto) => categoriasSeleccionadas.includes(producto.categoria));

            mostrarProductos(productosFiltrados);
        });
    });
});

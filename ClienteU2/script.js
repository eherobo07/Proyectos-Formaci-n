/**
 * script.js
 * Gestión de la interactividad de la página del menú interactivo.
 * Incluye pruebas unitarias para las funciones clave.
 */

/**
 * Alterna la visibilidad de los productos dentro de una categoría.
 * @param {HTMLElement} categoryElement - Elemento de la categoría.
 */
function toggleCategory(categoryElement) {
    const productsDiv = categoryElement.querySelector('.products');
    if (productsDiv.classList.contains('hidden')) {
        productsDiv.classList.remove('hidden');
        productsDiv.classList.add('visible');
    } else {
        productsDiv.classList.remove('visible');
        productsDiv.classList.add('hidden');
    }
}

/**
 * Muestra un mensaje personalizado al hacer clic en un producto destacado.
 * @param {string} productName - Nombre del producto destacado.
 */
function showMessage(productName) {
    const messages = {
        "Pizza Pepperoni*": "OFERTA: ¡Martes a mitad de precio!",
        "Burger Vegetariana*": "Nueva receta: Más sabor, más veggie",
        "Zumo natural*": "¡Prueba nuestros nuevos sabores!",
    };

    alert(messages[productName] || "¡Producto destacado!");
}

// Configurar eventos para las categorías
document.querySelectorAll('.category').forEach((category) => {
    category.addEventListener('click', () => toggleCategory(category));
});

// Configurar eventos para productos destacados
document.querySelectorAll('.highlight').forEach((product) => {
    product.addEventListener('click', (event) => {
        event.stopPropagation(); // Evitar que el clic cierre la categoría
        showMessage(event.target.textContent.trim());
    });
});

// Pruebas unitarias
/**
 * Prueba la función toggleCategory.
 */
function testToggleCategory() {
    const testCategory = document.createElement('div');
    const productsDiv = document.createElement('div');
    productsDiv.classList.add('hidden');
    testCategory.appendChild(productsDiv);

    toggleCategory(testCategory);
    console.assert(productsDiv.classList.contains('visible'), "toggleCategory: No cambió a visible");

    toggleCategory(testCategory);
    console.assert(productsDiv.classList.contains('hidden'), "toggleCategory: No cambió a hidden");
}

// Ejecutamos pruebas unitarias llamando al método
testToggleCategory();

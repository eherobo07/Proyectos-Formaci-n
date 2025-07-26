# Explicación de la estructura y decisiones de diseño

## 1. Estructura de HTML
Para asegurar la organización y accesibilidad de la página, he utilizado las etiquetas semánticas (`header`, `nav`, `main`, `section`, `footer`). Esto hace que el código sea más fácil de leer.

El archivo `index.html` es la base de esta aplicación web interactiva. La estructura del HTML se compone de las siguientes secciones:

1. **Cabecera (`<header>`)**:
   - Contiene el título de la página y la navegación principal.
   - La navegación está organizada en una lista desordenada, donde cada elemento de la lista enlaza a las distintas secciones de la página.

2. **Cuerpo principal (`<main>`)**:
   - Divido el contenido en varias secciones:
     - **Inicio**: Presenta una breve introducción a la página, meramente estético.
     - **Interactividad**: Contiene un botón que, al presionarlo, cambia el color de texto o el tema de la página de manera completamente aleatoria, y muestra un mensaje, aparte, añado otro botón, solo visible al presionar el primero, para restablecer todo. Esto me parecía más divertido que un array de colores y un desplegable.
     - **¡Juega!**: Implementa un juego donde el usuario puede hacer clic en una imagen varias veces en un tiempo determinado (primero te ofrece una cuenta atrás desde 3 para prepararte), el récord y número total de clicks son almacenados en el LocalStorage.
     - **Newsletter**: Incluye un formulario para suscribirse a una newsletter, con campos para nombre y correo electrónico. Realmente no hace nada más que guardar el correo en el LocalStorage.

3. **Pie de página (`<footer>`)**:
   - Para poner mi nombre y el módulo, cierra la estructura de la página.


## 2. Aplicación de CSS

El archivo `styles.css` se encarga de proporcionar estilos visuales a la página. Aquí justifico algunos aspectos importantes:

- **Colores**: La paleta verde y blanco se eligió para destacar el contenido principal, usando colores sobrios para texto y fondo.
- **Estilos de botones**: La interacción visual en los botones mejora la usabilidad, indicando al usuario que los elementos son interactivos.
- **Diseño Responsivo**: Se utilizan propiedades de flexbox para garantizar que la página se adapte a diferentes tamaños de pantalla.
- **Efectos de Interacción**: Se aplican estilos a los botones y enlaces para realzar la interactividad, como cambios de color en el fondo de los botones y efectos de animación al pasar el mouse sobre los elementos del nav.
- **Organización Visual**: Los márgenes y el padding se utilizan para espaciar los elementos.


## 3. Interactividad con JavaScript

El archivo `script.js` contiene la lógica de interactividad. Para que sea más sencillo hacer un sefuimiento de todo lo que ocrre, he ido comentando cada uno de los métodos con sus funcionalidades. Al comienzo del fichero, primero nos aseguramos de que el DOM esté cargado y luego genero mis EventListeners para mis métodos, cada uno con sus funcionalidades:

1. **Navegación**:
   - Se añade un evento de clic a cada enlace de navegación que desplaza suavemente la vista a la sección correspondiente y hace una animación en el título de dicha sección.

2. **Botón presionar**:
   - Cambia el color del texto de la página a un color aleatorio. (Opción random 1).
   - Cambia el color de fondo de la cabecera y los botones a un color aleatorio. (Opción random 2).

3. **Restablecer Colores**:
   - Restaura los colores originales de la página y los elementos interactivos.
   - Solo aparece tras pulsar el botón "Presionar".

4. **Suscripción a Newsletter**:
   - El formulario tiene un evento `submit` que previene el comportamiento por defecto, verifica si el correo electrónico ya está registrado y, si no, lo guarda en el LocalStorage.

5. **Juego de Clics**:
   - Realmente basado en el famoso juego Cookie Clicker, para una interacción más inmersiva he querido hacer un clicker.
   - Inicia un temporizador que cuenta regresivamente y se detiene al llegar a cero.
   - Cuando se presiona el botón "Jugar", se muestra una galleta y se contabilizan los clics del usuario, que se muestran al final del juego.
   - Almacena y recupera el récord y el número de clicks total en LocalStorage, los cuales también se muestran al final del juego.

## 4. Estructura

El proyecto viene estructurado con su correspondiente carpeta para cada cosa, aunque pueda parecer un poco innecesario, ya que es un proyecto pequeño y dentro de cada carpeta hay un solo fichero, es una buena práctica que siempre me gusta aplicar para mayor organización.
La carpeta .vscode se ha generado sola por mi extensión "Live preview", para poder hacer pruebas con el proyecto.

## 5. Conclusiones

Este proyecto proporciona una experiencia interactiva mediante una combinación de HTML bien estructurado, CSS estilizado y JavaScript funcional. Cada componente se ha diseñado para trabajar en conjunto, ofreciendo al usuario una forma intuitiva de interactuar con el contenido.
Esta organización ejemplifica cómo estructurar correctamente un proyecto web básico con HTML, CSS y JavaScript, brindando un modelo para que los desarrolladores aprendan prácticas de código cliente.

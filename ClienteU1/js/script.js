document.addEventListener("DOMContentLoaded", () => {
  const actionButton = document.getElementById("actionButton");
  const resetButton = document.getElementById("resetButton");
  const outputMessage = document.getElementById("outputMessage");
  const submitButton = document.querySelector("button[type='submit']");
  const header = document.querySelector("header");
  const startGameButton = document.getElementById("startGameButton");
  const countdown = document.getElementById("countdown");
  const clickImage = document.getElementById("clickImage");
  const result = document.getElementById("result");
  const newsletterForm = document.getElementById("newsletterForm");
  const subscriptionMessage = document.getElementById("subscriptionMessage");


// Agrega animación a los encabezados <h2> al hacer clic en los links del nav
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const targetSection = document
      .getElementById(targetId)
      .querySelector("h2");

    // Elimina la clase de animación previa si existe
    targetSection.classList.remove("highlighted");

    // Forzar reflujo para reiniciar la animación
    void targetSection.offsetWidth;

    // Añade la clase para activar la animación
    targetSection.classList.add("highlighted");

    // Desplaza la página a la sección
    document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });
  });
});


  let colorsChanged = false;

  // Función para generar un color aleatorio
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // Función para cambiar el color del texto aleatoriamente
  function changeTextColor() {
    const randomColor = getRandomColor();
    document.body.style.color = randomColor;
  }

  // Función para cambiar el color del header y botones aleatoriamente
  function changeThemeColor() {
    const randomColor = getRandomColor();
    header.style.backgroundColor = randomColor;
    actionButton.style.backgroundColor = randomColor;
    resetButton.style.backgroundColor = randomColor;
    startGameButton.style.backgroundColor = randomColor;
    submitButton.style.backgroundColor = randomColor;
  }

  // Evento para el botón "Presionar"
  actionButton.addEventListener("click", () => {
    const randomFunction =
      Math.random() < 0.5 ? changeTextColor : changeThemeColor;
    randomFunction();

    // Mostrar mensaje en función de la acción realizada
    outputMessage.textContent =
      randomFunction === changeTextColor
        ? "Color de texto actualizado"
        : "Tema actualizado";

    // Mostrar el botón "Restablecer colores" si aún no se ha mostrado
    if (!colorsChanged) {
      resetButton.style.display = "inline-block";
      colorsChanged = true;
    }
  });

    // Función para restablecer los colores a los valores originales
    function resetColors() {
      document.body.style.color = ""; 
      header.style.backgroundColor = ""; 
      actionButton.style.backgroundColor = ""; 
      resetButton.style.backgroundColor = ""; 
      submitButton.style.backgroundColor = "";
      startGameButton.style.backgroundColor = "";
    }

  // Evento para el botón "Restablecer colores"
  resetButton.addEventListener("click", () => {
    resetColors();
    resetButton.style.display = "none"; 
    outputMessage.textContent = ""; 
    colorsChanged = false;
  });


  // Función para verificar y guardar el correo
  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const storedEmails =
      JSON.parse(localStorage.getItem("subscribedEmails")) || [];

    if (storedEmails.includes(email)) {
      subscriptionMessage.textContent = "Correo ya registrado";
      subscriptionMessage.className = "error";
    } else {
      storedEmails.push(email);
      localStorage.setItem("subscribedEmails", JSON.stringify(storedEmails));
      subscriptionMessage.textContent = "Suscripción a newsletter correcta";
      subscriptionMessage.className = "success";
    }
  });


  // Variables para el juego del clicker
  let attempt = 1;
  let record = 0;
  let totalClicks = 0;
  let clickCount = 0;
  let gameInterval, countdownInterval;


  function startClickingGame() {
    clickCount = 0;
    clickImage.style.display = "block";

    let timeLeft = 10;
    countdown.textContent = timeLeft;

    gameInterval = setInterval(() => {
      timeLeft--;
      countdown.textContent = timeLeft;

      if (timeLeft === 0) {
        endGame();
      }
    }, 1000);
  }

  function startCountdown() {
    let countdownValue = 3;
    countdown.textContent = countdownValue;

    countdownInterval = setInterval(() => {
      countdownValue--;
      countdown.textContent = countdownValue;

      if (countdownValue === 0) {
        clearInterval(countdownInterval);
        startClickingGame();
      }
    }, 1000);
  }

  startGameButton.addEventListener("click", () => {
    startGameButton.style.display = "none";
    result.textContent = "";
    startCountdown();
  });

  clickImage.addEventListener("click", () => {
    clickCount++;
    animateClickImage();
  });


  function endGame() {
    clearInterval(gameInterval);
    clickImage.style.display = "none";
    countdown.textContent = "";

    totalClicks += clickCount;
    // Guardar el total de clics en localStorage
    localStorage.setItem("totalClicks", totalClicks);

    // Guardar el récord en localStorage
    if (clickCount > record) {
      record = clickCount;
      localStorage.setItem("record", record); // Guardar nuevo récord
    }

    result.innerHTML = `
      Intento nº ${attempt}: ${clickCount} pulsaciones<br>
      Récord: ${record} pulsaciones<br>
      Hasta ahora has pulsado la imagen un total de ${totalClicks} veces.
  `;

    attempt++;
    startGameButton.style.display = "block";
  }

  // Recuperar el total de clics guardados en localStorage
  const storedTotalClicks = localStorage.getItem("totalClicks");
  if (storedTotalClicks) {
    totalClicks = parseInt(storedTotalClicks, 10);
  }

  // Recuperar el récord guardado en localStorage
  const storedRecord = localStorage.getItem("record");
  if (storedRecord) {
    record = parseInt(storedRecord, 10);
  }

  //Para que al hacer click a la galleta no se quede estática
  function animateClickImage() {
    clickImage.style.transform = "scale(0.95)";
    setTimeout(() => {
      clickImage.style.transform = "scale(1)";
    }, 100);
  }
});

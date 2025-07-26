<?php
session_start();

// Inicializar el carrito si no existe
if (!isset($_SESSION['carrito'])) {
    $_SESSION['carrito'] = [];
}

// Productos disponibles con enlaces
$productos = [
    "Spotify" => [
        "imagen" => "img/spotify.png",
        "tarjetas" => [5, 20, 50],
        "enlace" => "https://www.spotify.com"
    ],
    "Play Store" => [
        "imagen" => "img/playstore.png",
        "tarjetas" => [5, 20, 50],
        "enlace" => "https://play.google.com/store"
    ],
    "Steam" => [
        "imagen" => "img/steam.png",
        "tarjetas" => [5, 20, 50],
        "enlace" => "https://store.steampowered.com"
    ],
    "iTunes" => [
        "imagen" => "img/itunes.png",
        "tarjetas" => [5, 20, 50],
        "enlace" => "https://www.apple.com/itunes/"
    ],
];

// Manejo del carrito
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['idioma']) || isset($_POST['tema'])) {
        // Guardar las preferencias de idioma y tema en cookies
        setcookie('idioma', $_POST['idioma'] ?? 'es', time() + (86400 * 30), "/");
        setcookie('tema', $_POST['tema'] ?? 'claro', time() + (86400 * 30), "/");
        header("Location: " . $_SERVER['PHP_SELF']); // Redirigir para aplicar cambios
        exit();
    }

    $producto = $_POST['producto'] ?? null;
    $cantidad = $_POST['cantidad'] ?? null;
    $accion = $_POST['accion'] ?? null;

    if ($producto && $cantidad && $accion) {
        $clave = "$producto - $cantidad €";
        if ($accion === "+") {
            if (!isset($_SESSION['carrito'][$clave])) {
                $_SESSION['carrito'][$clave] = 0;
            }
            $_SESSION['carrito'][$clave]++;
        } elseif ($accion === "-" && isset($_SESSION['carrito'][$clave])) {
            $_SESSION['carrito'][$clave]--;
            if ($_SESSION['carrito'][$clave] <= 0) {
                unset($_SESSION['carrito'][$clave]);
            }
        }
    }

    // Limpiar el carrito
    if (isset($_POST['vaciar_carrito'])) {
        $_SESSION['carrito'] = [];
    }

    // Redirigir para prevenir reenvío de formulario
    header("Location: " . $_SERVER['PHP_SELF']);
    exit();
}

// Preferencias (Idioma y Tema)
$idioma = $_COOKIE['idioma'] ?? 'es';
$tema = $_COOKIE['tema'] ?? 'claro';

// Traducciones según idioma
$traducciones = [
    'es' => [
        'titulo' => 'Carrito de Compras de Monedas Virtuales',
        'idioma' => 'Idioma:',
        'tema' => 'Tema:',
        'vaciar_carrito' => 'Vaciar carrito',
        'carrito_vacio' => 'El carrito está vacío',
        'producto_de' => 'Tarjeta con valor de',
    ],
    'en' => [
        'titulo' => 'Virtual Currency Shopping Cart',
        'idioma' => 'Language:',
        'tema' => 'Theme:',
        'vaciar_carrito' => 'Empty Cart',
        'carrito_vacio' => 'The cart is empty',
        'producto_de' => 'Card value',
    ],
    'pt' => [
        'titulo' => 'Carrinho de Compras de Moedas Virtuais',
        'idioma' => 'Idioma:',
        'tema' => 'Tema:',
        'vaciar_carrito' => 'Esvaziar carrinho',
        'carrito_vacio' => 'O carrinho está vazio',
        'producto_de' => 'Cartão de',
    ]
];

$traduccion = $traducciones[$idioma];

?>
<!DOCTYPE html>
<html lang="<?php echo $idioma; ?>">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $traduccion['titulo']; ?></title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }

        body.claro {
            background-color: #ffffff;
            color: #000000;
        }

        body.oscuro {
            background-color: #121212;
            color: #ffffff;
        }

        body.pastel {
            background-color: #f0e5f1;
            color: #333333;
        }

        .producto {
            display: inline-block;
            border: 1px solid #ccc;
            margin: 10px;
            padding: 10px;
            text-align: center;
            border-radius: 5px;
            width: 240px;
        }

        .producto img {
            width: 100px;
            height: 100px;
            display: block;
            margin: 0 auto;
            cursor: pointer;
        }

        .producto h3 {
            font-size: 16px;
            font-weight: bold;
        }

        button {
            background-color: #28a745;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 5px;
            cursor: pointer;
        }

        button:hover {
            background-color: #218838;
        }

        button:disabled {
            background-color: #cccccc;
            cursor: not-allowed;
        }

        .carrito {
            margin-top: 20px;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }

        .producto .opciones {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 5px 0;
        }

        .producto .opciones span {
            flex: 1;
            text-align: center;
        }
    </style>
</head>

<body class="<?php echo $tema; ?>">

    <h1><?php echo $traduccion['titulo']; ?></h1>

    <!-- Preferencias -->
    <form method="post">
        <label for="idioma"><?php echo $traduccion['idioma']; ?></label>
        <select name="idioma" id="idioma" onchange="this.form.submit()">
            <option value="es" <?php echo $idioma === 'es' ? 'selected' : ''; ?>>Español</option>
            <option value="en" <?php echo $idioma === 'en' ? 'selected' : ''; ?>>Inglés</option>
            <option value="pt" <?php echo $idioma === 'pt' ? 'selected' : ''; ?>>Portugués</option>
        </select>
        <label for="tema"><?php echo $traduccion['tema']; ?></label>
        <select name="tema" id="tema" onchange="this.form.submit()">
            <option value="claro" <?php echo $tema === 'claro' ? 'selected' : ''; ?>>Claro</option>
            <option value="oscuro" <?php echo $tema === 'oscuro' ? 'selected' : ''; ?>>Oscuro</option>
            <option value="pastel" <?php echo $tema === 'pastel' ? 'selected' : ''; ?>>Pastel</option>
        </select>
    </form>

    <!-- Productos -->
    <div>
        <?php foreach ($productos as $nombre => $datos): ?>
            <div class="producto">
                <a href="<?php echo $datos['enlace']; ?>">
                    <img src="<?php echo $datos['imagen']; ?>" alt="<?php echo $nombre; ?>">
                </a>
                <h3><?php echo $nombre; ?></h3>
                <?php foreach ($datos['tarjetas'] as $cantidad): ?>
                    <div class="opciones">
                        <form method="post" style="display: inline;">
                            <input type="hidden" name="producto" value="<?php echo $nombre; ?>">
                            <input type="hidden" name="cantidad" value="<?php echo $cantidad; ?>">
                            <button type="submit" name="accion" value="-">-</button>
                        </form>
                        <span><?php echo $traduccion['producto_de']; ?> <?php echo $cantidad; ?> €</span>
                        <form method="post" style="display: inline;">
                            <input type="hidden" name="producto" value="<?php echo $nombre; ?>">
                            <input type="hidden" name="cantidad" value="<?php echo $cantidad; ?>">
                            <button type="submit" name="accion" value="+">+</button>
                        </form>
                    </div>
                <?php endforeach; ?>
            </div>
        <?php endforeach; ?>
    </div>

    <!-- Carrito -->
    <div class="carrito">
        <h2><?php echo $traduccion['carrito_vacio']; ?>:</h2>
        <?php if (!empty($_SESSION['carrito'])): ?>
            <ul>
                <?php foreach ($_SESSION['carrito'] as $clave => $cantidad): ?>
                    <li><?php echo $clave . " x " . $cantidad; ?></li>
                <?php endforeach; ?>
            </ul>
            <form method="post">
                <button type="submit" name="vaciar_carrito"><?php echo $traduccion['vaciar_carrito']; ?></button>
            </form>
        <?php else: ?>
            <p><?php echo $traduccion['carrito_vacio']; ?></p>
        <?php endif; ?>
    </div>

</body>

</html>
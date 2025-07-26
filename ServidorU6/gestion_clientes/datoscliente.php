<!--Formulario para agregar o editar clientes, primero tenemos la parte lógica y luego el html con el formulario-->
<!--Tiene dos modos, editar y añadir, dependiendo desde dónde accedas. Con editar rellena los datos de la fila elegida, con añadir está en 
blanco todo desde el principio. Las funciones están en guardar.php-->
<?php
include 'db.php';

$modo = "Añadir Cliente";
$nombre = $email = $telefono = $direccion = "";
$id = "";

if (isset($_GET['id'])) {
    $id = intval($_GET['id']);
    $result = $conn->query("SELECT * FROM clientes WHERE id = $id");
    $cliente = $result->fetch_assoc();
    if ($cliente) {
        $modo = "Editar Cliente";
        $nombre = $cliente['nombre'];
        $email = $cliente['email'];
        $telefono = $cliente['telefono'];
        $direccion = $cliente['direccion'];
    }
}
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title><?php echo $modo; ?></title>
    <link rel="stylesheet" href="assets/style.css">
    <script src="assets/script.js" defer></script>
</head>

<body>
    <h2><?php echo $modo; ?></h2>
    <form action="guardar.php" method="POST" onsubmit="return validarFormulario()">
        <input type="hidden" name="id" value="<?php echo $id; ?>"> <!--Este no nos interesa que se vea-->
        <label>Nombre:</label>
        <input type="text" id="nombre" name="nombre" value="<?php echo $nombre; ?>" required>
        <label>Email:</label>
        <input type="email" id="email" name="email" value="<?php echo $email; ?>" required>
        <label>Teléfono:</label>
        <input type="text" id="telefono" name="telefono" value="<?php echo $telefono; ?>" required>
        <label>Dirección:</label>
        <input type="text" id="direccion" name="direccion" value="<?php echo $direccion; ?>" required>
        <button type="submit">Guardar</button>
    </form>
</body>

</html>
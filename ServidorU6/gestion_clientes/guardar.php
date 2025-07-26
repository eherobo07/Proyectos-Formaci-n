<!--Funcionalidad del botón guardar de datoscliente.php-->
<?php
include 'db.php';

$nombre = $conn->real_escape_string($_POST['nombre']);
$email = $conn->real_escape_string($_POST['email']);
$telefono = $conn->real_escape_string($_POST['telefono']);
$direccion = $conn->real_escape_string($_POST['direccion']);

if (!empty($_POST['id'])) {
    // Actualizar cliente existente
    $id = intval($_POST['id']);
    $query = "UPDATE clientes SET nombre='$nombre', email='$email', telefono='$telefono', direccion='$direccion' WHERE id=$id";
} else {
    // Insertar nuevo cliente
    $query = "INSERT INTO clientes (nombre, email, telefono, direccion) VALUES ('$nombre', '$email', '$telefono', '$direccion')";
}

if ($conn->query($query)) {
    header("Location: index.php");
} else {
    echo "Error: " . $conn->error;
}

$conn->close();
?>

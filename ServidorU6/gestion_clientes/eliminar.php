<!--Eliminamos al cliente de la base de datos con la X roja en index.php, el mensaje de confirmación lo tiramos desde el JS.-->
<?php
include 'db.php';

if (isset($_GET['id'])) {
    $id = intval($_GET['id']);
    $query = "DELETE FROM clientes WHERE id = $id";

    if ($conn->query($query)) {
        echo "Cliente eliminado.";
    } else {
        echo "Error al eliminar: " . $conn->error;
    }

    $conn->close();
    header("Location: index.php");
    exit();
}
?>

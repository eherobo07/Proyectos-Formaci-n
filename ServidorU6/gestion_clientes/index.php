<?php include 'db.php'; ?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Base de datos de clientes</title>
    <link rel="stylesheet" href="assets/style.css">
    <script src="assets/script.js" defer></script>
</head>
<body>
    <h1>Base de datos de clientes de la empresa</h1>

    <div class="search-container">
        <input type="text" id="busqueda" placeholder="Buscar cliente..." onkeyup="filtrarClientes()">
        <a href="datoscliente.php" class="btn añadir">Añadir +</a>
    </div>

    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th colspan="2">Operaciones</th>
            </tr>
        </thead>
        <tbody id="tabla-clientes">
            <?php
            $result = $conn->query("SELECT * FROM clientes");
            while ($row = $result->fetch_assoc()) {
                echo "<tr>
                        <td>{$row['id']}</td>
                        <td>{$row['nombre']}</td>
                        <td>{$row['email']}</td>
                        <td>{$row['telefono']}</td>
                        <td>{$row['direccion']}</td>
                        <td class='editar'><a href='datoscliente.php?id={$row['id']}'>Editar</a></td>
                        <td class='eliminar' onclick='confirmarEliminacion({$row['id']})'>X</td>
                      </tr>";
            }
            $conn->close();
            ?>
        </tbody>
    </table>
</body>
</html>

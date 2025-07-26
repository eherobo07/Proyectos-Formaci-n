<!--Conexión con la base de datos--> 
<?php
$servername = "localhost";
$username = "root";  //Usaré el usuario y contraseña de root por defecto para el proyecto, en uno real, para evitar posibles ataques
$password = "root";  //de malware, se debería usar uno propio con una contraseña complicada    
$database = "gestion_clientes";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $database);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>

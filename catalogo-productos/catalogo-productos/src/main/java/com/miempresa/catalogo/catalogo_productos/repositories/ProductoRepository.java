package com.miempresa.catalogo.catalogo_productos.repositories;


import com.miempresa.catalogo.catalogo_productos.models.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Integer> {
}

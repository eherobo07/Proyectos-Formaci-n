package com.miempresa.catalogo.catalogo_productos.services;

import com.miempresa.catalogo.catalogo_productos.models.Producto;
import com.miempresa.catalogo.catalogo_productos.repositories.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    public List<Producto> listarProductos() {
        return productoRepository.findAll();
    }
}

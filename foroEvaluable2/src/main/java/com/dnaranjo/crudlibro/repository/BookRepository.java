package com.dnaranjo.crudlibro.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.dnaranjo.crudlibro.model.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    // No es necesario agregar métodos adicionales para un CRUD básico.
}
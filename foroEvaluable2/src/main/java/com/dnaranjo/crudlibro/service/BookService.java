package com.dnaranjo.crudlibro.service;

import java.util.List;
import java.util.Optional;
import com.dnaranjo.crudlibro.model.Book;

public interface BookService {
    List<Book> getAllBooks();
    Optional<Book> getBookById(Long id);
    Book createBook(Book book);
    Book updateBook(Long id, Book book);
    void deleteBook(Long id);
}
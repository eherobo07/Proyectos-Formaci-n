package com.example.service;

import com.example.model.Curso;
import com.example.repository.CursoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CursoService {
    private final CursoRepository cursoRepository;

    public CursoService(CursoRepository cursoRepository) {
        this.cursoRepository = cursoRepository;
    }

    public List<Curso> buscarCursos(String lenguaje) {
        if (lenguaje != null) {
            return cursoRepository.findByLenguaje(lenguaje);
        }
        return cursoRepository.findAll(); // Devuelve todos si no hay filtros
    }
}

package com.example.controller;

import com.example.model.Curso;
import com.example.service.CursoService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CursoController {
    private final CursoService cursoService;

    public CursoController(CursoService cursoService) {
        this.cursoService = cursoService;
    }

    @GetMapping("/api/cursos")
    public List<Curso> buscarCursos(
            @RequestParam(required = false) String lenguaje)
             {
        return cursoService.buscarCursos(lenguaje);
    }
}

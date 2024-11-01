package com.example.ventas.controller;

import com.example.ventas.model.Empresa;
import com.example.ventas.service.EmpresaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/empresas")
@CrossOrigin(origins = "http://localhost:3000")
public class EmpresaController {

    @Autowired
    private EmpresaService empresaService;

    @GetMapping
    public List<Empresa> obtenerEmpresas() {
        return empresaService.obtenerEmpresas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Empresa> obtenerEmpresaPorId(@PathVariable String id) {
        Empresa empresa = empresaService.obtenerEmpresaPorId(id);
        return empresa != null ? ResponseEntity.ok(empresa) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Empresa> crearEmpresa(@RequestBody Empresa empresa) {
        Empresa nuevaEmpresa = empresaService.crearEmpresa(empresa);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevaEmpresa);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Empresa> actualizarEmpresa(@PathVariable String id, @RequestBody Empresa empresa) {
        Empresa empresaActualizada = empresaService.actualizarEmpresa(id, empresa);
        return ResponseEntity.ok(empresaActualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarEmpresa(@PathVariable String id) {
        empresaService.eliminarEmpresa(id);
        return ResponseEntity.noContent().build();
    }
}

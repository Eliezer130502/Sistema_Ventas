package com.example.ventas.controller;

import com.example.ventas.model.Articulo;
import com.example.ventas.service.ArticuloService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/articulos")
@CrossOrigin(origins = "http://localhost:3000") // Permitir solicitudes de este origen
public class ArticuloController {

    @Autowired
    private ArticuloService articuloService;

    @GetMapping
    public List<Articulo> obtenerArticulos() {
        return articuloService.obtenerTodosLosArticulos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Articulo> obtenerArticuloPorId(@PathVariable String id) {
        return articuloService.obtenerArticuloPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Articulo crearArticulo(@RequestBody Articulo articulo) {
        return articuloService.crearArticulo(articulo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Articulo> actualizarArticulo(@PathVariable String id, @RequestBody Articulo articulo) {
        Articulo articuloActualizado = articuloService.actualizarArticulo(id, articulo);
        if (articuloActualizado != null) {
            return ResponseEntity.ok(articuloActualizado);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarArticulo(@PathVariable String id) {
        articuloService.eliminarArticulo(id);
        return ResponseEntity.noContent().build();
    }
}

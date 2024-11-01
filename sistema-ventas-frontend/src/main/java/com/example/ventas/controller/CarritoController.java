package com.example.ventas.controller;

import com.example.ventas.model.Articulo;
import com.example.ventas.model.Carrito;
import com.example.ventas.service.CarritoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/carritos")
public class CarritoController {

    @Autowired
    private CarritoService carritoService;

    @PostMapping("/{idCarrito}/articulos")
    public ResponseEntity<Carrito> agregarArticulo(@PathVariable String idCarrito, @RequestBody Articulo articulo) {
        Carrito carritoActualizado = carritoService.agregarArticuloAlCarrito(idCarrito, articulo);
        if (carritoActualizado != null) {
            return ResponseEntity.ok(carritoActualizado);
        }
        return ResponseEntity.notFound().build();
    }

    // Otros métodos del controlador...
}

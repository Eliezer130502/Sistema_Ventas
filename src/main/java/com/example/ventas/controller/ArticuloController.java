package com.example.ventas.controller;

import com.example.ventas.model.Articulo;
import com.example.ventas.model.Producto;
import com.example.ventas.model.Proveedor;
import com.example.ventas.service.ArticuloService;
import com.example.ventas.service.ProveedorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/articulos")
@CrossOrigin(origins = "http://localhost:3000")
public class ArticuloController {

    @Autowired
    private ArticuloService articuloService;

    @Autowired
    private ProveedorService proveedorService; // Inyectar el ProveedorService

    @GetMapping("/producto/{id}")
    public ResponseEntity<Producto> obtenerProductoPorId(@PathVariable String id) {
        return articuloService.obtenerProductoPorId(id) // Se llama al método del servicio
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

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
    public ResponseEntity<Articulo> crearArticulo(@RequestBody Articulo articulo) {
        if (articulo.getNombre() == null || articulo.getPrecio() == null || articulo.getStock() == null) {
            return ResponseEntity.badRequest().build(); // Validar que los campos no sean nulos
        }
        Articulo nuevoArticulo = articuloService.crearArticulo(articulo);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoArticulo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Articulo> actualizarArticulo(@PathVariable String id, @RequestBody Articulo articulo) {
        Articulo articuloActualizado = articuloService.actualizarArticulo(id, articulo);
        return articuloActualizado != null ? ResponseEntity.ok(articuloActualizado) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarArticulo(@PathVariable String id) {
        articuloService.eliminarArticulo(id);
        return ResponseEntity.noContent().build();
    }

    // Nuevo endpoint para obtener productos de un proveedor
    @GetMapping("/proveedor/{id}/productos")
    public ResponseEntity<List<Producto>> obtenerProductosPorProveedor(@PathVariable String id) {
        Proveedor proveedor = proveedorService.obtenerProveedorPorId(id).orElse(null);
        if (proveedor == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(proveedor.getProductos());
    }
}

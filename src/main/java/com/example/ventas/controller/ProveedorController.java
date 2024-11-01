package com.example.ventas.controller;

import com.example.ventas.model.Producto;
import com.example.ventas.model.Proveedor;
import com.example.ventas.service.ProveedorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional; // Asegúrate de importar Optional

@RestController
@RequestMapping("/api/proveedores")
@CrossOrigin(origins = "http://localhost:3000")
public class ProveedorController {

    private final ProveedorService proveedorService;

    @Autowired
    public ProveedorController(ProveedorService proveedorService) {
        this.proveedorService = proveedorService;
    }

    @GetMapping
    public List<Proveedor> obtenerTodosLosProveedores() {
        return proveedorService.obtenerTodosLosProveedores();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Proveedor> obtenerProveedorPorId(@PathVariable String id) {
        return proveedorService.obtenerProveedorPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Proveedor agregarProveedor(@RequestBody Proveedor proveedor) {
        return proveedorService.agregarProveedor(proveedor);
    }

    @PostMapping("/{proveedorId}/productos") // Cambié la ruta para incluir el proveedorId en la URL
    public ResponseEntity<Producto> agregarProducto(@PathVariable String proveedorId, @RequestBody Producto producto) {
        // Aquí puedes buscar el proveedor y agregar el producto a su lista
        Optional<Proveedor> proveedor = proveedorService.obtenerProveedorPorId(proveedorId);
        if (proveedor.isPresent()) {
            // Establece la categoría del producto y lo agregas a la lista del proveedor
            proveedor.get().getProductos().add(producto);
            proveedorService.agregarProveedor(proveedor.get()); // Actualiza el proveedor
            return ResponseEntity.ok(producto);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Proveedor> editarProveedor(@PathVariable String id, @RequestBody Proveedor proveedor) {
        Proveedor proveedorActualizado = proveedorService.editarProveedor(id, proveedor);
        return proveedorActualizado != null ? ResponseEntity.ok(proveedorActualizado)
                : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarProveedor(@PathVariable String id) {
        proveedorService.eliminarProveedor(id);
        return ResponseEntity.noContent().build();
    }
}

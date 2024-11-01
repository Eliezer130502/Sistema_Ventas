package com.example.ventas.controller;

import com.example.ventas.model.Articulo;
import com.example.ventas.model.Carrito;
import com.example.ventas.model.Pedido;
import com.example.ventas.service.CarritoService;
import com.example.ventas.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/carritos")
public class CarritoController {

    @Autowired
    private CarritoService carritoService;
    
    @Autowired
    private PedidoService pedidoService;

    // Agregar un artículo al carrito
    @PostMapping("/{idCarrito}/articulos")
    public ResponseEntity<Carrito> agregarArticulo(@PathVariable String idCarrito, @RequestBody Articulo articulo) {
        Carrito carritoActualizado = carritoService.agregarArticuloAlCarrito(idCarrito, articulo);
        return carritoActualizado != null ? ResponseEntity.ok(carritoActualizado) : ResponseEntity.notFound().build();
    }

    // Quitar un artículo del carrito
    @DeleteMapping("/{idCarrito}/articulos/{idArticulo}")
    public ResponseEntity<Carrito> quitarArticulo(@PathVariable String idCarrito, @PathVariable String idArticulo) {
        Carrito carritoActualizado = carritoService.quitarArticuloDelCarrito(idCarrito, idArticulo);
        return carritoActualizado != null ? ResponseEntity.ok(carritoActualizado) : ResponseEntity.notFound().build();
    }

    // Generar un pedido desde el carrito
    @PostMapping("/{idCarrito}/checkout")
    public ResponseEntity<Pedido> generarPedido(@PathVariable String idCarrito) {
        Pedido pedido = pedidoService.generarPedidoDesdeCarrito(idCarrito);
        return pedido != null ? ResponseEntity.ok(pedido) : ResponseEntity.badRequest().build();
    }
    @GetMapping("/{idCarrito}")
    public ResponseEntity<Carrito> obtenerCarrito(@PathVariable String idCarrito) {
        Carrito carrito = carritoService.obtenerCarritoPorId(idCarrito);
        return carrito != null ? ResponseEntity.ok(carrito) : ResponseEntity.notFound().build();
    }
}

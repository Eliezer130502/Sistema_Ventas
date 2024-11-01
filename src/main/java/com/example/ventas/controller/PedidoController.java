package com.example.ventas.controller;

import com.example.ventas.model.Pedido;
import com.example.ventas.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @GetMapping
    public List<Pedido> obtenerPedidos() {
        return pedidoService.obtenerTodosLosPedidos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pedido> obtenerPedidoPorId(@PathVariable String id) {
        Optional<Pedido> pedido = pedidoService.obtenerPedidoPorId(id);
        return pedido.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<Pedido> crearPedido(@RequestBody Pedido pedido) {
        Pedido nuevoPedido = pedidoService.crearPedido(pedido);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoPedido);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarPedido(@PathVariable String id) {
        pedidoService.eliminarPedido(id);
        return ResponseEntity.noContent().build();
    }
    @PostMapping("/{idCarrito}/checkout")
    public ResponseEntity<Pedido> generarPedido(@PathVariable String idCarrito, @RequestBody Pedido pedido) {
        Pedido nuevoPedido = pedidoService.generarPedidoDesdeCarrito(idCarrito, pedido);
        return nuevoPedido != null ? ResponseEntity.ok(nuevoPedido) : ResponseEntity.badRequest().build();
    }

}

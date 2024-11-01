package com.example.ventas.service;

import com.example.ventas.model.Carrito;
import com.example.ventas.model.Pedido;
import com.example.ventas.repository.CarritoRepository;
import com.example.ventas.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PedidoService {

    @Autowired
    private CarritoRepository carritoRepository;

    @Autowired
    private PedidoRepository pedidoRepository;

    public Pedido generarPedidoDesdeCarrito(String idCarrito) {
        Optional<Carrito> carritoOpt = carritoRepository.findById(idCarrito);
        if (carritoOpt.isPresent()) {
            Carrito carrito = carritoOpt.get();
            Pedido pedido = new Pedido();
            pedido.setIdUsuario(carrito.getIdUsuario());
            pedido.setArticulos(carrito.getArticulos());
            pedido.setFechaPedido(new Date());
            pedido.setEstado("pendiente");
            pedidoRepository.save(pedido);
            carrito.getArticulos().clear(); // Vaciar el carrito tras generar el pedido
            carritoRepository.save(carrito);
            return pedido;
        }
        return null;
    }

    public List<Pedido> obtenerTodosLosPedidos() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'obtenerTodosLosPedidos'");
    }

    public Optional<Pedido> obtenerPedidoPorId(String id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'obtenerPedidoPorId'");
    }

    public Pedido crearPedido(Pedido pedido) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'crearPedido'");
    }

    public void eliminarPedido(String id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'eliminarPedido'");
    }

    public Pedido generarPedidoDesdeCarrito(String idCarrito, Pedido pedido) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'generarPedidoDesdeCarrito'");
    }
}

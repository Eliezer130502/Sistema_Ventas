package com.example.ventas.service;

import com.example.ventas.model.Pedido;
import com.example.ventas.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    public List<Pedido> obtenerTodosLosPedidos() {
        return pedidoRepository.findAll();
    }

    public Optional<Pedido> obtenerPedidoPorId(String id) {
        return pedidoRepository.findById(id);
    }

    public Pedido crearPedido(Pedido pedido) {
        return pedidoRepository.save(pedido);
    }

    public void eliminarPedido(String id) {
        pedidoRepository.deleteById(id);
    }
}

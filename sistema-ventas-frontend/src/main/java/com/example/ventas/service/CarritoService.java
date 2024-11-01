package com.example.ventas.service;

import com.example.ventas.model.Articulo;
import com.example.ventas.model.Carrito;
import com.example.ventas.repository.CarritoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CarritoService {

    @Autowired
    private CarritoRepository carritoRepository;

    // Método para agregar un artículo al carrito
    public Carrito agregarArticuloAlCarrito(String idCarrito, Articulo articulo) {
        Optional<Carrito> carritoOpt = carritoRepository.findById(idCarrito);
        if (carritoOpt.isPresent()) {
            Carrito carrito = carritoOpt.get();
            carrito.getArticulos().add(articulo); // Agregar el artículo a la lista
            return carritoRepository.save(carrito); // Guardar los cambios
        }
        return null; // Retornar null si no se encuentra el carrito
    }
}

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

    public Carrito agregarArticuloAlCarrito(String idCarrito, Articulo articulo) {
        Optional<Carrito> carritoOpt = carritoRepository.findById(idCarrito);
        if (carritoOpt.isPresent()) {
            Carrito carrito = carritoOpt.get();
            carrito.getArticulos().add(articulo);
            return carritoRepository.save(carrito);
        }
        return null;
    }

    public Carrito quitarArticuloDelCarrito(String idCarrito, String idArticulo) {
        Optional<Carrito> carritoOpt = carritoRepository.findById(idCarrito);
        if (carritoOpt.isPresent()) {
            Carrito carrito = carritoOpt.get();
            carrito.getArticulos().removeIf(art -> art.getId().equals(idArticulo));
            return carritoRepository.save(carrito);
        }
        return null;
    }

    public Carrito agregarArticuloAlCarrito(Long idArticulo) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'agregarArticuloAlCarrito'");
    }

    public Carrito obtenerCarritoPorId(String idCarrito) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'obtenerCarritoPorId'");
    }
}

package com.example.ventas.service;

import com.example.ventas.model.Articulo;
import com.example.ventas.repository.ArticuloRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ArticuloService {

    @Autowired
    private ArticuloRepository articuloRepository;

    public List<Articulo> obtenerTodosLosArticulos() {
        return articuloRepository.findAll();
    }

    public Optional<Articulo> obtenerArticuloPorId(String id) {
        return articuloRepository.findById(id);
    }

    public Articulo crearArticulo(Articulo articulo) {
        return articuloRepository.save(articulo);
    }

    public Articulo actualizarArticulo(String id, Articulo articulo) {
        if (articuloRepository.existsById(id)) {
            articulo.setId(id);
            return articuloRepository.save(articulo);
        }
        return null; // Retornar null si no existe el artículo
    }

    public void eliminarArticulo(String id) {
        articuloRepository.deleteById(id);
    }
}

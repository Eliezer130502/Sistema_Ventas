package com.example.ventas.service;

import com.example.ventas.model.Articulo;
import com.example.ventas.model.Producto;
import com.example.ventas.model.Proveedor;
import com.example.ventas.repository.ArticuloRepository;
import com.example.ventas.repository.ProveedorRepository; // Asegúrate de importar el repositorio
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ArticuloService {

    @Autowired
    private ArticuloRepository articuloRepository;

    @Autowired
    private ProveedorRepository proveedorRepository; // Inyectar ProveedorRepository

    // Agrega este método
    public Optional<Producto> obtenerProductoPorId(String productoId) {
        // Busca todos los proveedores
        for (Proveedor proveedor : proveedorRepository.findAll()) {
            // Busca el producto dentro de cada proveedor
            for (Producto producto : proveedor.getProductos()) {
                if (producto.getId().equals(productoId)) {
                    return Optional.of(producto);
                }
            }
        }
        return Optional.empty(); // Si no se encuentra el producto, retorna vacío
    }

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
            articulo.setId(id); // Asegúrate de mantener el mismo ID
            return articuloRepository.save(articulo);
        }
        return null; // Si no existe, retorna null
    }

    public void eliminarArticulo(String id) {
        articuloRepository.deleteById(id);
    }
}

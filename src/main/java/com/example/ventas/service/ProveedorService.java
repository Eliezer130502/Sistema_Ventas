package com.example.ventas.service;

import com.example.ventas.model.Proveedor;
import com.example.ventas.repository.ProveedorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProveedorService {

    private final ProveedorRepository proveedorRepository;

    @Autowired
    public ProveedorService(ProveedorRepository proveedorRepository) {
        this.proveedorRepository = proveedorRepository;
    }

    public List<Proveedor> obtenerTodosLosProveedores() {
        return proveedorRepository.findAll();
    }

    public Optional<Proveedor> obtenerProveedorPorId(String id) {
        return proveedorRepository.findById(id);
    }

    public Proveedor agregarProveedor(Proveedor proveedor) {
        return proveedorRepository.save(proveedor);
    }

    public Proveedor editarProveedor(String id, Proveedor proveedor) {
        if (proveedorRepository.existsById(id)) {
            proveedor.setId(id); // Asegúrate de que se mantenga el mismo ID
            return proveedorRepository.save(proveedor);
        }
        return null;
    }

    public void eliminarProveedor(String id) {
        proveedorRepository.deleteById(id);
    }
}

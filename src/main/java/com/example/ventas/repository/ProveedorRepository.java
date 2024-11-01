package com.example.ventas.repository;

import com.example.ventas.model.Proveedor;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProveedorRepository extends MongoRepository<Proveedor, String> {
    // Puedes agregar métodos personalizados si es necesario
}

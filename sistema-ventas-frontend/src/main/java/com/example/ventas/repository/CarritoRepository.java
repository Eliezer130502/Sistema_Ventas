package com.example.ventas.repository;

import com.example.ventas.model.Carrito;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarritoRepository extends MongoRepository<Carrito, String> {
    // Puedes agregar consultas personalizadas aquí si es necesario
}

package com.example.ventas.repository;

import com.example.ventas.model.Articulo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticuloRepository extends MongoRepository<Articulo, String> {
    // Puedes agregar consultas personalizadas aquí si es necesario
}

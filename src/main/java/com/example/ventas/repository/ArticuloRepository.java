package com.example.ventas.repository;

import com.example.ventas.model.Articulo;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ArticuloRepository extends MongoRepository<Articulo, String> {
    // Aquí puedes agregar métodos personalizados si es necesario
}

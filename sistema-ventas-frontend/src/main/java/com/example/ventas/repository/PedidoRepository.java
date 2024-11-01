package com.example.ventas.repository;

import com.example.ventas.model.Pedido;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PedidoRepository extends MongoRepository<Pedido, String> {
    // Puedes agregar consultas personalizadas aquí si es necesario
}

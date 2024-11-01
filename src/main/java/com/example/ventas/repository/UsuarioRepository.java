package com.example.ventas.repository;

import com.example.ventas.model.Usuario;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsuarioRepository extends MongoRepository<Usuario, String> {
    List<Usuario> findByEmail(String email); // Método para encontrar usuario por email

    void deleteById(Long id);
}

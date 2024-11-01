package com.example.ventas.repository;

import com.example.ventas.model.Empresa;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EmpresaRepository extends MongoRepository<Empresa, String> {

}

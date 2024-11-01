package com.example.ventas.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Document(collection = "empresas")
public class Empresa {

    @Id
    private String id;

    @NotNull(message = "El nombre no puede ser nulo")
    private String nombre;

    @NotNull(message = "El email no puede ser nulo")
    private String email;

    private String telefono;
    private String direccion;
}

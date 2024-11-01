package com.example.ventas.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Document(collection = "usuarios")
public class Usuario {

    @Id
    private String id;

    @NotNull(message = "El nombre no puede ser nulo")
    private String nombre;

    @Email(message = "El correo debe ser válido")
    private String email;

    @NotNull(message = "El rol no puede ser nulo")
    private String rol; // Puede ser "cliente" o "administrador"

    @NotNull(message = "La contraseña no puede ser nula")
    private String password;
}

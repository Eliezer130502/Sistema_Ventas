package com.example.ventas.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Document(collection = "articulos")
public class Articulo {

    @Id
    private String id;

    @NotNull(message = "El nombre no puede ser nulo")
    private String nombre;

    @NotNull(message = "La descripción no puede ser nula")
    private String descripcion;

    @NotNull(message = "El precio no puede ser nulo")
    private Double precio;

    @NotNull(message = "El stock no puede ser nulo")
    private Integer stock;

    private String categoria; // Puedes usar esta propiedad para clasificar los artículos
}

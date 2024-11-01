package com.example.ventas.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document(collection = "productos")
public class Producto {
    @Id
    private String id; // Este es el campo ID

    private String nombre;
    private String descripcion;
    private String categoria;
    private Double precio;
    private String urlFoto;

    // Constructor, getters y setters se generan automáticamente con Lombok (@Data)
}

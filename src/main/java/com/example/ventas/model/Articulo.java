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

    private String descripcion; // Este campo debe ser llenado desde el producto

    private String categoria; // Este campo debe ser llenado desde el producto

    @NotNull(message = "El precio no puede ser nulo")
    private Double precio; // Este campo debe ser llenado desde el producto

    @NotNull(message = "El stock no puede ser nulo")
    private Integer stock;

    private String urlFoto; // Este campo debe ser llenado desde el producto

    private String proveedorNombre; // Asegúrate de tener este campo para el nombre del proveedor
}

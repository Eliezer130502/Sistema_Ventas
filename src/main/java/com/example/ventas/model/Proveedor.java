package com.example.ventas.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

import java.util.List;

@Data
@Document(collection = "proveedores")
public class Proveedor {
    @Id
    private String id;
    private String nombre;
    private List<Producto> productos; // Lista de productos del proveedor
}

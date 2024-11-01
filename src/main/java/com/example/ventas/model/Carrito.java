package com.example.ventas.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

import java.util.List;

@Data
@Document(collection = "carritos")
public class Carrito {

    @Id
    private String id;

    private String idUsuario; // ID del usuario dueño del carrito
    private List<Articulo> articulos; // Lista de artículos en el carrito
}

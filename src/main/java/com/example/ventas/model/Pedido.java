package com.example.ventas.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@Document(collection = "pedidos")
public class Pedido {

    @Id
    private String id;

    private String idUsuario; // ID del usuario que realiza el pedido
    private List<Articulo> articulos; // Lista de artículos en el pedido
    private Date fechaPedido; // Fecha en que se realizó el pedido
    private String estado; // Estado del pedido (ej. "pendiente", "completado", "cancelado")
}

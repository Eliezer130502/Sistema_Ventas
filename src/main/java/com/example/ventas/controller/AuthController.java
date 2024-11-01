package com.example.ventas.controller;

import com.example.ventas.model.Usuario;
import com.example.ventas.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // Permitir solicitudes de este origen
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Usuario loginRequest) {
        Optional<Usuario> usuarioOpt = usuarioService.obtenerUsuarioPorEmail(loginRequest.getEmail());

        if (usuarioOpt.isEmpty() || !usuarioOpt.get().getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Credenciales inválidas"));
        }

        Map<String, String> response = new HashMap<>();
        response.put("message", "Inicio de sesión exitoso");
        response.put("nombre", usuarioOpt.get().getNombre()); // Obtén el nombre del usuario

        return ResponseEntity.ok(response);
    }
}

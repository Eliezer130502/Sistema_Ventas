package com.example.ventas.controller;

import com.example.ventas.model.Usuario;
import com.example.ventas.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // Permitir solicitudes de este origen
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Usuario loginRequest) {
        Optional<Usuario> usuarioOpt = usuarioService.obtenerUsuarioPorEmail(loginRequest.getEmail());

        if (usuarioOpt.isEmpty() || !usuarioOpt.get().getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
        }

        return ResponseEntity.ok("Inicio de sesión exitoso");
    }
}

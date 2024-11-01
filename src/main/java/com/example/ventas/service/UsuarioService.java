package com.example.ventas.service;

import com.example.ventas.model.Usuario;
import com.example.ventas.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Usuario> obtenerTodosLosUsuarios() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> obtenerUsuarioPorId(String id) {
        return usuarioRepository.findById(id);
    }

    public Usuario crearUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public void eliminarUsuario(String id) {
        usuarioRepository.deleteById(id);
    }

    public Optional<Usuario> obtenerUsuarioPorEmail(String email) {
        List<Usuario> usuarios = usuarioRepository.findByEmail(email);
        return usuarios.isEmpty() ? Optional.empty() : Optional.of(usuarios.get(0));
    }
}

package com.example.ventas.service;

import com.example.ventas.model.Empresa;
import com.example.ventas.repository.EmpresaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmpresaService {

    @Autowired
    private EmpresaRepository empresaRepository;

    public List<Empresa> obtenerEmpresas() {
        return empresaRepository.findAll();
    }

    public Empresa obtenerEmpresaPorId(String id) {
        return empresaRepository.findById(id).orElse(null);
    }

    public Empresa crearEmpresa(Empresa empresa) {
        return empresaRepository.save(empresa);
    }

    public Empresa actualizarEmpresa(String id, Empresa empresaActualizada) {
        empresaActualizada.setId(id);
        return empresaRepository.save(empresaActualizada);
    }

    public void eliminarEmpresa(String id) {
        empresaRepository.deleteById(id);
    }
}

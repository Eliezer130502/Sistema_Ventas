import React, { useEffect, useState } from 'react';
import './EmpresaForm.css'; // Asegúrate de importar el CSS

const EmpresaForm = () => {
    const [empresa, setEmpresa] = useState({ id: '', nombre: '', direccion: '', telefono: '', email: '' });
    const [empresas, setEmpresas] = useState([]);

    useEffect(() => {
        fetchEmpresas();
    }, []);

    const fetchEmpresas = async () => {
        const response = await fetch('http://localhost:8080/api/empresas');
        const data = await response.json();
        setEmpresas(data);
    };

    const handleChange = (e) => {
        setEmpresa({ ...empresa, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (empresa.id) {
            // Actualiza empresa existente
            await fetch(`http://localhost:8080/api/empresas/${empresa.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(empresa),
            });
        } else {
            // Crea nueva empresa
            await fetch('http://localhost:8080/api/empresas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(empresa),
            });
        }
        fetchEmpresas();
        setEmpresa({ id: '', nombre: '', direccion: '', telefono: '', email: '' });
    };

    const handleEdit = (empresa) => {
        setEmpresa(empresa); // Llena el formulario con los datos de la empresa seleccionada
    };

    const handleDelete = async (id) => {
        await fetch(`http://localhost:8080/api/empresas/${id}`, {
            method: 'DELETE',
        });
        fetchEmpresas();
    };

    return (
        <div className="empresa-form-container">
            <h2>{empresa.id ? 'Actualizar Empresa' : 'Registrar Empresa'}</h2>
            <form onSubmit={handleSubmit}>
                <input name="nombre" value={empresa.nombre} onChange={handleChange} placeholder="Nombre" required />
                <input name="direccion" value={empresa.direccion} onChange={handleChange} placeholder="Dirección" required />
                <input name="telefono" value={empresa.telefono} onChange={handleChange} placeholder="Teléfono" />
                <input name="email" value={empresa.email} onChange={handleChange} placeholder="Email" />
                <button type="submit">Guardar</button>
            </form>

            <h2>Lista de Empresas</h2>
            <ul className="empresa-list">
                {empresas.map((empresa) => (
                    <li className="empresa-list-item" key={empresa.id}>
                        {empresa.nombre}
                        <div>
                            <button onClick={() => handleEdit(empresa)}>Editar</button>
                            <button onClick={() => handleDelete(empresa.id)}>Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmpresaForm;

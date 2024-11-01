import React, { useEffect, useState } from 'react';
import './UsuarioList.css'; // Asegúrate de importar el archivo de estilos

const UsuarioList = ({ nombreUsuario }) => {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const fetchUsuarios = async () => {
            const response = await fetch('http://localhost:8080/api/usuarios');
            const data = await response.json();
            setUsuarios(data);
        };
        fetchUsuarios();
    }, []);

    const eliminarUsuario = async (id) => {
        await fetch(`http://localhost:8080/api/usuarios/${id}`, { method: 'DELETE' });
        setUsuarios(usuarios.filter(usuario => usuario.id !== id));
    };

    return (
        <div className="usuarios-container">
            <h2>Bienvenido, {nombreUsuario}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(usuario => (
                        <tr key={usuario.id}>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.rol}</td>
                            <td>
                                <button onClick={() => eliminarUsuario(usuario.id)}>Eliminar Usuario</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsuarioList;
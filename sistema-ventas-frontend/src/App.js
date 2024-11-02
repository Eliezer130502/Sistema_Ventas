import React, { useState } from 'react';
import Login from './components/Login/Login';
import UsuariosList from './components/Usuarios/UsuarioList';
import ProveedorList from './components/Proveedores/ProveedorList';
import EmpresaForm from './components/Empresa/EmpresaForm';
import ArticuloList from './components/Articulos/ArticuloList'; 
import './App.css';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [rolUsuario, setRolUsuario] = useState(''); // Almacenar el rol del usuario
    const [showProveedores, setShowProveedores] = useState(false);
    const [showEmpresas, setShowEmpresas] = useState(false);
    const [showArticulos, setShowArticulos] = useState(false);
    const [showUsuarios, setShowUsuarios] = useState(false); // Estado para mostrar la lista de usuarios

    const handleLogin = (nombre, rol) => {
        setIsLoggedIn(true);
        setNombreUsuario(nombre);
        setRolUsuario(rol); // Almacenar el rol al iniciar sesión
        console.log("Rol del usuario:", rol); // Verificar el rol
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setNombreUsuario('');
        setRolUsuario(''); // Limpiar el rol al cerrar sesión
        setShowProveedores(false);
        setShowEmpresas(false);
        setShowArticulos(false); 
        setShowUsuarios(false); // Limpiar la vista de usuarios al cerrar sesión
    };

    const toggleView = (view) => {
        setShowProveedores(view === 'proveedores');
        setShowEmpresas(view === 'empresas');
        setShowArticulos(view === 'articulos'); 
        setShowUsuarios(view === 'usuarios'); // Agregar la lógica para usuarios
    };

    return (
        <div className="app-container">
            <h1>Sistema de Ventas Online</h1>
            {!isLoggedIn ? (
                <Login onLogin={handleLogin} />
            ) : (
                <div>
                    <h2>Bienvenido, {nombreUsuario}</h2>
                    <button onClick={() => toggleView(showProveedores ? '' : 'proveedores')}>PROVEEDORES</button>
                    <button onClick={() => toggleView(showEmpresas ? '' : 'empresas')}>EMPRESAS</button>
                    <button onClick={() => toggleView(showArticulos ? '' : 'articulos')}>ARTICULOS</button>
                    {rolUsuario === 'administrador' && (
                        <button onClick={() => toggleView(showUsuarios ? '' : 'usuarios')}>USUARIOS</button>
                    )} {/* Mostrar solo si es administrador */}
                    <button onClick={handleLogout}>SALIR</button>

                    {showProveedores && <ProveedorList />}
                    {showEmpresas && <EmpresaForm />}
                    {showArticulos && <ArticuloList />}
                    {showUsuarios && <UsuariosList nombreUsuario={nombreUsuario} />} {/* Mostrar lista de usuarios */}
                </div>
            )}
        </div>
    );
};

export default App;

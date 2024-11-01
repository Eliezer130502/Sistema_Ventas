import React, { useState } from 'react';
import Login from './components/Login/Login';
import UsuariosList from './components/Usuarios/UsuarioList';
import Carrito from './components/Carrito/Carrito';
import Pedidos from './components/Pedidos/Pedidos';
import PagoForm from './components/Pago/PagoForm';
import ProveedorList from './components/Proveedores/ProveedorList';
import EmpresaForm from './components/Empresa/EmpresaForm';
import ArticuloList from './components/Articulos/ArticuloList'; // Importa el componente para gestionar artículos
import './App.css';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [showProveedores, setShowProveedores] = useState(false);
    const [showEmpresas, setShowEmpresas] = useState(false);
    const [showCarrito, setShowCarrito] = useState(false);
    const [showPedidos, setShowPedidos] = useState(false);
    const [showPagoForm, setShowPagoForm] = useState(false);
    const [showArticulos, setShowArticulos] = useState(false); // Estado para gestionar artículos
    const [carrito, setCarrito] = useState([]);
    const [historial, setHistorial] = useState([]);

    const handleLogin = (nombre) => {
        setIsLoggedIn(true);
        setNombreUsuario(nombre);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setNombreUsuario('');
        // Reiniciar todas las vistas
        setShowProveedores(false);
        setShowEmpresas(false);
        setShowCarrito(false);
        setShowPedidos(false);
        setShowPagoForm(false);
        setShowArticulos(false); // Reiniciar vista de artículos
        setCarrito([]);
    };

    const toggleView = (view) => {
        setShowProveedores(view === 'proveedores');
        setShowEmpresas(view === 'empresas');
        setShowCarrito(view === 'carrito');
        setShowPedidos(view === 'pedidos');
        setShowPagoForm(view === 'pagoForm');
        setShowArticulos(view === 'articulos'); // Manejar vista de artículos
    };

    const procesarPago = (metodoPago) => {
        setHistorial([...historial, { items: carrito, metodoPago }]);
        setCarrito([]);
        toggleView('pagoForm');
    };

    return (
        <div className="app-container">
            <h1>Sistema de Ventas Online</h1>
            {!isLoggedIn ? (
                <Login onLogin={handleLogin} />
            ) : (
                <div>
                    <h2>Bienvenido, {nombreUsuario}</h2>
                    {/* Botones para navegar entre componentes */}
                    <button onClick={() => toggleView(showProveedores ? '' : 'proveedores')}>PROVEEDORES</button>
                    <button onClick={() => toggleView(showEmpresas ? '' : 'empresas')}>EMPRESAS</button>
                    <button onClick={() => toggleView(showArticulos ? '' : 'articulos')}>ARTICULOS</button> {/* Nuevo botón para gestionar artículos */}
                    <button onClick={() => toggleView(showCarrito ? '' : 'carrito')}>CARRITO</button>
                    <button onClick={() => toggleView(showPedidos ? '' : 'pedidos')}>PEDIDOS</button>
                    <button onClick={() => toggleView(showPagoForm ? '' : 'pagoForm')}>PAGO</button>
                    <button onClick={handleLogout}>SALIR</button>

                    {/* Renderiza los componentes según el estado */}
                    {showProveedores && <ProveedorList />}
                    {showEmpresas && <EmpresaForm />}
                    {showArticulos && <ArticuloList />} {/* Componente para gestionar artículos */}
                    {showCarrito && <Carrito items={carrito} />}
                    {showPedidos && <Pedidos historial={historial} />}
                    {showPagoForm && <PagoForm onSubmit={procesarPago} />}
                    {/* Si no hay vista seleccionada, mostrar la lista de usuarios */}
                    {!showProveedores && !showCarrito && !showPedidos && !showPagoForm && !showArticulos && <UsuariosList />}
                </div>
            )}
        </div>
    );
};

export default App;

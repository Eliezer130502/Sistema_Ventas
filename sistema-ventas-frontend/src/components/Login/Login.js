import React, { useState } from 'react';
import './Login.css'; // Asegúrate de importar el archivo de estilos

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [role, setRole] = useState('cliente');
    const [adminPassword, setAdminPassword] = useState('');
    const [nombre, setNombre] = useState(''); // Estado para el nombre del nuevo usuario

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Limpiar el mensaje de error previo

        if (isRegistering) {
            await handleRegister();
        } else {
            await handleLogin();
        }
    };

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al iniciar sesión');
            }
    
            const data = await response.json();
            alert(data.message);
            onLogin(data.nombre, data.rol); // Pasa el nombre y el rol del usuario
        } catch (err) {
            setError(err.message);
        }
    };

    const handleRegister = async () => {
        if (role === 'administrador' && adminPassword !== 'Mongo') {
            setError('La contraseña de administrador es incorrecta');
            return;
        }

        const newUser = {
            nombre, // Usar el nombre ingresado por el usuario
            email,
            rol: role,
            password,
        };

        try {
            const response = await fetch('http://localhost:8080/api/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });

            if (!response.ok) {
                const errorData = await response.json(); // Obtener el error como JSON
                throw new Error(errorData.error || 'Error al registrarse');
            }

            alert('Registro exitoso'); // Mensaje de éxito
            setIsRegistering(false); // Volver al formulario de inicio de sesión
            setNombre(''); // Limpiar el campo de nombre después del registro
            setEmail('');
            setPassword('');
            setAdminPassword('');
        } catch (err) {
            setError(err.message); // Mostrar el error en el formulario
        }
    };

    return (
        <div className="login-container">
            <h2>{isRegistering ? 'Registrarse' : 'Iniciar Sesión'}</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                {isRegistering && (
                    <div>
                        <label>Nombre:</label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </div>
                )}
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {isRegistering && (
                    <>
                        <div>
                            <label>Rol:</label>
                            <select value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="cliente">Cliente</option>
                                <option value="administrador">Administrador</option>
                            </select>
                        </div>
                        {role === 'administrador' && (
                            <div>
                                <label>Contraseña de Administrador:</label>
                                <input
                                    type="password"
                                    value={adminPassword}
                                    onChange={(e) => setAdminPassword(e.target.value)}
                                    required
                                />
                            </div>
                        )}
                    </>
                )}
                <button type="submit">{isRegistering ? 'Registrarse' : 'Iniciar Sesión'}</button>
            </form>
            <button className="toggle-button" onClick={() => setIsRegistering(!isRegistering)}>
                {isRegistering ? '¿Ya tienes cuenta? Iniciar Sesión' : '¿No tienes cuenta? Registrarse'}
            </button>
        </div>
    );
};

export default Login;

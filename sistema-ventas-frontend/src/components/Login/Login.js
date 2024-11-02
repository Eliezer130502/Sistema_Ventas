import React, { useState } from 'react';
import './Login.css'; // Asegúrate de importar el archivo de estilos

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [role, setRole] = useState('cliente');
    const [adminPassword, setAdminPassword] = useState('');
    const [nombre, setNombre] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validaciones
        if (isRegistering) {
            if (!nombre || !email || !password || (role === 'administrador' && !adminPassword)) {
                setError('Por favor, completa todos los campos requeridos.');
                return;
            }
            await handleRegister();
        } else {
            await handleLogin();
        }
    };

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/usuarios');
            const usuarios = await response.json();
            
            // Buscar el usuario por email
            const usuario = usuarios.find(user => user.email === email);
            
            if (usuario && usuario.password === password) {
                alert("Inicio de sesión exitoso");
                onLogin(usuario.nombre, usuario.rol); // Pasa el nombre y rol
            } else {
                setError('Credenciales incorrectas');
            }
        } catch (err) {
            setError(err.message);
        }
    }
    

    const handleRegister = async () => {
        if (role === 'administrador' && adminPassword !== 'Mongo') {
            setError('La contraseña de administrador es incorrecta');
            return;
        }

        const newUser = {
            nombre,
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
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al registrarse');
            }

            alert('Registro exitoso');
            setIsRegistering(false);
            setNombre('');
            setEmail('');
            setPassword('');
            setAdminPassword('');
        } catch (err) {
            setError(err.message);
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

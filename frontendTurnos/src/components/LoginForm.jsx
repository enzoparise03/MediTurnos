import { useState } from 'react';
import { Form, Button, Alert, Card, Container } from 'react-bootstrap'; 
import clienteAxios from '../config/axios'; 
import { useNavigate, Link } from 'react-router-dom'; 
import useAuthStore from '../stores/useAuthStore'; 

function LoginForm() {
    const [formData, setFormData] = useState({
        email: '',
        contrasena: '' 
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate(); 
    const iniciarSesion = useAuthStore((state) => state.iniciarSesion); 

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ 
            ...formData, 
            [name]: value 
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); 
        setError('');           
        setLoading(true);       

        try {
            const response = await clienteAxios.post('/usuarios/login', formData);
            console.log('Login exitoso:', response.data);
            
            const tokenCrudo = response.data.token;

            const payloadBase64 = tokenCrudo.split('.')[1]; 
            const payloadTexto = atob(payloadBase64);
            const datosToken = JSON.parse(payloadTexto);
            
            console.log('Token desencriptado:', datosToken);
            
            iniciarSesion({ 
                email: formData.email,
                id: datosToken.id
            }); 
            
            navigate('/turnos');
            
        } catch (error) {
            console.error('Error en la petición:', error);
            setError(error.response?.data?.mensaje || 'Credenciales incorrectas o error de servidor.');
        } finally {
            setLoading(false); 
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <Card style={{ width: '100%', maxWidth: '420px' }} className="shadow-sm">
                <Card.Body className="p-4">
                    <h2 className="text-center mb-4">Ingreso al Sistema</h2>
                    
                    {error && <Alert variant="danger" className="text-center">{error}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        {/* Grupo para el Email */}
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Correo Electrónico</Form.Label>
                            <Form.Control 
                                type="email" 
                                name="email" 
                                value={formData.email} 
                                onChange={handleChange} 
                                placeholder="ejemplo@hospital.com" 
                                required 
                            />
                        </Form.Group>

                        {/* Grupo para la Contraseña */}
                        <Form.Group className="mb-4" controlId="formGroupPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control 
                                type="password" 
                                name="contrasena" 
                                value={formData.contrasena} 
                                onChange={handleChange} 
                                placeholder="Ingrese su contraseña" 
                                required 
                            />
                        </Form.Group>

                        {/* Botón de Ingreso */}
                        <Button 
                            variant="primary" 
                            type="submit" 
                            className="w-100 py-2 mb-3" 
                            disabled={loading}
                        >
                            {loading ? 'Verificando credenciales...' : 'Ingresar'}
                        </Button>

                        <div className="text-center mt-3 small">
                            ¿No tienes cuenta? <Link to="/registro" className="text-decoration-none fw-bold">Regístrate aquí</Link>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default LoginForm;
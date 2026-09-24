import { useState } from 'react';
import { Form, Button, Alert, Card, Container } from 'react-bootstrap';
import clienteAxios from '../config/axios'; // (Fuente: Clase 4.pdf)
import { useNavigate, Link } from 'react-router-dom'; // (Fuente: Clase 9.pdf)

function RegisterForm() {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        contrasena: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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
        setSuccess(false);
        setLoading(true);

        try {
            await clienteAxios.post('/usuarios/registro', formData);
            
            setSuccess(true); 
            
            setTimeout(() => {
                navigate('/login');
            }, 2500);

        } catch (error) {
            console.error('Error en el registro:', error);
            setError(error.response?.data?.mensaje || 'Hubo un error al intentar crear la cuenta.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <Card style={{ width: '100%', maxWidth: '440px' }} className="shadow-sm">
                <Card.Body className="p-4">
                    <h2 className="text-center mb-4 fw-bold text-primary">Crear Cuenta</h2>
                    
                    {/* Alertas condicionales de Error o Éxito (Fuente: Clase 11.pdf) */}
                    {error && <Alert variant="danger" className="text-center">{error}</Alert>}
                    {success && (
                        <Alert variant="success" className="text-center">
                            ¡Cuenta creada con éxito! Redirigiendo al ingreso...
                        </Alert>
                    )}

                    <Form onSubmit={handleSubmit}>
                        {/* Campo Nombre (Exigido por tu contrato) */}
                        <Form.Group className="mb-3" controlId="registerName">
                            <Form.Label>Nombre Completo</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="nombre" 
                                value={formData.nombre}
                                onChange={handleChange}
                                placeholder="Juan Pérez"
                                required 
                            />
                        </Form.Group>

                        {/* Campo Email */}
                        <Form.Group className="mb-3" controlId="registerEmail">
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

                        {/* Campo Contraseña */}
                        <Form.Group className="mb-4" controlId="registerPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control 
                                type="password" 
                                name="contrasena" 
                                value={formData.contrasena}
                                onChange={handleChange}
                                placeholder="Mínimo 6 caracteres" 
                                required 
                            />
                        </Form.Group>

                        <Button 
                            variant="primary" 
                            type="submit" 
                            className="w-100 py-2 fw-bold" 
                            disabled={loading || success}
                        >
                            {loading ? 'Creando usuario...' : 'Registrarse'}
                        </Button>

                        <div className="text-center mt-3 small">
                            ¿Ya tienes una cuenta? <Link to="/login" className="text-decoration-none">Inicia sesión aquí</Link>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default RegisterForm;
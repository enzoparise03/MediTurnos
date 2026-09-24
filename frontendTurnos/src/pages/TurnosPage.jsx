import { useState, useEffect } from 'react';
import { Container, Alert, Spinner, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import clienteAxios from '../config/axios';
import useAuthStore from '../stores/useAuthStore';

function TurnosPage() {
    const [profesionales, setProfesionales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const user = useAuthStore((state) => state.user); 
    const [showModal, setShowModal] = useState(false); 
    const [profesionalSeleccionado, setProfesionalSeleccionado] = useState(null); 
    const [turnoData, setTurnoData] = useState({ fecha: '', hora: '' }); 
    const [mensajeModal, setMensajeModal] = useState({ texto: '', tipo: '' }); 
    const [loadingTurno, setLoadingTurno] = useState(false);

    const generarHorarios = () => {
    const horarios = [];
    for (let i = 9; i < 20; i++) {
        const horaStr = i.toString().padStart(2, '0');
        horarios.push(`${horaStr}:00`);
        horarios.push(`${horaStr}:30`);
    }
    return horarios;
}

    useEffect(() => {
        const cargarProfesionales = async () => {
            try {
                const response = await clienteAxios.get('/professionals');
                setProfesionales(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.mensaje || 'Error al conectar con el servidor.');
                setLoading(false);
            }
        };
        cargarProfesionales();
    }, []);

    const handleAbrirModal = (medico) => {
        setProfesionalSeleccionado(medico);
        setShowModal(true);
    };

    const handleCerrarModal = () => {
        setShowModal(false);
        setProfesionalSeleccionado(null);
        setTurnoData({ fecha: '', hora: '' });
        setMensajeModal({ texto: '', tipo: '' });
    };

    const handleChange = (e) => {
        setTurnoData({ ...turnoData, [e.target.name]: e.target.value });
    };

    const handleReservarTurno = async (e) => {
        e.preventDefault();
        setMensajeModal({ texto: '', tipo: '' });
        setLoadingTurno(true);

        try {
            const payload = {
                fecha: turnoData.fecha,
                hora: turnoData.hora,
                paciente: user.id, 
                profesional: profesionalSeleccionado._id || profesionalSeleccionado.id, 
                especialidad: profesionalSeleccionado.especialidad || 'General'
            };

            const response = await clienteAxios.post('/turnos', payload);
            console.log('Respuesta del servidor al guardar turno:', response.data);

            console.log("📦 PAQUETE A ENVIAR:", payload);
            
            setMensajeModal({ texto: '¡Turno reservado con éxito!', tipo: 'success' });
            setTurnoData({ fecha: '', hora: '' }); 
        } catch (error) {
            console.error('🚨 ERROR DEL SERVIDOR:', error.response?.data);
            console.error('Error al reservar:', error);
            setMensajeModal({ 
                texto: error.response?.data?.mensaje || 'Hubo un error al reservar el turno.', 
                tipo: 'danger' 
            });
        } finally {
            setLoadingTurno(false);
        }
    };

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
                <p>Cargando lista de profesionales...</p>
            </Container>
        );
    }

    if (error) {
        return <Container className="mt-5"><Alert variant="danger">{error}</Alert></Container>;
    }

    return (
        <Container className="mt-5">
            <h2 className="mb-4">Profesionales Disponibles</h2>
            
            <Row>
                {profesionales.length > 0 ? (
                    profesionales.map((medico) => (
                        <Col md={4} key={medico._id || medico.id} className="mb-4">
                            <Card className="shadow-sm h-100">
                                <Card.Body>
                                    <Card.Title>Dr/a. {medico.nombre}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">
                                        Especialidad: {medico.especialidad || 'General'}
                                    </Card.Subtitle>
                                    <Card.Text>Atención: Lunes a Viernes.</Card.Text>
                                    
                                    <Button 
                                        variant="outline-primary" 
                                        className="w-100"
                                        onClick={() => handleAbrirModal(medico)}
                                    >
                                        Solicitar Turno
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Alert variant="info">No hay profesionales registrados en el sistema.</Alert>
                )}
            </Row>

            <Modal show={showModal} onHide={handleCerrarModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Reservar Turno</Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    {profesionalSeleccionado && (
                        <Alert variant="info" className="py-2">
                            Profesional: <strong>{profesionalSeleccionado.nombre}</strong>
                        </Alert>
                    )}

                    {mensajeModal.texto && (
                        <Alert variant={mensajeModal.tipo}>{mensajeModal.texto}</Alert>
                    )}

                   <Form onSubmit={handleReservarTurno}>
                        <Form.Group className="mb-3">
                            <Form.Label>Fecha del Turno</Form.Label>
                            <Form.Control 
                                type="date" 
                                name="fecha"
                                value={turnoData.fecha}
                                onChange={handleChange}
                                min={new Date().toISOString().split("T")[0]}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Hora del Turno</Form.Label>
                            <Form.Select 
                                name="hora"
                                value={turnoData.hora}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Seleccione un horario</option>
                                {generarHorarios().map((hora) => (
                                    <option key={hora} value={hora}>
                                        {hora}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Button 
                            variant="primary" 
                            type="submit" 
                            className="w-100"
                            disabled={loadingTurno}
                        >
                            {loadingTurno ? 'Procesando reserva...' : 'Confirmar Reserva'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default TurnosPage;
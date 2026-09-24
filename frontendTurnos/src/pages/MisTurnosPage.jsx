import { useState, useEffect } from 'react';
import { Container, Table, Spinner, Alert, Card, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import clienteAxios from '../config/axios';

function MisTurnosPage() {
    const [turnos, setTurnos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [loadingCancelar, setLoadingCancelar] = useState(false);

useEffect(() => {
        const cargarMisTurnos = async () => {
            try {
                const response = await clienteAxios.get('/turnos');
                
                if(response.data.length > 0) {
                     console.log("🕵️‍♂️ DATOS DEL PROFESIONAL:", response.data[0].profesional);
                }
                
                setTurnos(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error al cargar historial:', err);
                setError(err.response?.data?.mensaje || 'Error al conectar con el servidor.');
                setLoading(false);
            }
        };
        
        cargarMisTurnos();
    }, []);

    const handleCancelarTurno = async (turnoId) => {
        const confirmar = window.confirm('¿Estás seguro de que deseás cancelar este turno médico?');
        if (!confirmar) return;

        setLoadingCancelar(true);
        setError('');

        try {
            await clienteAxios.delete(`/turnos/${turnoId}`);
            const turnosActualizados = turnos.filter(t => (t._id || t.id) !== turnoId);
            setTurnos(turnosActualizados);
        } catch (err) {
            console.error('Error al cancelar el turno:', err);
            alert(err.response?.data?.mensaje || 'No se pudo cancelar el turno. Intentá nuevamente.');
        } finally {
            setLoadingCancelar(false);
        }
    };

    if (loading) {
        return (
            <Container className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                <Spinner animation="grow" variant="primary" style={{ width: '3rem', height: '3rem' }} />
                <h5 className="mt-4 text-muted fw-semibold">Sincronizando tu historial...</h5>
            </Container>
        );
    }

    if (error) {
        return <Container className="mt-5"><Alert variant="danger" className="rounded-4 shadow-sm text-center">{error}</Alert></Container>;
    }

    return (
        <Container className="mt-5 mb-5">
            <div className="d-flex justify-content-between align-items-end mb-4">
                <div>
                    <h2 className="text-primary fw-bold mb-0">Mi Agenda Médica</h2>
                    <p className="text-muted mt-1">Gestioná tus próximas consultas y estudios.</p>
                </div>
            </div>
            
            {turnos.length > 0 ? (
                <Card className="shadow border-0 rounded-4 overflow-hidden">
                    <Table responsive hover className="mb-0 align-middle text-center">
                        <thead className="bg-light text-secondary" style={{ borderBottom: '2px solid #e9ecef' }}>
                            <tr>
                                <th className="py-3">📅 Fecha</th>
                                <th className="py-3">⏰ Hora</th>
                                <th className="py-3">👨‍⚕️ Profesional</th>
                                <th className="py-3">🩺 Especialidad</th>
                                <th className="py-3">📌 Estado</th>
                                <th className="py-3">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {turnos.map((turno) => {
                                const idActual = turno._id || turno.id;
                                return (
                                    <tr key={idActual} style={{ transition: 'all 0.2s ease-in-out' }}>
                                        <td className="fw-bold text-dark py-3">{turno.fecha}</td>
                                        <td className="py-3 text-muted">{turno.hora} hs</td>
                                        
                                        <td className="py-3 fw-semibold">Dr/a. {turno.profesional?.nombre || 'No asignado'}</td>
                                        
                                        <td className="py-3 text-muted">{turno.especialidad || 'General'}</td>
                                        <td className="py-3">
                                            <Badge bg="success" text="light" className="px-3 py-2 rounded-pill shadow-sm">
                                                Confirmado
                                            </Badge>
                                        </td>
                                        <td className="py-3">
                                            <Button 
                                                variant="outline-danger" 
                                                size="sm"
                                                className="rounded-pill px-3 fw-bold shadow-sm"
                                                disabled={loadingCancelar}
                                                onClick={() => handleCancelarTurno(idActual)}
                                                title="Cancelar este turno"
                                            >
                                                {loadingCancelar ? <Spinner as="span" animation="border" size="sm"/> : '🗑️ Cancelar'}
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </Card>
            ) : (
                <Card className="shadow-sm border-0 rounded-4 text-center py-5 bg-light">
                    <Card.Body className="py-5">
                        <div className="display-1 mb-3">📭</div>
                        <h3 className="fw-bold text-dark">Tu agenda está vacía</h3>
                        <p className="text-muted fs-5 mb-4">
                            Actualmente no tenés turnos programados en el sistema.
                        </p>
                        <Button as={Link} to="/turnos" variant="primary" size="lg" className="rounded-pill px-5 shadow fw-bold">
                            Reservar mi primer turno
                        </Button>
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
}

export default MisTurnosPage;
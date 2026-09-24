import { Container, Row, Col, Card } from 'react-bootstrap';

const especialidades = [
    { id: 1, nombre: 'Cardiología', icono: '❤️', desc: 'Atención integral de enfermedades cardiovasculares y prevención.' },
    { id: 2, nombre: 'Pediatría', icono: '👶', desc: 'Cuidado especializado para bebés, niños y adolescentes.' },
    { id: 3, nombre: 'Traumatología', icono: '🦴', desc: 'Tratamiento de lesiones del sistema musculoesquelético.' },
    { id: 4, nombre: 'Neurología', icono: '🧠', desc: 'Diagnóstico y tratamiento de trastornos del sistema nervioso.' },
    { id: 5, nombre: 'Oftalmología', icono: '👁️', desc: 'Cuidado integral de la salud visual, cirugías y tratamientos.' },
    { id: 6, nombre: 'Dermatología', icono: '🔬', desc: 'Especialistas en el cuidado y tratamiento de la piel, cabello y uñas.' },
];

function EspecialidadesPage() {
    return (
        <Container className="py-5 mb-5">
            <div className="text-center mb-5">
                <h1 className="fw-bold text-primary">Nuestras Especialidades</h1>
                <p className="lead text-muted">Contamos con un equipo médico multidisciplinario de excelencia.</p>
            </div>

            <Row className="g-4">
                {especialidades.map((esp) => (
                    <Col md={4} sm={6} key={esp.id}>
                        <Card className="h-100 border-0 shadow-sm text-center card-hover">
                            <Card.Body className="p-4">
                                <div className="display-4 mb-3">{esp.icono}</div>
                                <Card.Title className="fw-bold fs-4">{esp.nombre}</Card.Title>
                                <Card.Text className="text-secondary mt-3">
                                    {esp.desc}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default EspecialidadesPage;
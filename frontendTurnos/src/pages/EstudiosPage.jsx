import { Container, Row, Col, Card } from 'react-bootstrap';

const estudios = [
    { id: 1, nombre: 'Resonancia Magnética', desc: 'Imágenes de alta resolución para diagnósticos precisos de tejidos blandos.', preparacion: 'Ayuno de 4hs. Sin objetos metálicos.' },
    { id: 2, nombre: 'Tomografía Computada', desc: 'Exploración detallada de órganos internos mediante tecnología de rayos X 3D.', preparacion: 'Requiere turno y orden médica.' },
    { id: 3, nombre: 'Ecografía Doppler', desc: 'Estudios por ultrasonido de alta precisión para evaluar el flujo sanguíneo.', preparacion: 'Retención de líquidos según la zona.' },
    { id: 4, nombre: 'Análisis Clínicos', desc: 'Laboratorio completo para análisis de sangre, orina y otros fluidos.', preparacion: 'Ayuno estricto de 8 a 12 horas.' },
    { id: 5, nombre: 'Radiografía Digital', desc: 'Rayos X rápidos con menor exposición a la radiación y entrega inmediata.', preparacion: 'Sin preparación previa requerida.' },
    { id: 6, nombre: 'Electrocardiograma', desc: 'Evaluación rápida y segura del ritmo y la actividad eléctrica del corazón.', preparacion: 'Ropa cómoda, sin cremas en el pecho.' },
];

function EstudiosPage() {
    return (
        <Container className="py-5 mb-5">
            <div className="text-center mb-5">
                <h1 className="fw-bold text-primary">Estudios Médicos</h1>
                <p className="lead text-muted">Equipamiento de última generación para diagnósticos certeros.</p>
            </div>

            <Row className="g-4">
                {estudios.map((estudio) => (
                    <Col lg={6} key={estudio.id}>
                        <Card className="h-100 shadow-sm border-light">
                            <Card.Body className="p-4 d-flex flex-column">
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                    <Card.Title className="fw-bold text-dark fs-5">{estudio.nombre}</Card.Title>
                                </div>
                                <Card.Text className="text-secondary flex-grow-1">
                                    {estudio.desc}
                                </Card.Text>
                                <hr className="text-muted" />
                                <div className="text-muted small">
                                    <strong><span className="text-primary">⚠️ Preparación:</span></strong> {estudio.preparacion}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default EstudiosPage;
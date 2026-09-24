import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
    const anioActual = new Date().getFullYear();

    return (
        <footer className="bg-dark text-light py-2 mt-auto border-top border-secondary">
            <Container>
                <Row className="g-3 align-items-center text-center text-md-start mt-1">
                    
                    <Col md={4} sm={12}>
                        <h6 className="fw-bold text-primary mb-1" style={{ letterSpacing: '-0.5px' }}>
                            MediTurnos
                        </h6>
                        <p className="text-light small mb-0" style={{ fontSize: '0.85rem' }}>
                            Sistema integral de autogestión médica.<br/>
                            Cuidando tu tiempo y tu salud.
                        </p>
                    </Col>

                    <Col md={4} sm={12} className="text-center">
                        <h6 className="fw-bold text-secondary mb-1">¿Dónde estamos?</h6>
                        <p className="text-light mb-0 " style={{ fontSize: '0.85rem' }}>
                            Av. General Paz 742, Centro Médico.<br />
                            Buenos Aires, Argentina.
                        </p>
                    </Col>

                    <Col md={4} sm={12} className="text-md-end text-center">
                        <h6 className="fw-bold text-secondary mb-1">Contacto de Emergencia</h6>
                        <p className="mb-0 fw-bold text-danger small">📞 0800-999-SALUD (72583)</p>
                        <p className="text-light text-opacity-50 mb-0 mt-1" style={{ fontSize: '0.75rem' }}>
                            Ambulancias y guardia 24hs
                        </p>
                    </Col>
                </Row>

                <hr className="my-0 border-secondary border-opacity-25" />
                
                <Row className="text-muted text-center">
                    <Col>
                        <p className="mb-0" style={{ fontSize: '0.75rem' }}>
                            &copy; {anioActual} MediTurnos Inc. Todos los derechos reservados.
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
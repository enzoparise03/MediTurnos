import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

function HomePage() {
    return (
        <div className="homepage-wrapper">
            
            <section className={styles.heroSection}>
                <Container className="text-center">
                    <h1 className={`display-3 mb-4 ${styles.heroTitle}`}>
                        Tu salud, nuestra prioridad
                    </h1>
                    <p className="lead mb-5 fs-4 fw-light">
                        Reserva tus turnos médicos de forma rápida, segura y 100% online.
                        Contamos con tecnología de punta a tu disposición.
                    </p>
                    <Button 
                        as={Link} 
                        to="/turnos" 
                        variant="light" 
                        size="lg" 
                        className="text-primary fw-bold rounded-pill px-5 shadow-sm"
                    >
                        Sacar Turno Ahora
                    </Button>
                </Container>
            </section>

            <Container className="mb-5 pb-4">
                <h2 className="text-center mb-5 fw-bold text-secondary">¿Por qué elegirnos?</h2>
                
                <Row className="g-4">
                    <Col md={4} sm={12}>
                        <Card className={styles.featureCard}>
                            <Card.Body className="text-center p-4">
                                <span className={styles.iconWrapper}>🚑</span>
                                <Card.Title className="fw-bold fs-4">Guardia 24hs</Card.Title>
                                <Card.Text className="text-muted mt-3">
                                    Atención ininterrumpida todos los días del año para urgencias y emergencias médicas.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    
                    <Col md={4} sm={12}>
                        <Card className={styles.featureCard}>
                            <Card.Body className="text-center p-4">
                                <span className={styles.iconWrapper}>🩺</span>
                                <Card.Title className="fw-bold fs-4">Profesionales de Elite</Card.Title>
                                <Card.Text className="text-muted mt-3">
                                    Un staff médico altamente capacitado en más de 40 especialidades a tu servicio.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    
                    <Col md={4} sm={12}>
                        <Card className={styles.featureCard}>
                            <Card.Body className="text-center p-4">
                                <span className={styles.iconWrapper}>🔬</span>
                                <Card.Title className="fw-bold fs-4">Estudios Complejos</Card.Title>
                                <Card.Text className="text-muted mt-3">
                                    Equipamiento de última generación para diagnósticos por imagen y laboratorio clínico.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default HomePage;
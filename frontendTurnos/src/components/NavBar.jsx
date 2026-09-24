import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/useAuthStore';
import clienteAxios from '../config/axios';

import logoHospital from '../assets/logo-hospital.png'; 

function NavBar() {
    const user = useAuthStore((state) => state.user);
    const cerrarSesion = useAuthStore((state) => state.cerrarSesion);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await clienteAxios.post('/usuarios/logout');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        } finally {
            cerrarSesion();
            navigate('/');
        }
    };

    return (
        <Navbar bg="white" expand="lg" className="shadow-sm mb-4 py-4 position-relative">
            <Container fluid className="px-4 align-items-center">
                
                <Nav className="me-auto d-none d-lg-flex">
                    {!user ? (
                        <Button as={Link} to="/login" variant="primary" className="fw-bold rounded-pill px-4 shadow-sm">
                            Iniciar Sesión
                        </Button>
                    ) : (
                        <div className="d-flex align-items-center">
                            <span className="me-3 fw-semibold text-muted">
                                Hola, {user.email.split('@')[0]}
                            </span>
                            <Button as={Link} to="/mis-turnos" variant="outline-primary" size="sm" className="rounded-pill me-2 fw-bold shadow-sm">
                                Mis Turnos
                            </Button>
                            <Button variant="outline-danger" size="sm" onClick={handleLogout} className="rounded-pill shadow-sm">
                                Salir
                            </Button>
                        </div>
                    )}
                </Nav>

                <Navbar.Brand 
                    as={Link} 
                    to="/" 
                    className="position-absolute top-50 start-50 translate-middle fw-bolder m-0"
                    style={{ fontSize: '1.9rem', letterSpacing: '-1px' }}
                >
                    <span className="text-secondary">Medi</span>
                    <span className="text-primary">Turnos</span>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0 shadow-none" />

                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end text-center">
                    <Nav className="align-items-center fw-semibold mt-4 mt-lg-0">
                        
                        <div className="d-lg-none mb-3 w-100 pb-3 border-bottom">
                            {!user ? (
                                <Button as={Link} to="/login" variant="primary" className="fw-bold rounded-pill px-4 w-100 shadow-sm">
                                    Iniciar Sesión
                                </Button>
                            ) : (
                                <div className="d-flex flex-column gap-2">
                                    <span className="fw-semibold text-muted">Hola, {user.email.split('@')[0]}</span>
                                    <Button as={Link} to="/mis-turnos" variant="outline-primary" size="sm" className="rounded-pill w-100 fw-bold">Mis Turnos</Button>
                                    <Button variant="outline-danger" size="sm" onClick={handleLogout} className="rounded-pill w-100">Salir</Button>
                                </div>
                            )}
                        </div>

                        <Nav.Link as={Link} to="/especialidades" className="mx-2 text-dark">Especialidades</Nav.Link>
                        <Nav.Link as={Link} to="/turnos" className="mx-2 text-dark">Profesionales</Nav.Link>
                        <Nav.Link as={Link} to="/estudios" className="mx-2 text-dark">Estudios</Nav.Link>
                        
                        <img
                            src={logoHospital}
                            alt="Logo Hospital Central"
                            height="45"
                            className="ms-lg-3 mt-3 mt-lg-0 d-inline-block align-top"
                        />
                    </Nav>
                </Navbar.Collapse>

            </Container>
        </Navbar>
    );
}

export default NavBar;
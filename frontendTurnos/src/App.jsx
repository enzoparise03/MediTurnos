import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import TurnosPage from './pages/TurnosPage';
import RegisterForm from './components/RegisterForm';
import ProtectedRoute from './components/ProtectedRoute';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MisTurnosPage from './pages/MisTurnosPage';
import EspecialidadesPage from './pages/EspecialidadesPage';
import EstudiosPage from './pages/EstudiosPage';

function App() {
  return (    <div className="d-flex flex-column min-height-viewport" style={{ minHeight: '100vh' }}>
      
      <NavBar />
      
      {/* El motor de renderizado de las pantallas */}
      <main className="flex-grow-1 flex-shrink-0">
        <Routes>
          {/* === RUTAS PÚBLICAS === */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/registro" element={<RegisterForm />} />
          <Route path="/especialidades" element={<EspecialidadesPage />} />
          <Route path="/estudios" element={<EstudiosPage />} />
          
          {/* === RUTAS PROTEGIDAS === */}
          <Route path="/turnos" element={<ProtectedRoute><TurnosPage /></ProtectedRoute>} />
          <Route path="/mis-turnos" element={<ProtectedRoute><MisTurnosPage /></ProtectedRoute>} />

          {/* === RUTA COMODÍN === */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      <Footer />
      
    </div>
  )
}
export default App;
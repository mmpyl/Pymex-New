import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

// Modo desarrollo: establecer en true para bypass de autenticación
const DEVELOPMENT_MODE = import.meta.env.DEV;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // En modo desarrollo, permitir acceso sin autenticación
  if (DEVELOPMENT_MODE) {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
}
import { useAuthStore } from '../../store/auth.store';
import { authService } from '../../services/core/auth.service';

export const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Error al cerrar sesión en el servidor:', error);
    } finally {
      logout();
    }
  };

  return {
    handleLogout,
  };
};
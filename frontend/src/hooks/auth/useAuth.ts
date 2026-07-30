import { useAuthStore } from '../../store/auth.store';

export const useAuth = () => {
  const { user, accessToken, isAuthenticated, login, logout, updateUser } = useAuthStore();

  return {
    user,
    accessToken,
    isAuthenticated,
    login,
    logout,
    updateUser,
  };
};
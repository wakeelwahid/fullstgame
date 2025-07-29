
import { useAuth } from './useAuth';
import { Alert } from 'react-native';

export const useAuthGuard = () => {
  const { isAuthenticated, user } = useAuth();

  const requireAuth = (action: () => void, message?: string) => {
    if (!isAuthenticated) {
      Alert.alert(
        'Login Required',
        message || 'इस feature को access करने के लिए आपको login करना होगा।',
        [
          {
            text: 'Cancel',
            style: 'cancel'
          },
          {
            text: 'Login',
            onPress: () => {
              // This will be handled by the calling component
              return false;
            }
          }
        ]
      );
      return false;
    }
    action();
    return true;
  };

  const checkAuth = () => {
    return isAuthenticated;
  };

  const getUser = () => {
    return user;
  };

  return {
    requireAuth,
    checkAuth,
    getUser,
    isAuthenticated,
    user
  };
};

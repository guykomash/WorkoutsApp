import axios from '../api/axios';
import { useAuth } from '../contexts/AuthProvider';
const useRefreshToken = () => {
  const { setAuth } = useAuth();

  //refresh will update the auth context accessToken
  const refresh = async () => {
    try {
      const response = await axios.get('/refresh', { withCredentials: true });
      setAuth((prev) => {
        return { ...prev, accessToken: response.data.accessToken };
      });
      return response.data.accessToken;
    } catch (err) {
      console.error(err);
    }
  };
  return refresh; // userRefreshToken() returns the refresh function.
};

export default useRefreshToken;

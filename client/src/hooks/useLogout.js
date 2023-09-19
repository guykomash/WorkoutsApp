import axios from '../api/axios';
import { useAuth } from '../contexts/AuthProvider';

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    try {
      const response = await axios.get('/logout', {
        withCredentials: true,
      });
      console.log(response.data);
      setAuth({});
    } catch (err) {
      console.error(err);
      setAuth({});
    }
  };

  return logout;
};

export default useLogout;

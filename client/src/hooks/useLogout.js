import axios from '../api/axios';
import useAuth from './useAuth';

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
      console.err(err);
      setAuth({});
    }
  };

  return logout;
};

export default useLogout;

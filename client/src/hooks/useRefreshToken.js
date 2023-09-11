import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = () => {
    axios
      .get('/refresh', {
        withCredentials: true,
      })
      .then((res) => {
        setAuth((prev) => {
          console.log(prev);
          console.log(res.data.accessToken);
          return { ...prev, accessToken: res.data.accessToken };
        });
        return res.data.accessToken;
      })
      .catch((err) => console.error(err));
  };

  return refresh;
};

export default useRefreshToken;

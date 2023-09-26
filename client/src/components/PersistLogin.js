import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import { useAuth } from '../contexts/AuthProvider';
import { useWorkouts } from '../contexts/WorkoutsProvider';
import { useExercises } from '../contexts/ExercisesProvider';
const PersistLogin = () => {
  const { user, global } = useWorkouts();
  const { fetchAllExercises } = useExercises();
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh(); // new accessToken will be saved to auth context. this will prevent RequireAuth componenet to 'kick' out.
        // await fetchLoginData();
      } catch (err) {
        console.log(`refresh err response.status = ${err.status}`);
        // console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchLoginData = async () => {
      await fetchAllExercises();
      await user.fetchUserWorkouts();
      await global.fetchAllWorkouts();
    };

    // run verifyRefreshToken only when there is no accessToken in auth.
    if (!auth?.accessToken) {
      // console.log(`PersisLogin !auth?.accessToken`);
      // console.log(`auth: ${JSON.stringify(auth)}`);
      // console.log('no accessToken Persistlogin. call refresh!');
      verifyRefreshToken();

      // console.log(`auth: ${JSON.stringify(auth)}`);
    } else setIsLoading(false);
  }, []);

  // for debugging.
  useEffect(() => {
    // console.log(`isLoading: ${isLoading}`);
    // console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
    // console.log(auth);
  }, [isLoading]);

  return <>{isLoading ? <p>isLoading...</p> : <Outlet />}</>;
};

export default PersistLogin;

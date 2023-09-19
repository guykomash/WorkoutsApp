import { createContext, useState } from 'react';
import { useContext } from 'react';

const SessionsContext = createContext({});

export const useSessions = () => {
  return useContext(SessionsContext);
};

export const SessionsProvider = ({ children }) => {
  const [sessions, setSessions] = useState(null);

  const fetchUserSessions = async () => {
    try {
      //   const response = await axiosPrivate.get(`/sessions`);
      //   setUserSessions(response?.data?.sessions);
      console.log('getUserSessions...');
    } catch (err) {
      console.error(err);
    }
  };

  const value = { sessions, setSessions, fetchUserSessions };

  return (
    <SessionsContext.Provider value={value}>
      {children}
    </SessionsContext.Provider>
  );
};

export default AuthContext;

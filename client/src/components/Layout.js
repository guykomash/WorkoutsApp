import { Outlet } from 'react-router-dom';
import Nav from './Nav';
import AdminNav from './AdminNav';
import { ROLES } from '../App';
import useAuth from '../hooks/useAuth';
import jwtDecode from 'jwt-decode';

const Layout = () => {
  const { auth } = useAuth();
  let roles = [];
  try {
    roles = jwtDecode(auth?.accessToken)?.UserInfo?.roles;
  } catch (err) {
    console.log(err);
    roles = [];
  }

  const renderLayout = () => {
    if (roles?.find((role) => role === ROLES.Admin)) {
      return (
        <div className="App">
          <Nav />
          <AdminNav />
          <Outlet />
        </div>
      );
    } else {
      return (
        <div className="App">
          <Nav />
          <Outlet />
        </div>
      );
    }
  };

  return renderLayout();
};

export default Layout;

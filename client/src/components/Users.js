import { useState, useEffect } from 'react';
import axios from '../api/axios';

const Users = () => {
  const [users, setUsers] = useState();
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUsers = () => {
      axios
        .get('/users', {
          signal: controller.signal,
        })
        .then((res) => {
          console.log(res.data);
          isMounted && setUsers(res.data);
        })
        .catch((err) => console.error(err));
    };

    getUsers();

    //cleanup function
    return () => {
      isMounted = false;
      controller.abort();
    };
    
  }, []);
  return (
    <article>
      <h2>Users List</h2>
      {users?.length ? (
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user?.username} </li>
          ))}
        </ul>
      ) : (
        <p>no Users</p>
      )}
    </article>
  );
};

export default Users;

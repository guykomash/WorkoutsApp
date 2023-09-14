import {
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';

import React, { useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

import DeleteBtnWithDialog from './DeleteBtnWithDialog';

const AdminManage = () => {
  const axiosPrivate = useAxiosPrivate();
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);

  const getUsers = async () => {
    try {
      const response = await axiosPrivate.get('/admin/users/get-users');
      setUsers(response?.data?.users);
    } catch (err) {
      console.error(err);
    }
  };

  const handleManageUsers = async () => {
    await getUsers();
    setShowUsers(true);
  };
  const handleCollapseUsers = () => {
    setShowUsers(false);
    setUsers([]);
  };

  return (
    <Container maxWidth="sm">
      <br />
      <Typography variant="h4" align="center" gutterBottom>
        Admin Manage
      </Typography>

      {!showUsers ? (
        <List>
          <ListItem key="admin-user" disablePadding>
            <ListItemText primary="Users" />
            <Button variant="outlined" onClick={() => handleManageUsers()}>
              MANAGE
            </Button>
          </ListItem>
        </List>
      ) : (
        <List>
          <Button
            fullWidth
            variant="contained"
            onClick={() => handleCollapseUsers()}
          >
            Collapse Users
          </Button>
          {users.map((user) => (
            <ListItem key={user._id} disablePadding>
              <ListItemText
                primary={user.username}
                secondary={`${user.name.firstname} ${user.name.lastname}`}
              />
              <Button
                id={`view-details-btn-${user._id}`}
                variant="outlined"
                // onClick={() => onViewDetailsClicked(user._id)}
              >
                View User Details
              </Button>
              {/* { title, content, id, onDelete } */}
              {/* Delete Dialog */}
              <DeleteBtnWithDialog
                title={'Delete User?'}
                content={`this action will delete the user: \n${user.username}`}
                id={user._id}
                onDelete={(id) => console.log(`onDelete ${id} `)}
              />
              <Button>
                <EditIcon></EditIcon>
              </Button>
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default AdminManage;

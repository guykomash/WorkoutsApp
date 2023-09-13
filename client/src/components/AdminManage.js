import {
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import React from 'react';

const AdminManage = () => {
  return (
    <Container maxWidth="sm">
      <br />
      <Typography variant="h4" align="center" gutterBottom>
        Admin Manage
      </Typography>

      <List>
        <ListItem key="admin-user" disablePadding>
          <ListItemText primary="Users" />
          <Button
            variant="outlined"
            // onClick={() => onViewDetailsClicked(workout._id)}
          >
            MANAGE
          </Button>
        </ListItem>
      </List>
    </Container>
  );
};

export default AdminManage;

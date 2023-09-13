import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import Toolbar from '@mui/material/Toolbar';

import Typography from '@mui/material/Typography';
import { React } from 'react';

import { Link } from 'react-router-dom';

const AdminNav = () => {
  const pages = [{ name: 'Manage', path: '/admin/manage' }];
  return (
    <AppBar position="static" sx={{ backgroundColor: '#d3d3d3' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'black',
              textDecoration: 'none',
            }}
          >
            ADMIN BAR
          </Typography>

          <Typography
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 500,
              letterSpacing: '.1rem',
              color: 'black',
              textDecoration: 'none',
            }}
          >
            ADMIN BAR
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                component={Link}
                to={page.path}
                key={page.name}
                sx={{
                  my: 2,
                  color: 'black',
                  display: 'block',
                  ':hover': { color: '#B59410' },
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AdminNav;

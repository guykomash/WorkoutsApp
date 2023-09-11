import { Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <Container maxWidth="sm">
      <br />
      <Typography variant="h4" align="center" gutterBottom>
        Unauthorized
      </Typography>
      <Button variant="contained" color="error" fullWidth onClick={goBack}>
        Go back
      </Button>
    </Container>
  );
};

export default Unauthorized;

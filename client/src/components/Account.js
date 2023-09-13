import { useEffect, useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { Container, Grid, Paper, Typography } from '@mui/material';
const Account = () => {
  const axiosPrivate = useAxiosPrivate();
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const response = await axiosPrivate.get(`/myaccount`);
      console.log(response?.data?.user);
      setUser(response?.data?.user);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return !user ? (
    <Typography variant="h5" align="center" gutterBottom>
      Loading account data...
    </Typography>
  ) : (
    <Container maxWidth="sm">
      <br />
      <Typography variant="h4" align="center" gutterBottom>
        My Account
      </Typography>
      <Paper sx={{ p: 2 }}>
        <Grid item xs={12}>
          <Grid container direction="row" justifyContent="left">
            <Typography
              key={`lastname-label`}
              variant="h6"
              align="center"
              gutterBottom
            >
              User name:
            </Typography>
            <Typography
              key={`lastname-value`}
              variant="h6"
              sx={{ fontStyle: 'italic', color: '#3f50b5', marginLeft: '10px' }}
            >
              {`${user.userName}`}
            </Typography>
          </Grid>
          <Grid container direction="row" justifyContent="left">
            <Typography key={`firstname-label`} variant="h6" gutterBottom>
              First name:
            </Typography>
            <Typography
              key={`firstname-value`}
              variant="h6"
              sx={{
                fontStyle: 'italic',
                color: '#3f50b5',
                marginLeft: '10px',
              }}
            >
              {`${user.firstName}`}
            </Typography>
          </Grid>
          <Grid container direction="row" justifyContent="left" alignItems="">
            <Typography
              key={`lastname-label`}
              variant="h6"
              align="center"
              gutterBottom
            >
              Last name:
            </Typography>
            <Typography
              key={`lastname-value`}
              variant="h6"
              sx={{ fontStyle: 'italic', color: '#3f50b5', marginLeft: '10px' }}
            >
              {`${user.lastName}`}
            </Typography>
          </Grid>
          <Grid container direction="row" justifyContent="left" alignItems="">
            <Typography
              key={`lastname-label`}
              variant="h6"
              align="center"
              gutterBottom
            >
              Created:
            </Typography>
            <Typography
              key={`lastname-value`}
              variant="h6"
              sx={{ fontStyle: 'italic', color: '#3f50b5', marginLeft: '10px' }}
            >
              {`${user.created}`}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Account;

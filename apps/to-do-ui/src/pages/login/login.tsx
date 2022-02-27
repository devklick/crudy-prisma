import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userLoginSchema, UserLoginType } from '@to-do/api-schemas/user-schema';
import { Box, Button, TextField, Grid, Link, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/session-context';

/* eslint-disable-next-line */
export interface LoginPageProps { }

const LoginPage = (props: LoginPageProps) => {
  const navigate = useNavigate();
  const {login, assumeLoggedIn, loadingStoredAuth } = useContext(AppContext);
  const [displayFailedAuth, setDisplayFailedAuth] = useState<boolean>(false);

  useEffect(() => {
    if (!loadingStoredAuth && assumeLoggedIn()) {
      navigate('/list');
    }
  }, [assumeLoggedIn, loadingStoredAuth, navigate]);

  const onSubmit = async (loginRequest: UserLoginType) => {
    const success = await login(loginRequest);
    console.log('Login success is', success);
    setDisplayFailedAuth(!success);
    if (success) {
      navigate('/list'); 
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginType>({
    mode:'onChange',
    resolver: zodResolver(userLoginSchema),
  });

  return (
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant='h4'>
            Log in to your account
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <Controller
              name="emailAddressOrUsername"
              control={control}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  label='Email or Username'
                  type='text'
                  fullWidth
                  variant="outlined"
                  autoComplete="email"
                  autoFocus
                  error={Boolean(errors.emailAddressOrUsername)}
                  helperText={errors.emailAddressOrUsername?.message}
                  inputRef={ref}
                  {...field}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  label='Password'
                  type='password'
                  fullWidth
                  variant="outlined"
                  autoComplete="current-password"
                  error={Boolean(errors.password)}
                  helperText={errors.password?.message}
                  inputRef={ref}
                  {...field}
                />
              )}
            />
            { displayFailedAuth && <Alert severity="error" onClose={() => setDisplayFailedAuth(false)}>Login failed</Alert>}
            <Button
              type="submit"
              fullWidth  
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/sign-up" variant="body2">
                  {"Don't have an account? Sign up!"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
  );
}

export default LoginPage;
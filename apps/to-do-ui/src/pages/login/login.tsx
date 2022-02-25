import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userLoginSchema, UserLoginType } from '@to-do/api-schemas/user-schema';
import { Box, Button, TextField, Grid, Link, Typography } from '@mui/material';
import userService from '@to-do/services/user-service-fe';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {authState } from '../../state/auth-state';
import { sessionState } from '../../state/session-state';
import { useContext, useEffect } from 'react';
import { AppContext } from '../../context/session-context';

/* eslint-disable-next-line */
export interface LoginPageProps { }

const LoginPage = (props: LoginPageProps) => {
  const navigate = useNavigate();
  const {auth, session, login } = useContext(AppContext);
  
  const onSubmit = async (loginRequest: UserLoginType) => {
    login(loginRequest);
    navigate('/list'); 
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
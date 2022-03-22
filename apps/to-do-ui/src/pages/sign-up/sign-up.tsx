import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { userCreateSchema, UserCreateType } from "@to-do/api-schemas/user-schema";
import userService from "@to-do/services/user-service-fe";
import { Controller, useForm } from "react-hook-form";
import { NavigateFunction, useNavigate } from "react-router-dom";

/* eslint-disable-next-line */
export interface SignUpProps { }

const onSubmit = async (signUpRequest: UserCreateType, navigate: NavigateFunction) => {
    const result = await userService.signUp(signUpRequest);
    navigate('/login');
  };

const SignUp = (props: SignUpProps) => {
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        formState: { errors },
      } = useForm<UserCreateType>({
        mode:'onChange',
        resolver: zodResolver(userCreateSchema),
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
                Create an account
              </Typography>

              <Box component="form" onSubmit={handleSubmit((props) => onSubmit(props, navigate))} sx={{ mt: 1 }}>
                <Controller
                  name="username"
                  control={control}
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      label='Username'
                      type='text'
                      fullWidth
                      margin='dense'
                      variant="outlined"
                      autoComplete="username"
                      autoFocus
                      error={Boolean(errors.username)}
                      helperText={errors.username?.message}
                      inputRef={ref}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="emailAddress"
                  control={control}
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      label='EmailAddress'
                      type='email'
                      fullWidth
                      variant="outlined"
                      margin='dense'
                      autoComplete="email"
                      error={Boolean(errors.emailAddress)}
                      helperText={errors.emailAddress?.message}
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
                      margin='dense'
                      autoComplete="password"
                      error={Boolean(errors.password)}
                      helperText={errors.password?.message}
                      inputRef={ref}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="passwordConfirmed"
                  control={control}
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      label='Confirm Password'
                      type='password'
                      fullWidth
                      margin='dense'
                      variant="outlined"
                      error={Boolean(errors.passwordConfirmed)}
                      helperText={errors.passwordConfirmed?.message}
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
                  Sign Up
                </Button>
                <Grid container justifyContent='flex-end' >
                  <Grid item>
                    <Link href="/login" variant="body2">
                      {"Already have an account? Log in!"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
      )};

export default SignUp;
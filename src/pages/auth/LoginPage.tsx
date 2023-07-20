import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import { loginSchema, ILogin } from '@/validation/auth';
import { useLoginMutation } from '@/services/api/auth';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [login, { isLoading, isError }] = useLoginMutation();

  const { register, handleSubmit, formState } = useForm<ILogin>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = useCallback(
    async (requestData: ILogin) => {
      const loginResult = await login(requestData);

      if ('error' in loginResult) return;

      const {
        data: { accessToken },
      } = loginResult;

      localStorage.setItem('accessToken', accessToken);

      navigate('/');
    },
    [login, navigate],
  );

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Box
        component="form"
        width={400}
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 3,
          py: 3,
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography variant="h5" marginBottom={2}>
          Welcome back!
        </Typography>
        <TextField
          type="email"
          label="Your email..."
          color="primary"
          sx={{ mb: 3 }}
          size="small"
          fullWidth
          {...register('email')}
        />
        <TextField
          type="password"
          label="Your password..."
          color="primary"
          size="small"
          {...register('password')}
        />
        {isError && (
          <Typography variant="body2" color="red">
            Invalid email or password
          </Typography>
        )}
        <Button
          fullWidth
          type="submit"
          size="large"
          variant="contained"
          sx={{ mt: 2, mb: 2 }}
          disabled={!formState.isValid || isLoading}
        >
          Login
        </Button>
        <Typography variant="body2" textAlign="center">
          Don't have an account yet?{' '}
          <Link component={RouterLink} to="/sign-up">
            Sign up
          </Link>
        </Typography>

        <Link
          component={RouterLink}
          to="/forgot-password"
          variant="body2"
          textAlign="center"
        >
          Forgot Your Password?
        </Link>
      </Box>
    </Box>
  );
};

export default LoginPage;

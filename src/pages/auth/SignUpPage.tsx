import React, { useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { signUpSchema, ISignUp } from '@/validation/auth';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

const SignUpPage: React.FC = () => {
  const { register, handleSubmit, formState } = useForm<ISignUp>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = useCallback(async (data: ISignUp) => {
    console.log(data);
  }, []);

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
          Create Account
        </Typography>
        <TextField
          type="text"
          label="Your Name..."
          color="primary"
          sx={{ mb: 2 }}
          size="small"
          {...register('username')}
        />
        <TextField
          type="email"
          label="Your email..."
          color="primary"
          sx={{ mb: 2 }}
          size="small"
          {...register('email')}
        />
        <TextField
          type="password"
          label="Your password..."
          color="primary"
          sx={{ mb: 2 }}
          size="small"
          {...register('password')}
        />

        <Button
          fullWidth
          type="submit"
          size="large"
          variant="contained"
          sx={{ mb: 2 }}
          disabled={!formState.isDirty || !formState.isValid}
        >
          Continue
        </Button>

        <Typography variant="body2" textAlign="center">
          Already have an account?{' '}
          <Link component={RouterLink} to="/login">
            Log in
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignUpPage;

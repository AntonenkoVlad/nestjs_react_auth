import { FC, useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useLazyForgotPasswordQuery } from '@/services/api/auth';
import { IEmailSchema, emailSchema } from '@/validation/auth';
import { isErrorWithMessage } from '@/services/api/utils';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

const ForgotPasswordPage: FC = () => {
  const { register, handleSubmit, formState } = useForm<IEmailSchema>({
    resolver: zodResolver(emailSchema),
  });

  const [sendEmail, { error, isError, isLoading }] =
    useLazyForgotPasswordQuery();

  const onSubmit = useCallback(
    async (requestData: IEmailSchema) => {
      const loginResult = await sendEmail(requestData.email);

      if ('error' in loginResult) return;
    },
    [sendEmail],
  );

  const resetPassError = isErrorWithMessage(error) ? error.data.message : null;
  const emailAlreadySent = resetPassError === 'LOGIN.EMAIL_SENT_RECENTLY';

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
          Reset password
        </Typography>
        <TextField
          type="email"
          label="Your email..."
          color="primary"
          size="small"
          {...register('email')}
        />
        {isError && (
          <Typography variant="body2" color="red">{`${
            emailAlreadySent
              ? 'Email already sent, please check your email'
              : 'Invalid email'
          }`}</Typography>
        )}
        <Button
          fullWidth
          type="submit"
          size="large"
          variant="contained"
          sx={{ mt: 2, mb: 2 }}
          disabled={!formState.isValid || isLoading}
        >
          Send Email
        </Button>

        <Link
          component={RouterLink}
          variant="body2"
          textAlign="center"
          to="/login"
        >
          Back to login
        </Link>
      </Box>
    </Box>
  );
};

export default ForgotPasswordPage;

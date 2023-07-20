import { FC } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';

import { IPasswordSchema, passwordSchema } from '@/validation/auth';
import { useResetPasswordMutation } from '@/services/api/auth';
import { isErrorWithMessage } from '@/services/api/utils';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const ResetPasswordPage: FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm<IPasswordSchema>({
    resolver: zodResolver(passwordSchema),
  });

  const [resetPassword, { error, isLoading, isError }] =
    useResetPasswordMutation();

  const onSubmit = async (requestData: IPasswordSchema) => {
    if (params.token) {
      await resetPassword({
        newPassword: requestData.password,
        token: params.token,
      });

      toast.success('Password reset successfully!');
      navigate('/login');
    }
  };

  const resetPassError = isErrorWithMessage(error) ? error.data.message : null;
  const invalidToken = resetPassError === 'RESET_PASSWORD.TOKEN_NOT_FOUND';

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
          type="password"
          label="Your password..."
          color="primary"
          sx={{ mb: 2 }}
          size="small"
          {...register('password')}
        />
        {isError && (
          <p className="text-sm text-red-500 mb-2">{`${
            invalidToken ? 'Invalid Token' : 'Something went wrong'
          }`}</p>
        )}
        <div className="card-actions items-center justify-between">
          <Button
            fullWidth
            type="submit"
            size="large"
            variant="contained"
            sx={{ mb: 2 }}
            disabled={!formState.isValid || isLoading}
          >
            Reset Password
          </Button>
        </div>
      </Box>
    </Box>
  );
};

export default ResetPasswordPage;

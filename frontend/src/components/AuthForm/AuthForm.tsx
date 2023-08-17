import { Form, FormikProvider, useFormik } from 'formik';
import { Button, TextField, Card, Box, Typography } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { userAuth } from '../../store/thunks/auth';
import { authLoadingStatus } from '../../store/selectors/auth';
import { LOADING_STATUS } from '../../store/types';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

import { signInValidationSchema } from './schemas';

function AuthForm() {
  const dispatch = useAppDispatch();
  const loadingStatus = useAppSelector(authLoadingStatus);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: signInValidationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(userAuth(values));
      resetForm();
    },
  });

  return (
    <FormikProvider value={formik}>
      {loadingStatus === LOADING_STATUS.LOADING ? (
        <LoadingSpinner />
      ) : (
        <Card sx={{ p: 2, mb: 2, mt: 5 }}>
          <Form onSubmit={formik.handleSubmit}>
            <Box
              sx={{
                width: '100%',
                mb: 1,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h1">Welcome to our site!</Typography>
            </Box>
            <TextField
              fullWidth
              placeholder="Ваш email"
              id="email"
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={{ mb: 1 }}
              {...formik.getFieldProps('email')}
            />
            <TextField
              fullWidth
              placeholder="Пароль"
              id="password"
              type="password"
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              {...formik.getFieldProps('password')}
              sx={{ mb: 1 }}
            />
            {loadingStatus === LOADING_STATUS.ERROR && (
              <Typography color="error">
                Произошла ошибка авторизации
              </Typography>
            )}
            <Button color="primary" variant="contained" fullWidth type="submit">
              Войти
            </Button>
          </Form>
        </Card>
      )}
    </FormikProvider>
  );
}

export default AuthForm;

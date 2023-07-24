import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { Button, TextField, Card, Box, CircularProgress, Typography } from '@mui/material';
import { userAuth } from '../../store/thunks/auth';
import { authSelector } from '../../store/selectors/auth';
import { LOADING_STATUS } from '../../store/constants';

const validationSchema = yup.object({
    email: yup
        .string()
        .email('Введен некорректный email')
        .required('Это поле обязательно'),
    password: yup
        .string()
        .min(5, 'Минимальный размер пароля 5 символов')
        .required('Это поле обязательно'),
});

const AuthForm = () => {
    const dispatch = useDispatch();
    const { loadingStatus } = useSelector(authSelector);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            dispatch(userAuth(values));
            resetForm();
        },
    });

    return (
        <FormikProvider value={formik}>
            {
                loadingStatus === LOADING_STATUS.LOADING && (
                    <Box
                        mt={2}
                        sx={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <CircularProgress />
                    </Box>
                )
            }
            {
                loadingStatus !== LOADING_STATUS.LOADING && (
                    <Card sx={{ p: 2, mb: 2, mt: 5 }}>
                        <Form onSubmit={formik.handleSubmit}>
                            <Box sx={{
                                width: '100%',
                                mb: 1,
                                display: 'flex',
                                justifyContent: 'center'
                            }}>
                                <Typography variant='h1'>Welcome to our site!</Typography>
                            </Box>
                            <TextField
                                fullWidth
                                placeholder="Ваш email"
                                id="email"
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                                sx={{ mb: 1 }}
                                {...formik.getFieldProps("email")}
                            />
                            <TextField
                                fullWidth
                                placeholder="Пароль"
                                id="password"
                                type='password'
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                                {...formik.getFieldProps("password")}
                                sx={{ mb: 1 }}
                            />
                            {
                                loadingStatus === LOADING_STATUS.ERROR && <Typography color='error'>Произошла ошибка авторизации</Typography>
                            }
                            <Button color="primary" variant="contained" fullWidth type="submit">Войти</Button>
                        </Form>
                    </Card>
                )
            }
        </FormikProvider>
    );
}

export default AuthForm;
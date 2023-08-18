import yup from 'yup';

export const signInValidationSchema = yup.object({
  email: yup
    .string()
    .email('Введен некорректный email')
    .required('Это поле обязательно'),
  password: yup
    .string()
    .min(5, 'Минимальный размер пароля 5 символов')
    .required('Это поле обязательно'),
});

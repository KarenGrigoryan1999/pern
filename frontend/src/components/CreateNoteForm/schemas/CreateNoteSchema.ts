import yup from 'yup';

const createNoteValidationSchema = yup.object({
    title: yup
        .string()
        .required('Это поле обязательно'),
    text: yup
        .string()
        .min(5, 'Минимальный размер текста 5 символов')
        .required('Это поле обязательно'),
    priority: yup
        .number()
        .required('Это поле обязательно'),
});

export default createNoteValidationSchema;

import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { Button, TextField, Card, Select, MenuItem } from '@mui/material';
import { ITEM_PRIORITY } from './types';
import { createItem } from '../../store/thunks/items';

const validationSchema = yup.object({
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

const CreateItemForm = () => {
    const dispatch: any = useDispatch();

    const formik = useFormik({
        initialValues: {
            title: '',
            text: '',
            priority: ITEM_PRIORITY.LOW,
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            dispatch(createItem(values));
            resetForm();
        },
    });

    const priorityList = useMemo(() => (
        Object.keys(ITEM_PRIORITY).filter((itemElement) =>
            !isNaN(Number(itemElement)),
        ) as (keyof typeof ITEM_PRIORITY)[]
    ).map((key) => {
        return {
            value: +key,
            text: ITEM_PRIORITY[key]
        };
    }), [ITEM_PRIORITY]);

    return (
        <FormikProvider value={formik}>
            <Card sx={{ p: 2, mb: 2 }}>
                <Form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        placeholder="Заголовок"
                        id="title"
                        error={formik.touched.title && Boolean(formik.errors.title)}
                        helperText={formik.touched.title && formik.errors.title}
                        sx={{ mb: 1 }}
                        {...formik.getFieldProps("title")}
                    />
                    <TextField
                        fullWidth
                        multiline
                        placeholder="Текст заметки"
                        rows={3}
                        id="text"
                        error={formik.touched.text && Boolean(formik.errors.text)}
                        helperText={formik.touched.text && formik.errors.text}
                        {...formik.getFieldProps("text")}
                        sx={{ mb: 1 }}
                    />
                    <Select
                        fullWidth
                        id="priority"
                        error={formik.touched.priority && Boolean(formik.errors.priority)}
                        {...formik.getFieldProps("priority")}
                        sx={{ mb: 1 }}
                    >
                        {
                            priorityList.map(element => <MenuItem key={element.text} value={element.value}>{element.text}</MenuItem>)
                        }
                    </Select>
                    <Button color="primary" variant="contained" fullWidth type="submit">Создать</Button>
                </Form>
            </Card>
        </FormikProvider>
    );
}

export default CreateItemForm;
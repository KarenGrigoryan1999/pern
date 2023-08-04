import { useMemo } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import { Button, TextField, Card, Select, MenuItem } from '@mui/material';
import { useAppDispatch } from '../../helpers/hooks';
import { NOTE_PRIORITY } from './types';
import { createNote } from '../../store/thunks/notes';
import { createNoteValidationSchema } from './schemas/CreateNoteSchema';

const CreateNoteForm = () => {
    const dispatch = useAppDispatch();

    const formik = useFormik({
        initialValues: {
            title: '',
            text: '',
            priority: NOTE_PRIORITY.LOW,
        },
        validationSchema: createNoteValidationSchema,
        onSubmit: (values, { resetForm }) => {
            dispatch(createNote(values));
            resetForm();
        },
    });

    const priorityList = useMemo(() => (
        Object.keys(NOTE_PRIORITY).filter((noteElement) =>
            !isNaN(Number(noteElement)),
        ) as (keyof typeof NOTE_PRIORITY)[]
    ).map((key) => {
        return {
            value: +key,
            text: NOTE_PRIORITY[key]
        };
    }), [NOTE_PRIORITY]);

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

export default CreateNoteForm;
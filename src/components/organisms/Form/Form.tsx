import { connect } from 'react-redux';

// Redux
import { todoActions } from '../../../store/reducers/todo';
import { StateType } from '../../../store';

// Libs
import { Formik, Form as FormikForm } from 'formik';
import shortid from 'shortid';

// Interfaces
import { ITodo } from '../../../interfaces/todo';

// Validation
import { validationSchema } from './validation';

// Components
import { Box, Button, TextField } from '@mui/material';

interface MapStateToProps {
  todos: Array<ITodo>;
}

interface MapDispatchToProps {
  addTodo: typeof todoActions.addTodo;
}

function Form({ addTodo }: MapStateToProps & MapDispatchToProps) {
  return (
    <Formik
      initialValues={{ todo: '' }}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        // add to store
        addTodo({
          id: shortid.generate(),
          text: values.todo,
          completed: false,
        });

        // reset form
        resetForm();
      }}
    >
      {({
        values,
        isValid,
        touched,
        dirty,
        errors,
        handleBlur,
        handleChange,
      }) => (
        <FormikForm>
          <Box display="flex" alignItems="center" gap={2}>
            <TextField
              name="todo"
              label={'Typing'}
              placeholder="test"
              value={values.todo}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.todo && Boolean(errors.todo)}
              helperText={touched.todo && errors.todo}
            />

            <Button
              size="large"
              type="submit"
              variant="contained"
              disabled={!isValid || !dirty}
            >
              Add
            </Button>
          </Box>
        </FormikForm>
      )}
    </Formik>
  );
}

export default connect<MapStateToProps, MapDispatchToProps, {}, StateType>(
  null,
  { addTodo: todoActions.addTodo }
)(Form);

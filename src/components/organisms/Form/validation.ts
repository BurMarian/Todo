import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  todo: yup
    .string()
    .min(3, 'Minimum 3 characters length')
    .max(50, 'Maximum 50 characters length'),
});

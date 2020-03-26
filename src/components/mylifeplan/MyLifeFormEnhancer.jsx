import { withFormik } from 'formik';
import * as Yup from 'yup';

const MyLifeFormEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    CCNumber: Yup.number()
      .min(16, 'Invalid CC number entered. Please recheck.')
      .required('CC number is required.'),
    expDate: Yup.date()
      .min(4, 'Valid expiration date is needed')
      .required('Expiration date is required.'),
    CVC: Yup.number()
      .min(3, 'Invalid CVC number entered. Please recheck.')
      .required('CVC number is required.'),
  }),

  mapPropsToValues: ({ user }) => ({
    ...user,
  }),
  handleSubmit: (payload, { setSubmitting }) => {
    // alert(payload.email);
    setSubmitting(false);
  },
  displayName: 'MyForm',
});

export default MyLifeFormEnhancer;

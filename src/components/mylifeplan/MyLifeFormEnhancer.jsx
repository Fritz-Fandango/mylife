// import './formik-demo.css';
// import React from 'react';
// import { render } from 'react-dom';
import { withFormik } from 'formik';
import * as Yup from 'yup';
// import classnames from 'classnames';

const MyLifeFormEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    firstName: Yup.string()
      .min(2, "C'mon, your name is longer than that")
      .required('First name is required.'),
    lastName: Yup.string()
      .min(2, "C'mon, your name is longer than that")
      .required('Last name is required.'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required!'),
  }),

  mapPropsToValues: ({ user }) => ({
    ...user,
  }),
  handleSubmit: (payload, { setSubmitting }) => {
    alert(payload.email);
    setSubmitting(false);
  },
  displayName: 'MyForm',
});

// const InputFeedback = ({ error }) => (error ? <div className="input-feedback">{error}</div> : null);

// const Label = ({
//   error, className, children, ...props
// }) => (
//   <label className="label" {...props}>
//     {children}
//   </label>
// );

// const TextInput = ({
//   type, id, label, error, value, onChange, className, ...props
// }) => {
//   const classes = classnames(
//     'input-group',
//     {
//       'animated shake error': !!error,
//     },
//     className,
//   );
//   return (
//     <div className={classes}>
//       <Label htmlFor={id} error={error}>
//         {label}
//       </Label>
//       <input
//         id={id}
//         className="text-input"
//         type={type}
//         value={value}
//         onChange={onChange}
//         {...props}
//       />
//       <InputFeedback error={error} />
//     </div>
//   );
// };

export default MyLifeFormEnhancer;

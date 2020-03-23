import React from 'react';
import classnames from 'classnames';

const InputFeedback = ({ error }) => (error ? <div className="input-feedback">{error}</div> : null);

const MyLifeLabel = ({
  error, className, children, ...props
}) => (
  <label className="label" {...props}>
    {children}
  </label>
);

const MyLifeTextInput = ({
  type, id, label, error, value, onChange, className, ...props
}) => {
  const classes = classnames(
    'input-group',
    {
      'animated shake error': !!error,
    },
    className,
  );
  return (
    <div className={classes}>
      <MyLifeLabel htmlFor={id} error={error}>
        {label}
      </MyLifeLabel>
      <input
        id={id}
        className="text-input"
        type={type}
        value={value}
        onChange={onChange}
        {...props}
      />
      <InputFeedback error={error} />
    </div>
  );
};

export default MyLifeTextInput;

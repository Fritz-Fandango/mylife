import classnames from "classnames";

import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";

const InputFeedback = ({ error }) =>
  error ? <div className="input-feedback">{error}</div> : null;

const MyLifeLabel = ({ error, className, children, ...props }) => (
  <Typography style={{ fontSize: 14, color: "#333", marginTop: 20 }}>
    {children}
  </Typography>
);

const MyLifeTextInput = ({
  type,
  id,
  label,
  error,
  value,
  onChange,
  className,
  ...props
}) => {
  const classes = classnames(
    "input-group",
    {
      "animated shake error": !!error,
    },
    className,
  );
  return (
    <div className={classes}>
      <MyLifeLabel htmlFor={id} error={error}>
        {label}
      </MyLifeLabel>
      <TextField
        variant="outlined"
        id={id}
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

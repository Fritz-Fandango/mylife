import PropTypes from "prop-types";
import React from "react";

import CheckIcon from "@mui/icons-material/Check";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";

// import components
import { Box } from "@mui/material";
import MyLifeFormEnhancer from "./MyLifeFormEnhancer";
import MyLifeTextInput from "./MyLifeTextInput";

const planDescriptions = [
  {
    heading: "NEW – Lock Sections of Your Reputation Profile - ",
    description: "The same way you can lock your credit report.",
  },
  {
    heading:
      "Correct, Enhance & Monitor Reputation Profile and Reputation Score - ",
    description:
      "It could affect your career, who'll date you, where you live, & more.",
  },
  {
    heading: "Manage & Protect your Personal Information - ",
    description:
      "See websites that sell your personal information that you can't control. We can help you remove records from these sites with just one click",
  },
  {
    heading: "Receive Alerts when Your Reputation Profile is Viewed - ",
    description:
      "With more than 300 million searches every day - colleagues, friends, love interests & clients - someone is going to be looking for you.",
  },
];

const radioOptions = [
  {
    value: "13.95",
    rate: "$13.95/mo.",
    label: "12 Months",
    sublabel: "BEST VALUE SAVE 18%",
    sublabelclass: "bestValue",
  },
  {
    value: "14.95",
    rate: "$14.95/mo.",
    label: "6 Months",
    sublabel: "",
    sublabelclass: "",
  },
  {
    value: "16.95",
    rate: "$16.95/mo.",
    label: "3 Months",
    sublabel: "",
    sublabelclass: "",
  },
  {
    value: "1.00",
    rate: "$1.00",
    label: "3 Day Trial",
    sublabel: "(Limited Time Offer)",
    sublabelclass: "limitedTime",
  },
];

const securityLogo = {
  src: "https://www.mylife.com/site/static/media/seclogo.962b5fe5.png",
  altText: "Trust Logos",
};

const rootSx = {
  backgroundColor: "#fff",
  flexGrow: 1,
  padding: 4,
};

const formControlSx = {
  display: "flex",
  flexDirection: "row",
  "& > h4": {
    color: "#0d8e93",
    fontSize: 27,
    fontWeight: 300,
    marginTop: "11px",
    textAlign: "left",
  },
};

const radioPaperSx = {
  backgroundColor: "#f2f2f2",
  padding: 2,
  margin: 1,
};

const radioBoxSx = {
  listStyle: "none",
  display: "flex",
  justifyContent: "space-between",
};

const rateTextSx = {
  marginTop: "10px",
};

const bestValueSx = {
  color: "#33a242",
  fontSize: 15,
  fontWeight: 500,
  paddingLeft: "32px",
  position: "relative",
  top: "5px",
  textAlign: "left",
};

const limitedTimeSx = {
  fontSize: 13,
  paddingLeft: "28px",
  position: "relative",
  top: "-5px",
  textAlign: "left",
};

const checkIconSx = {
  color: "green",
  marginRight: "10px",
  position: "relative",
  top: "5px",
};

const planDescriptionsSx = {
  "& > p": {
    fontSize: 16,
    fontWeight: 400,
    color: "#666",
    marginLeft: "36px",
  },
  "& > p:first-of-type": {
    marginLeft: 0,
    fontWeight: 700,
  },
};

const paymentSectionSx = {
  alignItems: "flex-start",
  display: "flex",
  flexDirection: "column",
  "& > .input-group": {
    width: "100%",
    textAlign: "start",
  },
  "& > h4": {
    justifyContent: "flex-start",
    color: "#0d8e93",
    fontSize: 27,
    fontWeight: 300,
    marginTop: "11px",
    textAlign: "start",
    width: "100%",
  },
};

const MyLifeSubText = (props) => {
  const { status, subtext } = props;

  switch (status) {
    case "bestValue":
      return (
        <Typography variant="body1" sx={bestValueSx}>
          {subtext}
        </Typography>
      );
    case "limitedTime":
      return (
        <Typography variant="body1" sx={limitedTimeSx}>
          {subtext}
        </Typography>
      );
    default:
      return null;
  }
};

const MyLifePlanForm = (props) => {
  const {
    values,
    touched,
    errors,
    dirty,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    isSubmitting,
  } = props;

  const [value, setValue] = React.useState("female");

  const handleRadioChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Grid container sx={rootSx}>
      <Grid size={{ xs: 12 }} sx={{ m: 2 }}>
        <form onSubmit={handleSubmit}>
          <FormControl component="fieldset" sx={formControlSx}>
            <Typography variant="h4" color="inherit">
              1. Select Your Plan
            </Typography>
            <RadioGroup
              aria-label="priceRates"
              name="priceRates"
              value={value}
              onChange={handleRadioChange}
            >
              {radioOptions.map((radioOption) => (
                <Paper key={radioOption.value} sx={radioPaperSx}>
                  <Box sx={radioBoxSx}>
                    <FormControlLabel
                      value={radioOption.value}
                      control={<Radio />}
                      label={radioOption.label}
                    />
                    <Typography variant="body1" color="inherit" sx={rateTextSx}>
                      {radioOption.rate}
                    </Typography>
                  </Box>
                  <MyLifeSubText
                    status={radioOption.sublabelclass}
                    subtext={radioOption.sublabel}
                  />
                </Paper>
              ))}
            </RadioGroup>
          </FormControl>
          {planDescriptions.map((desc) => (
            <Grid
              key={desc.heading}
              size={{ xs: 12 }}
              sx={{ m: 2, ...planDescriptionsSx }}
            >
              <Typography variant="body1" align="left">
                <CheckIcon sx={checkIconSx} />
                {desc.heading}
              </Typography>
              <Typography variant="body2" color="inherit" align="left">
                {desc.description}
              </Typography>
            </Grid>
          ))}
          <Grid size={{ xs: 12 }} sx={{ m: 2, ...paymentSectionSx }}>
            <Typography variant="h4" color="inherit">
              2. Payment Information
            </Typography>
            <MyLifeTextInput
              id="CCNumber"
              type="text"
              label="Credit Card No."
              placeholder=""
              error={touched.CCNumber && errors.CCNumber}
              value={values.CCNumber}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <MyLifeTextInput
              id="expDate"
              type="text"
              label="Exp Date"
              placeholder="MM/YY"
              error={touched.expDate && errors.expDate}
              value={values.expDate}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <MyLifeTextInput
              id="CVC"
              type="text"
              label="CVC"
              placeholder=""
              error={touched.CVC && errors.CVC}
              value={values.CVC}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <button
              type="button"
              className="outline"
              onClick={handleReset}
              disabled={!dirty || isSubmitting}
            >
              Reset
            </button>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Grid>
        </form>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <img alt={securityLogo.altText} src={securityLogo.src} />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Typography
          variant="body2"
          color="inherit"
          align="left"
          style={{ fontSize: 14, color: "#333", marginTop: 20 }}
        >
          By clicking the button above, I agree to the&nbsp;
          <Link
            style={{ color: "#1890ff" }}
            href="http://www.mylife.com/user-agreement/"
          >
            MyLife Terms & Conditions
          </Link>
          &nbsp;and&nbsp;
          <Link
            style={{ color: "#1890ff" }}
            href="http://www.mylife.com/privacy-policy/"
          >
            Privacy Policy
          </Link>
          . I understand that MyLife is not a consumer reporting agency. I agree
          that I will not use MyLife to determine an individual&apos;s
          eligibility for credit, insurance, employment, housing, or any other
          purpose covered under the Fair Credit Reporting Act (FCRA). I
          understand that I will be billed $1.00 for a 3-day trial. If I decide
          not to cancel during the trial period, I will be billed $79.95 every 6
          months to the credit card provided until this subscription is
          cancelled. I may cancel anytime by contacting Customer Care at (888)
          704-1900. (Customer Care hours are Mon-Fri 6am-7pm PT, Sat-Sun 6am-5pm
          PT, Excluding Select Holidays).
        </Typography>
      </Grid>
    </Grid>
  );
};

MyLifePlanForm.defaultProps = {
  touched: {},
  errors: {},
};

MyLifePlanForm.propTypes = {
  values: PropTypes.shape({
    CCNumber: PropTypes.number,
    expDate: PropTypes.string,
    CVC: PropTypes.number,
  }).isRequired,
  touched: PropTypes.instanceOf(Object),
  errors: PropTypes.instanceOf(Object),
  dirty: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

const MyLifePlan = MyLifeFormEnhancer(MyLifePlanForm);

export default MyLifePlan;

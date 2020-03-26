import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';

// import components
import { Box } from '@material-ui/core';
import MyLifeTextInput from './MyLifeTextInput';
import MyLifeFormEnhancer from './MyLifeFormEnhancer';

const planDescriptions = [{
  heading: 'NEW – Lock Sections of Your Reputation Profile - ',
  description: 'The same way you can lock your credit report.',
},
{
  heading: 'Correct, Enhance & Monitor Reputation Profile and Reputation Score - ',
  description: 'It could affect your career, who\'ll date you, where you live, & more.',
},
{
  heading: 'Manage & Protect your Personal Information - ',
  description: 'See websites that sell your personal information that you can\'t control. We can help you remove records from these sites with just one click',
},
{
  heading: 'Receive Alerts when Your Reputation Profile is Viewed - ',
  description: 'With more than 300 million searches every day - colleagues, friends, love interests & clients - someone is going to be looking for you.',
},
];

const radioOptions = [
  {
    value: '13.95',
    rate: '$13.95/mo.',
    label: '12 Months',
    sublabel: 'BEST VALUE SAVE 18%',
    sublabelclass: 'bestValue',
  },
  {
    value: '14.95',
    rate: '$14.95/mo.',
    label: '6 Months',
    sublabel: '',
    sublabelclass: '',
  },
  {
    value: '16.95',
    rate: '$16.95/mo.',
    label: '3 Months',
    sublabel: '',
    sublabelclass: '',
  },
  {
    value: '1.00',
    rate: '$1.00',
    label: '3 Day Trial',
    sublabel: '(Limited Time Offer)',
    sublabelclass: 'limitedTime',
  },
];

const securityLogo = {
  src: 'https://www.mylife.com/site/static/media/seclogo.962b5fe5.png',
  altText: 'Trust Logos',
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#fff',
    flexGrow: 1,
    padding: theme.spacing(4),
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  formControl: {
    display: 'flex',
    flexDirection: 'row',
    '& > h4': {
      color: '#0d8e93',
      fontSize: 27,
      fontWeight: 300,
      marginTop: 11,
      textAlign: 'left',
    },
  },
  radioPaper: {
    backgroundColor: '#f2f2f2',
    padding: theme.spacing(2),
    margin: theme.spacing(1),
  },
  radioBox: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'space-between',
  },
  rateText: {
    marginTop: 10,
  },
  bestValue: {
    color: '#33a242',
    fontSize: 15,
    fontWeight: 500,
    paddingLeft: 32,
    position: 'relative',
    top: 5,
    textAlign: 'left',
  },
  limitedTime: {
    fontSize: 13,
    paddingLeft: 28,
    position: 'relative',
    top: -5,
    textAlign: 'left',
  },
  checkIcon: {
    color: 'green',
    marginRight: 10,
    position: 'relative',
    top: 5,
  },
  planDescriptions: {
    '& > p': {
      fontSize: 16,
      fontWeight: 400,
      color: '#666',
      marginLeft: 36,
    },
    '& > p:first-child': {
      marginLeft: 0,
      fontWeight: 700,
    },
  },
  paymentSection: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    '& > .input-group ': {
      width: '100%',
      textAlign: 'start',

    },
    '& > h4': {
      justifyContent: 'flex-start',
      color: '#0d8e93',
      fontSize: 27,
      fontWeight: 300,
      marginTop: 11,
      textAlign: 'start',
      width: '100%',
    },
  },
  '#expDate': {
    width: '50%',
  },
}));

const MyLifeSubText = (props) => {
  const { status, subtext } = props;

  const classes = useStyles();

  switch (status) {
    case 'bestValue':
      return (
        <Typography
          variant="body1"
          className={classes.bestValue}
        >
          {subtext}
        </Typography>
      );
    case 'limitedTime':
      return (
        <Typography
          variant="body1"
          className={classes.limitedTime}
        >
          {subtext}
        </Typography>
      );
    default:
      return null;
  }
};

const MyLifePlanForm = (props) => {
  const classes = useStyles();

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

  const [value, setValue] = React.useState('female');

  const handleRadioChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12} margin={2}>
          <form onSubmit={handleSubmit}>
            <FormControl component="fieldset" className={classes.formControl}>
              <Typography variant="h4" color="inherit">
                1. Select Your Plan
              </Typography>
              <RadioGroup aria-label="priceRates" name="priceRates" value={value} onChange={handleRadioChange}>
                {radioOptions.map((radioOption) => {
                  const keyGen = uuidv4();

                  return (
                    <Paper key={keyGen} className={classes.radioPaper}>
                      <Box className={classes.radioBox}>
                        <FormControlLabel
                          value={radioOption.value}
                          control={<Radio />}
                          label={radioOption.label}
                        />
                        <Typography variant="body1" color="inherit" className={classes.rateText}>
                          {radioOption.rate}
                        </Typography>
                      </Box>
                      <MyLifeSubText
                        status={radioOption.sublabelclass}
                        subtext={radioOption.sublabel}
                      />
                    </Paper>
                  );
                })}
              </RadioGroup>
            </FormControl>
            {planDescriptions.map((desc) => {
              const keyGen = uuidv4();

              return (
                <Grid key={keyGen} item xs={12} margin={2} className={classes.planDescriptions}>
                  <Typography variant="body1" align="left">
                    <CheckIcon className={classes.checkIcon} />
                    {desc.heading}
                  </Typography>
                  <Typography variant="body2" color="inherit" align="left">{desc.description}</Typography>
                </Grid>
              );
            })}
            <Grid item xs={12} margin={2} className={classes.paymentSection}>
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
                type="email"
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
        <Grid item xs={12}>
          <img alt={securityLogo.altText} src={securityLogo.src} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" color="inherit" align="left" style={{ fontSize: 14, color: '#333', marginTop: 20 }}>
            By clicking the button above, I agree to the&nbsp;
            <Link style={{ color: '#1890ff' }} href="http://www.mylife.com/user-agreement/">MyLife Terms & Conditions</Link>
            &nbsp;and&nbsp;
            <Link style={{ color: '#1890ff' }} href="http://www.mylife.com/privacy-policy/">Privacy Policy</Link>
            . I understand that MyLife is not a consumer reporting agency. I agree that I will not
            use MyLife to determine an individual&apos;s eligibility for credit, insurance,
            employment, housing, or any other purpose covered under the Fair Credit Reporting Act
            (FCRA). I understand that I will be billed $1.00 for a 3-day trial. If I decide not to
            cancel during the trial period, I will be billed $79.95 every 6 months to the credit
            card provided until this subscription is cancelled. I may cancel anytime by contacting
            Customer Care at (888) 704-1900. (Customer Care hours are Mon-Fri 6am-7pm PT, Sat-Sun
            6am-5pm PT, Excluding Select Holidays).
          </Typography>
        </Grid>
      </Grid>
    </>
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

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

// import components
import MyLifeTextInput from './MyLifeTextInput';
import MyLifeFormEnhancer from './MyLifeFormEnhancer';

const planDescriptions = [{
  heading: 'NEW – Lock Sections of Your Reputation Profile - ',
  description: 'The same way you can lock your credit report. Correct, Enhance & Monitor Reputation Profile and Reputation Score - It could affect your career, who\'ll date you, where you live, & more. Manage & Protect your Personal Information - See websites that sell your personal information that you can\'t control. We can help you remove records from these sites with just one click. Receive Alerts when Your Reputation Profile is Viewed - With more than 300 million searches every day - colleagues, friends, love interests & clients - someone is going to be looking for you.',
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
}));

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

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12} margin={2}>
          <form onSubmit={handleSubmit}>
            {planDescriptions.map((desc) => (
              <Grid item xs={12} margin={2}>
                <Typography variant="body1" color="inherit" align="left">{desc.heading}</Typography>
                <Typography variant="body2" color="inherit" align="left">{desc.description}</Typography>
              </Grid>
            ))}
            <MyLifeTextInput
              id="firstName"
              type="text"
              label="First Name"
              placeholder="John"
              error={touched.firstName && errors.firstName}
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <MyLifeTextInput
              id="lastName"
              type="text"
              label="Last Name"
              placeholder="Doe"
              error={touched.lastName && errors.lastName}
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <MyLifeTextInput
              id="email"
              type="email"
              label="Email"
              placeholder="Enter your email"
              error={touched.email && errors.email}
              value={values.email}
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
            {/* <DisplayFormikState {...props} /> */}
          </form>
        </Grid>
        <Grid item xs={12}>
          <img alt={securityLogo.altText} src={securityLogo.src} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" color="inherit" align="left">
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
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
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

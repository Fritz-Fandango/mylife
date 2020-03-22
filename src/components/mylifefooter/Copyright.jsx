import React from 'react';
import PropTypes from 'prop-types';

// import Material components
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const Copyright = ({ boilerPlates }) => {
  const { boilerPlateAft, boilerPlateFore } = boilerPlates;

  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {boilerPlateFore}
      <Link color="inherit" href="https://www.mylife.com/">MyLife.com</Link>
      {boilerPlateAft}
    </Typography>
  );
};

Copyright.propTypes = {
  boilerPlates: PropTypes.shape({
    boilerPlateFore: PropTypes.string.isRequired,
    boilerPlateAft: PropTypes.string.isRequired,
  }).isRequired,
};

export default Copyright;

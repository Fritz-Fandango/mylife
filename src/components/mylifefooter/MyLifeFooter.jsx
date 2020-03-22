import React from 'react';

// import material components
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

// import material styles
import { makeStyles } from '@material-ui/core/styles';

// import components
import Copyright from './Copyright';

// TODO: Make this data come from 'external' data source
const footers = [
  {
    title: 'decription',
    description: 'MyLife.com® is the premiere people finder service aimed at helping people search, find, and forever keep in touch with the people they care about. Find old classmates, friends, lost loves, relatives, or search for anyone you\'ve lost touch with. Start your search today! Thumbnails may not be representative of actual profile pictures.',
  },
  {
    title: 'address1',
    description: '907 Westwood Blvd., #359, Los Angeles, CA 90024 USA',
  },
  {
    title: 'address2',
    description: '72 High Street, Haslemere, Surrey, GU27 2LA, United Kingdom',
  },
  {
    title: 'termsconditions',
    description: 'Terms & Conditions',
    url: 'https://mylife.com/user-agreement',
  },
  {
    title: 'privacypolicy',
    description: 'Privacy Policy',
    url: 'https://mylife.com/privacy-policy/',
  },
];

const boilerPlates = {
  boilerPlateFore: `Copyright © ${new Date().getFullYear()} `,
  boilerPlateAft: '® Inc U.S. Patent No. 6,701,348 and 6,694,35',
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(6, 0, 3),
  },
  lightBulb: {
    verticalAlign: 'middle',
    marginRight: theme.spacing(1),
  },
  boxStyle: {
    marginBottom: 5.6,
  },
}));

const MyLifeFooter = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="md" component="footer" className={classes.footer}>
      <Grid
        container
        justify="center"
        alignItems="flex-start"
        spacing={4}
      >
        <Box mt={5} className={classes.boxStyle}>
          <Copyright boilerPlates={boilerPlates} />
        </Box>
        {footers.map((footer) => (
          Object.prototype.hasOwnProperty.call(footer, 'url')
            ? (
              <Grid item key={footer.title}>
                <Link color="inherit" href={footer.url}>{footer.description}</Link>
              </Grid>
            ) : (
              <Grid item xs={12} key={footer.title}>
                <Typography
                  align="center"
                  key={footer.title}
                  variant="body1"
                  color="textSecondary"
                  gutterBottom
                >
                  {footer.description}
                </Typography>
              </Grid>
            )
        ))}
      </Grid>
    </Container>
  );
};

export default MyLifeFooter;

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// import material components
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// import material styles
import { makeStyles } from '@material-ui/core/styles';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';

// import components
import MyLifePlan from '../mylifeplan/MyLifePlan';

// TODO: This message along with others should be localized (i18n)
const profileStats = [{
  item: 'Improve Your Public Reputation Score',
},
{
  item: 'Be Alerted when People Search for You',
},
{
  item: 'Remove Your Info from Negative Sites',
}];

const myLifeUser = { email: '', firstName: '', lastName: '' };

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundImage: `url(${'https://www.mylife.com/site/static/media/background.69f6ed69.png'})`,
    backgroundSize: '100% 410px',
    backgroundRepeat: 'no-repeat',
    color: theme.palette.text.primary,
  },
  paper: {
    backgroundColor: '#bfbfbf',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  topBodyMsg: {
    color: '#fff',
    '& div svg': {
      fontSize: 6,
      marginRight: 12,
    },
  },
  appBarMsg: {
    backgroundColor: '#c70227',
    color: '#fff',
  },
  warningIcon: {
    position: 'relative',
    fontSize: 60,
    marginRight: 10,
  },
  heading: {
    marginTop: 20,
  },
  listItem: {
    padding: 0,
  },
}));

export default function FullWidthGrid() {
  const classes = useStyles();

  const [dense, setDense] = useState(false);

  return (
    <div className={classes.root}>
      <Box
        className={classes.appBarMsg}
        display="flex"
        flexWrap="nowrap"
        justifyContent="center"
        p={4}
      >
        <Box alignSelf="center">
          <WarningRoundedIcon classes={{ root: classes.warningIcon }} />
        </Box>
        <Box flexBasis="50%" flexWrap="nowrap">
          <Typography variant="h4" color="inherit">
            Tarun, Items On Your Reputation Profile Are Affecting Your Reputation
          </Typography>
        </Box>
      </Box>
      <Grid
        container
        justify="center"
        spacing={3}
      >
        <Grid item xs={12} className={classes.topBodyMsg}>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
          >
            <Typography variant="h4" style={{ marginTop: 20 }}>
              See Your Reputation Profile +
            </Typography>
            <div className={classes.listContainer}>
              <List dense={dense}>
                {profileStats.map((stat) => {
                  const keyGen = uuidv4();

                  return (
                    <ListItem key={keyGen} classes={{ root: classes.listItem }}>
                      <FiberManualRecordIcon />
                      <ListItemText primary={stat.item} />
                    </ListItem>
                  );
                })}
              </List>
            </div>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>xs=12 sm=6</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <MyLifePlan user={myLifeUser} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

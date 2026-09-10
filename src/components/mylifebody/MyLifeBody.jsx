import { useState } from "react";

// import material components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

// import material icons
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";

// import components
import MyLifePlan from "../mylifeplan/MyLifePlan";

// TODO: This message along with others should be localized (i18n)
const profileStats = [
  {
    item: "Improve Your Public Reputation Score",
  },
  {
    item: "Be Alerted when People Search for You",
  },
  {
    item: "Remove Your Info from Negative Sites",
  },
];

const myLifeUser = { email: "", firstName: "", lastName: "" };

const rootSx = {
  flexGrow: 1,
  backgroundImage:
    "url(https://www.mylife.com/site/static/media/background.69f6ed69.png)",
  backgroundSize: "100% 410px",
  backgroundRepeat: "no-repeat",
  color: "text.primary",
};

const appBarMsgSx = {
  backgroundColor: "#c70227",
  color: "#fff",
};

const warningIconSx = {
  position: "relative",
  fontSize: 60,
  marginRight: "10px",
};

const topBodyMsgSx = {
  color: "#fff",
  "& div svg": {
    fontSize: 6,
    marginRight: "12px",
  },
};

const paperSx = {
  backgroundColor: "#bfbfbf",
  padding: 2,
  textAlign: "center",
  color: "text.secondary",
};

export default function FullWidthGrid() {
  // eslint-disable-next-line no-unused-vars
  const [dense, setDense] = useState(false);

  return (
    <Box sx={rootSx}>
      <Box
        sx={{
          ...appBarMsgSx,
          display: "flex",
          flexWrap: "nowrap",
          justifyContent: "center",
          p: 4,
        }}
      >
        <Box sx={{ alignSelf: "center" }}>
          <WarningRoundedIcon sx={warningIconSx} />
        </Box>
        <Box sx={{ flexBasis: "50%", flexWrap: "nowrap" }}>
          <Typography variant="h4" color="inherit">
            Tarun, Items On Your Reputation Profile Are Affecting Your Reputation
          </Typography>
        </Box>
      </Box>
      <Grid container spacing={3} sx={{ justifyContent: "center" }}>
        <Grid size={{ xs: 12 }} sx={topBodyMsgSx}>
          <Grid
            container
            spacing={0}
            direction="column"
            sx={{ alignItems: "center" }}
          >
            <Typography variant="h4" style={{ marginTop: 20 }}>
              See Your Reputation Profile +
            </Typography>
            <div>
              <List dense={dense}>
                {profileStats.map((stat) => (
                  <ListItem key={stat.item} sx={{ padding: 0 }}>
                    <FiberManualRecordIcon />
                    <ListItemText primary={stat.item} />
                  </ListItem>
                ))}
              </List>
            </div>
          </Grid>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Paper sx={paperSx}>xs=12 sm=6</Paper>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Paper sx={paperSx}>
            <MyLifePlan user={myLifeUser} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

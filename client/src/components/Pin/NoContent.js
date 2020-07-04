import React from "react";
import { withStyles, Typography } from "@material-ui/core";
import ExploreIcon from "@material-ui/icons/Explore";

const NoContent = ({ classes }) => (
  <div className={classes.root}>
    <ExploreIcon className={classes.icon} />
    <Typography variant="h6" align="center" color="textPrimary" gutterBottom>
      Left click anywhere on the map to add a pin
    </Typography>
  </div>
);

const styles = (theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: "80px",
  },
});

export default withStyles(styles)(NoContent);

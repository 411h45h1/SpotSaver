import React, { useContext } from "react";
import { withStyles, AppBar, Toolbar, Typography } from "@material-ui/core";
import MapIcon from "@material-ui/icons/Map";
import AppContext from "../context";
import Signout from "../components/Auth/Signout";

const Header = ({ classes }) => {
  const { state } = useContext(AppContext);
  const { currentUser } = state;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.grow}>
            <MapIcon className={classes.icon} />
            <Typography component="h1" variant="h6" noWrap color="inherit">
              GeoPins
            </Typography>
          </div>

          {/* Current User info */}
          {currentUser && (
            <div className={classes.grow}>
              <img
                className={classes.picture}
                src={currentUser.picture}
                alt={currentUser.name}
              />
              <Typography variant="h6" noWrap color="inherit">
                {currentUser.name}
              </Typography>
            </div>
          )}
          {/* signout here */}
          <Signout />
        </Toolbar>
      </AppBar>
    </div>
  );
};

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
  },
  icon: {
    marginRight: theme.spacing.unit,
    color: "maroon",
    fontSize: 45,
  },
  mobile: {
    display: "none",
  },
  picture: {
    height: "50px",
    borderRadius: "90%",
    marginRight: theme.spacing.unit * 2,
  },
});

export default withStyles(styles)(Header);

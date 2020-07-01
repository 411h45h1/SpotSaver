import React, { useContext } from "react";
import { withStyles, Typography } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { GoogleLogout } from "react-google-login";
import AppContext from "../../context";
const Signout = ({ classes }) => {
  const { dispatch } = useContext(AppContext);

  const onSignout = () => {
    return dispatch({ type: "SIGNOUT_USER" });
  };

  return (
    <GoogleLogout
      onLogoutSuccess={onSignout}
      buttonText="Signout"
      render={({ onClick }) => (
        <span className={classes.root} onClick={onClick}>
          <Typography variant="body1" className={classes.buttonText}>
            Signout
          </Typography>
          <ExitToAppIcon className={classes.buttonIcon} />
        </span>
      )}
    />
  );
};

const styles = {
  root: {
    cursor: "pointer",
    display: "flex",
  },
  buttonText: {
    color: "orange",
  },
  buttonIcon: {
    marginLeft: "5px",
    color: "orange",
  },
};

export default withStyles(styles)(Signout);

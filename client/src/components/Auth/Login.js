import React from "react";
import { GoogleLogin } from "react-google-login";
import { withStyles } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";

const Login = ({ classes }) => {
  const onSuccess = (googleUser) => {
    console.log({ googleUser });
  };
  return (
    <GoogleLogin
      clientId="784472468796-igkb3ds44vjvcon4o1dusjivqtn6qoeu.apps.googleusercontent.com"
      onSuccess={onSuccess}
      onFailure={(err) => console.log("fail", err)}
    />
  );
};

const styles = {
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
};

export default withStyles(styles)(Login);

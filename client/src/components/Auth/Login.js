import React, { useContext } from "react";
import { GraphQLClient } from "graphql-request";
import { GoogleLogin } from "react-google-login";
import { withStyles, Typography } from "@material-ui/core";
import AppContext from "../../context";
import { ME_QUERY } from "../../graphql/queries";

const Login = ({ classes }) => {
  const { dispatch } = useContext(AppContext);

  const onSuccess = async (googleUser) => {
    try {
      const idToken = googleUser.getAuthResponse().id_token;
      const client = new GraphQLClient("http://localhost:4000/graphql", {
        headers: { authorization: idToken },
      });

      const { me } = await client.request(ME_QUERY);
      dispatch({ type: "LOGIN_USER", payload: me });
      dispatch({ type: "IS_LOGGED_IN", payload: googleUser.isSignedIn() });
    } catch (error) {
      console.error("login failed", error);
    }
  };
  return (
    <div className={classes.root}>
      <Typography component="h1" variant="h3" gutterBottom noWrap>
        Welcome
      </Typography>
      <GoogleLogin
        clientId="784472468796-igkb3ds44vjvcon4o1dusjivqtn6qoeu.apps.googleusercontent.com"
        onSuccess={onSuccess}
        onFailure={(err) => console.error("login failed", err)}
        isSignedIn={true}
        buttonText="Login with Google"
        theme="dark"
      />
    </div>
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

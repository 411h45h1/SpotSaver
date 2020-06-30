import React, { useContext } from "react";
import { GraphQLClient } from "graphql-request";
import { GoogleLogin } from "react-google-login";
import { withStyles } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";
import AppContext from "../../context";
const ME_QUERY = `
{
  me{
    _id
    name
    email
    picture
  }
}
`;
const Login = ({ classes }) => {
  const { dispatch } = useContext(AppContext);

  const onSuccess = async (googleUser) => {
    const idToken = googleUser.getAuthResponse().id_token;

    const client = new GraphQLClient("http://localhost:4000/graphql", {
      headers: { authorization: idToken },
    });

    const data = await client.request(ME_QUERY);
    // console.log(data);
    dispatch({ type: "LOGIN_USER", payload: data.me });
  };
  return (
    <GoogleLogin
      clientId="784472468796-igkb3ds44vjvcon4o1dusjivqtn6qoeu.apps.googleusercontent.com"
      onSuccess={onSuccess}
      onFailure={(err) => console.log("fail", err)}
      isSignedIn={true}
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

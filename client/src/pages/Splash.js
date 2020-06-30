import React, { useContext } from "react";
import Login from "../components/Auth/Login";
import AppContext from "../context";
import { Redirect } from "react-router-dom";

const Splash = () => {
  const { state } = useContext(AppContext);
  return state.isAuth ? <Redirect to="/" /> : <Login />;
};

export default Splash;

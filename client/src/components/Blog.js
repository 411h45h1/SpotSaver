import React, { useContext } from "react";
import AppContext from "../context";
import { withStyles, Paper } from "@material-ui/core";
import { CreatePin, NoContent, PinContent } from "./Pin";

const Blog = ({ classes }) => {
  const { state } = useContext(AppContext);
  const { draftPin } = state;

  let BlogContent;
  if (!draftPin) {
    BlogContent = NoContent;
  } else if (draftPin) {
    //create
    BlogContent = CreatePin;
  }

  return (
    <Paper className={classes.root}>
      <BlogContent />
    </Paper>
  );
};

const styles = {
  root: {
    minWidth: 350,
    maxWidth: 400,
    maxHeight: "calc(100vh - 64px)",
    overflowY: "scroll",
    display: "flex",
    justifyContent: "center",
  },
  rootMobile: {
    maxWidth: "100%",
    maxHeight: 300,
    overflowX: "hidden",
    overflowY: "scroll",
  },
};

export default withStyles(styles)(Blog);

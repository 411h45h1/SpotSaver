import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ReactMapGL from "react-map-gl";
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import DeleteIcon from "@material-ui/icons/DeleteTwoTone";

const viewport = {
  latitude: 43.65107,
  longitude: -79.3832,
  zoom: 11,
};
const Map = ({ classes }) => {
  return (
    <div className={classes.root}>
      <ReactMapGL
        mapboxApiAccessToken="pk.eyJ1Ijoic2hwYWR6YSIsImEiOiJja2MzdXlxYTQwMXA0MnlvOXY2OW96YjFtIn0.SwnKMiMA5aPj_3AK8j88MA"
        width="100vw"
        height="calc(100vh - 64px)"
        mapStyle="mapbox://styles/shpadza/ckc3w452h044d1io64r5bso1r"
        {...viewport}
      />
    </div>
  );
};

const styles = {
  root: {
    display: "flex",
  },
  rootMobile: {
    display: "flex",
    flexDirection: "column-reverse",
  },
  navigationControl: {
    position: "absolute",
    top: 0,
    left: 0,
    margin: "1em",
  },
  deleteIcon: {
    color: "red",
  },
  popupImage: {
    padding: "0.4em",
    height: 200,
    width: 200,
    objectFit: "cover",
  },
  popupTab: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
};

export default withStyles(styles)(Map);

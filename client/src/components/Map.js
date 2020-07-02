import React, { useState, useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import ReactMapGL, { NavigationControl } from "react-map-gl";
import AppContext from "../context";

// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import DeleteIcon from "@material-ui/icons/DeleteTwoTone";

const INITIAL_VIEWPORT = {
  latitude: 43.65107,
  longitude: -79.3832,
  zoom: 12,
};
const Map = ({ classes }) => {
  const { state } = useContext(AppContext);
  const [viewport, setViewport] = useState(INITIAL_VIEWPORT);
  return (
    <div className={classes.root}>
      <ReactMapGL
        mapboxApiAccessToken="pk.eyJ1Ijoic2hwYWR6YSIsImEiOiJja2MzdXlxYTQwMXA0MnlvOXY2OW96YjFtIn0.SwnKMiMA5aPj_3AK8j88MA"
        width="100vw"
        height="calc(100vh - 64px)"
        mapStyle={state.mapSelected}
        onViewportChange={(movedView) => setViewport(movedView)}
        {...viewport}
      >
        {/* nav control */}
        <div className={classes.navigationControl}>
          <NavigationControl
            onViewportChange={(movedView) => setViewport(movedView)}
          />
        </div>
      </ReactMapGL>
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

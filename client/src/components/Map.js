import React, { useState, useContext, useEffect } from "react";
import { withStyles, Typography } from "@material-ui/core";
import ReactMapGL, { NavigationControl, Marker, Popup } from "react-map-gl";
import AppContext from "../context";
import PinIcon from "./PinIcon";
import Blog from "./Blog";
import { useClient } from "../client";
import { GET_PINS_QUERY } from "../graphql/queries";
import differenceInMinutes from "date-fns/difference_in_minutes";
// import Button from "@material-ui/core/Button";
// import DeleteIcon from "@material-ui/icons/DeleteTwoTone";
const INITIAL_VIEWPORT = {
  latitude: 43.65107,
  longitude: -79.3832,
  zoom: 12,
};
const Map = ({ classes }) => {
  const client = useClient();
  const { state, dispatch } = useContext(AppContext);
  const [viewport, setViewport] = useState(INITIAL_VIEWPORT);
  const [userPosition, setUserPosition] = useState(null);
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    getUserPosition();
    //
    getPins();
  }, []);

  const getPins = async () => {
    //query db
    const { getPins } = await client.request(GET_PINS_QUERY);
    //load data into state
    dispatch({
      type: "GET_PINS",
      payload: getPins,
    });
    console.log(getPins);
  };

  const getUserPosition = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setViewport({ ...viewport, latitude, longitude });
        setUserPosition({ latitude, longitude });
      });
    }
  };
  const handleMapClick = ({ lngLat, leftButton }) => {
    if (!leftButton) return;
    if (!state.draftPin) {
      dispatch({ type: "CREATE_DRAFT" });
    }

    const [longitude, latitude] = lngLat;

    dispatch({
      type: "UPDATE_DRAFT_LOCATION",
      payload: { longitude, latitude },
    });
  };

  const handleIsPinNew = (pin) => {
    const isPinNew =
      differenceInMinutes(Date.now(), Number(pin.createdAt)) <= 30;
    return isPinNew ? "lightcoral" : "steelblue";
  };

  const handleSelectedPin = (pin) => {
    setPopup(pin);
    dispatch({
      type: "SET_SELECTED_PIN",
      payload: pin,
    });
  };

  return (
    <div className={classes.root}>
      <ReactMapGL
        mapboxApiAccessToken="pk.eyJ1Ijoic2hwYWR6YSIsImEiOiJja2MzdXlxYTQwMXA0MnlvOXY2OW96YjFtIn0.SwnKMiMA5aPj_3AK8j88MA"
        onClick={handleMapClick}
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
        {/* pin @ user current position */}

        {userPosition && (
          <Marker
            latitude={userPosition.latitude}
            longitude={userPosition.longitude}
            offsetLeft={-19}
            offsetTop={-37}
          >
            <PinIcon
              size={40}
              color="maroon"
              onClick={() => console.log("clicked")}
            />
          </Marker>
        )}
        {/* draft Pin */}

        {state.draftPin && (
          <Marker
            latitude={state.draftPin.latitude}
            longitude={state.draftPin.longitude}
            offsetLeft={-19}
            offsetTop={-37}
          >
            <PinIcon size={40} color="green" />
          </Marker>
        )}

        {/* Created Pins */}

        {state.pins.map((pin) => (
          <Marker
            key={pin._id}
            latitude={pin.latitude}
            longitude={pin.longitude}
            offsetLeft={-19}
            offsetTop={-37}
          >
            <PinIcon
              size={40}
              color={handleIsPinNew(pin)}
              onClick={() => handleSelectedPin(pin)}
            />
          </Marker>
        ))}

        {/* popup dialog */}

        {popup && (
          <Popup
            anchor="top"
            latitude={popup.latitude}
            longitude={popup.longitude}
            closeOnClick={false}
            onClose={() => setPopup(null)}
          >
            <img
              className={classes.popupImage}
              src={popup.image}
              alt={popup.title}
            />
            <div className={classes.popupTab}>
              <Typography>
                {popup.latitude.toFixed(6)},{popup.longitude.toFixed(6)}
              </Typography>
            </div>
          </Popup>
        )}
      </ReactMapGL>
      {/* blog */}
      <Blog />
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

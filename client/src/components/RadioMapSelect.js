import React, { useContext } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import AppContext from "../context";

const MapSelect = () => {
  const { dispatch } = useContext(AppContext);

  return (
    <FormControl component="fieldset">
      <FormLabel
        component="legend"
        style={{ marginBottom: -10, color: "white" }}
      >
        Select Map
      </FormLabel>
      <RadioGroup
        row
        aria-label="position"
        name="placement"
        defaultValue="street"
      >
        <FormControlLabel
          value="street"
          control={<Radio color="black" />}
          label="Street"
          labelPlacement="start"
          onClick={() => {
            return dispatch({ type: "MAP_CHANGE_BASIC" });
          }}
        />
        <FormControlLabel
          value="light"
          control={<Radio color="black" />}
          label="Light"
          labelPlacement="start"
          onClick={() => {
            return dispatch({ type: "MAP_CHANGE_LIGHT" });
          }}
        />
        <FormControlLabel
          value="dark"
          control={<Radio color="black" />}
          label="Dark"
          labelPlacement="start"
          onClick={() => {
            return dispatch({ type: "MAP_CHANGE_DARK" });
          }}
        />

        <FormControlLabel
          value="customRed"
          control={<Radio color="black" />}
          label="Alt"
          labelPlacement="start"
          onClick={() => {
            return dispatch({ type: "MAP_CHANGE_RED" });
          }}
        />
      </RadioGroup>
    </FormControl>
  );
};
export default MapSelect;

import { createContext } from "react";

const AppContext = createContext({
  currentUser: null,
  isAuth: false,
  mapSelected: "mapbox://styles/mapbox/streets-v11",
  draftPin: null,
  pins: [],
  selectedPin: null,
});

export default AppContext;

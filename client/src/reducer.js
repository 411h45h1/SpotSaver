export default function reducer(state, action) {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...state,
        currentUser: action.payload,
      };
    case "IS_LOGGED_IN":
      return {
        ...state,
        isAuth: action.payload,
      };
    case "SIGNOUT_USER":
      return {
        ...state,
        isAuth: false,
        currentUser: null,
      };
    case "MAP_CHANGE_BASIC":
      return {
        ...state,
        mapSelected: "mapbox://styles/mapbox/streets-v11",
      };
    case "MAP_CHANGE_LIGHT":
      return {
        ...state,
        mapSelected: "mapbox://styles/mapbox/light-v10",
      };
    case "MAP_CHANGE_DARK":
      return {
        ...state,
        mapSelected: "mapbox://styles/mapbox/dark-v10",
      };
    case "MAP_CHANGE_RED":
      return {
        ...state,
        mapSelected: "mapbox://styles/shpadza/ckc3w452h044d1io64r5bso1r",
      };

    default:
      return state;
  }
}

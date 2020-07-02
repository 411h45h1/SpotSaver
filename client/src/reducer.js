export default function reducer(state, action) {
  switch (action.type) {
    // Auth
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
    // draft pin
    case "CREATE_DRAFT":
      return {
        ...state,
        draftPin: {
          latitude: 0,
          longitude: 0,
        },
      };
    case "UPDATE_DRAFT_LOCATION":
      return {
        ...state,
        draftPin: action.payload,
      };
    // Map
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

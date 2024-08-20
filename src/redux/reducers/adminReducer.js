import { LOGIN_IN_SUCCESS, LOGOUT,  LOAD_ADMIN, CHANGE_PASSWORD, UPDATE_PROFILE } from "../type";
const initialState = {
  isAuthenticated: false,
  admin: {},
  success: false,
};
const AdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_IN_SUCCESS:
      localStorage.setItem("token", action.payload.details.token);
      return {
        ...state,
        isAuthenticated: true,
        admin: action.payload.details,
        success: true,
      };
      case LOAD_ADMIN:
        return {
          ...state,
          isAuthenticated: true,
          admin: action.payload.details,
        };
    case LOGOUT:
    case CHANGE_PASSWORD:
      localStorage.removeItem("token");
      return {
        isAuthenticated: false,
        admin: {},
      };
  case UPDATE_PROFILE:
        return {
          ...state,
          admin: action.payload.user,
        };
    default:
      return state;
  }
};

export default AdminReducer;

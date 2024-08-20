import { combineReducers } from "redux";
import adminReducer from './adminReducer';
import dashboardInfoReducer from './dashboardInfoReducer'

export default combineReducers({
  adminState: adminReducer,
  dashboardInfoState: dashboardInfoReducer,
});
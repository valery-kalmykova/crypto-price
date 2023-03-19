import { combineReducers } from "redux";
import { commonReducer } from "./commonReducer";
import { wsReducer } from "./wsReducer";

const rootReducer = combineReducers({
  common: commonReducer,
  ws: wsReducer,
});

export default rootReducer;

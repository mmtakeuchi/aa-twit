import { combineReducers } from "redux";
import session from "./session_reducer";
import tweet from "./tweet_reducer";
import errors from "./errors_reducer";

const RootReducer = combineReducers({
  session,
  tweet,
  errors,
});

export default RootReducer;

import { configureStore } from "@reduxjs/toolkit";
import userReducer, { resetUser } from "./userSlice";
import feedReducer, { clearFeed } from "./feedSlice";
import connectionReducer, { clearConnections } from "./connectionsSlice";
import requestReducer, { clearRequests } from "./requestsSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionReducer,
    requests: requestReducer,
  },
});

export const resetStore = () => (dispatch) => {
  dispatch(resetUser());
  dispatch(clearFeed());
  dispatch(clearConnections());
  dispatch(clearRequests());
};

export default appStore;

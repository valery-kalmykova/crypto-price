import {
  Action,
  configureStore,
  ThunkAction,
  ActionCreator,
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
} from "./actions/wsActions";
import { socketMiddleware } from "./middleware/socketMiddleware";
import type { TwsActions } from "./types";

const wsActions: TwsActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
  wsSendMessage: WS_SEND_MESSAGE,
};

const wsUrl = "wss://stream.binance.com:9443/ws";

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk, socketMiddleware(wsUrl, wsActions)] as const,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, RootState, unknown, Action>
>;

export default store;

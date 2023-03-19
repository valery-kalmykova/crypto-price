export interface TwsActions {
  wsInit: "WS_CONNECTION_START";
  onOpen: "WS_CONNECTION_SUCCESS";
  onClose: "WS_CONNECTION_CLOSED";
  onError: "WS_CONNECTION_ERROR";
  onMessage: "WS_GET_MESSAGE";
  wsSendMessage: "WS_SEND_MESSAGE";
}

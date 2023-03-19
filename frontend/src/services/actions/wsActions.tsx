export const WS_CONNECTION_START: "WS_CONNECTION_START" = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" =
  "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" =
  "WS_CONNECTION_CLOSED";
export const WS_GET_MESSAGE: "WS_GET_MESSAGE" = "WS_GET_MESSAGE";
export const WS_SEND_MESSAGE: "WS_SEND_MESSAGE" = "WS_SEND_MESSAGE";

interface IwsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

interface IwsConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
}

interface IwsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
}

interface IwsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

interface IwsGetMessage {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: { data: any };
}

export interface IwsSendMessage {
  readonly type: typeof WS_SEND_MESSAGE;
  readonly payload: string;
}

export type IwsActions =
  | IwsConnectionSuccess
  | IwsConnectionError
  | IwsConnectionClosed
  | IwsGetMessage
  | IwsSendMessage
  | IwsConnectionStart;

export const wsConnectionSuccess = (): IwsActions => {
  return {
    type: WS_CONNECTION_SUCCESS,
  };
};

export const wsConnectionError = (): IwsActions => {
  return {
    type: WS_CONNECTION_ERROR,
  };
};

export const wsConnectionClosed = (): IwsActions => {
  return {
    type: WS_CONNECTION_CLOSED,
  };
};

export const wsGetMessage = (data: any): IwsActions => {
  return {
    type: WS_GET_MESSAGE,
    payload: { data },
  };
};

export const wsSendMessage = (message: any) => {
  return {
    type: WS_SEND_MESSAGE,
    payload: message,
  };
};

import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from "../actions/wsActions";
import { IwsActions } from "../actions/wsActions";

interface IinitialState {
  wsConnected: boolean;
  data: any;
}

const initialState: IinitialState = {
  wsConnected: false,
  data: [],
};

export const wsReducer = (
  state: IinitialState = initialState,
  action: IwsActions,
): IinitialState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};

import {
  GET_CURRENCIES_REQUEST,
  GET_CURRENCIES_SUCCESS,
  GET_CURRENCIES_FAILED,
  SET_CURRENCY,
} from "../actions/actionsTypes";
import { TCurrenciesActions } from "../actions/commonActions";

export type TCommonState = {
  getAllRequest: boolean;
  getAllFailed: boolean;
  getAllSuccess: boolean;
  currencies: any;
  selectedCurrency: string;
};

const initialState = {
  getAllRequest: false,
  getAllFailed: false,
  getAllSuccess: false,
  currencies: [],
  selectedCurrency: "BTCUSDT",
};

export const commonReducer = (
  state: TCommonState = initialState,
  action: TCurrenciesActions,
) => {
  switch (action.type) {
    case GET_CURRENCIES_REQUEST: {
      return {
        ...state,
        getAllRequest: true,
        getAllFailed: false,
      };
    }

    case GET_CURRENCIES_SUCCESS: {
      return {
        ...state,
        getAllFailed: false,
        getAllSuccess: true,
        currencies: action.payload.data,
      };
    }

    case GET_CURRENCIES_FAILED: {
      return {
        ...state,
        getAllFailed: true,
        getAllRequest: false,
        getAllSuccess: false,
        currencies: [],
      };
    }

    case SET_CURRENCY: {
      return {
        ...state,
        selectedCurrency: action.payload.data,
      };
    }

    default:
      return state;
  }
};

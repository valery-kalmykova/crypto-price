import {
  GET_CURRENCIES_REQUEST,
  GET_CURRENCIES_SUCCESS,
  GET_CURRENCIES_FAILED,
  SET_CURRENCY,
} from "./actionsTypes";
import {
  baseUrl,
  checkResponse,
  // tokenRequestOptions,
  requestOption,
} from "../../utils/constants";
import type { AppThunk, AppDispatch } from "../store";

interface IfetchCurrenciesRequest {
  readonly type: typeof GET_CURRENCIES_REQUEST;
}

interface IfetchCurrenciesSuccess {
  readonly type: typeof GET_CURRENCIES_SUCCESS;
  readonly payload: { data: any };
}

interface IfetchCurrenciesFailed {
  readonly type: typeof GET_CURRENCIES_FAILED;
  readonly payload: { error: {} };
}

interface IsetCurrency {
  readonly type: typeof SET_CURRENCY;
  readonly payload: { data: string };
}

export type TCurrenciesActions =
  | IfetchCurrenciesRequest
  | IfetchCurrenciesSuccess
  | IfetchCurrenciesFailed
  | IsetCurrency;

export const fetchCurrenciesRequest = (): TCurrenciesActions => ({
  type: GET_CURRENCIES_REQUEST,
});

export const fetchCurrenciesSuccess = (data: any): TCurrenciesActions => ({
  type: GET_CURRENCIES_SUCCESS,
  payload: { data },
});

export const fetchCurrenciesFailed = (error: {}): TCurrenciesActions => ({
  type: GET_CURRENCIES_FAILED,
  payload: { error },
});

export const getCurrencies: AppThunk<Promise<TCurrenciesActions>> =
  () => (dispatch: AppDispatch) => {
    dispatch(fetchCurrenciesRequest());
    return fetch(`${baseUrl}/api/all`, requestOption("GET"))
      .then(checkResponse)
      .then((json) => {
        dispatch(fetchCurrenciesSuccess(json.symbols));
        return json;
      })
      .catch((error) => dispatch(fetchCurrenciesFailed(error)));
  };

export const setCurrency = (data: string): TCurrenciesActions => ({
  type: SET_CURRENCY,
  payload: { data },
});

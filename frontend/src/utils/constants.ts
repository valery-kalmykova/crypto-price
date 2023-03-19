const currencies = [
  "BTCUSDT",
  "DOTUSDT",
  "DOGEUSDT",
  "SOLUSDT",
  "ARUSDT",
  "MANAUSDT",
  "FOOTBALLUSDT",
];

const current = {
  currency: "BTCUSDT",
  levels: { 101: { alerts: [100, 100, 5] }, 105: { alerts: [100, 100, 5] } },
};

export function checkResponse(res: Response) {
  if (!res.ok) {
    return Promise.reject(new Error(`Ошибка ${res.status}`));
  }
  return res.json();
}

const baseUrl = "http://localhost:4000";

const tokenRequestOptions = (method: string) => {
  // использовать после подключения авторизации
  // const accessToken = localStorage.getItem("accessToken");

  // убрать после подключения авторизации. Залогинится через postman и вставить полученный токен
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQsImlhdCI6MTY3Mzk0OTY1OCwiZXhwIjoxNjc0MDM2MDU4fQ.Y-VP7vOv8hwHRAxXcXIMD39gbln5YOZr_dRei8nUzZk";

  const requestOptions = {
    method: `${method}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return requestOptions;
};

const requestOption = (method: string) => {
  const requestOptions = {
    method: `${method}`,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return requestOptions;
};

export { currencies, current, baseUrl, tokenRequestOptions, requestOption };

import React, { useEffect } from "react";
import styles from "./styles.module.css";
import Sidebar from "../components/Sidebar/Sidebar";
import Main from "../components/Main/Main";
import Header from "../components/Header/Header";
import { getCurrencies } from "../services/actions";
import { useDispatch, useSelector } from "../services/hooks";
import {
  wsSendMessage,
  wsGetMessage,
  WS_CONNECTION_START,
} from "../services/actions/wsActions";

function App() {
  const dispatch = useDispatch();
  const isConnected = useSelector((state) => state.ws.wsConnected);
  const wsData = useSelector((state) => state.ws.data);

  const msg = {
    method: "SUBSCRIBE",
    params: ["btcusdt@aggTrade"],
    id: 1,
  };

  useEffect(() => {
    dispatch(getCurrencies());
    dispatch({ type: WS_CONNECTION_START });
  }, []);

  useEffect(() => {
    if (isConnected) {
      dispatch(wsSendMessage(msg));
      setTimeout(() => {
        dispatch(wsGetMessage);
      }, 1000);
    }
  }, [wsData]);

  console.log(isConnected);
  console.log(wsData);
  return (
    <div className={styles.section}>
      <div className={styles.item__header}>
        <Header />
      </div>
      <div className={styles.item__main}>
        <Main />
      </div>
      <div className={styles.item__sidebar}>
        <Sidebar />
      </div>
    </div>
  );
}

export default App;

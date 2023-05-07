import React from "react";
import styles from "./styles.module.css";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

interface IInputGroup {
  placeholderT: string;
}

const InputAddLevel = ({ placeholderT }: IInputGroup) => {
  return (
    <div className={styles.inputGroup}>
      <InputText className={styles.input} placeholder={placeholderT} />
      <Button icon="pi pi-check" />
      <Button icon="pi pi-times" />
    </div>
  );
};

export default InputAddLevel;

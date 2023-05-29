import React, { useState } from "react";
import styles from "./styles.module.css";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

const EditableDataForm = ({ onSubmit }: any) => {
  const [price, setPrice] = useState<string>("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(price);
    setPrice('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <TextField
        placeholder="Add price"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
      />
      <Button variant="outlined" endIcon={<SendIcon />} type="submit">Add</Button>
    </form>
  );
};

export default EditableDataForm;

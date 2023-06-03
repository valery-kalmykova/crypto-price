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
    <form onSubmit={handleSubmit} className={styles.container} noValidate autoComplete="off">
      <TextField
        placeholder="Add price"
        inputProps={{ inputMode: 'numeric', pattern: '[0-9.,]*' }}
        value={price}
        onChange={(event) => setPrice(event.target.value)}
      />
      <Button variant="outlined" endIcon={<SendIcon />} type="submit">Add</Button>
    </form>
  );
};

export default EditableDataForm;

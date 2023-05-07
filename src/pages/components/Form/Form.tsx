import React, { useState } from "react";
import { InputText } from "primereact/inputtext";

type DataObject = {
  name: string;
  price: number[];
};

const EditableDataForm = ({onSubmit}: any) => {
  const [name, setName] = useState<string>();
  const [price, setPrice] = useState<number[]>();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ name, price });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <InputText
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <label>
        Price:
        <InputText
          type="text"
          value={String(price)}
          onChange={(event) =>
            setPrice(event.target.value.split(",").map(Number))
          }
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default EditableDataForm;

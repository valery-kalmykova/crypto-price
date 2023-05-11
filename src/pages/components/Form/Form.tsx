import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from 'primereact/inputnumber';

type DataObject = {
  name: string;
  price: number;
};

const EditableDataForm = ({onSubmit}: any) => {
  const [name, setName] = useState<string>();
  const [price, setPrice] = useState<number | null>();

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
        <InputNumber
          mode="currency"
          currency="USD"
          step={0.0001}
          value={price}
          onValueChange={(event) =>
            setPrice(event.value)
          }
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default EditableDataForm;

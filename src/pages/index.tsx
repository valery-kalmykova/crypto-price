import { useEffect, useState } from 'react';
import { InputText } from "primereact/inputtext";
import styles from './styles.module.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Sidebar from './components/Sidebar/Sidebar';
import Form from './components/Form/Form';

interface Ialtcoins {
  name: string;
  price: number[];
}

export default function Home() {
  const [altcoins, setAltcoins] = useState<Ialtcoins[]>([]);

  const handleSubmit = async ( newData: { name: string, price: number[] }) => {
    const response = await fetch('/api/crypto-prices', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    })
    // console.log(newData);
    // const response = await fetch('/api/crypto-prices')
    const data = await response.json()
    setAltcoins(data);
  };

  return (
    <div className={styles.section}>
      <div className={styles.item__header}>
        <Header />
      </div>
      <div className={styles.item__main}>
        {altcoins && altcoins.map((item) => {
          const prices = String(item.price)
          return (
            <>
              <p>{item.name}</p>
              <p>{prices}</p>
            </>
          )
        })}
        <Form onSubmit={handleSubmit}/>
        {/* <Main /> */}
      </div>
      <div className={styles.item__sidebar}>
        <Sidebar />
      </div>
    </div>
  )
}

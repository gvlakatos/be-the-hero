import React, { useState } from 'react';
import './global.css';
import Routes from './routes';

function App() {
  // a função 'useState' retorna um array, sendo que na primeira posição é o valor e na segunda posição é uma função de atualização
  // const [counter, setCounter] = useState(0);

  // function increment() {
  //   setCounter(counter + 1);
  // }

  return (
      <Routes />
  );
}

export default App;
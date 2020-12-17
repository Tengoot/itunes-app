import logo from './logo.svg';
import styles from './App.module.css';
import { Button, Stack } from '@chakra-ui/react';
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
    return (
    <Stack direction="row">
      <div>{count}</div>
      <Button colorScheme="green" onClick={() => setCount(count + 1)}>+</Button>
      <Button colorScheme="red" onClick={() => setCount(count - 1)}>-</Button>
    </Stack>
  );
}

function App() {
  return (
    <div className={styles['App']}>
      <header className={styles['App-header']}>
        {Counter()}
        <Button colorScheme="blue">Hello world!</Button>
      </header>
    </div>
  );
}

export default App;

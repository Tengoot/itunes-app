import logo from './logo.svg';
import styles from './App.module.css';
import { Button, Stack } from '@chakra-ui/react';
import { Counter } from './Counter/Counter';

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

import { CountContext } from '../context/context';
import { useContext } from 'react';

export function CountDisplay() {
  const { count } = useContext(CountContext);
  return <div>{`The current count is ${count}`}</div>;
}

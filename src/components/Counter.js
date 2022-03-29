import { CountContext } from '../context/context';
import { useContext } from 'react';

export function Counter() {
  const { newCount } = useContext(CountContext);
  return <button>{newCount}</button>;
}

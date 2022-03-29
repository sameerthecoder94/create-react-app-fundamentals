import { useReducer } from 'react';
import { countReducer } from '../reducer/reducer';

export function Counter({ initialCount = 2, step = 2 }) {
  const [state, dispatch] = useReducer(countReducer, {
    count: initialCount,
  });

  const { count } = state;

  console.log(state);

  const increment = () => {
    dispatch({ type: 'increment' });
  };

  return (
    <>
      <button onClick={increment}>{count}</button>
    </>
  );
}

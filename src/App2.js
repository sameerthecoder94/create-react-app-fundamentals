// useReducer: simple Counter

import { useReducer } from 'react';

function countReducer(state, action) {
  console.log('I am from reducer function');

  return {
    ...state,
    ...(typeof action === 'function' ? action(state) : action),
  };
}

function Counter({ initialCount = 0, step = 2 }) {
  console.log('I am from Counter component');

  const [{ count, newCount }, setState] = useReducer(countReducer, {
    count: initialCount,
    newCount: 500,
  });

  const increment = () => {
    setState((state) => {
      return { count: state.count + step };
    });
  };

  return (
    <button onClick={increment}>
      {count} - {newCount}
    </button>
  );
}

function App() {
  console.log('I am from App component');
  return <Counter />;
}

export default App;

// useReducer: simple Counter

import React from 'react';

function countReducer(state, action) {
  console.log('I am from reducer function');
  console.log(state);
  console.log(action);

  return { ...state, ...action };
}

function Counter({ initialCount = 0, step = 2 }) {
  console.log('I am from Counter component');

  const [{ count, newCount }, setState] = React.useReducer(
    countReducer,
    {
      count: initialCount,
      newCount: 500,
    }
  );

  const increment = () => setState({ count: count + step });

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

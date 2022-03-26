import { useState, useEffect } from 'react';
import List from './components/List';
import { stories } from './components/storiesData';

const App = () => {
  const [state, setState] = useState('');

  useEffect(() => {
    localStorage.setItem('myCat', 'Hello I am from localstorage');
  });

  const handleChange = (e) => {
    setState(e.target.value);
  };

  const handleClick = () => {
    setState('hello');
  };

  return (
    <div>
      <h1>Searching...</h1>
      <label htmlFor='search'>Search: </label>
      <input type='text' id='search' onChange={handleChange} />
      <button onClick={handleClick}>Click Me</button>
      <h2>Searching for: {state.a}</h2>
      <hr />
      <List stories={stories}>hello</List>
    </div>
  );
};

export default App;

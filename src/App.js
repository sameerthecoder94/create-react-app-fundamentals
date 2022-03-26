import React, { useState, useEffect } from 'react';

console.log(React);
console.log('I am starting your application!');

const App = () => {
  const stories = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  // const stories = 'My story';

  console.log('I have just entered into App component!');
  const [state, setState] = useState('');

  useEffect(() => {
    localStorage.setItem('myCat', 'Hello I am from localstorage');
  });

  console.log(state);

  const handleChange = (e) => {
    console.log('I have just entered into handleChange function');
    setState(e.target.value);
    console.log(state);
  };

  const handleClick = () => {
    setState('hello');
  };

  console.log(state);
  console.log('I am entering into JSX!');

  return (
    <div>
      <h1>Searching...</h1>
      <label htmlFor='search'>Search: </label>
      <input type='text' id='search' onChange={handleChange} />

      <button onClick={handleClick}>Click Me</button>

      <h2>Searching for: {state.a}</h2>

      <hr />

      {stories.map((item) => (
        <div key={item.objectID}>
          <h2>{item.title}</h2>
          <p>{item.author}</p>
        </div>
      ))}
    </div>
  );
};

export default App;

# React State

React Props are used to pass information down the component tree; `React state` is used to make applications interactive. We’ll be able to change the application’s appearance by interacting with it.

First, there is a utility function called `useState` that we take from `React` for managing state. The `useState` function is called a hook. There is more than one React hook – related to state management but also other things in React – and you will learn about them throughout the next sections. For now, let’s focus on React’s `useState` **hook**:

```jsx
const App = () => {
  const stories = [ ... ];

  const [searchTerm, setSearchTerm] = React.useState('');

  ...
};
```

React’s `useState` hook takes an initial state as an argument. We’ll use an empty string, and the function will return an array with two values. The first value (`searchTerm`) represents the current state; the second value is a function to update this state (`setSearchTerm`). I will sometimes refer to this function as state updater function.

Destructuring is used to read from an array more concisely. This is array destructuring and its benefits visualized in a nutshell:

```jsx
// basic array definition
const list = ['a', 'b'];

// no array destructuring
const itemOne = list[0];
const itemTwo = list[1];

// array destructuring
const [firstItem, secondItem] = list;
```

In the case of `React`, the React useState hook is a function which returns an array. Take again the following JavaScript example as comparison:

```jsx
function getAlphabet() {
  return ['a', 'b'];
}

// no array destructuring
const itemOne = getAlphabet()[0];
const itemTwo = getAlphabet()[1];

// array destructuring
const [firstItem, secondItem] = getAlphabet();
```

Array destructuring is just a shorthand version of accessing each item one by one. If you express it without the array destructuring in React, it becomes less readable:

```jsx
const App = () => {
  const stories = [ ... ];

  // less readable version without array destructuring
  const searchTermState = React.useState('');
  const searchTerm = searchTermState[0];
  const setSearchTerm = searchTermState[1];

  ...
};
```

The React team chose array destructuring because of its concise syntax and ability to name destructured variables. The following code snippet is an example of array destructuring:

```jsx
const App = () => {
  const stories = [ ... ];


  const [searchTerm, setSearchTerm] = React.useState('');

  ...
};
```

After we initialize the state and have access to the current state and the state updater function, use them to display the current state and update it within the App component’s event handler:

```jsx
const App = () => {
  const stories = [ ... ];

  const [searchTerm, setSearchTerm] = React.useState('');

  const handleChange = event => {

    setSearchTerm(event.target.value);

  };

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={handleChange} />

      <p>
        Searching for <strong>{searchTerm}</strong>.
      </p>
      <hr />

      <List list={stories} />
    </div>
  );
};
```

Look into App.js for implementation of above reference source code.

When the user types into the input field, the input field’s change event is captured by the handler with its current internal value. The handler’s logic uses the state updater function to set the new state. After the new state is set in a component, the component renders again, meaning the component function runs again. The new state becomes the current state and can be displayed in the component’s JSX.
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

---
# React Side-Effects

We’ll make the Search component remember the most recent search interaction, so the application opens it in the browser whenever it restarts.

First, use the local storage of the browser to store the `searchTerm` accompanied by an identifier. Next, use the stored value, if a value exists, to set the initial state of the `searchTerm`. Otherwise, the initial state defaults to our initial state (here “React”) as before:

```jsx
const App = () => {
 ...

 const [searchTerm, setSearchTerm] = React.useState(

   localStorage.getItem('search') || 'React'

 );

 const handleSearch = event => {
   setSearchTerm(event.target.value);

   localStorage.setItem('search', event.target.value);

 };

 ...
);
~~
```

When using the input field and refreshing the browser tab, the browser should remember the latest search term. Using the local storage in React can be seen as a **side-effect** because we interact outside of React’s domain by using the browser’s API.

There is one flaw, though. The handler function should mostly be concerned about updating the state, but now it has a side-effect. If we use the `setSearchTerm` function elsewhere in our application, we will break the feature we implemented because we can’t be sure the local storage will also get updated. Let’s fix this by handling the side-effect at a dedicated place. We’ll use **React’s useEffect** Hook to trigger the side-effect each time the `searchTerm` changes:

```jsx
const App = () => {
 ...

 const [searchTerm, setSearchTerm] = React.useState(
   localStorage.getItem('search') || 'React'
 );

 React.useEffect(() => {
   localStorage.setItem('search', searchTerm);
 }, [searchTerm]);

 const handleSearch = event => {
   setSearchTerm(event.target.value);
 };


 ...
);
```

React’s `useEffect` Hook takes two arguments: The first argument is a function where the side-effect occurs. In our case, the side-effect is when the user types the `searchTerm` into the browser’s local storage. The second argument is a dependency array of variables. If one variable changes, the function for the side-effect is called. In our case, the function is called every time the `searchTerm` changes; it’s called initially when the component renders for the first time.

If the dependency array of React’s `useEffect` is an empty array, the function for the side-effect is only called once, after the component renders for the first time. The hook lets us opt into React’s component lifecycle. It can be triggered when the component is first mounted, but also one of its dependencies are updated.

Using React `useEffect` instead of managing the side-effect in the handler has made the application more robust. Whenever and wherever `searchTerm` is updated via `setSearchTerm`, local storage will always be in sync with it.
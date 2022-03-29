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

---

# useReducer: simple Counter

## 📝 Your Notes

## Background

React's `useState` hook can get you a really long way with React state
management. That said, sometimes you want to separate the state logic from the
components that make the state changes. In addition, if you have multiple
elements of state that typically change together, then having an object that
contains those elements of state can be quite helpful.

This is where `useReducer` comes in really handy. If you're familiar with redux,
then you'll feel pretty comfortable here. If not, then you have less to unlearn
😉

This exercise will take you pretty deep into `useReducer`. Typically, you'll use
`useReducer` with an object of state, but we're going to start by managing a
single number (a `count`). We're doing this to ease you into `useReducer` and
help you learn the difference between the convention and the actual API.

Here's an example of using `useReducer` to manage the value of a name in an
input.

```javascript
function nameReducer(previousName, newName) {
  return newName;
}

const initialNameValue = 'Joe';

function NameInput() {
  const [name, setName] = React.useReducer(nameReducer, initialNameValue);
  const handleChange = (event) => setName(event.target.value);
  return (
    <>
      <label>
        Name: <input defaultValue={name} onChange={handleChange} />
      </label>
      <div>You typed: {name}</div>
    </>
  );
}
```

One important thing to note here is that the reducer (called `nameReducer`
above) is called with two arguments:

1. the current state
2. whatever it is that the dispatch function (called `setName` above) is called
   with. This is often called an "action."

## Exercise

We're going to start off as simple as possible with a `<Counter />` component.
`useReducer` is absolutely overkill for a counter component like ours, but for
now, just focus on making things work with `useReducer`.

📜 Here are two really helpful blog posts comparing `useState` and `useReducer`:

- [Should I useState or useReducer?](https://kentcdodds.com/blog/should-i-usestate-or-usereducer)
- [How to implement useState with useReducer](https://kentcdodds.com/blog/how-to-implement-usestate-with-usereducer)

## Extra Credit

### 1. 💯 accept the step as the action

I want to change things a bit to have this API:

```javascript
const [count, changeCount] = React.useReducer(countReducer, initialCount);
const increment = () => changeCount(step);
```

How would you need to change your reducer to make this work?

This one is just to show that you can pass anything as the action.

### 2. 💯 simulate setState with an object

Remember `this.setState` from class components? If not, lucky you 😉. Either
way, let's see if you can figure out how to make the state updater (`dispatch`
function) behave in a similar way by changing our `state` to an object
(`{count: 0}`) and then calling the state updater with an object which merges
with the current state.

So here's how I want things to look now:

```javascript
const [state, setState] = React.useReducer(countReducer, {
  count: initialCount,
});
const { count } = state;
const increment = () => setState({ count: count + step });
```

How would you need to change the reducer to make this work?

### 3. 💯 simulate setState with an object OR function

`this.setState` from class components can also accept a function. So let's add
support for that with our simulated `setState` function. See if you can figure
out how to make your reducer support both the object as in the last extra credit
as well as a function callback:

```javascript
const [state, setState] = React.useReducer(countReducer, {
  count: initialCount,
});
const { count } = state;
const increment = () =>
  setState((currentState) => ({ count: currentState.count + step }));
```

### 4. 💯 traditional dispatch object with a type and switch statement

Ok, now we can finally see what most people do conventionally (mostly thanks to
redux). Update your reducer so I can do this:

```javascript
const [state, dispatch] = React.useReducer(countReducer, {
  count: initialCount,
});
const { count } = state;
const increment = () => dispatch({ type: 'INCREMENT', step });
```

## 🦉 Other notes

### lazy initialization

This one's not an extra credit, but _sometimes_ lazy initialization can be
useful, so here's how we'd do that with our original hook App:

```javascript
function init(initialStateFromProps) {
  return {
    pokemon: null,
    loading: false,
    error: null,
  };
}

// ...

const [state, dispatch] = React.useReducer(reducer, props.initialState, init);
```

So, if you pass a third function argument to `useReducer`, it passes the second
argument to that function and uses the return value for the initial state.

This could be useful if our `init` function read into localStorage or something
else that we wouldn't want happening every re-render.

### The full `useReducer` API

If you're into TypeScript, here's some type definitions for `useReducer`:

> Thanks to [Trey's blog post](https://levelup.gitconnected.com/db1858d1fb9c)

> Please don't spend too much time reading through this by the way!

```typescript
type Dispatch<A> = (value: A) => void;
type Reducer<S, A> = (prevState: S, action: A) => S;
type ReducerState<R extends Reducer<any, any>> = R extends Reducer<infer S, any>
  ? S
  : never;
type ReducerAction<R extends Reducer<any, any>> = R extends Reducer<
  any,
  infer A
>
  ? A
  : never;

function useReducer<R extends Reducer<any, any>, I>(
  reducer: R,
  initializerArg: I & ReducerState<R>,
  initializer: (arg: I & ReducerState<R>) => ReducerState<R>
): [ReducerState<R>, Dispatch<ReducerAction<R>>];

function useReducer<R extends Reducer<any, any>, I>(
  reducer: R,
  initializerArg: I,
  initializer: (arg: I) => ReducerState<R>
): [ReducerState<R>, Dispatch<ReducerAction<R>>];

function useReducer<R extends Reducer<any, any>>(
  reducer: R,
  initialState: ReducerState<R>,
  initializer?: undefined
): [ReducerState<R>, Dispatch<ReducerAction<R>>];
```

`useReducer` is pretty versatile. The key takeaway here is that while
conventions are useful, understanding the API and its capabilities is more
important.
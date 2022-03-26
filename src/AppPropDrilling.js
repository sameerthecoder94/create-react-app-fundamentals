import { useState } from 'react';
import { data } from './peopleData';

const List = ({ people }) => {
  console.log(people[0].id);
  return (
    <div>
      {people.map((people) => (
        <SinglePerson key={people.id} people={people} />
      ))}
    </div>
  );
};

const SinglePerson = ({ people }) => {
  return <h3>{people.name}</h3>;
};

const App = () => {
  const [people, setpeople] = useState(data);

  return (
    <>
      <section>
        <h1 style={{ color: 'red' }}>Prop Drilling</h1>
        <List people={people} />
      </section>
    </>
  );
};

export default App;

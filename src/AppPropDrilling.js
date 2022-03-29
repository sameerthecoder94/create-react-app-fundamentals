import { useState } from 'react';
import { data } from './peopleData';

const List = ({ people, removePerson }) => {
  return (
    <div>
      {people.map((people) => (
        <SinglePerson
          key={people.id}
          people={people}
          removePerson={removePerson}
        />
      ))}
    </div>
  );
};

const SinglePerson = ({ people, removePerson }) => {
  return (
    <>
      <h3>{people.name}</h3>
      <button onClick={() => removePerson(people.id)}>REMOVE</button>
    </>
  );
};

const AppPropDrilling = () => {
  const [people, setpeople] = useState(data);

  const removePerson = (id) => {
    setpeople((people) =>
      people.filter((person) => person.id !== id)
    );
  };

  return (
    <>
      <section>
        <h1 style={{ color: 'red' }}>Prop Drilling</h1>
        <List people={people} removePerson={removePerson} />
      </section>
    </>
  );
};

export default AppPropDrilling;

import { useState, useEffect } from "react";
import phonebook from "../backend/phonebook";
import "./App.css";

const Notification = ({ message, type }) => {
  return message && <div className={type}>{message}</div>
};

const Filter = ({ filterName, handleFilterByName }) => {
  return (
    <div>
      filter show with{" "}
      <input value={filterName} onChange={handleFilterByName} />
    </div>
  );
};

const PersonForm = ({
  addName,
  newName,
  handleNameChange,
  handlePhoneChange,
  newPhone,
}) => {
  return (
    <form onSubmit={addName}>
      <div>
        name:{" "}
        <input
          value={newName}
          onChange={handleNameChange}
          placeholder="Type here your name please!"
        />
      </div>
      <div>
        number:{" "}
        <input
          value={newPhone}
          onChange={handlePhoneChange}
          placeholder="Type your phone number here"
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ selectedNames, handleDelete }) => {
  return (
    <div>
      {selectedNames.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
          <button onClick={() => handleDelete(person.id)}>delete</button>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filterName, setFilterName] = useState("");
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState("");

  const hook = () => {
    phonebook.getAll().then((response) => {
      setPersons(response);
    });
  };

  useEffect(hook, []);

  const selectedNames = persons.filter((person) => {
    return person.name.toLowerCase().startsWith(filterName.toLowerCase());
  });

  const addName = (event) => {
    event.preventDefault();

    const nameExists = persons.some((person) => person.name === newName);

    const newPerson = {
      name: newName,
      number: newPhone,
    };

    if (nameExists) {
      const message = `${newName} is already added to phonebook, replace the old number with a new one?`;

      if (window.confirm(message)) {
        const person = persons.find((n) => n.name === newName);
        const updatedPhone = { ...person, number: newPhone };

        phonebook.update(person.id, updatedPhone).then((response) => {
          setPersons(
            persons.map((pr) => (pr.id === person.id ? response : pr))
          );
          setNotification(`Updated ${newName}'s phone number successfully!`);
          setNotificationType("success");
          setTimeout(() => {
            setNotification(null);
          }, 5000);
          setNewName("");
          setNewPhone("");
        });
      }
    } else {
      phonebook.create(newPerson).then((response) => {
        setPersons(persons.concat(response));
        setNotification(`Added ${newName}`);
        setNotificationType("success");
        setTimeout(() => {
          setNotification(null);
        }, 5000);
        setNewName("");
        setNewPhone("");
      });
    }
  };
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  };
  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };
  const handleDelete = (id) => {
    const person = persons.find((n) => n.id === id);

    if (window.confirm(`Delete ${person.name} ?`)) {
      phonebook
        .remove(id)
        .then(() => setPersons(persons.filter((pr) => pr != person)))
        .catch((error) => {
          const message = `Information of ${person.name} has already been removed from server`;
          setNotification(message);
          setNotificationType("error");
          setTimeout(() => {
            setNotification(null);
          }, 5000);
          setPersons(persons.filter((p) => p.id !== id));
        });
    } else {
      console.log(`glad you've changed your mind!!!`);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} type={notificationType} />
      <Filter filterName={filterName} handleFilterByName={handleFilterByName} />
      <h2>add a new</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
        newPhone={newPhone}
      />
      <h2>Numbers</h2>
      <Persons selectedNames={selectedNames} handleDelete={handleDelete} />
    </div>
  );
};

export default App;

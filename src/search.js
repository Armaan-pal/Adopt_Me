import React, { useContext, useEffect, useState } from "react";
import useBreedList from "./useBreedList";
import Result from "./Result";
import ThemeContext from "./ThemeContext";
// import Pet from "./Pet";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

function Search() {
  // const [theme] = useContext(ThemeContext)
  let [location, setLocation] = useState("");
  let [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);
  const [theme, setTheme] = useContext(ThemeContext)
  // create a state for pets
  const [breeds] = useBreedList(animal);
  console.log("animal", animal);

  useEffect(() => {
    getAnimal();
  }, []);

  async function getAnimal() {
    const res = await fetch(
      `/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();
    setPets(json.pets);
    // set json.pets into pets state
  }

  return (
    <div className="search-params">
      <h1>Adopt me!</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          getAnimal();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
            
            }}
          >
            <option></option>
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="breeds">
          breeds
          <select
            id="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            onBlur={(e) => setBreed(e.target.value)}
          >
            <option></option>
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="theme">
          Theme
          <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          >
            <option value="peru">Peru</option>
            <option value="darkbule">Dark Blue</option>
            <option value="chartreuse">Chartreuse</option>
            <option value="mediumorchid">Medium Orchid</option>
          </select>
        </label>

        <button style={{ backgroundColor: theme}}>Submit</button>
      </form>

      <Result pets={pets} />

      {/* {pets.map((pet) => (
        <Pet
          name={pets.name}
          animal={pets.animal}
          breed={pets.breed}
          key={pets.id}
          images={pet.images}
        />
      ))} */}

      {/* write map method on pets state and call Pet component to display all pets
      pass name, animal, breed to pet component */}
    </div>
  );
}

export default Search;

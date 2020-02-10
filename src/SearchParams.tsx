import React, { useState, useEffect, useContext } from 'react';
import pet, { ANIMALS, Animal } from '@frontendmasters/pet';

import { RouteComponentProps } from "@reach/router";

import Results from './Results';
import ThemeContext from './ThemeContext';

import useDropdown from './useDropdown';

const SearchParams: React.FC<RouteComponentProps> = () => {
  const [location, setLocation] = useState('Seattle, WA');
  const [breeds, setBreeds] = useState([] as string[]);
  const [animal, AnimalDropdown] = useDropdown('Animal', 'dog', ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown('Breed', '', breeds);
  const [pets, setPets] = useState([] as Animal[]);
  const [theme, setTheme] = useContext(ThemeContext);

  async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal,
    });

    setPets(animals || []);
  }

  useEffect(() => {
    setBreeds([]);
    setBreed('');

    pet
      .breeds(animal)
      .then(({ breeds: apiBreeds }) => {
        const breedStrings = apiBreeds.map(({ name }) => name);
        setBreeds(breedStrings);
      })
      .catch(console.error);
  }, [setBreed, animal]);

  return (
    <div className="search-params">
      <h1>{location}</h1>

      <form
        onSubmit={e => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={e => setLocation(e.target.value)}
          />
        </label>

        <AnimalDropdown />

        <BreedDropdown />

        <label htmlFor="theme">
          Theme
          <select
            value={theme}
            onChange={e => setTheme(e.target.value)}
            onBlur={e => setTheme(e.target.value)}
          >
            <option value="peru">Peru</option>
            <option value="darkblue">Dark Blue</option>
            <option value="mediumorchid">Medium Orchid</option>
            <option value="chartreuse">Chartreuse</option>
          </select>
        </label>

        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>

      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;

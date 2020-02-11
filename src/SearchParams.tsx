import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from '@reach/router';
import pet, { ANIMALS, Animal } from '@frontendmasters/pet';

import { Dispatch } from 'redux';
import { AppState } from './store';

import Results from './Results';

import useDropdown from './useDropdown';

// Actions
import changeTheme from './actionCreators/changeTheme';
import changeLocation from './actionCreators/changeLocation';

const SearchParams: React.FC<RouteComponentProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>> = props => {
  const [breeds, setBreeds] = useState([] as string[]);
  const [pets, setPets] = useState([] as Animal[]);
  const [animal, AnimalDropdown] = useDropdown('Animal', 'dog', ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown('Breed', '', breeds);

  function requestPets() {
    pet.animals({
      location: props.location,
      breed,
      type: animal,
    }).then(({ animals }) => {
      setPets(animals || []);
    });
  }

  useEffect(() => {
    setBreeds([]);
    setBreed('');

    pet
      .breeds(animal)
      .then(({ breeds: apiBreeds }) => {
        console.log(apiBreeds);
        const breedStrings = apiBreeds.map(({ name }) => name);
        setBreeds(breedStrings);
      })
      .catch(console.error);
  }, [setBreed, animal]);

  return (
    <div className="search-params">
      <h1>{props.location}</h1>

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
            value={props.location}
            placeholder="Location"
            onChange={e => props.setLocation(e.target.value)}
          />
        </label>

        <AnimalDropdown />

        <BreedDropdown />

        <label htmlFor="theme">
          Theme
          <select
            value={props.theme}
            onChange={e => props.setTheme(e.target.value)}
            onBlur={e => props.setTheme(e.target.value)}
          >
            <option value="peru">Peru</option>
            <option value="darkblue">Dark Blue</option>
            <option value="mediumorchid">Medium Orchid</option>
            <option value="chartreuse">Chartreuse</option>
          </select>
        </label>

        <button style={{ backgroundColor: props.theme }}>Submit</button>
      </form>

      <Results pets={pets} />
    </div>
  );
};

const mapStateToProps = ({ theme, location }: AppState) => ({
  theme,
  location,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setTheme: (theme: string) => dispatch(changeTheme(theme)),
  setLocation: (location: string) => dispatch(changeLocation(location)),
});

export { SearchParams };
export default connect(mapStateToProps, mapDispatchToProps)(SearchParams);

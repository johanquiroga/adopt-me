import React from 'react';
import Pet from './Pet';

import { Animal } from '@frontendmasters/pet';

interface IProps {
  pets: Animal[];
}

const Results: React.FC<IProps> = ({ pets }) => {
  return (
    <div className="search" data-testid="search-results">
      {pets.length === 0 ? (
        <h1>No Pets Found</h1>
      ) : (
        pets.map(pet => (
          <Pet
            animal={pet.type}
            key={pet.id}
            name={pet.name}
            breed={pet.breeds.primary}
            media={pet.photos}
            location={`${pet.contact.address.city}, ${pet.contact.address.state}`}
            id={pet.id}
          />
        ))
      )}
    </div>
  );
};

export default Results;

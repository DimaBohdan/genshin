import React from 'react';
import TalentIcon from '../TalentIcon';

const HeroConstellations = ({ constellations, TALENT_URL }) => (
  <div className="hero-talents">
    <h3 align="center">Constellations</h3>
    {constellations.map((constellation, index) => (
      <TalentIcon
        key={index}
        iconUrl={`${TALENT_URL}/constellation-${index + 1}`}
        name={constellation.name}
        description={constellation.description}
      />
    ))}
  </div>
);

export default HeroConstellations;

import React from 'react';
import TalentIcon from '../TalentIcon';

const HeroTalents = ({ skillTalents, passiveTalents, TALENT_URL }) => (
  <div className="hero-talents">
    <h3 align="center">Talents</h3>
    <TalentIcon
      iconUrl={`${TALENT_URL}/talent-na`}
      name={skillTalents[0].name}
      description={skillTalents[0].description}
    />
    <TalentIcon
      iconUrl={`${TALENT_URL}/talent-skill`}
      name={skillTalents[1].name}
      description={skillTalents[1].description}
    />
    <TalentIcon
      iconUrl={`${TALENT_URL}/talent-burst`}
      name={skillTalents[2].name}
      description={skillTalents[2].description}
    />
    {passiveTalents.map((talent, index) => (
      <TalentIcon
        key={index}
        iconUrl={`${TALENT_URL}/talent-passive-${index || index + 2}`}
        name={talent.name}
        description={talent.description}
      />
    ))}
  </div>
);

export default HeroTalents;

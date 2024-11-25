import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import '../styles/TalentIcon.css';

const TalentIcon = ({ iconUrl, name, description }) => {
  const calculateWidth = (desc) => {
    const wordCount = desc.split(' ').length;
    if (wordCount <= 10) return '150px';
    if (wordCount <= 20) return '250px';
    if (wordCount <= 40) return '350px';
    return '650px';
  };

  const tooltipWidth = calculateWidth(description);

  return (
    <div className="talent-icon-wrapper">
      <div
        data-tooltip-id={`tooltip-${name}`}
        data-tooltip-content={description}
        className="talent-icon"
      >
        <img src={iconUrl} alt={name} className="talent-icon-image" />
        <h5>{name}</h5>
      </div>
      <Tooltip
        id={`tooltip-${name}`}
        place="top"
        effect="solid"
        className="custom-tooltip"
        style={{ maxWidth: tooltipWidth }}
      />
    </div>
  );
};

export default TalentIcon;

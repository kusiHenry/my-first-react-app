// Import React
import React from 'react';

// Import local image
import profile1 from '../assets/profile1.jpg';

// Reusable component
const ContactCard = ({ name, email, source }) => {
  return (
    <div className="contact-card">
      {/* Conditional: use either local import or external URL */}
      <img
        className="avatar"
        src={source === 'local' ? profile1 : `https://i.pravatar.cc/150?u=${email}`}
        alt={`Avatar of ${name}`}
      />
      <div className="contact-info">
        <h2>{name}</h2>
        <p>{email}</p>
      </div>
    </div>
  );
};

export default ContactCard;

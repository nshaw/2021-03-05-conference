import PropTypes from 'prop-types';

const conferenceType = PropTypes.shape({
  id: PropTypes.number,

  location: PropTypes.string,
  notes: PropTypes.string,
});

export default conferenceType;

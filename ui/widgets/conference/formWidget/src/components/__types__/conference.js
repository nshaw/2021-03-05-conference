import PropTypes from 'prop-types';

export default PropTypes.shape({
  id: PropTypes.number,

  location: PropTypes.string,
  notes: PropTypes.string,
});

export const formValues = PropTypes.shape({
  location: PropTypes.string,
  notes: PropTypes.string,
});

export const formTouched = PropTypes.shape({
  location: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
  notes: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
});

export const formErrors = PropTypes.shape({
  location: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
  notes: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
});

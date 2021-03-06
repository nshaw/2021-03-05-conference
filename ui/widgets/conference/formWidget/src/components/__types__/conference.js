import PropTypes from 'prop-types';

export default PropTypes.shape({
  id: PropTypes.number,

  location: PropTypes.string,
});

export const formValues = PropTypes.shape({
  location: PropTypes.string,
});

export const formTouched = PropTypes.shape({
  location: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
});

export const formErrors = PropTypes.shape({
  location: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
});

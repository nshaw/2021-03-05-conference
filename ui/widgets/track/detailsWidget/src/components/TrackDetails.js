import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';

import trackType from 'components/__types__/track';
import TrackFieldTable from 'components/track-field-table/TrackFieldTable';

const TrackDetails = ({ t, track }) => {
  return (
    <Box>
      <h3>
        {t('common.widgetName', {
          widgetNamePlaceholder: 'Track',
        })}
      </h3>
      <TrackFieldTable track={track} />
    </Box>
  );
};

TrackDetails.propTypes = {
  track: trackType,
  t: PropTypes.func.isRequired,
};

TrackDetails.defaultProps = {
  track: {},
};

export default withTranslation()(TrackDetails);

import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import trackType from 'components/__types__/track';

const TrackFieldTable = ({ t, track }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>{t('common.name')}</TableCell>
        <TableCell>{t('common.value')}</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>
          <span>{t('entities.track.id')}</span>
        </TableCell>
        <TableCell>
          <span>{track.id}</span>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          <span>{t('entities.track.name')}</span>
        </TableCell>
        <TableCell>
          <span>{track.name}</span>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

TrackFieldTable.propTypes = {
  track: trackType,
  t: PropTypes.func.isRequired,
};

TrackFieldTable.defaultProps = {
  track: [],
};

export default withTranslation()(TrackFieldTable);

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import 'components/__mocks__/i18n';
import TrackDetails from 'components/TrackDetails';
import trackMock from 'components/__mocks__/trackMocks';

describe('TrackDetails component', () => {
  test('renders data in details widget', () => {
    const { getByText } = render(<TrackDetails track={trackMock} />);

    expect(getByText('entities.track.name')).toBeInTheDocument();
  });
});

import React from 'react';
import { render, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import 'components/__mocks__/i18n';
import { apiTrackGet } from 'api/track';
import trackApiGetResponseMock from 'components/__mocks__/trackMocks';
import TrackDetailsContainer from 'components/TrackDetailsContainer';

jest.mock('api/track');

jest.mock('auth/withKeycloak', () => {
  const withKeycloak = (Component) => {
    return (props) => (
      <Component
        {...props} // eslint-disable-line react/jsx-props-no-spreading
        keycloak={{
          initialized: true,
          authenticated: true,
        }}
      />
    );
  };

  return withKeycloak;
});

beforeEach(() => {
  apiTrackGet.mockClear();
});

describe('TrackDetailsContainer component', () => {
  test('requests data when component is mounted', async () => {
    apiTrackGet.mockImplementation(() => Promise.resolve(trackApiGetResponseMock));

    render(<TrackDetailsContainer id="1" />);

    await wait(() => {
      expect(apiTrackGet).toHaveBeenCalledTimes(1);
    });
  });

  test('data is shown after mount API call', async () => {
    apiTrackGet.mockImplementation(() => Promise.resolve(trackApiGetResponseMock));

    const { getByText } = render(<TrackDetailsContainer id="1" />);

    await wait(() => {
      expect(apiTrackGet).toHaveBeenCalledTimes(1);
      expect(getByText('entities.track.name')).toBeInTheDocument();
    });
  });

  test('error is shown after failed API call', async () => {
    const onErrorMock = jest.fn();
    apiTrackGet.mockImplementation(() => Promise.reject());

    const { getByText } = render(<TrackDetailsContainer id="1" onError={onErrorMock} />);

    await wait(() => {
      expect(apiTrackGet).toHaveBeenCalledTimes(1);
      expect(onErrorMock).toHaveBeenCalledTimes(1);
      expect(getByText('common.couldNotFetchData')).toBeInTheDocument();
    });
  });
});

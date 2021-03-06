import React from 'react';
import { render, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import trackMocks from 'components/__mocks__/trackMocks';
import { apiTracksGet } from 'api/tracks';
import 'i18n/__mocks__/i18nMock';
import TrackTableContainer from 'components/TrackTableContainer';

jest.mock('api/tracks');

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

jest.mock('components/pagination/withPagination', () => {
  const withPagination = (Component) => {
    return (props) => (
      <Component
        {...props} // eslint-disable-line react/jsx-props-no-spreading
        pagination={{
          onChangeItemsPerPage: () => {},
          onChangeCurrentPage: () => {},
        }}
      />
    );
  };

  return withPagination;
});

describe('TrackTableContainer', () => {
  const errorMessageKey = 'error.dataLoading';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls API', async () => {
    apiTracksGet.mockImplementation(() => Promise.resolve({ tracks: trackMocks, count: 2 }));
    const { queryByText } = render(<TrackTableContainer />);

    await wait(() => {
      expect(apiTracksGet).toHaveBeenCalledTimes(1);
      expect(queryByText(errorMessageKey)).not.toBeInTheDocument();
    });
  });

  it('shows an error if the API call is not successful', async () => {
    apiTracksGet.mockImplementation(() => {
      throw new Error();
    });
    const { getByText } = render(<TrackTableContainer />);

    wait(() => {
      expect(apiTracksGet).toHaveBeenCalledTimes(1);
      expect(getByText(errorMessageKey)).toBeInTheDocument();
    });
  });
});

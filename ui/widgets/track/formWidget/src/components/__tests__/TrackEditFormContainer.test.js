import React from 'react';
import { fireEvent, render, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { apiTrackGet, apiTrackPut } from 'api/tracks';
import TrackEditFormContainer from 'components/TrackEditFormContainer';
import 'i18n/__mocks__/i18nMock';
import trackMock from 'components/__mocks__/trackMocks';

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

describe('TrackEditFormContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const errorMessageKey = 'error.dataLoading';
  const successMessageKey = 'common.dataSaved';

  const onErrorMock = jest.fn();
  const onUpdateMock = jest.fn();

  it('loads data', async () => {
    apiTrackGet.mockImplementation(() => Promise.resolve(trackMock));
    const { queryByText } = render(
      <TrackEditFormContainer id="1" onError={onErrorMock} onUpdate={onUpdateMock} />
    );

    await wait(() => {
      expect(apiTrackGet).toHaveBeenCalledTimes(1);
      expect(apiTrackGet).toHaveBeenCalledWith('', '1');
      expect(queryByText(errorMessageKey)).not.toBeInTheDocument();
      expect(onErrorMock).toHaveBeenCalledTimes(0);
    });
  }, 7000);

  it('saves data', async () => {
    apiTrackGet.mockImplementation(() => Promise.resolve(trackMock));
    apiTrackPut.mockImplementation(() => Promise.resolve(trackMock));

    const { findByTestId, queryByText } = render(
      <TrackEditFormContainer id="1" onError={onErrorMock} onUpdate={onUpdateMock} />
    );

    const saveButton = await findByTestId('submit-btn');

    fireEvent.click(saveButton);

    await wait(() => {
      expect(apiTrackPut).toHaveBeenCalledTimes(1);
      expect(apiTrackPut).toHaveBeenCalledWith('', trackMock);
      expect(queryByText(successMessageKey)).toBeInTheDocument();
      expect(onErrorMock).toHaveBeenCalledTimes(0);
      expect(queryByText(errorMessageKey)).not.toBeInTheDocument();
    });
  }, 7000);

  it('shows an error if data is not successfully loaded', async () => {
    apiTrackGet.mockImplementation(() => Promise.reject());
    const { queryByText } = render(
      <TrackEditFormContainer id="1" onError={onErrorMock} onUpdate={onUpdateMock} />
    );

    await wait(() => {
      expect(apiTrackGet).toHaveBeenCalledTimes(1);
      expect(apiTrackGet).toHaveBeenCalledWith('', '1');
      expect(onErrorMock).toHaveBeenCalledTimes(1);
      expect(queryByText(errorMessageKey)).toBeInTheDocument();
      expect(queryByText(successMessageKey)).not.toBeInTheDocument();
    });
  }, 7000);

  it('shows an error if data is not successfully saved', async () => {
    apiTrackGet.mockImplementation(() => Promise.resolve(trackMock));
    apiTrackPut.mockImplementation(() => Promise.reject());
    const { findByTestId, getByText } = render(
      <TrackEditFormContainer id="1" onError={onErrorMock} />
    );

    const saveButton = await findByTestId('submit-btn');

    fireEvent.click(saveButton);

    await wait(() => {
      expect(apiTrackGet).toHaveBeenCalledTimes(1);
      expect(apiTrackGet).toHaveBeenCalledWith('', '1');

      expect(apiTrackPut).toHaveBeenCalledTimes(1);
      expect(apiTrackPut).toHaveBeenCalledWith('', trackMock);

      expect(onErrorMock).toHaveBeenCalledTimes(1);
      expect(getByText(errorMessageKey)).toBeInTheDocument();
    });
  }, 7000);
});

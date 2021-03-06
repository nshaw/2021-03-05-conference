import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, wait } from '@testing-library/react';
import 'i18n/__mocks__/i18nMock';
import trackMock from 'components/__mocks__/trackMocks';
import TrackForm from 'components/TrackForm';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme();

describe('Track Form', () => {
  it('shows form', () => {
    const { getByLabelText } = render(
      <ThemeProvider theme={theme}>
        <TrackForm track={trackMock} />
      </ThemeProvider>
    );
    expect(getByLabelText('entities.track.name').value).toBe(
      'Numquam ab excepturi rem autem aspernatur distinctio nihil et. Placeat quibusdam neque perspiciatis labore ea quo. Quod exercitationem adipisci dolorem maxime sed mollitia aspernatur. Quis modi in maiores et non et.'
    );
  });

  it('submits form', async () => {
    const handleSubmit = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <TrackForm track={trackMock} onSubmit={handleSubmit} />
      </ThemeProvider>
    );

    const form = getByTestId('track-form');
    fireEvent.submit(form);

    await wait(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
  });
});

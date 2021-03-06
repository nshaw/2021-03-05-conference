import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import 'components/__mocks__/i18n';
import trackMocks from 'components/__mocks__/trackMocks';
import TrackTable from 'components/TrackTable';

describe('TrackTable', () => {
  it('shows tracks', () => {
    const { getByText } = render(<TrackTable items={trackMocks} />);
    expect(
      getByText(
        'Numquam ab excepturi rem autem aspernatur distinctio nihil et. Placeat quibusdam neque perspiciatis labore ea quo. Quod exercitationem adipisci dolorem maxime sed mollitia aspernatur. Quis modi in maiores et non et.'
      )
    ).toBeInTheDocument();
    expect(
      getByText(
        'Est temporibus aut tempore. Magnam nobis ut cum. Officia repudiandae iure quod rem non ut. Quos veniam cupiditate dignissimos.'
      )
    ).toBeInTheDocument();
  });

  it('shows no tracks message', () => {
    const { queryByText } = render(<TrackTable items={[]} />);
    expect(
      queryByText(
        'Numquam ab excepturi rem autem aspernatur distinctio nihil et. Placeat quibusdam neque perspiciatis labore ea quo. Quod exercitationem adipisci dolorem maxime sed mollitia aspernatur. Quis modi in maiores et non et.'
      )
    ).not.toBeInTheDocument();
    expect(
      queryByText(
        'Est temporibus aut tempore. Magnam nobis ut cum. Officia repudiandae iure quod rem non ut. Quos veniam cupiditate dignissimos.'
      )
    ).not.toBeInTheDocument();

    expect(queryByText('entities.track.noItems')).toBeInTheDocument();
  });

  it('calls onSelect when the user clicks a table row', () => {
    const onSelectMock = jest.fn();
    const { getByText } = render(<TrackTable items={trackMocks} onSelect={onSelectMock} />);
    fireEvent.click(
      getByText(
        'Numquam ab excepturi rem autem aspernatur distinctio nihil et. Placeat quibusdam neque perspiciatis labore ea quo. Quod exercitationem adipisci dolorem maxime sed mollitia aspernatur. Quis modi in maiores et non et.'
      )
    );
    expect(onSelectMock).toHaveBeenCalledTimes(1);
  });
});

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import 'components/__mocks__/i18n';
import conferenceMocks from 'components/__mocks__/conferenceMocks';
import ConferenceTable from 'components/ConferenceTable';

describe('ConferenceTable', () => {
  it('shows conferences', () => {
    const { getByText } = render(<ConferenceTable items={conferenceMocks} />);
    expect(
      getByText(
        'Est dolores eos enim consectetur eius perferendis quo consequatur. Voluptas enim corrupti eius saepe incidunt error. Est eum reiciendis voluptas rerum. Cum non consequatur excepturi et consequatur.'
      )
    ).toBeInTheDocument();
    expect(
      getByText(
        'Labore natus maxime aut amet praesentium ex. Ex enim praesentium praesentium voluptatem esse quidem expedita modi autem. Dolores et consequatur voluptate fuga minus consectetur et possimus. Ipsa accusantium sed. Ut ab a omnis vel deserunt doloribus nihil odio.'
      )
    ).toBeInTheDocument();
  });

  it('shows no conferences message', () => {
    const { queryByText } = render(<ConferenceTable items={[]} />);
    expect(
      queryByText(
        'Est dolores eos enim consectetur eius perferendis quo consequatur. Voluptas enim corrupti eius saepe incidunt error. Est eum reiciendis voluptas rerum. Cum non consequatur excepturi et consequatur.'
      )
    ).not.toBeInTheDocument();
    expect(
      queryByText(
        'Labore natus maxime aut amet praesentium ex. Ex enim praesentium praesentium voluptatem esse quidem expedita modi autem. Dolores et consequatur voluptate fuga minus consectetur et possimus. Ipsa accusantium sed. Ut ab a omnis vel deserunt doloribus nihil odio.'
      )
    ).not.toBeInTheDocument();

    expect(queryByText('entities.conference.noItems')).toBeInTheDocument();
  });

  it('calls onSelect when the user clicks a table row', () => {
    const onSelectMock = jest.fn();
    const { getByText } = render(
      <ConferenceTable items={conferenceMocks} onSelect={onSelectMock} />
    );
    fireEvent.click(
      getByText(
        'Est dolores eos enim consectetur eius perferendis quo consequatur. Voluptas enim corrupti eius saepe incidunt error. Est eum reiciendis voluptas rerum. Cum non consequatur excepturi et consequatur.'
      )
    );
    expect(onSelectMock).toHaveBeenCalledTimes(1);
  });
});

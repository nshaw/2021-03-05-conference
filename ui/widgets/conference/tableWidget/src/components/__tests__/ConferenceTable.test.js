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
        'Illum est velit explicabo sapiente laudantium qui animi facere. Eveniet tempora laboriosam magnam aut voluptatum officiis praesentium ut. Corrupti temporibus ipsam nemo quos reiciendis a. Est voluptas illum voluptatem sit et ratione. Qui nihil placeat at nam. Nihil nisi et enim et.'
      )
    ).toBeInTheDocument();
    expect(
      getByText(
        'Et ut aperiam enim illo at veniam dolorum. Sequi reprehenderit ab ea sed laborum. Labore sapiente est quo ratione sunt. Aperiam minima blanditiis est esse exercitationem qui. Dolore blanditiis dicta dolores. Nam similique odit nostrum et cumque et dolore voluptatibus.'
      )
    ).toBeInTheDocument();
  });

  it('shows no conferences message', () => {
    const { queryByText } = render(<ConferenceTable items={[]} />);
    expect(
      queryByText(
        'Illum est velit explicabo sapiente laudantium qui animi facere. Eveniet tempora laboriosam magnam aut voluptatum officiis praesentium ut. Corrupti temporibus ipsam nemo quos reiciendis a. Est voluptas illum voluptatem sit et ratione. Qui nihil placeat at nam. Nihil nisi et enim et.'
      )
    ).not.toBeInTheDocument();
    expect(
      queryByText(
        'Et ut aperiam enim illo at veniam dolorum. Sequi reprehenderit ab ea sed laborum. Labore sapiente est quo ratione sunt. Aperiam minima blanditiis est esse exercitationem qui. Dolore blanditiis dicta dolores. Nam similique odit nostrum et cumque et dolore voluptatibus.'
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
        'Illum est velit explicabo sapiente laudantium qui animi facere. Eveniet tempora laboriosam magnam aut voluptatum officiis praesentium ut. Corrupti temporibus ipsam nemo quos reiciendis a. Est voluptas illum voluptatem sit et ratione. Qui nihil placeat at nam. Nihil nisi et enim et.'
      )
    );
    expect(onSelectMock).toHaveBeenCalledTimes(1);
  });
});

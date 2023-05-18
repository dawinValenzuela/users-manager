import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import UsersTable from '@src/components/UsersTable';
import mockUsers from '@src/utils/mocks/users';

const mockUsersExpect = [
  {
    id: 1,
    name: 'Leanne',
    lastName: 'Graham',
    company: 'Romaguera-Crona',
    email: 'Sincere@april.biz',
  },
  {
    id: 2,
    name: 'Ervin',
    lastName: 'Howell',
    company: 'Deckow-Crist',
    email: 'Shanna@melissa.tv',
  },
];

describe('UsersTable', () => {
  it('renders table with header and rows', () => {
    const { getByText } = render(<UsersTable users={mockUsers} />);

    expect(getByText('Active Users')).toBeInTheDocument();
    expect(getByText('#')).toBeInTheDocument();
    expect(getByText('Nombre')).toBeInTheDocument();
    expect(getByText('Apellido')).toBeInTheDocument();
    expect(getByText('Empresa')).toBeInTheDocument();
    expect(getByText('Email')).toBeInTheDocument();

    const firstUser = mockUsersExpect[0];

    expect(getByText(firstUser.id)).toBeInTheDocument();
    expect(getByText(firstUser.name)).toBeInTheDocument();
    expect(getByText(firstUser.lastName)).toBeInTheDocument();
    expect(getByText(firstUser.company)).toBeInTheDocument();
    expect(getByText(firstUser.email)).toBeInTheDocument();

    const secondUser = mockUsersExpect[1];

    expect(getByText(secondUser.id)).toBeInTheDocument();
    expect(getByText(secondUser.name)).toBeInTheDocument();
    expect(getByText(secondUser.lastName)).toBeInTheDocument();
    expect(getByText(secondUser.company)).toBeInTheDocument();
    expect(getByText(secondUser.email)).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', () => {
    const onEdit = jest.fn();
    const { getAllByTestId } = render(
      <UsersTable users={mockUsers} onEdit={onEdit} />
    );

    fireEvent.click(getAllByTestId('edit-button')[0]);
    expect(onEdit).toHaveBeenCalledWith(1);

    fireEvent.click(getAllByTestId('edit-button')[1]);
    expect(onEdit).toHaveBeenCalledWith(2);
  });

  it('calls onDelete when delete button is clicked', () => {
    const onDelete = jest.fn();
    const { getAllByTestId } = render(
      <UsersTable users={mockUsers} onDelete={onDelete} />
    );

    fireEvent.click(getAllByTestId('delete-button')[0]);
    expect(onDelete).toHaveBeenCalledWith(1);

    fireEvent.click(getAllByTestId('delete-button')[1]);
    expect(onDelete).toHaveBeenCalledWith(2);
  });
});

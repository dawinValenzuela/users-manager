import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CreateUserButton from '@src/components/CreateUserButton';

describe('CreateUserButton', () => {
  it('calls onClick prop when clicked', () => {
    const onClick = jest.fn();
    const { getByText } = render(<CreateUserButton onClick={onClick} />);
    fireEvent.click(getByText('New User'));
    expect(onClick).toHaveBeenCalled();
  });

  it('displays "New User" text', () => {
    const { getByText } = render(<CreateUserButton />);
    expect(getByText('New User')).toBeInTheDocument();
  });
});

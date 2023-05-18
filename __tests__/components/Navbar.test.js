import { render, screen, fireEvent } from '@testing-library/react';
import { signOut, useSession } from 'next-auth/react';
import Navbar from '@src/components/Navbar';

jest.mock('next-auth/react', () => ({
  signOut: jest.fn(),
  useSession: jest.fn(),
}));

describe('Navbar component', () => {
  //before each test, we will mock the useSession hook to return null
  beforeEach(() => {
    useSession.mockReturnValue({
      data: null,
    });
  });

  test('should render Users Manager text', () => {
    render(<Navbar />);
    const headingText = screen.getByText(/users manager/i);
    expect(headingText).toBeInTheDocument();
  });

  test('should render Sign out button when user is signed in', () => {
    useSession.mockReturnValue({
      data: {
        user: {
          email: 'test@example.com',
        },
      },
    });
    render(<Navbar />);
    const signOutButton = screen.getByRole('button');
    expect(signOutButton).toBeInTheDocument();
  });

  test('should call signOut function when Sign out button is clicked', () => {
    useSession.mockReturnValue({
      data: {
        user: {
          email: 'test@example.com',
        },
      },
    });
    render(<Navbar />);
    const signOutButton = screen.getByRole('button');
    fireEvent.click(signOutButton);
    expect(signOut).toHaveBeenCalled();
  });
});

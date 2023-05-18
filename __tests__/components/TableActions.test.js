import { render, fireEvent } from '@testing-library/react';
import TableActions from '@src/components/TableActions';

describe('TableActions component', () => {
  test('should call onEdit when edit button is clicked', () => {
    const onEdit = jest.fn();
    const { getByTestId } = render(<TableActions onEdit={onEdit} />);
    const editButton = getByTestId('edit-button');
    fireEvent.click(editButton);
    expect(onEdit).toHaveBeenCalled();
  });

  test('should call onDelete when delete button is clicked', () => {
    const onDelete = jest.fn();
    const { getByTestId } = render(<TableActions onDelete={onDelete} />);
    const deleteButton = getByTestId('delete-button');
    fireEvent.click(deleteButton);
    expect(onDelete).toHaveBeenCalled();
  });
});

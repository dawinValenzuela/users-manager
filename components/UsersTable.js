import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from '@chakra-ui/react';
import TableActions from '@src/components/TableActions';

function UsersTable({ users, onEdit, onDelete }) {
  return (
    <Table variant='striped' colorScheme='teal'>
      <TableCaption>Active Users</TableCaption>
      <Thead>
        <Tr>
          <Th>#</Th>
          <Th>Nombre</Th>
          <Th>Apellido</Th>
          <Th>Empresa</Th>
          <Th>Email</Th>
          <Th />
        </Tr>
      </Thead>
      <Tbody>
        {users?.map((user, key) => (
          <Tr key={user.id}>
            <Td>{key + 1}</Td>
            <Td>{user.name}</Td>
            <Td>{user.lastName}</Td>
            <Td>{user.company}</Td>
            <Td>{user.email}</Td>
            <Td>
              {
                <TableActions
                  onEdit={() => onEdit && onEdit(user.id)}
                  onDelete={() => onDelete && onDelete(user.id)}
                />
              }
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default UsersTable;

//Show all users in a table using chakra-ui
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from '@chakra-ui/react';

export default function Users({ users }) {
  return (
    <Table variant='striped' colorScheme='teal'>
      <TableCaption>Active Users</TableCaption>
      <Thead>
        <Tr>
          <Th>Nombre</Th>
          <Th>Apellido</Th>
          <Th>Empresa</Th>
          <Th>Email</Th>
        </Tr>
      </Thead>
      <Tbody>
        {users?.map((user) => (
          <Tr key={user.id}>
            <Td>{user.name}</Td>
            <Td>{user.lastName}</Td>
            <Td>{user.company}</Td>
            <Td>{user.email}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch('http://localhost:3000/api/admin_list_active_users');
  const users = await res.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      users,
    },
  };
}

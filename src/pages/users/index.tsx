import { Box, Icon, Button,Text, Flex, Heading, Table, Thead, Th, Checkbox, Tr, Tbody, Td, useBreakpointValue, Spinner } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect } from "react";
import { RiAddLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { useQuery } from 'react-query';

export default function UserList() {
  const { data, isLoading, error } = useQuery('users', async () => {
    const response =  await fetch('http://localhost:3000/api/users')
    const data = await response.json();
    const users = data.users.map(user => ({ ...user, createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', { 
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })}))
    return users;
  }, {
    staleTime: 1000 * 5,
  }) 

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  useEffect(() => {
    fetch('http://localhost:3000/api/users')
    .then(response => response.json())
    .then(data => console.log(data)
    )
  }, [])
  

  return(
    <Box>
      <Header />
      <Flex w="100%" maxWidth={1480} my="6" mx="auto" px="6">
        <Sidebar />
        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">Lista de Usuários</Heading>
            <Link href="/users/create" passHref>
              <Button 
                as="a" 
                size="sm" 
                fontSize="sm" 
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar novo
              </Button>
            </Link>
          </Flex>
          { isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao carregar dados dos usuarios</Text>
            </Flex>
          ): (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color="gray.300" w="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Usuário</Th>
                    {isWideVersion && <Th>Data de cadastro</Th> }
                  </Tr>
                </Thead>
                <Tbody>
                  {data.map(({ id, name, email, createdAt}) => {
                    return (
                      <Tr key={id}>
                        <Td px={["4", "4", "6"]}>
                          <Checkbox colorScheme="pink" />
                        </Td>
                        <Td>
                          <Box>
                            <Text fontWeight="bold">{name}</Text>
                            <Text fontSize="sm" color="gray.300">{email}</Text>
                          </Box>
                        </Td>
                        {isWideVersion && <Td>{createdAt}</Td>}
                      </Tr>
                    )
                  }) }
                </Tbody>
              </Table>
              <Pagination />
            </>
          )}
        </Box>
      </Flex>  
    </Box>
  )
}
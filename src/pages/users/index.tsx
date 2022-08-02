import { Box, Stack, Icon, Button,Text, Flex, Heading, Table, Thead, Th, Checkbox, Tr, Tbody, Td, useBreakpointValue, Spinner, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { RiAddLine, RiFileDownloadLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { api } from "../../services/api";
import { useUser } from "../../services/hooks/useUser";
import { queryClient } from "../../services/queryClient";

export default function UserList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, error, refetch } = useUser(page)
  
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  function refetchQuery() {
    refetch();
  };

  async function handlePrefetchUser(userId:  string) {
    await queryClient.prefetchQuery(['user', userId], async () => {
      const response = await api.get(`users/${userId}`);
      
      return response.data; 
    }, {
      staleTime: 1000 * 60 * 10,
    })
  }

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
            <Heading size="lg" fontWeight="normal">
              Lista de Usuários
              { !isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" />}
            </Heading>
            <Stack direction="row" spacing="6">
              <Button 
                  as="a" 
                  size="sm" 
                  fontSize="sm" 
                  colorScheme="pink"
                  leftIcon={<Icon as={RiFileDownloadLine} fontSize="20" />}
                  onClick={refetchQuery}
                >
                  Atualizar Lista
              </Button>
              <NextLink href="/users/create" passHref>
                <Button 
                  as="a" 
                  size="sm" 
                  fontSize="sm" 
                  colorScheme="pink"
                  leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                >
                  Criar novo
                </Button>
              </NextLink>
            </Stack>
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
                  {data.users.map(({ id, name, email, createdAt }) => {
                    return (
                      <Tr key={id}>
                        <Td px={["4", "4", "6"]}>
                          <Checkbox colorScheme="pink" />
                        </Td>
                        <Td>
                          <Box>
                            <Link color="purple.400" onMouseEnter={() => handlePrefetchUser(id)}>
                              <Text fontWeight="bold">{name}</Text>
                            </Link>
                            <Text fontSize="sm" color="gray.300">{email}</Text>
                          </Box>
                        </Td>
                        {isWideVersion && <Td>{createdAt}</Td>}
                      </Tr>
                    )
                  }) }
                </Tbody>
              </Table>
              <Pagination
                totalCountOfRegisters={data.totoalCount}
                currentPage={page}
                onChangePage={setPage} 
              />
            </>
          )}
        </Box>
      </Flex>  
    </Box>
  )
}
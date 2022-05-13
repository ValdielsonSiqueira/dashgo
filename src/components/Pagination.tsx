import { Box, Button, Stack } from "@chakra-ui/react";

export function Pagination(){
  return(
    <Stack
      direction="row"
      mt="8"
      spacing="6"
      justify="space-between"
      align="center"
    >
      <Box>
        <strong>0</strong> -  <strong>10</strong> de <strong>100</strong>
      </Box>
      <Stack direction="row" spacing="2">
        <Button
          disabled
          size="sm"
          fontSize="xs"
          colorScheme="pink"
          _disabled={{
            bg: 'pink.500',
            cursor: 'default',
          }}
        >
          1
        </Button>
        <Button
          disabled
          size="sm"
          fontSize="xs"
          bg="gray.700"
          _hover={{ 
            bg: 'gray.500',
          }}
        >
          2
        </Button>
        <Button
          disabled
          size="sm"
          fontSize="xs"
          bg="gray.700"
          _hover={{ 
            bg: 'gray.500',
          }}
        >
          3
        </Button>
        <Button
          disabled
          size="sm"
          fontSize="xs"
          bg="gray.700"
          _hover={{ 
            bg: 'gray.500',
          }}
        >
          4
        </Button>
        <Button
          disabled
          size="sm"
          fontSize="xs"
          bg="gray.700"
          _hover={{ 
            bg: 'gray.500',
          }}
        >
          5
        </Button>  
      </Stack>
    </Stack>
  );
}
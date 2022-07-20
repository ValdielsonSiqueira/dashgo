import { Button } from "@chakra-ui/react"

interface PaginationItemProps {
  number: number;
  isCurrent?: boolean;
  onChangePage: (page: number) => void;
}

export function PaginationItem({ isCurrent = false, number, onChangePage }: PaginationItemProps) {
  if(isCurrent) {
    return (
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
        {number}
      </Button>
    ) 
  }

  return (
    <Button
      size="sm"
      fontSize="xs"
      bg="gray.700"
      _hover={{ 
        bg: 'gray.500',
      }}
      onClick={() => onChangePage(number)}
    >
      {number}
    </Button>
  )
}
import { Button } from "@chakra-ui/react"

interface PaginationItemProps {
  number: number;
  isCurrent?: boolean
}

export function PaginationItem({ isCurrent = false, number }: PaginationItemProps) {
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
      disabled
      size="sm"
      fontSize="xs"
      bg="gray.700"
      _hover={{ 
        bg: 'gray.500',
      }}
    >
      {number}
    </Button>
  )
}
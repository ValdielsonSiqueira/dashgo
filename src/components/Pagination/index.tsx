import { Box, Stack, Text } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
  totalCountOfRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onChangePage: (page: number) => void;
}

const siblingsCount = 1;

function generatePageArray(from: number, to: number) {
  return [ ...new Array(to - from)]
  .map((_, index) => from + index + 1)
  .filter(page => page => 0)
}

export function Pagination({ totalCountOfRegisters, registersPerPage = 10, currentPage = 1, onChangePage }: PaginationProps){
  const lastPage = Math.floor(totalCountOfRegisters / registersPerPage);

  const previousPages = currentPage > 1
    ? generatePageArray(currentPage - 1 - siblingsCount, currentPage - 1)
    : [] 

  const nextPage = currentPage < lastPage
    ? generatePageArray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
    : []

  return(
    <Stack
      direction={["column", "row"]}
      mt="8"
      spacing="6"
      justify="space-between"
      align="center"
    >
      <Box>
        <strong>0</strong> -  <strong>10</strong> de <strong>100</strong>
      </Box>
      <Stack direction="row" spacing="2">
        {currentPage > (1 + siblingsCount) && (
          <>
            <PaginationItem onChangePage={onChangePage} number={1} />
            { currentPage > (2 + siblingsCount) && (
              <Text color="gray.300" width="8" textAlign="center">...</Text>
            )}
          </>
        )}
        {previousPages.length > 0 && previousPages.map(page => 
          (<PaginationItem onChangePage={onChangePage} key={page} number={page} />
        ))}
        <PaginationItem onChangePage={onChangePage} number={currentPage} isCurrent/>  
        {nextPage.length > 0 && nextPage.map(page => 
          (<PaginationItem onChangePage={onChangePage} key={page} number={page} />
        ))}
        {(currentPage + siblingsCount) < lastPage && (
          <>
            { (currentPage + 1 +  siblingsCount) < lastPage && (
              <Text color="gray.300" width="8" textAlign="center">...</Text>
            )}
            <PaginationItem onChangePage={onChangePage} number={lastPage} />
          </>
        )}  
      </Stack>
    </Stack>
  );
}
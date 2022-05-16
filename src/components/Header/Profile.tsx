import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      { showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Valdi Siqueira</Text>
          <Text color="gray.300" fontSize="small">
          valdielson.silva@gmail.com
          </Text>
        </Box>
      )}
      <Avatar size="md" name="Valdi Siqueira" src="https://avatars.githubusercontent.com/u/35588487?v=4" />
    </Flex>
  );
}
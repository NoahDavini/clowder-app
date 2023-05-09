import { SearchIcon } from "@chakra-ui/icons";
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import React from "react";

type SearchInputProps = {
  user?: User | null;
};

const SearchInput: React.FC<SearchInputProps> = ({ user }) => {
  return (
    <Flex flexGrow={1} maxWidth={user ? "auto" : "600px"} mr={2} align="center">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="brand.100" mb={1} />
        </InputLeftElement>
        <Input
          variant="filled"
          placeholder="Search Clowder"
          fontSize="10pt"
          _placeholder={{ color: "brand.100" }}
          _hover={{
            border: "1px solid",
            borderColor: "brand.100",
          }}
          _focus={{
            outline: "none",
            border: "1px solid",
            borderColor: "brand.100",
          }}
          height="34px"
          bg="brand.400"
          border="1px solid"
          borderRadius="5px"
          borderColor="brand.400"
          focusBorderColor="none"
        />
      </InputGroup>
    </Flex>
  );
};
export default SearchInput;

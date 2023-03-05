import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";

const Navbar: React.FC = () => {
  return (
    <Flex
      bg="white"
      //backgroundImage="/images/screenBg.jpg"
      height="44px"
      padding="6px 12px"
    >
      <Flex align="center">
        <Image src="/images/tvpartyLogo.png" height="40px" />
        <Image
          src="/images/tvpartyTextBlack.png"
          height="24px"
          display={{ base: "none", md: "unset" }}
          ml={4}
          mr={4}
        />
      </Flex>
      {/* <Directory /> */}
      <SearchInput />
      <RightContent />
    </Flex>
  );
};
export default Navbar;

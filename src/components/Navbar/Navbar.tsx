import { defaultMenuItem } from "@/src/atoms/directoryMenuAtom";
import { auth } from "@/src/firebase/clientApp";
import useDirectory from "@/src/hooks/useDirectory";
import { Flex, Icon, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Directory from "./Directory/Directory";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";
import { GiCat } from "react-icons/gi";

const Navbar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const { onSelectMenuItem } = useDirectory();
  return (
    <Flex
      bg="brand.400"
      height="44px"
      padding="6px 12px"
      justify={{ md: "space-between" }}
    >
      <Flex
        align="center"
        width={{ base: "40px", md: "auto" }}
        mr={2}
        cursor="pointer"
        onClick={() => onSelectMenuItem(defaultMenuItem)}
      >
        <Icon as={GiCat} fontSize={40} color="brand.100" />
        {/* <Image src="/images/noun-cat-1160971.png" height="40px" mt={2} mr={2} /> */}
        <Flex display={{ base: "none", md: "flex" }}>
          <Text fontSize="16pt" fontWeight={700} color="brand.100">
            clowder
          </Text>
        </Flex>
      </Flex>
      {user && <Directory />}
      <SearchInput user={user} />
      <RightContent user={user} />
    </Flex>
  );
};
export default Navbar;

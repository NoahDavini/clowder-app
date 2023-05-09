import { authModalState } from "@/src/atoms/authModalAtom";
import { auth } from "@/src/firebase/clientApp";
import useDirectory from "@/src/hooks/useDirectory";
import { Flex, Icon, Input, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { RxImage, RxLink2 } from "react-icons/rx";
import { useSetRecoilState } from "recoil";

const CreatePostLink: React.FC = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);
  const { toggleMenuOpen } = useDirectory();

  const onClick = () => {
    if (!user) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }
    const { communityId } = router.query;

    if (communityId) {
      router.push(`${communityId}/submit`);
      return;
    }

    // Open directory menu
    toggleMenuOpen();
  };

  return (
    <Flex
      justify="space-evenly"
      align="center"
      bg="brand.400"
      height="56px"
      borderRadius={4}
      border="1px solid"
      p={2}
      mb={4}
    >
      <Input
        placeholder="Create Post"
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
        bg="brand.400"
        borderColor="brand.400"
        height="36px"
        borderRadius={4}
        mr={4}
        onClick={onClick}
      />
      <Icon
        as={RxImage}
        fontSize={26}
        mr={4}
        color="brand.100"
        border="1px solid"
        borderColor="brand.400"
        borderRadius={4}
        _hover={{ borderColor: "brand.100" }}
        cursor="pointer"
      />
      <Icon
        as={RxLink2}
        fontSize={24}
        color="brand.100"
        border="1px solid"
        borderColor="brand.400"
        borderRadius={4}
        _hover={{ borderColor: "brand.100" }}
        cursor="pointer"
      />
    </Flex>
  );
};
export default CreatePostLink;

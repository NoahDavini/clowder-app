import { Flex, Icon } from "@chakra-ui/react";
import { BsArrowUpRightCircle, BsChatDots, BsPlusLg } from "react-icons/bs";
import {
  IoFilterCircleOutline,
  IoNotificationsOutline,
  IoVideocamOutline,
} from "react-icons/io5";

const Icons: React.FC = () => {
  return (
    <Flex>
      <Flex
        display={{ base: "none", md: "flex" }}
        align="center"
        borderRight="1px solid"
        borderColor="brand.100"
      >
        <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor="pointer"
          border="1px solid"
          borderColor="brand.400"
          borderRadius={4}
          _hover={{ borderColor: "brand.100" }}
        >
          <Icon as={BsArrowUpRightCircle} fontSize={20} color="brand.100" />
        </Flex>
        <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor="pointer"
          border="1px solid"
          borderColor="brand.400"
          borderRadius={4}
          _hover={{ borderColor: "brand.100" }}
        >
          <Icon as={IoFilterCircleOutline} fontSize={22} color="brand.100" />
        </Flex>
        <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor="pointer"
          border="1px solid"
          borderColor="brand.400"
          borderRadius={4}
          _hover={{ borderColor: "brand.100" }}
        >
          <Icon as={IoVideocamOutline} fontSize={22} color="brand.100" />
        </Flex>
      </Flex>
      <>
        <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor="pointer"
          border="1px solid"
          borderColor="brand.400"
          borderRadius={4}
          _hover={{ borderColor: "brand.100" }}
        >
          <Icon as={BsChatDots} fontSize={20} color="brand.100" />
        </Flex>
        <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor="pointer"
          border="1px solid"
          borderColor="brand.400"
          borderRadius={4}
          _hover={{ borderColor: "brand.100" }}
        >
          <Icon as={IoNotificationsOutline} fontSize={20} color="brand.100" />
        </Flex>
        <Flex
          display={{ base: "none", md: "flex" }}
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor="pointer"
          border="1px solid"
          borderColor="brand.400"
          borderRadius={4}
          _hover={{ borderColor: "brand.100" }}
        >
          <Icon as={BsPlusLg} fontSize={22} color="brand.100" />
        </Flex>
      </>
    </Flex>
  );
};
export default Icons;

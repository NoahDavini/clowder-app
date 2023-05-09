import { Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { TabItem } from "./NewPostForm";

type PostTabItemProps = {
  item: TabItem;
  selected: boolean;
  setSelectedTab: (value: string) => void;
};

const PostTabItem: React.FC<PostTabItemProps> = ({
  item,
  selected,
  setSelectedTab,
}) => {
  return (
    <Flex
      justify="center"
      align="center"
      flexGrow={1}
      p="14px 0px"
      cursor="pointer"
      fontWeight={700}
      borderRadius={selected ? "4px 4px 0px 0px" : "0px"}
      _hover={
        !selected
          ? {
              bg: "brand.300",
              color: "brand.100",
              borderRadius: "4px 4px 0px 0px",
            }
          : {}
      }
      color={selected ? "brand.400" : "brand.100"}
      bg={selected ? "brand.100" : "brand.400"}
      onClick={() => setSelectedTab(item.title)}
    >
      <Flex align="center" height="20px" mr={2}>
        <Icon as={item.icon} />
      </Flex>
      <Text fontSize="10pt">{item.title}</Text>
    </Flex>
  );
};
export default PostTabItem;

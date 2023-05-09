import { Box, Flex, Icon, MenuItem, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import CreateCommunityModal from "../../Modal/CreateCommunity/CreateCommunityModal";
import { useRecoilValue } from "recoil";
import { communityState } from "@/src/atoms/communitiesAtom";
import MenuListItem from "./MenuListItem";
import { BsCCircleFill, BsPlusLg } from "react-icons/bs";

type CommunitiesProps = {};

const Communities: React.FC<CommunitiesProps> = () => {
  const [open, setOpen] = useState(false);
  const mySnippets = useRecoilValue(communityState).mySnippets;

  return (
    <Stack bg="brand.100">
      <CreateCommunityModal open={open} handleClose={() => setOpen(false)} />
      <Box mt={3} mb={4} bg="brand.100">
        <Text pl={3} mb={1} fontSize="7pt" fontWeight={500} color="brand.500">
          MODERATING
        </Text>
        {mySnippets
          .filter((snippet) => snippet.isModerator)
          .map((snippet) => (
            <MenuListItem
              key={snippet.communityId}
              icon={BsCCircleFill}
              displayText={`${snippet.communityId}`}
              link={`/communities/${snippet.communityId}`}
              iconColor="brand.200"
              imageURL={snippet.imageURL}
            />
          ))}
      </Box>
      <Box mt={3} mb={4}>
        <Text pl={3} mb={1} fontSize="7pt" fontWeight={500} color="brand.500">
          MY COMMUNITIES
        </Text>
        <MenuItem
          width="100%"
          fontSize="10pt"
          bg="brand.100"
          _hover={{ bg: "gray.100" }}
          onClick={() => setOpen(true)}
        >
          <Flex align="center">
            <Icon as={BsPlusLg} fontSize={20} mr={2} />
            Create Community
          </Flex>
        </MenuItem>
        {mySnippets.map((snippet) => (
          <MenuListItem
            key={snippet.communityId}
            icon={BsCCircleFill}
            displayText={`${snippet.communityId}`}
            link={`/communities/${snippet.communityId}`}
            iconColor="brand.300"
            imageURL={snippet.imageURL}
          />
        ))}
      </Box>
    </Stack>
  );
};
export default Communities;

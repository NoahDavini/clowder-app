import { Community } from "@/src/atoms/communitiesAtom";
import { Box, Button, Flex, Icon, Image, Text } from "@chakra-ui/react";
import React from "react";
import useCommunityData from "@/src/hooks/useCommunityData";
import { SiYarn } from "react-icons/si";

type HeaderProps = {
  communityData: Community;
};

const Header: React.FC<HeaderProps> = ({ communityData }) => {
  const { communityStateValue, onJoinOrLeaveCommunity, loading } =
    useCommunityData();
  const isJoined = !!communityStateValue.mySnippets.find(
    (item) => item.communityId === communityData.id
  );

  return (
    <Flex direction="column" width="100%" height="146px">
      <Box height="50%" bg="brand.400" />
      <Flex justify="center" bg="brand.100" flexGrow={1}>
        <Flex width="95%" maxWidth="860px">
          {communityStateValue.currentCommunity?.imageURL ? (
            <Image
              src={communityStateValue.currentCommunity.imageURL}
              borderRadius="full"
              boxSize="66px"
              alt="Community Image"
              position="relative"
              top={-3}
              color="brand.400"
              border="4px solid white"
            />
          ) : (
            <Icon
              as={SiYarn}
              fontSize={64}
              position="relative"
              top={-3}
              color="brand.400"
              border="4px solid white"
              borderColor="brand.100"
              borderRadius="50%"
            />
          )}
          <Flex padding="10px 16px">
            <Flex direction="column" mr={6}>
              <Text fontWeight={800} fontSize="16pt">
                {communityData.id}
              </Text>
            </Flex>
            <Button
              variant={isJoined ? "outline" : "solid"}
              height="30px"
              pr={6}
              pl={6}
              isLoading={loading}
              onClick={() => onJoinOrLeaveCommunity(communityData, isJoined)}
            >
              {isJoined ? "Joined" : "Join"}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Header;

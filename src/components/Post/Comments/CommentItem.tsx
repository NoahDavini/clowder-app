import { Box, Flex, Icon, Spinner, Stack, Text } from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import moment from "moment";
import React from "react";
import {
  IoArrowDownCircleOutline,
  IoArrowUpCircleOutline,
  IoPersonCircle,
} from "react-icons/io5";

export type Comment = {
  id: string;
  creatorId: string;
  creatorDisplayText: string;
  communityId: string;
  postId: string;
  postTitle: string;
  text: string;
  createdAt: Timestamp;
};

type CommentItemProps = {
  comment: Comment;
  onDeleteComment: (comment: Comment) => void;
  loadingDelete: boolean;
  userId: string;
};

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  onDeleteComment,
  loadingDelete,
  userId,
}) => {
  return (
    <Flex>
      <Box mr={2}>
        <Icon as={IoPersonCircle} fontSize={30} color="brand.400" />
      </Box>
      <Stack spacing={1}>
        <Stack direction="row" align="center" spacing={2} fontSize="8pt">
          <Text fontSize="9pt" fontWeight={700}>
            {comment.creatorDisplayText}
          </Text>
          <Text color="brand.300">
            {moment(new Date(comment.createdAt.seconds * 1000)).fromNow()}
          </Text>
          {loadingDelete && <Spinner size="sm" />}
        </Stack>
        <Text fontSize="10pt">{comment.text}</Text>
        <Stack
          direction="row"
          align="center"
          cursor="pointer"
          color="brand.300"
        >
          <Icon as={IoArrowUpCircleOutline} _hover={{ color: "brand.400" }} />
          <Icon as={IoArrowDownCircleOutline} _hover={{ color: "brand.400" }} />
          {userId === comment.creatorId && (
            <>
              <Text
                fontSize="9pt"
                _hover={{ color: "brand.400" }}
                /*onClick={() => onEditComment(comment)}*/
              >
                Edit
              </Text>
              <Text
                fontSize="9pt"
                _hover={{ color: "brand.400" }}
                onClick={() => onDeleteComment(comment)}
              >
                Delete
              </Text>
            </>
          )}
        </Stack>
      </Stack>
    </Flex>
  );
};
export default CommentItem;

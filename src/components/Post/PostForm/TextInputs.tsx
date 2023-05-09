import { Button, Flex, Input, Stack, Textarea } from "@chakra-ui/react";
import React from "react";

type TextInputsProps = {
  textInputs: {
    title: string;
    body: string;
  };
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleCreatePost: () => void;
  loading: boolean;
};

const TextInputs: React.FC<TextInputsProps> = ({
  textInputs,
  onChange,
  handleCreatePost,
  loading,
}) => {
  return (
    <Stack spacing={3} width="100%">
      <Input
        name="title"
        value={textInputs.title}
        onChange={onChange}
        fontSize="10pt"
        borderRadius={4}
        placeholder="Title"
        _placeholder={{ color: "brand.300" }}
        _hover={{
          borderColor: "brand.400",
        }}
        _focus={{
          outline: "none",
          borderColor: "brand.400",
        }}
        bg="brand.100"
        border="1px solid"
        borderColor="brand.100"
        focusBorderColor="none"
      />
      <Textarea
        name="body"
        value={textInputs.body}
        resize="none"
        onChange={onChange}
        fontSize="10pt"
        borderRadius={4}
        height="100px"
        placeholder="Text (optional)"
        _placeholder={{ color: "brand.300" }}
        _hover={{
          borderColor: "brand.400",
        }}
        _focus={{
          outline: "none",
          borderColor: "brand.400",
        }}
        bg="brand.100"
        border="1px solid"
        borderColor="brand.100"
      />
      <Flex justify="flex-end">
        <Button
          height="34px"
          padding="0px 30px"
          disabled={!textInputs.title}
          isLoading={loading}
          onClick={handleCreatePost}
        >
          Post
        </Button>
      </Flex>
    </Stack>
  );
};
export default TextInputs;

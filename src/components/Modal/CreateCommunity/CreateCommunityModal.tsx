import { auth, firestore } from "@/src/firebase/clientApp";
import useDirectory from "@/src/hooks/useDirectory";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";

type CreateCommunityModalProps = {
  open: boolean;
  handleClose: () => void;
};

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
  open,
  handleClose,
}) => {
  const [user] = useAuthState(auth);
  const [communityName, setCommunityName] = useState("");
  const [charsRemaining, setCharsRemaining] = useState(21);
  const [communityType, setCommunityType] = useState("public");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { toggleMenuOpen } = useDirectory();
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 21) return;

    setCommunityName(event.target.value);
    //recalculate how many chars we have left in the name
    setCharsRemaining(21 - event.target.value.length);
  };

  const onCommunityTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCommunityType(event.target.name);
  };

  const handleCreateCommunity = async () => {
    if (error) setError("");
    // Validate the community
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (format.test(communityName) || communityName.length < 3) {
      setError(
        "Community names must be between 3 and 21 characters, and can only contain letters, numbers, or underscores."
      );
      return;
    }

    setLoading(true);

    try {
      const communityDocRef = doc(firestore, "communities", communityName);

      await runTransaction(firestore, async (transaction) => {
        // Check if community exists in db
        const communityDoc = await transaction.get(communityDocRef);
        if (communityDoc.exists()) {
          throw new Error(
            `Sorry, r/${communityName} is already taken. Try another.`
          );
        }

        // Create community
        transaction.set(communityDocRef, {
          creatorId: user?.uid,
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
          privacyType: communityType,
        });

        // Create communitySnippet on user
        transaction.set(
          doc(firestore, `users/${user?.uid}/communitySnippets`, communityName),
          {
            communityId: communityName,
            isModerator: true,
          }
        );
      });

      handleClose();
      toggleMenuOpen();

      router.push(`communities/${communityName}`);
    } catch (error: any) {
      console.log("handleCreateCommunity error", error);
      setError(error.message);
    }

    handleClose();
    router.push(`r/${communityName}`);
    setLoading(false);
  };

  return (
    <>
      <Modal isOpen={open} onClose={handleClose} size="lg">
        <ModalOverlay backdropFilter="blur(5px)" />
        <ModalContent borderRadius="10px">
          <ModalHeader
            display="flex"
            flexDirection="column"
            fontSize={15}
            padding={3}
            borderRadius="10px 10px 0px 0px"
            color="brand.100"
            bg="brand.400"
          >
            Create a community
          </ModalHeader>
          <Box pl={3} pr={3} bg="brand.100">
            <Divider />
            <ModalCloseButton
              color="brand.100"
              border="1px solid"
              borderColor="brand.400"
              _hover={{
                border: "1px solid",
                borderColor: "brand.100",
              }}
              _focus={{
                outline: "none",
                border: "1px solid",
                borderColor: "brand.100",
              }}
            />
            <ModalBody display="flex" flexDirection="column" padding="10px 0px">
              <Input
                value={communityName}
                placeholder="Community name"
                size="md"
                color="brand.400"
                border="1px solid"
                borderRadius="5px"
                borderColor="brand.100"
                focusBorderColor="none"
                _placeholder={{ color: "brand.300" }}
                _hover={{
                  border: "1px solid",
                  borderColor: "brand.400",
                }}
                _focus={{
                  outline: "none",
                  border: "1px solid",
                  borderColor: "brand.400",
                }}
                onChange={handleChange}
              />
              <Text fontSize="10pt" color="brand.300">
                {charsRemaining} Characters remaining
              </Text>
              <Text fontSize="9pt" color="brand.200" pt={1}>
                {error}
              </Text>
              <Box mt={4} mb={4}>
                <Text fontWeight={600} fontSize={15} color="brand.400">
                  Community Type
                </Text>
                {/* checkbox */}
                <Stack spacing={2}>
                  <Checkbox
                    name="public"
                    isChecked={communityType === "public"}
                    onChange={onCommunityTypeChange}
                    colorScheme="red"
                    iconColor="brand.100"
                  >
                    <Flex align="center">
                      <Icon as={BsFillPersonFill} color="brand.400" mr={2} />
                      <Text fontSize="11pt" color="brand.400" mr={2}>
                        Public
                      </Text>
                      <Text fontSize="9pt" color="brand.300" pt={0.5}>
                        Anyone can view, post, and comment to this community
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="restricted"
                    isChecked={communityType === "restricted"}
                    onChange={onCommunityTypeChange}
                    colorScheme="red"
                    iconColor="brand.100"
                  >
                    <Flex align="center">
                      <Icon as={BsFillEyeFill} color="brand.400" mr={2} />
                      <Text fontSize="11pt" color="brand.400" mr={2}>
                        Restriced
                      </Text>
                      <Text fontSize="9pt" color="brand.300" pt={0.5}>
                        Anyone can view this community, but only approved users
                        can post
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="private"
                    isChecked={communityType === "private"}
                    onChange={onCommunityTypeChange}
                    colorScheme="red"
                    iconColor="brand.100"
                  >
                    <Flex align="center">
                      <Icon as={HiLockClosed} color="brand.400" mr={2} />
                      <Text fontSize="11pt" color="brand.400" mr={2}>
                        Private
                      </Text>
                      <Text fontSize="9pt" color="brand.300" pt={0.5}>
                        Only approved users can view and submit to this
                        community
                      </Text>
                    </Flex>
                  </Checkbox>
                </Stack>
              </Box>
            </ModalBody>
          </Box>
          <ModalFooter bg="brand.100" borderRadius="0px 0px 10px 10px">
            <Button
              variant="outline"
              height="30px"
              mr={3}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              height="30px"
              onClick={handleCreateCommunity}
              isLoading={loading}
            >
              Create Community
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default CreateCommunityModal;

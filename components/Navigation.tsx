import NextLink from "next/link";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../lib/context";
import { firestore } from "../lib/firebase";
import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import { createUser } from "../utils/db";
import {
  auth,
  googleAuthProvider,
  facebookAuthProvider,
} from "../lib/firebase";
import {
  Button,
  Stack,
  IconButton,
  Heading,
  useColorModeValue,
  Spacer,
  Flex,
  useColorMode,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Link,
} from "@chakra-ui/react";

export default function Navigation({ dashboard }) {
  const [newProfileImg, newProfileImgSet] = useState("");

  const { user, username } = useContext(UserContext);

  const toast = useToast();
  const router = useRouter();

  const { colorMode, toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const text = useColorModeValue("dark", "light");

  const query = firestore.collection("users").doc(user?.uid);

  useEffect(() => {
    query.get().then((doc) => {
      doc.data()?.profileImg && newProfileImgSet(doc.data().profileImg);
    });
  }, [user]);

  const signInWithGoogle = () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then((response) => handleUser(response.user));
  };

  const signInWithFacebook = () => {
    auth
      .signInWithPopup(facebookAuthProvider)
      .then((response) => handleUser(response.user));
  };

  const signOut = () => {
    auth.signOut();

    toast({
      title: "See ya!.",
      description: "",
      status: "error",
      duration: 2000,
      isClosable: false,
    });

    router.push("/");
  };

  const handleUser = (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser);

      createUser(user.uid, user);
      return user;
    } else {
      return false;
    }
  };

  const formatUser = (user) => {
    return {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      provider: user.providerData[0].providerId,
      photoUrl: user.photoURL,
    };
  };

  return (
    <Stack
      direction={dashboard && ['row', 'row', 'column', 'column']}
      justify={"center"}
      px={{ base: "3", md: "6", lg: "3" }}
      py={3}
      color={"white"}
      bg={"gray.700"}
      shadow="0 0 10px 0 rgba(0,0,0, 0.035);"
      alignItems="center"
      borderBottomColor={["red", "green"]}
    >
      <NextLink href={"/"} passHref>
        <Link>
          <Heading textStyle={"logo"}>{dashboard ? 'C' : 'Cordly'}</Heading>
        </Link>
      </NextLink>

      <Spacer />

      <IconButton
        size="md"
        onClick={toggleColorMode}
        // mr={2}
        // mb={{ base: "0", md: "3" }}
        isRound
        icon={<SwitchIcon />}
        fontSize="lg"
        colorScheme="whiteAlpha"
        color="current"
        aria-label={`Switch to ${text} mode`}
      />

      {!user && (
        <Stack direction="column">
          <NextLink href={"/signin"} passHref>
            <Link>
              <Button colorScheme={"blue"} variant="solid">
                Sign In
              </Button>
            </Link>
          </NextLink>
        </Stack>
      )}
      {user && (
        <Stack direction="column" alignItems={"center"}>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Menu button"
              icon={
                <Avatar
                  name={user.displayName}
                  src={newProfileImg || user.photoURL}
                  size="sm"
                />
              }
              size="xs"
              variant="outline"
            />
            <MenuList>
              <MenuItem>
                <NextLink href={"/dashboard"} passHref>
                  <Link>Dashboard</Link>
                </NextLink>
              </MenuItem>

              <MenuDivider />

              <MenuItem onClick={signOut}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Stack>
      )}
    </Stack>
  );
}

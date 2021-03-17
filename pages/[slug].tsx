import { useState, useEffect } from "react";
import { firestore, increment } from "../lib/firebase";
import dynamic from "next/dynamic";
import NextLink from "next/link";
import { GetServerSideProps } from "next";
import { CheckCircleIcon } from "@chakra-ui/icons";
import getYouTubeID from "get-youtube-id";
import EmojiAnimation from "../components/EmojiAnimation";
import {
  Tab,
  Tabs,
  TabPanel,
  TabPanels,
  TabList,
  VStack,
  Text,
  Box,
  Flex,
  Heading,
  Stack,
  HStack,
  Wrap,
  WrapItem,
  TagLabel,
  Tag,
  useColorModeValue,
  Button,
  Link,
  Avatar,
  Badge,
} from "@chakra-ui/react";

const ReactPlayer = dynamic(() => import("react-player/lazy"));

export default function User({ data }) {

  const query = firestore.collection("users");

  useEffect(() => {
    query
      .doc(data.uid)
      .update({ pageVisit: increment(1) });

    // query.where("uid", "==", user.uid).onSnapshot((snapshot) => {
    //   let changes = snapshot.docChanges();
    //   changes.forEach((i) => {
    //     urlsSet(i.doc.data().urls);
    //     setUrlItems(i.doc.data().urls);
    //   });
    // });
  }, []);

  return (
    <Flex
      as={"section"}
      minH={"100vh"}
      direction={"column"}
      alignItems={"center"}
      alignSelf="center"
    >
      <Flex
        backgroundImage={`url("${data.coverImg}")`}
        backgroundRepeat={"no-repeat"}
        backgroundSize={"cover"}
        h={["30vh", "60vh", "60vh", "25vh"]}
        w={["100vw", "100vw", "100vw", "lg"]}
        pos="absolute"
        zIndex={-5}
        _after={{
          display: "inline-block",
          content: '""',
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(to top, #1a202c 0%, rgba(255, 255, 255, 0) 100%)",
        }}
      />
      <ProfileAvatar data={data} />
      <Tabs
        defaultIndex={0}
        isFitted
        align="center"
        variant="line"
        colorScheme="green"
        w={["xs", "md", "lg", "lg"]}
      >
        <TabList>
          <Tab>LINKS</Tab>
          <Tab>BIO</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ProfileLinks data={data} />
          </TabPanel>
          <TabPanel>
            <ProfileBio data={data} />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Text
        fontSize={"xs"}
        color={"green.300"}
        textStyle={"logo"}
        mt="auto"
        textAlign="center"
      >
        CORDLY
        </Text>
      <EmojiAnimation slug={true} emoji={data.emoji} />
    </Flex>
  );
}

const ProfileBio = ({ data }) => {
  let location = "";
  let skills = "";
  let styles = "";
  let influences = "";
  let education = "";
  let collaboration = "";
  let teaching = "";

  location = data?.bio?.location;
  skills = data?.bio?.skills;
  styles = data?.bio?.styles;
  influences = data?.bio?.influences;
  education = data?.bio?.education;
  collaboration = data?.bio?.collaboration;
  teaching = data?.bio?.teaching;

  return (
    <Stack>
      <Text
        color={"purple.400"}
        fontWeight={600}
        fontSize={"sm"}
        bg={useColorModeValue("purple.50", "purple.900")}
        p={2}
        alignSelf={"center"}
        rounded={"md"}
      >
        📍 {location}
      </Text>

      <Wrap justify={"center"}>
        <WrapItem>
          <Text
            color={"gray.400"}
            fontWeight={600}
            fontSize={"sm"}
            bg={useColorModeValue("gray.50", "gray.900")}
            p={2}
            alignSelf={"center"}
            rounded={"md"}
          >
            {education === "academic" ? "🎓 Academic" : "🥁 Self-studied"}
          </Text>
        </WrapItem>

        {collaboration && (
          <WrapItem>
            <Text
              color={"gray.400"}
              fontWeight={600}
              fontSize={"sm"}
              bg={useColorModeValue("gray.50", "gray.900")}
              p={2}
              alignSelf={"center"}
              rounded={"md"}
            >
              🟢 Collaboration
            </Text>
          </WrapItem>
        )}

        {teaching && (
          <WrapItem>
            <Text
              color={"gray.400"}
              fontWeight={600}
              fontSize={"sm"}
              bg={useColorModeValue("gray.50", "gray.900")}
              p={2}
              alignSelf={"center"}
              rounded={"md"}
            >
              🟣 Teaching
            </Text>
          </WrapItem>
        )}
      </Wrap>

      <Wrap justify={"center"}>
        {skills
          ?.split(",")
          .slice(0, 5)
          .map((location, i) => (
            <WrapItem key={i}>
              <Text
                color={"gray.400"}
                fontWeight={600}
                fontSize={"sm"}
                bg={useColorModeValue("gray.50", "gray.900")}
                p={3}
                alignSelf={"flex-start"}
                rounded={"md"}
              >
                💯 {location}
              </Text>
            </WrapItem>
          ))}
      </Wrap>

      <Wrap justify={"center"}>
        {styles
          ?.split(",")
          .slice(0, 3)
          .map((style, i) => (
            <WrapItem key={i}>
              <Text
                key={i}
                color={"gray.400"}
                fontWeight={600}
                fontSize={"sm"}
                bg={useColorModeValue("gray.50", "gray.900")}
                p={3}
                alignSelf={"flex-start"}
                rounded={"md"}
              >
                🎵 {style}
              </Text>
            </WrapItem>
          ))}
      </Wrap>

      <Wrap justify={"center"}>
        {influences
          ?.split(",")
          .slice(0, 5)
          .map((influence, i) => (
            <WrapItem key={i}>
              <Text
                key={i}
                color={"gray.400"}
                fontWeight={600}
                fontSize={"sm"}
                bg={useColorModeValue("gray.50", "gray.900")}
                p={3}
                alignSelf={"center"}
                rounded={"md"}
              >
                🔥 {influence}
              </Text>
            </WrapItem>
          ))}
      </Wrap>
    </Stack>
  );
};

const ProfileLinks = ({ data }) => {
  const [row, setRow] = useState(undefined);

  const { urls } = data;

  const links = urls?.map((url, i) => {
    const title = Object.keys(url)[0].toString();
    const urlAddress = Object.values(url)[0].toString();

    const isYoutube = getYouTubeID(urlAddress);

    const clickHandle = (url) => (row === url ? setRow(undefined) : setRow(url));

    return (
      <Box key={i} onClick={() => clickHandle(url)}>
        <Button
          w={"100%"}
          size="lg"
          // py={8}
          color={"gray.400"}
          bg={useColorModeValue("gray.50", "gray.900")}
        >
          <NextLink href={urlAddress} passHref>
            <Link isExternal>{title}</Link>
          </NextLink>
        </Button>
        {isYoutube && (
          <ReactPlayer
            url={urlAddress}
            style={{ display: row === url ? "block" : "none" }}
            width={"100%"}
          />
        )}
      </Box>
    );
  });

  return (
    <Flex align="center" alignItems="stretch" direction="column">
      <VStack spacing={3} align="stretch">
        {links}
      </VStack>
    </Flex>
  );
};

const ProfileAvatar = ({ data }) => {
  const { profileImg, email, photoUrl, username, name, bio } = data;

  return (
    <Flex direction={"column"} justify={"center"} alignItems="center">
      <Avatar mt={36} size="xl" name={name} src={profileImg || photoUrl} />

      <Flex
        mt={2}
        mb={3}
        justifyContent="center"
        alignItems="center"
        flexDir="row"
      >
        <Heading as={"h3"} size={"md"}>
          {bio?.stagename}
        </Heading>
        <Badge variant="solid" colorScheme="green" ml={1}>
          PRO
        </Badge>
      </Flex>

      <Heading
        textStyle={"cordlyUrl"}
        fontWeight={"light"}
        letterSpacing={2}
        textAlign={"center"}
        as={"h6"}
        size={"sm"}
      >
        @{username || email.split("@")?.[0]}
      </Heading>
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let data;

  const query = await firestore.collection("users").get();

  query.docs.map((doc) => {
    if ((doc.data().username || doc.data().uid.slice(0, 5)) === params.slug) {
      data = doc.data();
    }
  });

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data },
  };
};

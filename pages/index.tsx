import { firestore } from "../lib/firebase";
import SvgListeningMusic from "../components/SvgListeningMusic";
import PhonePrevHome from "../components/PhonePrevHome";
import SvgHeart from "../components/SvgHeart";
import SvgShape1 from "../components/SvgShape1";
import SvgLying from "../components/SvgLying";
import Footer from "../components/Footer";
import FaqAccordion from "../components/FaqAccordion";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  Heading,
  Flex,
  Container,
  SimpleGrid,
  Text,
  Button,
  Avatar,
  Box,
  Tag,
  TagLabel,
  Badge,
  Tooltip,
} from "@chakra-ui/react";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
    paritialVisibilityGutter: 20,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
    paritialVisibilityGutter: 30,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    paritialVisibilityGutter: 35,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    paritialVisibilityGutter: 50,
  },
};

const responsivePhonePrev = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export default function Home({ musicians }) {

  return (
    <Container h="100vh" maxW="container.xl">
      <SimpleGrid columns={[1, 2]}>
        <Flex
          flexDirection={"column"}
          alignItems={["center", "start"]}
          justifyContent="center"
        // my={10}
        >
          <SvgShape1 style={{ position: 'absolute', zIndex: -1 }} />
          <Flex
            visibility={['hidden', 'visible']}
            position='absolute'
            mb={96}
            ml={-10}
            zIndex={-1}
            w={48}
          >
            <SvgHeart />
          </Flex>
          <Heading mt={[8, 0]} mb={4} textAlign={["center", "left"]} as="h2" size="3xl">
            All in one home for musicians
          </Heading>

          <Heading
            textAlign={["center", "left"]}
            fontSize="larger  "
            maxW={"container.md"}
            fontWeight="thin"
          >
            Let your fans know all about you in one single page
          </Heading>
          <Button mt="8" size="lg" variant="solid" colorScheme="green">
            Sign up for free
          </Button>
        </Flex>


        <Flex flexDirection='column' justify='center' alignItems='center'>
          <PhonePrevHome />
        </Flex>

      </SimpleGrid>

      <SimpleGrid columns={[1, 4]} my={[42, 36]} spacing={10}>

        <Flex flexDir='column'>

          <Heading as="h3" size="md" textAlign='center'>🔗</Heading>
          <Heading as="h2" size="lg" textAlign='center'>Links</Heading>
          <Text textAlign='center'>
            Present all your social links within a well design page
          </Text>
        </Flex>

        <Flex flexDir='column'>

          <Heading as="h3" size="md" textAlign='center'>✍️</Heading>
          <Heading as="h2" size="lg" textAlign='center'>Bio</Heading>
          <Text textAlign='center'>
            Less is more. All things your fan need to know about you
          </Text>
        </Flex>

        <Flex flexDir='column'>
          <Tag alignSelf='center' size={'sm'} variant="solid" colorScheme="green">
            PRO
            </Tag>
          <Heading as="h3" size="lg" textAlign='center'>
            Badge
          </Heading>
          <Text textAlign='center'>
            Less is more. All things your fan need to know about you
          </Text>
        </Flex>

        <Flex flexDir='column'>
          <Heading as="h3" size="md" textAlign='center'>👁️</Heading>

          <Heading as="h3" size="lg" textAlign='center'>Visits</Heading>
          <Text textAlign='center'>
            Less is more. All things your fan need to know about you
          </Text>
        </Flex>

      </SimpleGrid>

      <Flex
        flexDirection={["column-reverse", "row"]}
        justifyContent='space-between'
        alignItems="center"
        my={[12, 32]}
      >
        <Flex w={[96, 'xl']} mt={[10, 0]}>
          <SvgListeningMusic />
        </Flex>
        <FaqAccordion />
      </Flex>

      <SimpleGrid columns={[1, 2]}>
        <Flex flexDir="column" my={10}  >
          <Heading >Pro Community</Heading>
          <Text maxW={"md"}>
            From fatntastic composer to a extrodinary piano player. The vraiety
            of profiles are vast.
          </Text>
        </Flex>

        <Carousel
          ssr={false}
          infinite={true}
          showDots={false}
          autoPlay
          autoPlaySpeed={9000}
          partialVisbile
          responsive={responsive}
          removeArrowOnDeviceType={["tablet", "mobile"]}
        >
          {Array.from(Array(10).keys()).map((i) => (
            <Box key={i}>
              <Flex
                rounded="lg"
                alignItems="flex-end"
                maxW="250px"
                minH="150px"
                p={"4"}
                backgroundRepeat={"no-repeat"}
                backgroundSize={"cover"}
                backgroundImage={`url('https://is.gd/oRxkiI')`}
              >

              </Flex>

              <Flex
                flexDir="row"
                justifyContent='space-between'
                mt={2}
                maxW="250px"
              >
                <Flex flexDir='column'>
                  <Tag size="lg" colorScheme="green" borderRadius="full">
                    <Avatar mr={1} size="xs" name="Ryan Florence" src="https://bit.ly/ryan-florence" />
                    <TagLabel>@jack</TagLabel>
                  </Tag>

                  <Text fontWeight='bold' mt={6}>Pianist 🎹</Text>
                </Flex>
                <Text >Jack Johnson</Text>

              </Flex>
            </Box>
          ))}
        </Carousel>
      </SimpleGrid>

      <Flex mb={10} mt={28} flexDir="column" alignItems='center' alignContent="center" justify="center">
        <Heading textAlign="center">Join Our Platform</Heading>
        <Text textAlign="center" maxW={"md"} m="auto">
          From fatntastic composer to a extrodinary piano player.
          </Text>
        <Button mt={5} variant="outline" w={'xs'} colorScheme="green" size="lg">Join Now</Button>
        <Flex w={[72, 'xs']}>
          <SvgLying />

        </Flex>
      </Flex>

      <Footer />

      {/* <Musician data={musicians} /> */}
    </Container >
  );
}

export async function getServerSideProps() {
  const query = firestore.collection("users");

  const musicians = (await query.get()).docs.map((doc) => doc.data());

  return {
    props: { musicians },
  };
}

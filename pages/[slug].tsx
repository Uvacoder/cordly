import NextLink from 'next/link'
import { GetServerSideProps } from 'next'
import { firestore } from '../lib/firebase'
import { CheckCircleIcon } from '@chakra-ui/icons'
import AvatarSVG from '../components/AvatarSVG'
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
} from '@chakra-ui/react'

export default function User({ data }) {
    return (
        <Flex
            as={'section'}
            minH={'100vh'}
            direction={'column'}
            alignItems={'center'}
            alignSelf='center'
        >
            <Flex
                backgroundImage={'url("https://is.gd/jkE1Df")'}
                backgroundRepeat={'no-repeat'}
                backgroundPosition={'top'}
                backgroundSize={'cover'}
                height={['30vh', '40vh', '30vh', '25vh']}
                w={['100vw', '100vw', '40vw', '30vw']}
                pos='absolute'
                zIndex={-1}
                _after={{
                    display: 'inline-block',
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to top, #1a202c 0%, rgba(255, 255, 255, 0) 100%)'

                }}
            />

            <ProfileAvatar data={data} />

            <Tabs
                defaultIndex={1}
                isFitted
                align="center"
                variant="line"
                colorScheme="green"
                w='sm'
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
            <Text fontSize={'xs'} color={'green.300'} textStyle={'logo'} mt="auto" textAlign="center">
                CORDLY
            </Text>
        </Flex>
    )
}

const ProfileBio = ({ data }) => {
    let location = ''
    let skills = ''
    let influences = ''
    let education = ''
    let collaboration = ''

    location = data?.bio?.location
    skills = data?.bio?.skills
    influences = data?.bio?.influences
    education = data?.bio?.education
    collaboration = data?.bio?.collaboration

    return (
        <Stack>
            <Text
                color={'purple.400'}
                fontWeight={600}
                fontSize={'sm'}
                bg={useColorModeValue('purple.50', 'purple.900')}
                p={2}
                alignSelf={'center'}
                rounded={'md'}
            >
                📍 {location}
            </Text>

            <Wrap justify={'center'}>
                <WrapItem>
                    <Text
                        color={'gray.400'}
                        fontWeight={600}
                        fontSize={'sm'}
                        bg={useColorModeValue('gray.50', 'gray.900')}
                        p={2}
                        alignSelf={'center'}
                        rounded={'md'}
                    >
                        🎓 {education === 'academic' ? 'Academic' : 'Self-studied'}
                    </Text>
                </WrapItem>

                {collaboration && (
                    <WrapItem>
                        <Text
                            color={'gray.400'}
                            fontWeight={600}
                            fontSize={'sm'}
                            bg={useColorModeValue('gray.50', 'gray.900')}
                            p={2}
                            alignSelf={'center'}
                            rounded={'md'}
                        >
                            🟢 Collaboration
                        </Text>
                    </WrapItem>
                )}

            </Wrap>

            <Wrap justify={'center'}>
                {
                    skills?.split(',').map((i, idx) => (
                        <WrapItem key={idx}>
                            <Text
                                key={idx}
                                color={'gray.400'}
                                fontWeight={600}
                                fontSize={'sm'}
                                bg={useColorModeValue('gray.50', 'gray.900')}
                                p={3}
                                alignSelf={'flex-start'}
                                rounded={'md'}
                            >
                                💯 {i}
                            </Text>
                        </WrapItem>
                    ))
                }
            </Wrap>
            <Wrap justify={'center'}>
                {
                    influences?.split(',').map((i, idx) => (
                        <WrapItem key={idx}>
                            <Text
                                key={idx}
                                color={'gray.400'}
                                fontWeight={600}
                                fontSize={'sm'}
                                bg={useColorModeValue('gray.50', 'gray.900')}
                                p={3}
                                alignSelf={'center'}
                                rounded={'md'}
                            >
                                🔥 {i}
                            </Text>
                        </WrapItem>
                    ))
                }
            </Wrap>
        </Stack>
    )
}

const ProfileLinks = ({ data }) => {

    const { urls } = data

    const links = urls?.map((i, idx) => (

        <Button
            key={idx}
            size='lg'
            color={'gray.400'}
            bg={useColorModeValue('gray.50', 'gray.900')}
        >
            <NextLink href={Object.values(i)[0].toString()} passHref>
                <Link isExternal>
                    {Object.keys(i)[0].toString()}
                </Link>
            </NextLink>
        </Button>


    ))

    return (
        <Flex align="center" alignItems="stretch" direction="column">
            <VStack
                spacing={4}
                align="stretch"
            >
                {links}
            </VStack>
        </Flex>
    )
}

const ProfileAvatar = ({ data }) => {
    const { profileImg, email, photoUrl, username } = data

    return (
        <Flex direction={'column'} justify={'center'} alignItems='center'>
            <Box mt={28}>
                <AvatarSVG imageUrl={profileImg || photoUrl} />
            </Box>
            <Box >
                <Flex mt={3} mb={5} alignItems='center'>
                    <Heading letterSpacing={2} textAlign='center' as="h6" size="sm">
                        @{username || email.split('@')?.[0]}
                    </Heading>
                    <CheckCircleIcon ml={'2'} color={'green.300'} />
                </Flex>
            </Box>
        </Flex>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    let data

    const query = await firestore.collection('users').get()

    query.docs.map((doc) => {
        if ((doc.data().username || doc.data().uid.slice(0, 5)) === params.slug) {
            data = doc.data()
        }
    })

    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: { data },
    }
}

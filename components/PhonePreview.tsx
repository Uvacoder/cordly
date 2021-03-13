import { FaEye } from 'react-icons/fa'
import { FaRegCopy, FaDownload } from 'react-icons/fa'
import { firestore } from '../lib/firebase'
import { UserContext } from '../lib/context'
import { useState, useEffect, useContext } from 'react'
import NextLink from 'next/link'
import QRCode from 'qrcode'
import {
    Box,
    Flex,
    Text,
    Avatar,
    Button,
    Stack,
    Tabs,
    TabList,
    Tab,
    TabPanel,
    TabPanels,
    Link,
    Wrap,
    WrapItem,
    useClipboard,
    Badge,
    Heading,
    useColorModeValue,
    SimpleGrid,
} from '@chakra-ui/react'

export default function PhonePreview({ urls, userNameValue, avatarCoverImg, dashboardForm, tabIndex }) {

    const [imageUrl, setImageUrl] = useState('')
    const [stageName, stageNameSet] = useState('')
    const [pageVisit, pageVisitSet] = useState(0)

    const { user } = useContext(UserContext)

    const userProfileUrl = `cord.ly/${userNameValue || user.uid.slice(0, 5)}`

    const { hasCopied, onCopy } = useClipboard(userProfileUrl)

    const query = firestore.collection('users')

    useEffect(() => {
        query
            .where('uid', '==', user.uid)
            .onSnapshot((snapshot) => {
                let changes = snapshot.docChanges()
                changes.forEach((i) => {
                    stageNameSet(i.doc.data().bio?.stagename)
                    pageVisitSet(i.doc.data()?.pageVisit)
                })
            })
    }, [user.uid])

    const generateQrCode = async () => {
        try {
            const response = await QRCode.toDataURL(userProfileUrl)
            setImageUrl(response)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Flex
            direction='column'
            w='100%'
        >
            <Flex
                w='100%'
                direction={['column-reverse', 'column']}
                alignItems={'center'}
                justifyContent={'center'}
            >

                <SimpleGrid pos='sticky' bottom='0' zIndex='99' columns={2} alignSelf='stretch' color={'green.400'}>
                    <Flex
                        border='solid 1px transparent'
                        borderRightColor='black'
                        py={8}
                        px={[3, 9]}
                        bg='green.100'
                        alignItems='center'
                        justifyContent='space-between'
                    >
                        <Link
                            mr={2}
                            textAlign="left"
                            href={`/${userNameValue || user.uid.slice(0, 5)}`}
                            isExternal>
                            <Text
                                textStyle={'cordlyUrl'}
                                color='gray.800'
                                fontSize={['md', 'xx-large']}
                                fontWeight={'bold'}
                                letterSpacing={1}
                                >
                                {userProfileUrl}
                            </Text>
                        </Link>
                        <Button
                            mr={2}
                            onClick={onCopy}
                            size='xs'
                            colorScheme='blue'
                            variant='solid'
                            leftIcon={<FaRegCopy />}>
                            {hasCopied ? "Copied" : "Copy"}
                        </Button>
                        <Button
                            as={Link}
                            href={imageUrl}
                            download
                            onClick={() => generateQrCode()}
                            size='xs'
                            colorScheme='blue'
                            variant='solid'
                            leftIcon={<FaDownload />}>
                            QR
                    </Button>
                    </Flex>
                    <Flex
                        justify='center'
                        alignItems='center'
                        bg='green.200'
                        w='100%'
                        color='green.900'
                    >
                        <FaEye size='30px' />
                        <Text
                            fontSize={['md', 'x-large']}
                            fontWeight='bold'
                            ml={2}
                        >
                            {pageVisit}
                        </Text>
                    </Flex>
                </SimpleGrid>


                <Box
                    borderColor={'gray.300'}
                    width={['90vw', 'sm']}
                    borderWidth={[12, 20]}
                    borderRadius={65}
                    maxH={['600px', '580px', '580px', '700px ']}
                    minH={'700px'}
                    overflow="hidden"
                    textAlign="center"
                    my={10}
                    pos={'relative'}
                >

                    <Flex
                        backgroundImage={`url("${avatarCoverImg.cover}")`}
                        backgroundRepeat={'no-repeat'}
                        backgroundSize={'cover'}
                        height={'150px'}
                        w={'sm'}
                        pos='absolute'
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

                    <Avatar
                        mt={28}
                        size="lg"
                        name="profile picture"
                        src={avatarCoverImg.avatar || user.photoURL}
                    />
                    <Heading as={'h3'} size={'md'} mt={2}>{stageName || userNameValue || user.uid.slice(0, 5)}</Heading>

                    <Flex mt={2} mb={5} justifyContent='center' alignItems='center'>
                        <Text fontWeight={'light'} textAlign="center">
                            @{userNameValue || user.uid.slice(0, 5)}
                        </Text>

                        <Badge variant="solid" colorScheme="green" ml={2}>PRO</Badge>
                    </Flex>

                    <Tabs
                        isFitted
                        align="center"
                        variant="line"
                        colorScheme="green"
                        index={tabIndex === 0 ? 0 : 1}
                    >
                        <TabList>
                            <Tab>
                                <Box>🔗</Box>
                                <Text ml={3}>Links</Text>
                            </Tab>

                            <Tab>
                                <Box>✍️</Box>
                                <Text ml={3}>Bio</Text>
                            </Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <LinksPreviewPanel
                                    urls={urls}
                                />
                            </TabPanel>

                            <TabPanel>
                                <BioPreviewPanel user={user} />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Flex>
        </Flex>
    )
}

const LinksPreviewPanel = ({ urls }) => {
    return (
        <Stack>
            {urls?.map((i, idx) => (
                <Button key={idx} w={'100%'}>
                    <NextLink href={Object.values(i)[0].toString()} passHref>
                        <Link isExternal>
                            {Object.keys(i)[0].toString()}
                        </Link>
                    </NextLink>
                </Button>
            ))}
        </Stack>
    )
}

const BioPreviewPanel = ({ user }) => {

    const [bio, bioSet] = useState({
        stagename: '',
        location: '',
        skills: '',
        styles: '',
        influences: '',
        education: '',
        collaboration: false,
    })

    const query = firestore.collection('users')
    useEffect(() => {
        query.where('uid', '==', user.uid).onSnapshot((snapshot) => {
            let changes = snapshot.docChanges()
            changes.forEach((i) => bioSet(i.doc.data().bio))
        })
    }, [])

    return (
        <Stack>
            <Text
                color={'purple.400'}
                fontWeight={600}
                fontSize={'sm'}
                // bg={useColorModeValue('purple.50', 'purple.900')}
                bg={'purple.900'}
                p={2}
                alignSelf={'center'}
                rounded={'md'}
            >
                📍 {bio?.location}
            </Text>

            <Wrap justify={'center'}>
                <WrapItem>
                    <Text
                        color={'gray.400'}
                        fontWeight={600}
                        fontSize={'sm'}
                        bg={'gray.900'}
                        p={2}
                        alignSelf={'center'}
                        rounded={'md'}
                    >
                        🎓 {bio?.education === 'academic' ? 'Academic' : 'Self-studied'}
                    </Text>
                </WrapItem>

                {bio?.collaboration && (
                    <WrapItem>
                        <Text
                            color={'gray.400'}
                            fontWeight={600}
                            fontSize={'sm'}
                            bg={'gray.900'}

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
                    bio?.skills
                        ?.split(',')
                        .slice(0, 5)
                        .map((i, idx) => (
                            <WrapItem key={idx}>
                                <Text
                                    key={idx}
                                    color={'gray.400'}
                                    fontWeight={600}
                                    fontSize={'sm'}
                                    bg={'gray.900'}

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
                    bio?.styles
                        ?.split(',')
                        .slice(0, 3)
                        .map((i, idx) => (
                            <WrapItem key={idx}>
                                <Text
                                    key={idx}
                                    color={'gray.400'}
                                    fontWeight={600}
                                    fontSize={'sm'}
                                    bg={'gray.900'}

                                    p={3}
                                    alignSelf={'flex-start'}
                                    rounded={'md'}
                                >
                                    💅 {i}
                                </Text>
                            </WrapItem>
                        ))
                }
            </Wrap>

            <Wrap justify={'center'}>
                {bio?.influences
                    ?.split(',')
                    .slice(0, 5)
                    .map((i, idx) => (
                        <WrapItem key={idx}>
                            <Text
                                key={idx}
                                color={'gray.400'}
                                fontWeight={600}
                                fontSize={'sm'}
                                bg={'gray.900'}

                                p={3}
                                alignSelf={'center'}
                                rounded={'md'}
                            >
                                🔥 {i}
                            </Text>
                        </WrapItem>
                    ))}
            </Wrap>
        </Stack>
    )
}
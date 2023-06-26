import React from "react"
import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { Box, 
    Button, 
    Container, 
    Flex, 
    Heading, 
    Text,
    Image, 
    Tab, 
    Tabs, 
    TabList, 
    TabPanels, 
    TabPanel, 
    useDisclosure, 
    ModalOverlay, 
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalCloseButton, 
    ModalBody, 
    ModalFooter, 
    Input,
    Center
} from '@chakra-ui/react'

import { QUERY_SINGLE_CAMPAIGN } from "../utils/queries"

const OneCampaign = () => {
    const { campaignId } = useParams()

    const { isOpen, onOpen, onClose } = useDisclosure()

    const btnRef = React.useRef(null)

    const { loading, error, data } = useQuery(QUERY_SINGLE_CAMPAIGN, {
        variables: { campaignId: campaignId }
    })

    const campaign = data?.campaign || {}

    return (
        <div>
            {loading || error ? (
                <div>Loading...</div>
            ) : (
                <Box mx='150' my='5'>
                    <Flex pb='5' borderBottom={'1px'} borderColor={'gray.400'}>
                        <Container>
                            <Heading fontWeight='500' fontSize={36} mb='5'>{campaign.title}</Heading>
                            <Text ml='1' fontSize={20} fontWeight={400} color={'blackAlpha.700'}>{campaign.description}</Text>
                            <Flex fontSize={24} flexWrap={'wrap'}>
                                <Text m={3}>Goal Date: {campaign.goalDate}</Text>
                                <Text m={3}>Campaign Goal: ${campaign.goalAmount}</Text>
                                <Text m={3}><Text display={'inline'} fontWeight={500}>${campaign.earned}</Text> raised by {campaign.investorCount} contributors</Text>
                            </Flex>
                            {campaign.isActive ? (
                                <>
                                    <Button ref={btnRef} onClick={onOpen}>Contribute</Button>
                                    <Modal
                                        onClose={onClose}
                                        finalFocusRef={btnRef}
                                        isOpen={isOpen}
                                        scrollBehavior={"inside"}
                                    >
                                        <ModalOverlay />
                                        <ModalContent>
                                            <ModalHeader><Center>Contribute to this project</Center></ModalHeader>
                                            <ModalCloseButton />
                                            <ModalBody>
                                                <Text fontWeight={500}>Make a contribution</Text>
                                                <Flex>
                                                <Container border={'1px'}>
                                                    <Flex justifyContent={'space-between'}>
                                                    <Text display={"inline"}>$<Input type='number' bgColor={'white'} m='1' p={'5px'} border={0} width={'150px'} display={"inline"} placeholder="5"/></Text>
                                                    <Text display={'inline'} m='3' p={'0px'}>USD</Text>
                                                    </Flex>
                                                </Container>
                                                <Button bg={0} w={'150px'} ml='3' p={6} border={'1px'} rounded={'none'}>CONTINUE</Button>
                                                </Flex>
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button onClick={onClose}>Close</Button>
                                            </ModalFooter>
                                        </ModalContent>
                                    </Modal>
                                </>
                            ) : (
                                <div>This campaign is no longer active</div>
                            )}
                        </Container>
                        <Image src={`assets/images/${campaign.image}`} maxW={'55%'}/>
                    </Flex>
                    <Flex>
                        <Tabs>
                            <TabList border={'0'}>
                                <Tab m='3'>Story</Tab>
                                <Tab m='3'>Updates</Tab>
                                <Tab m='3'>Discussion</Tab>
                            </TabList>

                            <TabPanels>
                                <TabPanel>
                                    <p>UNDER CONSTRUCTION</p>
                                </TabPanel>
                                <TabPanel>
                                    <p>UNDER CONSTRUCTION</p>
                                </TabPanel>
                                <TabPanel>
                                    <p>UNDER CONSTRUCTION</p>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Flex>
                </Box>
            )}
        </div>
    )
}

export default OneCampaign
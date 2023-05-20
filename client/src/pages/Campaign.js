import React from "react"
import { useQuery, useMutation } from "@apollo/client"

import CampaignCard from "../components/CampaignCard"

import { QUERY_CAMPAIGNS, QUERY_ME } from "../utils/queries"
import { CREATE_CAMPAIGN } from "../utils/mutations"
import { Box, Button, Center, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"

const Campaign = () => {
    document.addEventListener('trix-before-initialize', () => { })
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef(null)

    const { loading, data } = useQuery(QUERY_CAMPAIGNS)
    const campaigns = data?.campaigns || []

    const userData = useQuery(QUERY_ME)
    const userIsAdmin = userData.data?.me.isAdmin

    const handleFormSubmit = () => {

    }

    return (
        <main>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <Box
                    bgImage={"url('/assets/images/bckgrnd-banner2.jpg')"}
                    bgPosition="top"
                    bgSize="cover"
                    bgRepeat="no-repeat"
                    h='74vh'
                >
                    {userIsAdmin ? (
                        <>
                            <Center><Button ref={btnRef} onClick={onOpen} border={'0'} w='55%' boxShadow={'lg'} mt='5' bgColor={'green.300'} color={'white'} textShadow={'1px 1px black'} _hover={{ bgColor: 'green.400' }}>Add New Campaign</Button></Center>
                            <Modal
                                onClose={onClose}
                                finalFocusRef={btnRef}
                                isOpen={isOpen}
                                scrollBehavior={"inside"}
                                size={'lg'}
                            >
                                <ModalOverlay />
                                <ModalContent >
                                    <ModalHeader><Center>Add New Campaign</Center></ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <form>
                                            <FormControl mb={2}>
                                                <FormLabel>Campaign Image</FormLabel>
                                                <input type='file' id='image' />
                                            </FormControl>
                                            <FormControl>
                                                <FormLabel>Campaign Title</FormLabel>
                                                <Input id='title' />
                                            </FormControl>
                                            <FormControl>
                                                <FormLabel>Description</FormLabel>
                                                <Input id='description' />
                                            </FormControl>
                                            <FormControl>
                                                <FormLabel>Goal Amount</FormLabel>
                                                <Input id='goalAmount' />
                                            </FormControl>
                                            <FormControl>
                                                <FormLabel>Goal Date</FormLabel>
                                                <Input id='goalDate' />
                                            </FormControl>
                                        </form>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button onClick={handleFormSubmit} mr='3' bgColor={'green.300'} color={'white'} _hover={{ bgColor: 'green.400' }}>Submit</Button>
                                        <Button onClick={onClose}>Close</Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                        </>
                    ) :
                        <></>
                    }
                    <CampaignCard
                        campaigns={campaigns}
                    />
                </Box>
            )}
        </main>
    )
}

export default Campaign
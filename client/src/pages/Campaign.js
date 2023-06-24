import React, { useState } from "react"
import { useQuery, useMutation } from "@apollo/client"

import CampaignCard from "../components/CampaignCard"

import { QUERY_CAMPAIGNS, QUERY_ME } from "../utils/queries"
import { CREATE_CAMPAIGN } from "../utils/mutations"
import { useToast, Box, Button, Center, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"

const Campaign = () => {
    document.addEventListener('trix-before-initialize', () => { })
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef(null)
    const toast = useToast()

    const [formState, setFormState] = useState({ title: '', goalAmount: '', goalDate: '', description: '', image: '' })
    const { loading, data } = useQuery(QUERY_CAMPAIGNS)
    const campaigns = data?.campaigns || []

    const [createCampaign] = useMutation(CREATE_CAMPAIGN)
    const userData = useQuery(QUERY_ME)
    const userIsAdmin = userData.data?.me.isAdmin

    const handleFormSubmit = () => {
        console.log(formState)
        try {
            createCampaign({
                variables: {
                    ...formState
                }
            })
            toast({
                title: `Campaign created!`,
                description: `${formState.title} has been created.`,
                status: 'success',
                duration: 3000,
                isClosable: true
            })
            window.location.assign('/campaigns')
        } catch (e) {
            console.log(e)
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleNumberChange = (value) => {
        setFormState({
            ...formState,
            goalAmount: value,
        });
    }

    return (
        <Box minH='72vh'>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <Box
                        position={'fixed'}
                        left='0'
                        right={'0'}
                        zIndex={1}
                        bgImage={"url('/assets/images/bckgrnd-banner2.jpg')"}
                        bgPosition="top"
                        bgSize="cover"
                        bgRepeat="no-repeat"
                        minH='72vh'
                        filter={'auto'}
                        brightness={'60%'}
                        saturate={'0.7'}
                    />
                    <Box
                        position={'fixed'}
                        left='0'
                        right={'0'}
                        zIndex={2}
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
                                                    <input type='file' value={formState.image} name='image' onChange={handleChange} />
                                                </FormControl>
                                                <FormControl>
                                                    <FormLabel>Campaign Title</FormLabel>
                                                    <Input name='title' value={formState.title} onChange={handleChange} />
                                                </FormControl>
                                                <FormControl>
                                                    <FormLabel>Description</FormLabel>
                                                    <Input name='description' value={formState.description} onChange={handleChange} />
                                                </FormControl>
                                                <FormControl>
                                                    <FormLabel>Goal Amount</FormLabel>
                                                    <Input name='goalAmount' type='number' value={formState.goalAmount} onChange={(e) => handleNumberChange(Number(e.target.value))} />
                                                </FormControl>
                                                <FormControl>
                                                    <FormLabel>Goal Date</FormLabel>
                                                    <Input name='goalDate' value={formState.goalDate} onChange={handleChange} />
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
                </>
            )}
        </Box>
    )
}

export default Campaign
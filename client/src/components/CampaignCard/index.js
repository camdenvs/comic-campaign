import React from 'react'
import {
    Flex,
    Card,
    Heading,
    CardBody,
    Text,
    Image,
    Stack,
} from '@chakra-ui/react'


import { Link as RouteLink } from "react-router-dom"


const CampaignCard = ({
    campaigns
}) => {

    return (
        <Flex flexDir='column' mb='5'>
            {campaigns &&
                campaigns.map((campaign) => (
                    <>
                        <Card
                            direction={{ base: 'column', sm: 'row' }}
                            overflow='hidden'
                            variant='outline'
                            border={'1px'} key={campaign._id} m='auto' w='75%' boxShadow={'lg'} mt={5}
                            as={RouteLink} to={campaign.link} _hover={'none'}
                        >
                            <Image
                                objectFit='cover'
                                maxW={{ base: '100%', sm: '200px' }}
                                src={`/assets/images/${campaign.image}`}
                                alt='Caffe Latte'
                            />

                            <Stack minW={'60%'}>
                                <CardBody>
                                    <Heading size='lg'>{campaign.title}</Heading>

                                    <Text py='2' fontSize={'20px'}>
                                        {campaign.description}
                                    </Text>
                                </CardBody>
                            </Stack>
                        </Card>
                    </>
                ))
            }
        </Flex>
    )
}

export default CampaignCard
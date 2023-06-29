import React from 'react'
import {
    Flex,
    Card,
    Heading,
    Link,
    CardBody,
    Text,
    Box,
    Image
} from '@chakra-ui/react'


import { Link as RouteLink } from "react-router-dom"


const CampaignCard = ({
    campaigns
}) => {

    return (
        <Flex flexDir='column' mb='5'>
            {campaigns &&
                campaigns.map((campaign) => (
                    <Card border={'1px'} key={campaign._id} m='auto' w='55%' boxShadow={'lg'} mt={5}>
                        <Link as={RouteLink} to={campaign.link} _hover={'none'}>
                            <Flex>
                                <Image src={campaign.image} alt={`${campaign.title} image`} w={'15%'}/>
                                <Box>
                                    <Heading px='5' pt='5'>{campaign.title}</Heading>
                                    <CardBody>
                                        <Text py={3} px={2} fontSize={24}>{campaign.description}</Text>
                                    </CardBody>
                                </Box>
                            </Flex>
                        </Link>
                    </Card>
                ))
            }
        </Flex>
    )
}

export default CampaignCard
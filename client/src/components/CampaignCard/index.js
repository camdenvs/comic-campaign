import React from 'react'
import {
    Flex,
    Card,
    Heading,
    Link,
    CardBody,
    Text,
    Progress,
} from '@chakra-ui/react'


import { Link as RouteLink } from "react-router-dom"


const CampaignCard = ({
    campaigns
}) => {

    return (
        <Flex flexDir='column'>
            {campaigns &&
                campaigns.map((campaign) => (
                    <Card border={'1px'} key={campaign._id} m='auto' w='55%' boxShadow={'lg'} mt={5}>
                        <Link as={RouteLink} to={{ pathname: `/campaigns/${campaign._id}` }}>
                            <Heading px='5' pt='5'>{campaign.title}</Heading>
                            <CardBody>
                                <Text py={3} px={2} fontSize={24}>{campaign.earned} / {campaign.goalAmount}</Text>
                                <Progress value={campaign.earned / campaign.goalAmount} />
                            </CardBody>
                        </Link>
                    </Card>
                ))
            }
        </Flex>
    )
}

export default CampaignCard
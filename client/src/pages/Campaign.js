import React from "react"
import { useQuery } from "@apollo/client"

import CampaignCard from "../components/CampaignCard"

import { QUERY_CAMPAIGNS } from "../utils/queries"
import { Box } from "@chakra-ui/react"

const Campaign = () => {
    const { loading, data } = useQuery(QUERY_CAMPAIGNS)
    const campaigns = data?.campaigns || []

    return (
        <main>
            <div>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <Box m={5}>
                    <CampaignCard
                        campaigns={campaigns}
                    />
                    </Box>
                )}
            </div>
        </main>
    )
}

export default Campaign
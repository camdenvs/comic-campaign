import React from "react"
import { useQuery } from "@apollo/client"

import CampaignCard from "../components/CampaignCard"

import { QUERY_CAMPAIGNS } from "../utils/queries"

const Campaign = () => {
    const { loading, data } = useQuery(QUERY_CAMPAIGNS)
    const campaigns = data?.campaigns || []

    return (
        <main>
            <div>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <CampaignCard
                        campaigns={campaigns}
                    />
                )}
            </div>
        </main>
    )
}

export default Campaign
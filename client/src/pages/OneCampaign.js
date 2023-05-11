import React from "react"
import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"

import { QUERY_SINGLE_CAMPAIGN } from "../utils/queries"

const OneCampaign = () => {
    const { campaignId } = useParams()

    const { loading, error, data } = useQuery(QUERY_SINGLE_CAMPAIGN, {
        variables: { campaignId: campaignId }
    })

    const campaign = data?.campaign || {}

    return (
        <div>
            {loading || error ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <div>{campaign.title}</div>
                    <div>{campaign.goalDate}</div>
                    <div>{campaign.earned}/{campaign.goalAmount}</div>
                    <div>{campaign.investorCount}</div>
                    <div>{campaign.description}</div>
                    {campaign.isActive ? (
                        <button>Contribute</button>
                    ) : (
                        <div>This campaign is no longer active</div>
                    )}
                </div>
            )}
        </div>
    )
}

export default OneCampaign
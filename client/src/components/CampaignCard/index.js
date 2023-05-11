import React from 'react'

import { Link } from "react-router-dom"

const CampaignCard = ({
    campaigns
}) => {
    
    return (
        <div>
            {campaigns && 
                campaigns.map((campaign) => (
                    <Link to={{ pathname: `/campaigns/${campaign._id}` }} key={campaign._id}>
                        <h3>{campaign.title}</h3>
                        <div>{campaign.earned} / {campaign.goalAmount}</div>
                    </Link>
                ))
            }
        </div>
    )
}

export default CampaignCard
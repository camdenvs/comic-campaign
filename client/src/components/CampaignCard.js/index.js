import React from 'react'

const CampaignCard = ({
    campaigns
}) => {
    
    return (
        <div>
            {campaigns && 
                campaigns.map((campaign) => (
                    <div key={campaign._id}>
                        <h3>{campaign.title}</h3>
                        <div>{campaign.earned} / {campaign.goalAmount}</div>
                    </div>
                ))
            }
        </div>
    )
}

export default CampaignCard
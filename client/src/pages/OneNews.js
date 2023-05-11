import React from 'react'
import { useParams } from "react-router-dom"
import { useQuery } from '@apollo/client'

import { QUERY_SINGLE_NEWS } from '../utils/queries'

const OneNews = () => {
    const { newsId } = useParams()

    const { loading, error, data } = useQuery(QUERY_SINGLE_NEWS, {
        variables: { newsId: newsId }
    })

    const news = data?.news || {}

    return (
        <main>
            {loading || error ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <h3>{news.title}</h3>
                    <p>{news.body}</p>
                </div>
            )}
        </main>
    )
}

export default OneNews
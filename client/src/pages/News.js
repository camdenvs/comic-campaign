import React from "react"
import { useQuery } from "@apollo/client"

import { QUERY_NEWS } from '../utils/queries'

import NewsCard from "../components/NewsCard"

const News = () => {
    const { loading, error, data } = useQuery(QUERY_NEWS)
    const allNews = data?.allNews || []

    return (
        <main>
            <div>
                {loading || error ? (
                    <div>Loading...</div>
                ) : (
                    <NewsCard
                        allNews={allNews}
                    />
                )}
            </div>
        </main>
    )
}

export default News
import React from 'react'

import { Link } from 'react-router-dom'

const NewsCard = ({ allNews }) => {
    return (
        <div>
            {allNews &&
               allNews.map((news) => (
                <Link to={{ pathname: `/news/${news._id}` }} key={news._id}>
                    <h3>{news.title} Posted: {news.createdAt}</h3>
                </Link>
               )) 
            }
        </div>
    )
}

export default NewsCard
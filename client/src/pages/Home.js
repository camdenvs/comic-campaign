import React from "react"
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { Link as RouteLink } from "react-router-dom"

const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: '90%',
    backgroundRepeat: 'no-repeat',
    height: '85vh',
    backgroundPosition: 'center'
}
const slideImages = [
    {
        url: '/assets/images/slideshow/ActionFigures-SS.jpg',
        link: '/store/action-figures'
    },
    {
        url: '/assets/images/slideshow/RektPlanet-SS.jpg',
        link: 'https://www.indiegogo.com/projects/ethan-van-sciver-s-cyberfrog-2-rekt-planet#/'
    },
    {
        url: '/assets/images/slideshow/RTB-SS.jpg',
        link: 'https://www.indiegogo.com/projects/ethan-van-sciver-s-reignbow-the-brute#/'
    },
];

const Home = () => {
    return (
        <main>
            <Slide>
                {slideImages.map((slideImage, index) => (
                    <div key={index} as={RouteLink}>
                        <RouteLink to={slideImage.link}>
                        <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
                        </div>
                        </RouteLink>
                    </div>
                ))}
            </Slide>
        </main>
    )
}

export default Home
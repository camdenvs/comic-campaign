import React from "react"
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

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
    },
    {
        url: '/assets/images/slideshow/RektPlanet-SS.jpg'
    },
    {
        url: '/assets/images/slideshow/RTB-SS.jpg'
    },
];

const Home = () => {
    return (
        <main>
            <Slide>
                {slideImages.map((slideImage, index) => (
                    <div key={index}>
                        <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
                        </div>
                    </div>
                ))}
            </Slide>
        </main>
    )
}

export default Home
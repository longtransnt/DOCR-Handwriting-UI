import React from 'react';
import image1 from '../test_image/21,000927 (9).jpg';
import image2 from '../test_image/2021_12_30 09_55 Office Lens (23).jpg';

function HomePage() {
    return (
        <div className='home-gallery'>
            <img className='original-image' src={image1}></img>
            <img className='original-image' src={image2}></img>
        </div>
    )
}
 
export default HomePage;
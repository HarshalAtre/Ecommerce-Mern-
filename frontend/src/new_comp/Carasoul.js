import React from 'react';
import { CCarousel, CCarouselItem, CImage } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
import './MyCarousel.css'; // Import the CSS file
// import ReactImg from './path/to/react-image.jpg';
// import VueImg from './path/to/vue-image.jpg';
// import AngularImg from './path/to/angular-image.jpg';

const MyCarousel = () => {
  return (
    <div className="carousel-container">
       <CCarousel controls indicators transition="slide">
        <CCarouselItem>
          <CImage className="d-block w-100" src="https://static.vecteezy.com/system/resources/previews/004/707/493/non_2x/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg" alt="slide 1" />

        </CCarouselItem>
        <CCarouselItem>
          <CImage className="d-block w-100" src="https://static.vecteezy.com/system/resources/previews/004/707/493/non_2x/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg" alt="slide 2" />
        </CCarouselItem>
        <CCarouselItem>
          <CImage className="d-block w-100" src='https://static.vecteezy.com/system/resources/thumbnails/004/299/835/small/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-free-vector.jpg' alt="slide 3" />
        </CCarouselItem>
      </CCarousel>
    </div>
  );
};

export default MyCarousel;

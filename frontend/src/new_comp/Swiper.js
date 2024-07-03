import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import './Swiper.css';

const ProductShowcase = () => {
  const slides = [
    {
      id: 'beach',
      header: 'Closca Bottle',
      title: 'Beach',
      subtitle: '€ 39.90',
      contentTitle: 'In 20 years, there could be more plastic in our oceans than fish.',
      contentSubtitle: 'Plastic pollution injures more than 100,000 marine animals every year. It takes around 450 years for one plastic bottle to decompose.',
      bgImage: 'https://cdn.shopify.com/s/files/1/0689/1443/t/34/assets/Beach_1920.jpg?v=1029210661698833530',
      bottleImage: 'https://cdn.shopify.com/s/files/1/0689/1443/t/34/assets/bottle_beach.png?v=11784267851598469514'
    },
    {
      id: 'savanna',
      header: 'Closca Bottle',
      title: 'Savanna',
      subtitle: '€ 39.90',
      contentTitle: 'The Earth’s area affected by desertification is approx 11 times India’s size.',
      contentSubtitle: 'The Savannas act as a carbon sink, absorbing CO2 from the atmosphere and helping to maintain the balance of global temperatures.',
      bgImage: 'https://images.unsplash.com/photo-1613109526778-27605f1f27d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
      bottleImage: 'https://cdn.shopify.com/s/files/1/0689/1443/t/34/assets/savanna_OK.png?v=4783820813181844557'
    },
    {
      id: 'glacier',
      header: 'Closca Bottle',
      title: 'Glacier',
      subtitle: '€ 39.90',
      contentTitle: 'Glaciers contain 75% of the World\'s freshwater.',
      contentSubtitle: 'The effects of melting ice glaciers are biodiversity loss, the rising of the sea level and the deficiency of freshwater, among others.',
      bgImage: 'https://www.discover-the-world.com/app/uploads/2018/05/chile-patagonia-calving-glacier-is-1150x863-c-default.jpg',
      bottleImage: 'https://cdn.shopify.com/s/files/1/0689/1443/t/34/assets/Glacier_OK.png?v=7185877315400411030'
    },
    {
      id: 'coral',
      header: 'Closca Bottle',
      title: 'Coral',
      subtitle: '€ 39.90',
      contentTitle: 'We will have lost 60% of our coral reefs by 2030.',
      contentSubtitle: 'Coral reefs are essential to humans, as they protect the shorelines and are a source of nutrients and habitat for thousands of marine species.',
      bgImage: 'https://images.unsplash.com/photo-1546500840-ae38253aba9b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3260&q=80',
      bottleImage: 'https://cdn.shopify.com/s/files/1/0689/1443/t/34/assets/Coral_OK.png?v=14596995446202437119'
    }
  ];

  return (
    <div className="random-container">
      <div className="random-header">
        <a className="random-menu-icon" href="#">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </a>
        <img className="random-logo" src="https://cdn.shopify.com/s/files/1/0689/1443/files/CLOSCA-LOGO-WEB-BLACK_130x@2x.png?v=1559116993" alt="Logo" />
        <div className="random-header-menu">
          <a href="#">Mask</a>
          <a href="#">Helmet</a>
          <a href="#">Bottle</a>
          <a href="#">Accessories</a>
        </div>
        <div className="random-header-icons">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 1114 0 7 7 0 01-14 0z" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M437.02 330.98c-27.883-27.882-61.071-48.523-97.281-61.018C378.521 243.251 404 198.548 404 148 404 66.393 337.607 0 256 0S108 66.393 108 148c0 50.548 25.479 95.251 64.262 121.962-36.21 12.495-69.398 33.136-97.281 61.018C26.629 379.333 0 443.62 0 512h40c0-119.103 96.897-216 216-216s216 96.897 216 216h40c0-68.38-26.629-132.667-74.98-181.02zM256 256c-59.551 0-108-48.448-108-108S196.449 40 256 40s108 48.448 108 108-48.449 108-108 108z" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 208.955 208.955">
            <path d="M190.85 200.227L178.135 58.626a7.5 7.5 0 00-7.47-6.829h-26.221V39.971c0-22.04-17.93-39.971-39.969-39.971-22.038 0-39.966 17.931-39.966 39.971v11.826H38.27a7.5 7.5 0 00-7.47 6.829L18.035 200.784a7.5 7.5 0 007.47 8.17h157.946a7.5 7.5 0 007.399-8.727zM79.509 39.971c0-13.769 11.2-24.971 24.967-24.971 13.768 0 24.969 11.202 24.969 24.971v11.826H79.509V39.971zm-45.8 153.984L45.127 66.797h19.382v13.412a7.5 7.5 0 007.5 7.5 7.5 7.5 0 007.5-7.5V66.797h49.936v13.412a7.5 7.5 0 007.5 7.5 7.5 7.5 0 007.5-7.5V66.797h19.364l11.418 127.158H33.709z" />
          </svg>
        </div>
      </div>
      <Swiper
        className="random-swiper"
        modules={[Navigation, Pagination, EffectFade]}
        navigation={{
          nextEl: '.random-swiper-next-button',
          prevEl: '.random-swiper-prev-button'
        }}
        effect="fade"
        loop
        pagination={{
          el: '.random-swiper-pagination',
          type: 'fraction'
        }}
        onSlideChange={(sld) => document.body.setAttribute('data-sld', sld.realIndex)}
      >
        {slides.map((slide) => (
          <SwiperSlide className="random-main random-swiper-slide" id={slide.id} key={slide.id}>
            <div className="random-main-wrapper">
              <div className="random-main-container">
                <header className="random-header-main">
                  <h3>{slide.header}</h3>
                  <h1>
                    {slide.title}
                    <span>{slide.subtitle}</span>
                  </h1>
                </header>
                <div className="random-main-content">
                  <h2>{slide.contentTitle}</h2>
                  <p>{slide.contentSubtitle}</p>
                </div>
              </div>
              <figure className="random-bottle">
                <img src={slide.bottleImage} alt={slide.title} />
              </figure>
            </div>
            <figure className="random-bg">
              <img src={slide.bgImage} alt={slide.title} />
            </figure>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="random-swiper-pagination"></div>
      <div className="random-swiper-next-button random-swiper-navigation">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 492.004 492.004">
          <path d="M382.678 226.804L109.983 1.392c-5.072-4.448-12.816-4.032-17.264 1.04L382.678 265.2C387.962 260.84 387.962 231.156 382.678 226.804z" />
        </svg>
      </div>
      <div className="random-swiper-prev-button random-swiper-navigation">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 492.004 492.004">
          <path d="M109.326 265.2l272.695 224.412c5.072 4.448 12.816 4.032 17.264-1.04L109.326 1.392c-4.448-5.072-12.192-5.488-17.264-1.04L109.326 265.2z" />
        </svg>
      </div>
    </div>
  );
};

export default ProductShowcase;

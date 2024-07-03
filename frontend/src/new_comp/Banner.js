import React from 'react';
import './BannerComponent.css'; // Assuming you put your CSS in a file named BannerComponent.css

const BannerComponent = () => {
  return (
    <div className="bodyb">
    <div className="bannerr">
      <div className="slider" style={{ "--quantity": 10 }}>
        <div className="item" style={{ "--position": 1 }}><img src="images/dragon_1.jpg" alt="" /></div>
        <div className="item" style={{ "--position": 2 }}><img src="images/dragon_2.jpg" alt="" /></div>
        <div className="item" style={{ "--position": 3 }}><img src="images/dragon_3.jpg" alt="" /></div>
        <div className="item" style={{ "--position": 4 }}><img src="images/dragon_4.jpg" alt="" /></div>
        <div className="item" style={{ "--position": 5 }}><img src="images/dragon_5.jpg" alt="" /></div>
        <div className="item" style={{ "--position": 6 }}><img src="images/dragon_6.jpg" alt="" /></div>
        <div className="item" style={{ "--position": 7 }}><img src="images/dragon_7.jpg" alt="" /></div>
        <div className="item" style={{ "--position": 8 }}><img src="images/dragon_8.jpg" alt="" /></div>
        <div className="item" style={{ "--position": 9 }}><img src="images/dragon_9.jpg" alt="" /></div>
        <div className="item" style={{ "--position": 10 }}><img src="images/dragon_10.jpg" alt="" /></div>
      </div>
      <div className="content">
        <h1 data-content="Intelli Cart">Intelli Cart</h1>
        <div className="model"></div>
      </div>
    </div>
    </div>
  );
};

export default BannerComponent;

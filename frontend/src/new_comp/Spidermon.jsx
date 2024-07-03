import React, { useEffect, useRef } from 'react';
import './Spider.css';

const Spider = () => {
  const canvasRef = useRef(null);
  const bannerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const banner = bannerRef.current;
    const ctx = canvas.getContext('2d');
    let dots = [];
    const arrayColors = ['#eee', '#545454', '#596d91', '#bb5a68', '#696541'];

    const resizeCanvas = () => {
      canvas.width = banner.offsetWidth;
      canvas.height = banner.offsetHeight;
      generateDots();
      drawDots();
    };

    const generateDots = () => {
      dots = [];
      for (let index = 0; index < 50; index++) {
        dots.push({
          x: Math.floor(Math.random() * canvas.width),
          y: Math.floor(Math.random() * canvas.height),
          size: Math.random() * 3 + 5,
          color: arrayColors[Math.floor(Math.random() * 5)],
        });
      }
    };

    const drawDots = () => {
      dots.forEach(dot => {
        ctx.fillStyle = dot.color;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const handleMouseMove = (event) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawDots();
      const mouse = {
        x: event.pageX - banner.getBoundingClientRect().left,
        y: event.pageY - banner.getBoundingClientRect().top,
      };
      dots.forEach(dot => {
        const distance = Math.sqrt((mouse.x - dot.x) ** 2 + (mouse.y - dot.y) ** 2);
        if (distance < 300) {
          ctx.strokeStyle = dot.color;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(dot.x, dot.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      });
    };

    const handleMouseOut = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawDots();
    };

    window.addEventListener('resize', resizeCanvas);
    banner.addEventListener('mousemove', handleMouseMove);
    banner.addEventListener('mouseout', handleMouseOut);

    resizeCanvas();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      banner.removeEventListener('mousemove', handleMouseMove);
      banner.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <div className="banner" ref={bannerRef}>
      <h5>@Lundeveloper</h5>
      <div>
        <h1 className="left">ANIMATION spider man</h1>
        <h1 className="right">using JAvascript</h1>
      </div>
      <h4>
        Subscribe to the channel to continuously
        <br />
        update interesting videos
      </h4>
      <button>Subscribe Now &#8599;</button>
      <canvas id="dotsCanvas" ref={canvasRef}></canvas>
    </div>
  );
};

export default Spider;

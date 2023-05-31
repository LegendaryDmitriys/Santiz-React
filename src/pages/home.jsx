import React, { useState } from "react";
import "./scss/home.scss";
import NavBar from "./navbar";

function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const newX = ((window.innerWidth / 2 - e.clientX) * 0.1).toFixed(2);
    const newY = ((window.innerHeight / 2 - e.clientY) * 0.1).toFixed(2);
    setMousePosition({ x: newX, y: newY });
  };

  return (
    <div>
    <div onMouseMove={handleMouseMove}>
      <section className="Homepage">
        <div className="wrapper">
        <div className="content"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          }}
        >
          <div className="content-left">
            <img src="https://ie.wampi.ru/2023/05/20/Vector.png" alt="" />
            <img
              src="https://ie.wampi.ru/2023/03/25/site-1.png"
              alt="left background"
            />
          </div>
          <div className="content-right">
            <img
              src="https://ic.wampi.ru/2023/03/25/Legendarys_A_lone_52_hertz_whale_swims_alonelogo_for_sitevector_83dbef87-9d72-4999-9c83-1929c776a4bd-transformed-1.png"
              alt="right background"
            />
          </div>
        </div>
        </div>
      </section>
    </div>
    </div>
  );
}

export default Home;

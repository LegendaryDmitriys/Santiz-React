import React, { useState, useEffect } from "react";
import "./scss/tour.scss";
import Footer from "./footer";
import { Link } from 'react-router-dom';




function Tour() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllTours();
  }, []);

  const getAllTours = async () => {
    try {
      const response = await fetch("http://95.213.151.174//tour.php");
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error(error);
    }
  };

  const upcomingConcerts = data.filter((tour) => {
    // console.log(`upcoming tour: ${tour.id}, iz_past: ${tour.iz_past}`);
    return tour.iz_past !== 't';
  });
  
  const pastConcerts = data.filter((tour) => {
   // console.log(`past tour: ${tour.id}, iz_past: ${tour.iz_past}`);
    return tour.iz_past === 't';
  });

  return (
    <div>
      {upcomingConcerts.length > 0 && (
  <section>
    <div className="wrapper_tickets">
    <h2>ПРЕДСТОЯЩИЕ КОНЦЕРТЫ</h2>
      <div className="content_tickets">
        {upcomingConcerts.map((tour) => (
          <div key={tour.id} className="content_info_tickets">
            <div className="content_info_tickets_left">
              <p className="content_info_tickets__text">{tour.date}</p>
              <p className="content_info_tickets__text">{tour.time}</p>
            </div>
            <div className="content_info_tickets_mid">
              <p className="content_info_tickets__text">
                {tour.city}, {tour.country}
              </p>
              <p className="content_info_tickets__text">{tour.venue}</p>
            </div>
            <div className="content_info_tickets_right">
            <Link to={`/tour/${tour.id}`}>
                <button>ИНФОРМАЦИЯ</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)}
{pastConcerts.length > 0 && (
  <section>
    <div className="wrapper_tickets">
      <h2>ПРОШЕДШИЕ КОНЦЕРТЫ</h2>
      <div className="content_tickets">
        {pastConcerts.map((tour) => (
          <div key={tour.id} className="content_info_tickets">
            <div className="content_info_tickets_left">
              <p className="content_info_tickets__text">{tour.date}</p>
              <p className="content_info_tickets__text">{tour.time}</p>
            </div>
            <div className="content_info_tickets_mid">
              <p className="content_info_tickets__text">
                {tour.city}, {tour.country}
              </p>
              <p className="content_info_tickets__text">{tour.venue}</p>
            </div>
            <div className="content_info_tickets_right">
               <Link to={`/tour/${tour.id}`}>
                <button>ИНФОРМАЦИЯ</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)}
    <Footer/>
    </div>
  );
}

export default Tour;

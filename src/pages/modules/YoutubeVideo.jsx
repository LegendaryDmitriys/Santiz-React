import React, { useState, useRef } from 'react';
import YouTube from 'react-youtube';
import Slider from 'react-slick';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { AiOutlineClose, AiOutlinePlayCircle } from "react-icons/ai";
import './video1.scss';

const BackgroundVideo = () => {
  const videoIds = ['ZKrsXE-D6fg', 'aadfKEfxxoM', 'IuV3-lZJUeQ','dPDqASjipHw']; 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const handlePlayerReady = (event) => {
    const iframe = event.target.getIframe();
    const origin = window.location.origin;
    iframe.setAttribute('origin', origin);
    iframe.src = `${iframe.src}&origin=${encodeURIComponent(origin)}`;
  };
  
  
  

  const openModal = (videoId) => {
    setSelectedVideoId(videoId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedVideoId('');
    setIsModalOpen(false);
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const handleVideoClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleIframeMouseEnter = () => {
    if (isModalOpen) {
      setIsModalOpen(false);
    }
  };

  const handleIframeMouseLeave = () => {
    if (!isModalOpen) {
      setIsModalOpen(true);
    }
  };

  const modalStyles = {
    display: isModalOpen ? 'block' : 'none',
  };

  const autoplayOptions = {
    height: '900',
    width: '1700',
    playerVars: {
      autoplay: 1,
      loop: 1,
      mute: 1,
      controls: 0,
      showinfo: 0,
      rel: 0,
      modestbranding: 1,
      origin: window.location.origin,
      playlist: videoIds.join(','),
    },
  };

  const modalOptions = {
    height: '600',
    width: '1300',
    playerVars: {
      autoplay: 0,
      controls: 1,
      loop: 1,
    },
  };

  const playerOptions = {
    ...autoplayOptions,
    playerVars: {
      ...autoplayOptions.playerVars,
      showinfo: 0,
      controls: 0,
      modestbranding: 1,
      origin: window.location.origin,
    },
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: currentSlide,
    arrows: false, 
    beforeChange: (currentSlide, nextSlide) => {
      setCurrentSlide(nextSlide);
      const videoElements = document.getElementsByClassName('slick-slide');
      videoElements[nextSlide].classList.add('next-video');
    },
    afterChange: (currentSlide) => {
      setCurrentSlide(currentSlide);
      const videoElements = document.getElementsByClassName('slick-slide');
      Array.from(videoElements).forEach((videoElement) =>
        videoElement.classList.remove('next-video')
      );
      sliderRef.current.slickGoTo(currentSlide);
    },
  };
  

  return (
    <div className="video-container" style={{ width: '1700px' }}>
      <div className="slider-container">
        <FaArrowLeft  size={50} className="slider-arrow left" onClick={() => sliderRef.current.slickPrev()}  style={{ left: '0' }} />
        <Slider ref={sliderRef} {...sliderSettings}>
          {videoIds.map((videoId, index) => (
            <div key={videoId} className={`video-slide ${index === currentSlide ? 'active' : ''}`}>
              <div className="video-overlay" onClick={() => openModal(videoId)}>
                <button className="play-button"><AiOutlinePlayCircle size={80}/></button>
              </div>
              <div className="youtube-overlay">
                <YouTube
                  videoId={videoId}
                  opts={playerOptions}
                  onClick={handleVideoClick}
                  onMouseEnter={handleIframeMouseEnter}
                  onMouseLeave={handleIframeMouseLeave}
                  onReady={handlePlayerReady}
                />
              </div>
            </div>
          ))}
        </Slider>
        <FaArrowRight size={50} className="slider-arrow right" onClick={() => sliderRef.current.slickNext()} style={{ right: '0' }}/>
      </div>
      {isModalOpen && (
        <div className="modal-video_overlay" onClick={closeModal}>
          <div className="modal-video" onClick={handleModalClick}>
            <div className="modal_video">
              <YouTube videoId={selectedVideoId} opts={modalOptions} />
              <button className="close-button" onClick={closeModal}>
                <AiOutlineClose size={30}/>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BackgroundVideo;

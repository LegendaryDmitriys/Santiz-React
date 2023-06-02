import React, { useState, useEffect, useRef, } from "react";
import "./scss/albums.scss";
import Footer from "./footer";


function Albums() {
  const [albums, setAlbums] = useState([]);
  const [currentTracks, setCurrentTracks] = useState([]);
  const [activeTrackId, setActiveTrackId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);

  

  useEffect(() => {
    getAllAlbums();
  }, []);

  const getAllAlbums = async () => {
    const response = await fetch("http://95.213.151.174//api.php");
    const jsonData = await response.json();
    setAlbums(jsonData);
  };

  const AlbumsModalOpen = async (albumId) => {
    const response = await fetch(`http://95.213.151.174//api.php?album_id=${albumId}`);
    const jsonData = await response.json();
    setCurrentTracks(jsonData);
    setShowModal(true);

  };


  const getAlbumImageUrl = (albumId) => {
    const album = albums.find((album) => album.id === albumId);
    if (album) {
      return album.image_url;
    }
    return "";
  };

  const TrackClick = (trackUrl,trackId) => {
    if (audio && audio.src === trackUrl) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
      setIsPlaying(!isPlaying);
    } else {
      if (audio) {
        audio.pause();
        setIsPlaying(false);
        
      }
      if (trackId === activeTrackId) {
        setActiveTrackId(null);

        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      } else {
        setActiveTrackId(trackId);
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
        audioRef.current = new Audio(trackUrl);
        audioRef.current.play();
      } 
    }
  };
  const CloseModalTracks = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setActiveTrackId(null); 
    setShowModal(false);
  };

const VolumeChange = (event) => {
  const newVolume = event.target.value;
  setVolume(newVolume);
  if (audioRef.current) {
    audioRef.current.volume = newVolume;
  }
};


  return (
    <div>
      <section>
        <div className="wrapper-cards">
          {albums.map((album) => (
            <div key={album.id} className="Cards-content">
              <img src={album.image_url} alt="" />
              <div className="content-all">
                <div className="content-left">
                  <p>ПРОДОЛЖИТЕЛЬНОСТЬ</p>
                  <p>ДАТА РЕЛИЗА</p>
                </div>
                <div className="content-right">
                  <p>{album.duration}</p>
                  <p>{album.release_date}</p>
                </div>
              </div>
              <div className="button">
                <button onClick={() => AlbumsModalOpen(album.id)}>Прослушать</button>
              </div>
            </div>
          ))}
        </div>
      </section>
      {showModal && (
        <div className="modal-track">
          <div className="modal-content_track">
            <span className="close" onClick={() => CloseModalTracks()}><svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg></span>
              <div className="volume-control">
                <label htmlFor="volume"><svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 96 960 960" width="48"><path d="M560 925v-62q97-28 158.5-107.5T780 575q0-101-61-181T560 287v-62q124 28 202 125.5T840 575q0 127-78 224.5T560 925ZM120 696V456h160l200-200v640L280 696H120Zm420 48V407q55 17 87.5 64T660 576q0 57-33 104t-87 64ZM420 408 307 516H180v120h127l113 109V408Zm-94 168Z"/></svg></label>
                  <input 
                    type="range"
                    id="volume"
                    name="volume"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={VolumeChange}
                  />
            </div>
            {currentTracks.map((track) => (
        <div key={track.id} className="track">
          <div className={`item${track.id === activeTrackId ? ' active' : ''}`}  style={{ backgroundColor: track.id === activeTrackId ? '#326CF9' : '#000' }}> 
            <article className="title">
            <div className="album-item">
              <img src={getAlbumImageUrl(track.album_id)} alt="" />
              <span onClick={() => TrackClick(track.track_url, track.id)}>
                {track.id === activeTrackId ? 
                  <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 96 960 960" width="40"><path d="M525 856V296h235v560H525Zm-325 0V296h235v560H200Zm385-60h115V356H585v440Zm-325 0h115V356H260v440Z"/></svg> 
                  : 
                  <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 96 960 960" width="40"><path d="M320 853V293l440 280-440 280Zm60-280Zm0 171 269-171-269-171v342Z"/></svg>
                }
              </span>
              </div>
              <p className="track-text">{track.name}</p>
            </article>
          </div>
        </div>
      ))}
          </div>
        </div>
      )}
      <Footer/>
    </div>
  );
}

export default Albums;
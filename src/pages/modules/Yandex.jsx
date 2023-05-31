import React, { useState } from 'react';



function AlbumWidgetModal () {
    const AlbumWidgetModal = ({ albumId }) => {
        const [isOpen, setIsOpen] = useState(false);
      
        const toggleModal = () => {
          setIsOpen(!isOpen);
        };
      
        return (
          <>
            <button onClick={toggleModal}>Открыть виджет Яндекс.Музыки</button>
            {isOpen && (
              <div className="modal">
                <div className="modal-content">
                  <iframe
                    title="album-widget"
                    width="100%"
                    height="400"
                    frameborder="0"
                    allowtransparency="true"
                    allow="encrypted-media"
                    src={`https://music.yandex.ru/iframe/#album/${albumId}`}
                  ></iframe>
                  <button onClick={toggleModal}>Закрыть</button>
                </div>
              </div>
            )}
          </>
        );
      };
}

export default AlbumWidgetModal;

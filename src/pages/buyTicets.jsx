import React, { useState, useEffect } from 'react';
import "./scss/buyticets.scss"
import { useParams } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
function ConcertTicket() {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [numSeats, setNumSeats] = useState(0);
    const [descriptionVisible, setDescriptionVisible] = useState(true);
    const [ticketVisible, setTicketVisible] = useState(false);
    const [eventInfo, setEventInfo] = useState(null)

    const { id } = useParams();


    useEffect(() => {

        const fetchEventInfo = async () => {
          try {
            const response = await fetch(`http://192.168.0.104/tour-info.php?id=${id}`); 
            const data = await response.json();
            setEventInfo(data); 
          } catch (error) {
            console.log('Error fetching event information:', error);
          }
        };
    
        fetchEventInfo();
      }, [id]);



    function handleSeatClick(seat) {
        if (selectedSeats.includes(seat)) {
            setSelectedSeats(selectedSeats.filter(s => s !== seat));
            setNumSeats(numSeats - 1);
        } else {
            setSelectedSeats([...selectedSeats, seat]);
            setNumSeats(numSeats + 1);
        }
    }

    const handleDescriptionClick = () => {
        setDescriptionVisible(true);
        setTicketVisible(false);
      };

      const handleTicketClick = () => {
        setDescriptionVisible(false);
        setTicketVisible(true);
      };
    


    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
  
    const handleOpenModal = () => {
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Дополнительная обработка данных заказа (например, отправка на сервер)
  
      // Сброс значений полей после отправки заказа
      setName("");
      setSurname("");
      setEmail("");
      setPhone("");
  
      // Закрытие модального окна
      setShowModal(false);
    };






    return (
        <div>
            {eventInfo && (
            <div key={eventInfo.id} className='wrap'>
            <section className='tickets__pages'>
                    <div className='event-header__info-container'>
                        <div className='event-header__left-col'>
                            <img className='event-header__cover' src={eventInfo.image_url} alt="cover" />
                        </div>
                        <div>
                            <h1 className='event-header__title'>Santiz</h1>
                            <p className='event-header__type'>Концерт</p>
                            <div className='desktop event-header__desktop-age'>
                                <div className='event-header__age'>{eventInfo.refund_policy}</div>
                            </div>
                            <div className='event-header__info'>
                                <p className='event-header__info-item'>  
                                <svg className='event-header__icon' xmlns="http://www.w3.org/2000/svg" height="25" viewBox="0 96 960 960" width="25"><path d="M180 976q-24 0-42-18t-18-42V296q0-24 18-42t42-18h65v-60h65v60h340v-60h65v60h65q24 0 42 18t18 42v620q0 24-18 42t-42 18H180Zm0-60h600V486H180v430Zm0-490h600V296H180v130Zm0 0V296v130Zm300 230q-17 0-28.5-11.5T440 616q0-17 11.5-28.5T480 576q17 0 28.5 11.5T520 616q0 17-11.5 28.5T480 656Zm-160 0q-17 0-28.5-11.5T280 616q0-17 11.5-28.5T320 576q17 0 28.5 11.5T360 616q0 17-11.5 28.5T320 656Zm320 0q-17 0-28.5-11.5T600 616q0-17 11.5-28.5T640 576q17 0 28.5 11.5T680 616q0 17-11.5 28.5T640 656ZM480 816q-17 0-28.5-11.5T440 776q0-17 11.5-28.5T480 736q17 0 28.5 11.5T520 776q0 17-11.5 28.5T480 816Zm-160 0q-17 0-28.5-11.5T280 776q0-17 11.5-28.5T320 736q17 0 28.5 11.5T360 776q0 17-11.5 28.5T320 816Zm320 0q-17 0-28.5-11.5T600 776q0-17 11.5-28.5T640 736q17 0 28.5 11.5T680 776q0 17-11.5 28.5T640 816Z" /></svg>{eventInfo.date}</p>
                                <div className='event-header__info-item'>
                                    <p className="event-header__seance-times">
                                <svg  className='event-header__icon' xmlns="http://www.w3.org/2000/svg" height="25" viewBox="0 96 960 960" width="25"><path d="m627 769 45-45-159-160V363h-60v225l174 181ZM480 976q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-82 31.5-155t86-127.5Q252 239 325 207.5T480 176q82 0 155 31.5t127.5 86Q817 348 848.5 421T880 576q0 82-31.5 155t-86 127.5Q708 913 635 944.5T480 976Zm0-400Zm0 340q140 0 240-100t100-240q0-140-100-240T480 236q-140 0-240 100T140 576q0 140 100 240t240 100Z"/></svg>{eventInfo.time}</p>
                                </div>
                                <a  className='event-header__location-link' href=""> 
                            <svg className='event-header__icon' xmlns="http://www.w3.org/2000/svg" height="25" viewBox="0 96 960 960" width="25"><path d="m438 615 192-192-43-43-149 149-65-65-43 43 108 108Zm42 282q133-121 196.5-219.5T740 504q0-118-75.5-193T480 236q-109 0-184.5 75T220 504q0 75 65 173.5T480 897Zm0 79Q319 839 239.5 721.5T160 504q0-150 96.5-239T480 176q127 0 223.5 89T800 504q0 100-79.5 217.5T480 976Zm0-472Z"/></svg>{eventInfo.venue}</a>
                            </div>
                        </div>
                    </div>
                    <div className='event-header__purchase'>
                            <div className='event-header__price-info'>
                                <p className='event-header__price'>1000-2000р</p>
                                <p className='event-header__commission'>Сервисный сбор 10%</p>
                            </div>
                            <button className='event-header__buy-btn'>Купить билет</button>
                    </div>
            </section>
            <b className='event-page-message'>Обратите, пожалуйста, внимание, что билеты, приобретенные по акции или по промо-коду, возврату не подлежат.</b>
            <div className='event-page__tabs'>
                <button className="tabs__btn" onClick={handleTicketClick}>Билеты</button>
                <button className="tabs__btn" onClick={handleDescriptionClick}>Описание</button>
            </div>
            {ticketVisible && (
            <section className="concert-ticket-purchase-page">
                <h2>Ряд 1</h2>
                <div className="seating-chart">
                  <div className="row">
                    <div
                      className={`seat ${selectedSeats.includes('A1') ? 'selected' : ''}`}
                      onClick={() => handleSeatClick('A1')}
                    >
                      {eventInfo.seat_number}
                      
                    </div>
                  </div>
                </div>
                <div className="selected-seats">
                    <h2>Выбранные места:</h2>
                    <p>{selectedSeats.join(', ')}</p>
                    <p>Общее количество выбраных билетов: {numSeats}</p>
                </div>
                <button className="seats-buy" onClick={handleOpenModal}>Оформить заказ</button>
                
                {showModal && (
        <div className="modal-tickets">
          <div className="modal-content-tickets">
            <h2>Оформление заказа</h2>
            <form className="modal-tickets-form" onSubmit={handleSubmit}>
              <label>
                Имя:
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              <label>
                Фамилия:
                </label>
                <input
                  type="text"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  required
                />
              <label>
                Почта:
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              <label>
                Номер телефона:
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              <button className="seats-buy" type="submit">Отправить заказ</button>
            </form>
            <button className='modal-tickets-btn__close' onClick={handleCloseModal}><AiOutlineClose size={30}/></button>
          </div>
        </div>
      )}
            </section>
            )}
             {descriptionVisible && (
                 <section className="concert-ticket-purchase-page">
                    <p className='concert-ticket_desc'>{eventInfo.description}</p>
                 </section>
                      )}
            </div>
            )}
        </div>
  );
}

export default ConcertTicket;
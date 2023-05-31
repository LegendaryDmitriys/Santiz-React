import React, { useState, useEffect } from "react";
import "./scss/merch.scss";
import About_Product from "./about_product";


function Merch() {
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [isSortedAsc, setIsSortedAsc] = useState(true);
  const [isSortQuantity, setIsSortQuantity] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);




  useEffect(() => {
    getAllMerch();
  }, []);

  const getAllMerch= async () => {
    try {
      const response = await fetch("http://192.168.0.104//merch.php");
      const jsonData = await response.json();
      setData(jsonData);
      setSortedData(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  const SortByPrice = async () => {
    const cards = document.querySelectorAll(".card__merch");
    const sorted = [...sortedData].sort((a, b) =>
      isSortedAsc ? a.discounted_price - b.discounted_price : b.discounted_price - a.discounted_price
    );
    setIsSortedAsc(!isSortedAsc);
  
    // Запускаем анимацию прятания карточек
    const animationPromises = [];
    cards.forEach((card, index) => {
      const promise = new Promise((resolve) => {
        setTimeout(() => {
          card.style.opacity = "0";
          setTimeout(() => {
            card.style.transform = "translateY(-20px)";
            resolve();
          }, 500);
        }, index * 100);
      });
      animationPromises.push(promise);
    });
  
    // Дожидаемся завершения анимации
    await Promise.all(animationPromises);
  
    // Обновляем данные и запускаем анимацию появления карточек
    setSortedData(sorted);
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = "none";
      }, index * 100);
    });
  };
  
  const handleCardClick = (merch) => {
    setSelectedItem(merch);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const QuantitySort = () => {
    const sortedData = [...data].sort((a, b) => {
      return isSortQuantity ? a.quantity - b.quantity : b.quantity - a.quantity;
    });
    setData(sortedData);
    setIsSortQuantity(!isSortQuantity);
  };

  return (
    <div>
      <section>
        <div className="wrapper-merch">
          <div className="title-merch">
            <p>Сортировать: </p>
            <ul>
                <li><a href="#" onClick={SortByPrice}>Цена</a></li>
                <li><a href="#" onClick={QuantitySort}>В наличии</a></li>
            </ul>
          </div>
          <div className="cards">
            {sortedData.map((merch) => (
             <div key={merch.id} className="card__merch" onClick={() => handleCardClick(merch)}>
                <div className="card__top">
                  <a href="#" className="card__image">
                    <img src={merch.image_url} alt={merch.name} />
                  </a>
                  {merch.discount_percent > 0 && (
                    <div className="card__label">-{merch.discount_percent}%</div>
                  )}
                </div>
                <div className="card__bottom">
                  {merch.quantity === 0 && (
                    <div className="card__out-of-stock">Товар закончился</div>
                  )}
                  <div className="card__prices">
                    {merch.discount_percent > 0 ? (
                      <>
                        <div className="card__price card__price--cost">
                          {merch.discounted_price}₽
                        </div>
                        <div className="card__price card__price--common">
                          {merch.price}₽
                        </div>
                      </>
                    ) : (
                      <div className="card__price">{merch.price}₽</div>
                    )}
                  </div>
                  <a href="#" className="card__title">
                    {merch.type} {merch.name}
                  </a>
                  <button className="card__add">Подробнее</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {isModalOpen && selectedItem && (
        <div className={`modal__merch ${isModalOpen ? 'open' : ''}`}>
          <div className="modal__overlay" onClick={handleCloseModal}></div>
          <div className="modal__content">
          <span className="modal_close" onClick={() => handleCloseModal()}><svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg></span>
            <About_Product item={selectedItem} />
          </div>
        </div>
    )}
  </div>
  );
}

export default Merch;


import React, {useState, useEffect} from "react";
import './scss/history.scss';

import User_Panel from "./modules/userpanel";
import jwt_decode from 'jwt-decode';

function HistoryBasket() {
    const [successfulOrder, setSuccessfulOrder] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const token = localStorage.getItem("loginToken");
            if (token) {
              const decodedToken = jwt_decode(token);
              const userId = decodedToken.data.user_id;
    
              const basketResponse = await fetch(`http://192.168.0.104/get_merch.php?user_id=${userId}`);
              const basketData = await basketResponse.json();
    
              const response = await fetch(`http://192.168.0.104/history_orders.php?user_id=${userId}`);
              const ordersData = await response.json();
    
              const mergedData = ordersData.map(order => {
                const correspondingBasketItem = basketData.find(item => item.id === order.merch_id);
                if (correspondingBasketItem) {
                  return {
                    ...correspondingBasketItem,
                    image_url: correspondingBasketItem.image_url,
                    user_id: correspondingBasketItem.user_id,
                    name: correspondingBasketItem.name,
                    quantity: order.quantity,
                    selected_size: order.selected_size,
                    purchase_date: order.purchase_date,
                    total_price: order.total_price,
                  };
                }
                return order;
              });
              
              setSuccessfulOrder(mergedData);
              
            }
          } catch (error) {
            console.error("Ошибка при получении данных: ", error);
          }
        };

    fetchData();
  }, []);

    
    return (
        <div>
            <div className="setting__wrapper">
                <User_Panel/>
                <div className="card">
                    <div className="card__header">
                        <div className="cart-header__type">Товар</div>
                        <div className="cart-header__title">Наименование</div>
                        <div className="cart-header__count">Количество</div>
                        <div className="cart-header__size">Размер</div>
                        <div className="cart-header__cost">Стоимость</div>
                        <div className="cart-header__delete">Дата покупки</div>
                    </div>
                        {successfulOrder.map(item => (
                        <div key={[item.id, item.purchase_date, item.selected_size]} className="product_card">
                            <div className="product__img"><img src={item.image_url}alt=""/></div>
                            <div className="product__title">{item.name}</div>
                            <div className="product__count">
                                <div className="count">
                                    {item.quantity}
                                </div>
                            </div>
                            <div className="product__size">
                                <div className="card__text">{item.selected_size}</div>
                            </div>
                            <div className="product__price">{item.total_price}</div>
                            <div className="product__date">{item.purchase_date}</div>
                            </div>
                        ))}
                        </div>
                </div>
            </div>
    )
}

export default HistoryBasket;
import React, {useState,useEffect} from "react";
import './scss/card.scss';

import User_Panel from "./modules/userpanel";
import jwt_decode from 'jwt-decode';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Basket () {

  const [quantity, setQuantity] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [mergedData, setMergedData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("loginToken");
        if (token) {
          const decodedToken = jwt_decode(token);
          const userId = decodedToken.data.user_id;
  
          const basketResponse = await fetch(`http://192.168.0.104/auth-api/basket.php?user_id=${userId}`);
          const basketData = await basketResponse.json();
          const ordersResponse = await fetch(`http://192.168.0.104/orders.php?user_id=${userId}`);
          const ordersData = await ordersResponse.json();
  
          
          const mergedData = basketData.reduce((result, item) => {
            const correspondingOrders = ordersData.filter(order => order.merch_id === item.id);
            const correspondingMerch = basketData.find(merch => merch.id === item.id);
            if (correspondingOrders && correspondingOrders.length > 0 && correspondingMerch) {
              correspondingOrders.forEach(order => {
                const existingItem = result.find(
                  mergedItem => mergedItem.id === `${item.id}_${order.selected_size}`
                );
                if (!existingItem) {
                  result.push({
                    ...item,
                    id: `${item.id}_${order.selected_size}`, // Уникальный идентификатор с учетом размера
                    selected_size: order.selected_size,
                    discounted_price: correspondingMerch.discounted_price,
                  });
                }
              });
            } else {
              result.push(item);
            }
            return result;
          }, []);
          
          
          
          
          
  
          const quantity = mergedData.reduce((acc, item) => {
            acc[item.id] = 1;
            return acc;
          }, {});
          setQuantity(quantity);
  
          let totalPrice = 0;
          mergedData.forEach(item => {
            totalPrice += quantity[item.id] * (item.discounted_price || item.price);
          });
          setTotalPrice(totalPrice);
  
          setMergedData(mergedData);
        }
      } catch (error) {
        toast.error("Ошибка при извлечении данных: ", error);
      }
    };
  
    fetchData();
  }, []);
  
 
 
  
  const handleDelete = async (itemId) => {
    try {
      const token = localStorage.getItem("loginToken");
      if (token) {
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.data.user_id;
        const [itemIdWithoutPrefix, selectedSize] = itemId.split("_");
        const request = {
          user_id: userId, 
          item_id: itemIdWithoutPrefix, 
          selected_size: selectedSize 
        };
  
        try {
   
          const response = await fetch('http://192.168.0.104/deletproduct.php', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(request)
          });
  
          const updatedMergedData = mergedData.filter(
            item => item.id !== itemId || item.selected_size !== selectedSize
          );

          setMergedData(updatedMergedData);

          console.log(mergedData);
          console.log(updatedMergedData);

          const updatedQuantity = { ...quantity };
          delete updatedQuantity[itemId];
          setQuantity(updatedQuantity);

          let totalPrice = 0;
          updatedMergedData.forEach(item => {
            totalPrice += updatedQuantity[item.id] * (item.discounted_price || item.price);
          });
          setTotalPrice(totalPrice);
        
          const data =  response.json();
          // Проверяем статус ответа
          if (response.ok) {
            // Успешное удаление
            toast.success(data.message);
            // Добавьте здесь код обновления состояния компонента после успешного удаления
            
          } else {
            // Ошибка при удалении
            toast.error(data.message);
          }
        } catch (error) {
          console.error('Ошибка при выполнении запроса:');
        }
      }
    } catch (error) {
      console.error('Ошибка при получении токена:', error);
    }
  };
  
  
        
  
  
  
  const handleQuantityChange = (change, id) => {
    const newQuantity = { ...quantity };
    newQuantity[id] = (newQuantity[id] || 0) + change;
  
    if (newQuantity[id] < 1) {
      return;
    }
  
    setQuantity(newQuantity);
  
    let totalPrice = 0;
    const updatedMergedData = mergedData.map(item => {
      if (item.id === id) {
        item.quantity = newQuantity[id];
      }
      totalPrice += item.quantity * (item.discounted_price || item.price);
      return item;
    });
  
    if (!mergedData.some(item => item.id === id)) {
      // Добавить новый элемент в mergedData, если он не существует
      updatedMergedData.push({
        ...mergedData.find(item => item.id === id),
        quantity: newQuantity[id],
      });
    }
  
    setMergedData(updatedMergedData);
    setTotalPrice(totalPrice);
  }; 
  
  
  
  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("loginToken");
      if (token) {
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.data.user_id;
  
        const itemIds = mergedData.map(item => item.id.split("_")[0]);
        const itemSizes = mergedData.map(item => item.selected_size);
        const itemQuantities = mergedData.map(item => (quantity[item.id] > 0 ? quantity[item.id] : 1));
        const itemPrices = mergedData.map(item => item.discounted_price || item.price);
  
        const requestBody = {
          user_id: userId,
          item_ids: itemIds,
          item_sizes: itemSizes,
          item_quantities: itemQuantities,
          item_prices: itemPrices.map((price, index) => price * itemQuantities[index]), // Умножение цены на количество
        };
  
        const response = await fetch("http://192.168.0.104/successful_orders.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });
  
        if (response.ok) {
          // Товар успешно добавлен в таблицу успешных заказов
          toast.success("Товар успешно добавлен в таблицу успешных заказов");
       
          // Используйте индивидуальные цены здесь или выполните другие действия после успешного оформления заказа
          mergedData.forEach((item, index) => {
            console.log(`Цена для товара ${item.id}: ${itemPrices[index] * itemQuantities[index]}`);
          });
        } else {
          // Произошла ошибка при добавлении товара в таблицу успешных заказов
          toast.error("Ошибка при добавлении товара в таблицу успешных заказов");
        }
      }
    } catch (error) {
      toast.error("Ошибка при отправке запроса на сервер: ", error);
    }
  };
  
  
    return(
        <div>
        <div className="card__wrapper">
          <User_Panel/>
          <div className="card">
            <ToastContainer />
            <div className="card__header">
            <div className="cart-header__type">Товар</div>
              <div className="cart-header__title">Наименование</div>
              <div className="cart-header__count">Количество</div>
              <div className="cart-header__size">Размер</div>
              <div className="cart-header__cost">Стоимость</div>
              <div className="cart-header__delete">Удалить</div>
            </div>
            {mergedData.map((item) => (
                <div key={item.id} className="product_card">
                  <div className="product__img"><img src={item.image_url} alt=""/></div>
                  <div className="product__title">{item.name}</div>
                  <div className="product__count">
                    <div className="count">
                      <div className="count__controls">
                        <a onClick={() => handleQuantityChange(-1, item.id)}><svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 96 960 960" width="48"><path d="M200 606v-60h560v60H200Z"/></svg></a>
                        <span>{quantity[item.id] || 1}</span>
                        <a onClick={() => handleQuantityChange(1, item.id)}><svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 96 960 960" width="48"><path d="M450 856V606H200v-60h250V296h60v250h250v60H510v250h-60Z"/></svg></a>
                      </div>
                    </div>
                  </div>
                  <div className="product__size">
                    <div className="card__text">{item.selected_size}</div>
                  </div>
                  <div className="product__price">{item.discounted_price ? item.discounted_price : item.price}</div>
                  <div className="product__controls">
                    <button onClick={() => handleDelete(item.id)}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18" stroke="#7E9BBD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6 6L18 18" stroke="#7E9BBD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
            ))}
            <div className="card__categ-under">
              <div className="basket_total">
                <h2>Общий итог: {totalPrice} <span>₽</span></h2>
              </div>
              <button onClick={() => handleCheckout()}>Перейти к оплате</button>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Basket;
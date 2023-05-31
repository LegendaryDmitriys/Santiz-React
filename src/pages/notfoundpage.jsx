import React from "react";
import "./scss/notfoundpage.scss"


function NotFoundPage() {
    return (
      <div>
        <div className="notfound-content">
            <article>
                <h1>Страница не найдена</h1>
                <p>Запрошенная вами страница не найдена</p>
            </article>
            <img src="https://ic.wampi.ru/2023/03/25/Legendarys_A_lone_52_hertz_whale_swims_alonelogo_for_sitevector_83dbef87-9d72-4999-9c83-1929c776a4bd-transformed-1.png" alt="" />
        </div>
        <button className="notfound-btn">Вернуться на главную</button>
      </div>
    );
  }

  export default NotFoundPage;
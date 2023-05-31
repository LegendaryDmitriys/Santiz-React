import React, { useState } from "react";
import "../scss/modal_mailing.scss";


function Mailing() {
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
  

  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    alert("Введите корректный email адрес.");
    return;
  }};

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };




  return (
    <div className="form-mailing">
      <div className="form-panel_modal">
        <div className="form-header">
          <h1>Рассылка новостей</h1>
        </div>
        <div className="form-content">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Адрес электронной почты</label>
              <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} required />
            </div>
            <div className="form-group">
              <button type="submit">Подписаться</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Mailing;

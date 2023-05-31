import "../scss/user_panel.scss";
import { Link } from "react-router-dom";
import { useContext } from 'react'
import { UserContext } from "../../context/UserContext";
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const User_Panel = () => {
    const { user, logout } = useContext(UserContext);
    const [avatarUrl, setAvatarUrl] = useState('');
    const [userProfiles, setUserProfiles] = useState(() => {
      const cachedData = localStorage.getItem('userProfiles');
      return cachedData ? JSON.parse(cachedData) : [];
    });
  
    useEffect(() => {
      const token = localStorage.getItem("loginToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.data.user_id;
  
      axios.post('http://192.168.0.104/userpanel.php', null, {
        params: {
          userId: userId
        }
      })
      .then(response => {
        setUserProfiles(response.data);
        localStorage.setItem('userProfiles', JSON.stringify(response.data));
      })
      .catch(error => toast.error(error));
    }, []);


    return (
        <div>
            <div className="profile-wrapper">
                <div className="setting-container">
                    {userProfiles.map(userProfile => (
                        <div key={userProfile.id}>
                          <img className="round" src={userProfile.image_path ? userProfile.image_path : 'http://192.168.0.104/uploads/default-img.png'} alt="user" />
                            <h3>{userProfile.first_name} {userProfile.last_name}</h3>
                        </div>
                        ))}
                    <h3>{user.name}</h3>
                    <h4>{user.email}</h4>
                    <div className="items-dash">
                        <ul>
                            <li>
                                <a>
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 15.75C13.8 15.75 12 15.05 10.6 13.65C9.2 12.25 8.5 10.45 8.5 8.25C8.5 6.05 9.2 4.25 10.6 2.85C12 1.45 13.8 0.75 16 0.75C18.2 0.75 20 1.45 21.4 2.85C22.8 4.25 23.5 6.05 23.5 8.25C23.5 10.45 22.8 12.25 21.4 13.65C20 15.05 18.2 15.75 16 15.75ZM0 31.8V27.1C0 25.9333 0.291667 24.8833 0.875 23.95C1.45833 23.0167 2.3 22.3 3.4 21.8C5.8 20.7333 8.025 19.9667 10.075 19.5C12.125 19.0333 14.1 18.8 16 18.8H17.15C16.95 19.2667 16.8 19.725 16.7 20.175C16.6 20.625 16.5167 21.1667 16.45 21.8H16C14.0667 21.8 12.175 22.0083 10.325 22.425C8.475 22.8417 6.56667 23.5333 4.6 24.5C4.06667 24.7667 3.66667 25.1417 3.4 25.625C3.13333 26.1083 3 26.6 3 27.1V28.8H16.45C16.6167 29.4 16.8167 29.9417 17.05 30.425C17.2833 30.9083 17.5667 31.3667 17.9 31.8H0ZM29.35 34L28.85 30.7C28.2833 30.5333 27.7083 30.2917 27.125 29.975C26.5417 29.6583 26.05 29.3 25.65 28.9L22.9 29.5L21.65 27.4L24 25.2C23.9333 24.9 23.9 24.4833 23.9 23.95C23.9 23.4167 23.9333 23 24 22.7L21.65 20.5L22.9 18.4L25.65 19C26.05 18.6 26.5417 18.2417 27.125 17.925C27.7083 17.6083 28.2833 17.3667 28.85 17.2L29.35 13.9H32.05L32.55 17.2C33.1167 17.3667 33.6917 17.6083 34.275 17.925C34.8583 18.2417 35.35 18.6 35.75 19L38.5 18.4L39.75 20.5L37.4 22.7C37.4667 23 37.5 23.4167 37.5 23.95C37.5 24.4833 37.4667 24.9 37.4 25.2L39.75 27.4L38.5 29.5L35.75 28.9C35.35 29.3 34.8583 29.6583 34.275 29.975C33.6917 30.2917 33.1167 30.5333 32.55 30.7L32.05 34H29.35ZM30.7 27.95C31.9 27.95 32.8667 27.5833 33.6 26.85C34.3333 26.1167 34.7 25.15 34.7 23.95C34.7 22.75 34.3333 21.7833 33.6 21.05C32.8667 20.3167 31.9 19.95 30.7 19.95C29.5 19.95 28.5333 20.3167 27.8 21.05C27.0667 21.7833 26.7 22.75 26.7 23.95C26.7 25.15 27.0667 26.1167 27.8 26.85C28.5333 27.5833 29.5 27.95 30.7 27.95ZM16 12.75C17.3 12.75 18.375 12.325 19.225 11.475C20.075 10.625 20.5 9.55 20.5 8.25C20.5 6.95 20.075 5.875 19.225 5.025C18.375 4.175 17.3 3.75 16 3.75C14.7 3.75 13.625 4.175 12.775 5.025C11.925 5.875 11.5 6.95 11.5 8.25C11.5 9.55 11.925 10.625 12.775 11.475C13.625 12.325 14.7 12.75 16 12.75Z" fill="white"/>
                                </svg>
                                <Link to="/setting">Настройки</Link>
                                </a>
                            </li>
                            <li>
                                <a>
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.85 36C12.8833 36 8.66667 34.2417 5.2 30.725C1.73333 27.2083 0 22.95 0 17.95H3C3 22.1167 4.43333 25.6667 7.3 28.6C10.1667 31.5333 13.6833 33 17.85 33C22.0833 33 25.6667 31.5167 28.6 28.55C31.5333 25.5833 33 21.9833 33 17.75C33 13.6167 31.5167 10.125 28.55 7.275C25.5833 4.425 22.0167 3 17.85 3C15.5833 3 13.4583 3.51667 11.475 4.55C9.49167 5.58333 7.76667 6.95 6.3 8.65H11.55V11.65H1.1V1.25H4.1V6.55C5.83333 4.51667 7.89167 2.91667 10.275 1.75C12.6583 0.583333 15.1833 0 17.85 0C20.35 0 22.7 0.466667 24.9 1.4C27.1 2.33333 29.025 3.60833 30.675 5.225C32.325 6.84167 33.625 8.73333 34.575 10.9C35.525 13.0667 36 15.4 36 17.9C36 20.4 35.525 22.75 34.575 24.95C33.625 27.15 32.325 29.0667 30.675 30.7C29.025 32.3333 27.1 33.625 24.9 34.575C22.7 35.525 20.35 36 17.85 36ZM24.25 26.15L16.55 18.55V7.85H19.55V17.3L26.4 24L24.25 26.15Z" fill="white"/>
                                </svg>
                                <Link to="/historybasket">История</Link>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 40C2.2 40 1.5 39.7 0.9 39.1C0.3 38.5 0 37.8 0 37V11C0 10.2 0.3 9.5 0.9 8.9C1.5 8.3 2.2 8 3 8H8.5V7.5C8.5 5.4 9.225 3.625 10.675 2.175C12.125 0.725 13.9 0 16 0C18.1 0 19.875 0.725 21.325 2.175C22.775 3.625 23.5 5.4 23.5 7.5V8H29C29.8 8 30.5 8.3 31.1 8.9C31.7 9.5 32 10.2 32 11V37C32 37.8 31.7 38.5 31.1 39.1C30.5 39.7 29.8 40 29 40H3ZM3 37H29V11H23.5V15.5C23.5 15.9333 23.3583 16.2917 23.075 16.575C22.7917 16.8583 22.4333 17 22 17C21.5667 17 21.2083 16.8583 20.925 16.575C20.6417 16.2917 20.5 15.9333 20.5 15.5V11H11.5V15.5C11.5 15.9333 11.3583 16.2917 11.075 16.575C10.7917 16.8583 10.4333 17 10 17C9.56667 17 9.20833 16.8583 8.925 16.575C8.64167 16.2917 8.5 15.9333 8.5 15.5V11H3V37ZM11.5 8H20.5V7.5C20.5 6.23333 20.0667 5.16667 19.2 4.3C18.3333 3.43333 17.2667 3 16 3C14.7333 3 13.6667 3.43333 12.8 4.3C11.9333 5.16667 11.5 6.23333 11.5 7.5V8Z" fill="white"/>
                                    </svg>
                                <Link to="/basket">Корзина</Link>
                                </a>
                            </li>
                            <li>
                                <a onClick={logout}>
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 36C2.2 36 1.5 35.7 0.9 35.1C0.3 34.5 0 33.8 0 33V3C0 2.2 0.3 1.5 0.9 0.9C1.5 0.3 2.2 0 3 0H17.55V3H3V33H17.55V36H3ZM27.3 26.75L25.15 24.6L30.25 19.5H12.75V16.5H30.15L25.05 11.4L27.2 9.25L36 18.05L27.3 26.75Z" fill="white"/>
                                    </svg>
                                    Выход
                                </a> 
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
      </div>
    )
}

export default User_Panel;
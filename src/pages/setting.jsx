import React, {useState}from "react";
import './scss/setting.scss';
import axios from 'axios'
import User_Panel from "./modules/userpanel";
import jwt_decode from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Setting() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileUrl, setFileUrl] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const defaultImageUrl = "https://ie.wampi.ru/2023/05/30/default-img.jpg";
    
    const [userData, setUserData] = useState({
      firstName: "",
      lastName: ""
    });
    

    const handleConfirmNewPasswordChange = (event) => {
      setConfirmNewPassword(event.target.value);
    };

    const handleOldPasswordChange = (event) => {
      setOldPassword(event.target.value);
    };
    
    const handleNewPasswordChange = (event) => {
      setNewPassword(event.target.value);
    };
    

    const handlePasswordChangeSubmit = async (event) => {
      event.preventDefault();
      if (newPassword !== confirmNewPassword) {
        toast.error("Новые пароли не совпадают");
        return;
      }
      const token = localStorage.getItem("loginToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.data.user_id;
      try {
        const response = await axios.post("http://192.168.0.104/changePassword.php", {
          userId: userId,
          oldPassword: oldPassword,
          newPassword: newPassword,
        });
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        toast.success("Пароль успешно изменен");
      } catch (error) {
        toast.error("Ошибка изменения пароля");
      }
    };
    


    const handleFirstNameChange = (event) => {
      setFirstName(event.target.value);
    };
    
    const handleLastNameChange = (event) => {
      setLastName(event.target.value);
    };

    const handlePersonalDataSubmit = async (event) => {
      event.preventDefault();
      if (!firstName || !lastName) {
        toast.error("Введите имя и фамилию");
        return;
      }
      const token = localStorage.getItem("loginToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.data.user_id;
      try {
        const response = await axios.post("http://192.168.0.104/PersonalData.php", {
          userId: userId,
          firstName: firstName,
          lastName: lastName,
        });
        // обновляем переменные состояния в React для отображения новых данных
        setFirstName(firstName);
        setLastName(lastName);
        setUserData({ firstName: firstName, lastName: lastName });
        toast.success("Данные успешно обновленны")
      } catch (error) {
        toast.error("Ошибка сохранения данных");
      }
    };


    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
      setFileUrl(URL.createObjectURL(event.target.files[0]));
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      if (!selectedFile) {
        toast.error("Выберите файл");
        return;
      }
      const formData = new FormData();
      formData.append("file", selectedFile);
      try {
        const response = await axios.post("http://192.168.0.104/addfile.php", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setFileUrl(response.data.fileUrl);
        // отправляем запрос на сервер с url картинки, чтобы сохранить ее в базе данных
        const token = localStorage.getItem("loginToken");
          const decodedToken = jwt_decode(token);
          const userId = decodedToken.data.user_id;
        await axios.post("http://192.168.0.104/settings.php", {
          userId: userId,
          avatarUrl: response.data.fileUrl,
        });

        toast.success("Аватар успешно загружен")
        
      } catch (error) {
        toast.error("Ошибка загрузки файла");
      }
    };
  
    return(
    <div>
        <div className="setting__wrapper">
            <User_Panel user1={userData}/>
            <div className="setting__profile">
              <ToastContainer />
                <div className="setting__avatar">
                    <h3>Аватар</h3>
                    {fileUrl ? (
                        <img src={fileUrl} alt="avatar" />
                      ) : (
                        <img src={defaultImageUrl} alt="default avatar" />
                      )}
                    <form onSubmit={handleSubmit}>
                    <div>
                        <input type="file" onChange={handleFileChange} />
                    </div>
                    <button type="submit">Загрузить</button>
                    </form>
                    </div>
                <div className="setting__safety">
                    <h3>Безопастность</h3>
                    <form onSubmit={handlePasswordChangeSubmit}>
                    <div>
                      <p>Старый пароль</p>
                      <input type="password" placeholder="" value={oldPassword} onChange={handleOldPasswordChange} required />
                    </div>
                    <div>
                      <p>Новый пароль</p>
                      <input type="password" placeholder="" value={newPassword} onChange={handleNewPasswordChange} required />
                    </div>
                    <div>
                      <p>Повторите новый пароль</p>
                      <input type="password" placeholder="" value={confirmNewPassword} onChange={handleConfirmNewPasswordChange} required />
                    </div>
                    <button type="submit">Сохранить</button>
                  </form>
                </div>
                <div className="setting__person">
                  <h3>Личные Данные</h3>
                  <form onSubmit={handlePersonalDataSubmit}>
                    <div>
                      <p>Введите имя</p>
                      <input type="text" placeholder="" value={firstName} onChange={handleFirstNameChange} required/>
                    </div>
                    <div>
                      <p>Введите фамилию</p>
                      <input type="text" placeholder="" value={lastName} onChange={handleLastNameChange} required/>
                    </div>
                    <button type="submit">Cохранить</button>
                  </form>
                </div>
             </div>   
        </div>
    </div>
    )
}

export default Setting;
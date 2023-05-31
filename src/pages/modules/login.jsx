import {useState,useContext} from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from "../../context/UserContext";
import PasswordReset from "./passwordreset";
import "../scss/autch.scss";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login() {
  const [rememberMe, setRememberMe] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const {loginUser, wait, loggedInCheck} = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const [errMsg, setErrMsg] = useState(false);
  const [formData, setFormData] = useState({
      email:'',
      password:''
  });

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handlePasswordResetClick = () => {
    setShowPasswordReset(true);
  };

  const handlePasswordCloseClick = () => {
    setShowPasswordReset(false); 
  };

  const onChangeInput = (e) => {
    setFormData({
        ...formData,
        [e.target.name]:e.target.value
    })
}

const submitForm = async (e) => {
    e.preventDefault();

    if(!Object.values(formData).every(val => val.trim() !== '')){
        toast.error('Заполните все поля!');
        return;
    }

    const data = await loginUser(formData);
    if(data.success){
        toast.success('Успешный вход!');
        e.target.reset();
        setRedirect('/userpanel');
        await loggedInCheck();

    }
    toast.error(data.message);
}
  return (
  <div className="form">
    <ToastContainer />
    <div className="form-panel one active">
      <div className="form-header">
        <h1>Вход</h1>
        <h2>Войдите в существующую учетную запись.</h2>
      </div>
      <div className="form-content">
      <form onSubmit={submitForm} method="post">
          <div className="form-group">
            <label htmlFor="username">Почта</label>
            <input type="email" name="email" onChange={onChangeInput} placeholder="Ваша почта" id="email" value={formData.email} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input type="password" name="password" onChange={onChangeInput} placeholder="Ваш пароль" id="password" value={formData.password} required />
          </div>
          <div className="form-group">
            <label className="form-remember">
              <input type="checkbox" checked={rememberMe} onChange={handleRememberMeChange} />
              Запомнить меня
            </label>
            <a className="form-recovery" href="#" onClick={handlePasswordResetClick}>
                Забыли пароль?
              </a>
          </div>
          <div className="form-group">
          {redirect ? <Link to={redirect}>{}</Link> :<button type="submit" disabled={wait}>Войти</button>}
          </div>
        </form>
        <p>У вас нет учетной записи? <a href="/registration">Создайте её</a></p>
      </div>
    </div>
    {showPasswordReset && (
        <div className="modal_password">
          <div className="modal-password_content">
            <span className="close" onClick={handlePasswordCloseClick}>
            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"></path></svg>
            </span>
            <PasswordReset />
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;



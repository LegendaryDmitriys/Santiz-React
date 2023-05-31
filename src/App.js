import Albums from './pages/albums';
import Home from './pages/home';
import {BrowserRouter, Route, Routes,Navigate } from 'react-router-dom';
import NavBar from './pages/navbar';
import About from './pages/about';
import Tour from './pages/tour';
import Video from './pages/video';
import Archive from './pages/archive';
import Merch from './pages/merch';
import Setting from './pages/setting';
import Registration from './pages/modules/registration';
import Login from './pages/modules/login';
import HistoryBasket from './pages/history_basket';
import User_Panel from './pages/modules/userpanel';
import ConcertTicket from "./pages/buyTicets"
import {UserContext} from './context/UserContext';
import {useContext} from 'react'
import Basket from './pages/card';
import NotFoundPage from './pages/notfoundpage';

function App() {
  
  const {user} = useContext(UserContext); 

  return (
    <div className='App'>
      <BrowserRouter>
        <NavBar />
        <Routes>
        { user && (
         <>
        <Route path="/dash" element={<User_Panel />}  />
        <Route path='/setting' element={<Setting />} />
        <Route path='/historybasket' element= {<HistoryBasket />} />
        <Route path='/basket' element= {<Basket />} />
        </> 
        )}
        {!user && (
              <>
              <Route path="/login" element={<Login/>} />
              <Route path="/registration" element={<Registration/>} />
              </>
            )}
          <Route exact path='/' element={<Home />} />
          <Route path='/merch' element={<Merch />} />
          <Route path='/tour' element={<Tour />} />
          <Route path='/video' element={<Video />} />
          <Route path='/about' element={<About />} />
          <Route path='/albums' element={<Albums />} />
          <Route path='/archive' element={<Archive />} />
          <Route path="/tour/:id" element={<ConcertTicket />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to={user ? '/dash':'/login'} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

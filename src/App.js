import './App.css';
import MainPage from './pages/mainPages/mainPage';
import MyPage from './pages/myPages/myPage';
import Bookmark from './pages/bookmarks/bookmark';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CafeList from './pages/cafeLists/cafeList';
import NavBar from "./pages/fixed/navBar";
import Title from "./pages/fixed/title";
import { useState } from 'react';
import CafeDetail from './pages/cafeDetails/cafeDetail';
import WriteReview from './pages/WriteReviews/writeReview';
import Menu from './pages/menus/menu';
import Review from './pages/reviews/review';
import ScrollUp from './components/scrollUp';
import UpdateReview from './pages/WriteReviews/updateReview';
import ModalComponent from './components/modalComponent';
import OAuthCallback from './pages/loginPages/OAuthCallback';
import Login from './pages/loginPages/login';




function App() {
  const [selectedId, setSelectedId] = useState(1);
  const [token, setToken] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);


  return (
    <div className="App">
      
        <Title setSelectedId={setSelectedId} token={token} setToken={setToken}/>
          <Routes>
            <Route path='/' element={<MainPage/>}/>
            <Route path='/MyPage' element={<MyPage/>} setToken={setToken}/>
            <Route path='/Bookmark' element={<Bookmark/>} />
            <Route path='/CafeList' element={<CafeList />}/>
            <Route path='/CafeDetail' element={<CafeDetail/>}/>
            <Route path='/Menu' element={<Menu/>}/>
            <Route path='/Review' element={<Review/>}/>
            <Route path='/WriteReview' element={<WriteReview/>}/>
            <Route path='/UpdateReview' element={<UpdateReview/>}/>
            <Route path='/OAuthCallback' element={<OAuthCallback/>}/>
            <Route path='/Login' element={<Login/>}/>
          </Routes>
          {modalIsOpen && <ModalComponent modalIsOpen ={modalIsOpen} setModalIsOpen={setModalIsOpen}></ModalComponent>}

          <NavBar selectedId={selectedId} setSelectedId={setSelectedId} token={token} setToken={setToken} setModalIsOpen={setModalIsOpen}/>

          
    </div>
  );
}

export default App;


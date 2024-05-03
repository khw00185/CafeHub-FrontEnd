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
import Comment from './pages/comments/comment';




function App() {
  const [selectedId, setSelectedId] = useState(1);

  return (
    <div className="App">
      <BrowserRouter>
        <Title setSelectedId={setSelectedId}/>
          <Routes>
            <Route path='/' element={<MainPage/>}/>
            <Route path='/MyPage' element={<MyPage/>}/>
            <Route path='/Bookmark' element={<Bookmark/>} />
            <Route path='/CafeList' element={<CafeList/>}/>
            <Route path='/CafeDetail' element={<CafeDetail/>}/>
            <Route path='/Menu' element={<Menu/>}/>
            <Route path='/Review' element={<Review/>}/>
            <Route path='/WriteReview' element={<WriteReview/>}/>
            <Route path='/Comment' element={<Comment/>}/>



          </Routes>
          <NavBar selectedId={selectedId} setSelectedId={setSelectedId}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
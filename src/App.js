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
            <Route path='/WriteReview' element={<WriteReview/>}/>
          </Routes>
          <NavBar selectedId={selectedId} setSelectedId={setSelectedId}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
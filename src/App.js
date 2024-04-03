import './App.css';
import MainPage from './pages/mainPages/mainPage';
import Title from './pages/fixed/title';
import Nav from './pages/fixed/navBar';
import MyPage from './pages/myPages/myPage';
import Register from './pages/registerPages/registerPage';


function App() {
  return (
    <div className="App">
      <Title/>
      <MyPage></MyPage>
      <Nav/>
    </div>
  );
}

export default App;
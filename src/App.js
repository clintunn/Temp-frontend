import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Temp from './pages/Temp';
import Login from './pages/Login';


function App() {
  return (
    <BrowserRouter>
      <Navigation />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/temp' element={<Temp />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;

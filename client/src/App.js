 
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage';
import Header from './pages/Header';
import Footer from './pages/Footer';
 
import Login from './pages/Login';
import ContactUs from './pages/ContactUs';
import Category from './pages/Category';
import Products from './pages/Products';
import Signup from './pages/Signup';
import Item from './pages/Item';
import Donate from './pages/Donate';
import Distribute from './pages/Distribute';
import Aboutus from './pages/Aboutus';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Administrator from './pages/Administrator';
import Funds from './pages/funds';

function App() {
  return (
    <div> 
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route index element={<MainPage/>}/>
         
        <Route path='/mainpage' element={<MainPage/>}/>
        
        <Route path='/login' element={<Login/>}/>
        <Route path='/contactus' element={<ContactUs/>}/>
        <Route path='/category' element={<Category/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='item' element={<Item/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/donate' element={<Donate/>}/>
        <Route path='/distribute' element={<Distribute/>}/>
        <Route path='aboutus' element={<Aboutus/>}/>
        <Route path='events' element={<Events/>}/>
        <Route path='gallery' element={<Gallery/>}/>
        <Route path='admin' element={<Administrator/>}/>
        <Route path='funds' element={<Funds/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;

import './App.css';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
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
import TrendAnalyzer from "./pages/TrendAnalyzer";
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import PayPalCheckout from "./pages/PayPalCheckout";
import ThankYou from "./pages/ThankYou";
import Dashboard from './pages/Dashboard';
import Form from './pages/Form';
import Payments from './pages/payments';
import Notification from './pages/Notification';
import User from './pages/User';
import { useEffect } from 'react';

const AdminRoute = ({ children }) => {
    const location = useLocation();

    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin') === 'true';
        const token = localStorage.getItem('token');

        if (!isAdmin || !token) {
            // If not admin or no token, redirect to login
            window.location.href = '/login';
        }
    }, [location]);

    return children;
};

function App() {
    return (
        <div>
            <PayPalScriptProvider
                options={{
                    'client-id': 'ARs3bgYB4thTp0x4_u2nRk_tViVBMkT8m04wnLxWeHap2Sak9dtsv-fxaa1-YX67lq8RQ73JkshpqVAA',
                    currency: 'USD',
                }}
            >
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route index element={<MainPage />} />
                        <Route path='/mainpage' element={<MainPage />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/contactus' element={<ContactUs />} />
                        <Route path='/category' element={<Category />} />
                        <Route path='/products' element={<Products />} />
                        <Route path='item' element={<Item />} />
                        <Route path='/signup' element={<Signup />} />
                        <Route path='/donate' element={<Donate />} />
                        <Route path='/distribute' element={<Distribute />} />
                        <Route path='aboutus' element={<Aboutus />} />
                        <Route path='events' element={<Events />} />
                        <Route path='gallery' element={<Gallery />} />
                        <Route path='admin' element={<AdminRoute><Administrator /></AdminRoute>} />
                        <Route path='dashboard' element={<AdminRoute><Dashboard /></AdminRoute>} />
                        <Route path='payments' element={<AdminRoute><Payments /></AdminRoute>} />
                        <Route path='form' element={<Form />} />
                        <Route path='notification' element={<Notification />} />
                        <Route path='user' element={<User />} />
                        <Route path='funds' element={<AdminRoute><Funds /></AdminRoute>} />
                        <Route path='/charts' element={<AdminRoute><TrendAnalyzer /></AdminRoute>} />
                        <Route path="/thankyou" element={<ThankYou />} />
                    </Routes>
                    <Footer />
                </BrowserRouter>
            </PayPalScriptProvider>
        </div>
    );
}

export default App;
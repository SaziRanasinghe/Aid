import './App.css';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';
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

const ProtectedRoute = ({ children, allowedRoles }) => {
    const location = useLocation();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('userRole');

        if (token && allowedRoles.includes(userRole)) {
            setIsAuthorized(true);
        } else {
            // If not authorized, redirect to login
            window.location.href = '/login';
        }
    }, [location, allowedRoles]);

    return isAuthorized ? children : null;
};

const AdminRoute = ({ children }) => (
    <ProtectedRoute allowedRoles={['admin']}>{children}</ProtectedRoute>
);

const DonorRoute = ({ children }) => (
    <ProtectedRoute allowedRoles={['donor']}>{children}</ProtectedRoute>
);

const DistributorRoute = ({ children }) => (
    <ProtectedRoute allowedRoles={['distributor']}>{children}</ProtectedRoute>
);

const RecipientRoute = ({ children }) => (
    <ProtectedRoute allowedRoles={['recipient']}>{children}</ProtectedRoute>
);

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
                        <Route path='/products' element={<RecipientRoute><Products /></RecipientRoute>} />
                        <Route path='item' element={<DonorRoute><Item /></DonorRoute>} />
                        <Route path='/signup' element={<Signup />} />
                        <Route path='/donate' element={<DonorRoute><Donate /></DonorRoute>} />
                        <Route path='/distribute' element={<DistributorRoute><Distribute /></DistributorRoute>} />
                        <Route path='aboutus' element={<Aboutus />} />
                        <Route path='events' element={<Events />} />
                        <Route path='gallery' element={<Gallery />} />
                        <Route path='dashboard' element={<AdminRoute><Dashboard /></AdminRoute>} />
                        <Route path='payments' element={<AdminRoute><Payments /></AdminRoute>} />
                        <Route path='notification' element={<AdminRoute><Notification/></AdminRoute>} />
                        <Route path='user' element={<User />} />
                        <Route path='funds' element={<DonorRoute><Funds /> </DonorRoute>} />
                        <Route path='/charts' element={<AdminRoute><TrendAnalyzer /></AdminRoute>} />
                        <Route path="/thankyou" element={<DonorRoute><ThankYou /></DonorRoute>} />
                    </Routes>
                    <Footer />
                </BrowserRouter>
            </PayPalScriptProvider>
        </div>
    );
}

export default App;
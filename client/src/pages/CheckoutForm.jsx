import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const stripePromise = loadStripe('pk_test_51PRB5KITJDLyY2z9wsKZpYLidsxIWF64Rssr96rPSncVPdPB6tVvNt4Vf21qp3oX4ADq0tJrr1kaLl3jojcMf8vT00zQJdOsad');

export const CheckoutForm = ({ donationAmount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {

        axios.post('http://localhost:5000/api/create-payment-intent', {
            amount: donationAmount,
        })
            .then(response => {
                setClientSecret(response.data.clientSecret);
            })
            .catch(error => {
                console.error("Error fetching client secret:", error);
            });
    }, [donationAmount]);

    const handleCardPayment = async (event) => {
        event.preventDefault();

        if (!stripe || !elements || !clientSecret) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    name: document.getElementById('card-name').value,
                    email: document.getElementById('card-email').value,
                },
            },
        });

        if (error) {
            console.error("Error confirming card payment:", error);
            return;
        }

        if (paymentIntent.status === 'succeeded') {
            navigate('/thankyou');
        }
    };

    return (
        <form onSubmit={handleCardPayment}>
            <div>
                <label className="block text-sm font-medium mb-1" htmlFor="card-name">
                    Name on Card <span className="text-red-500">*</span>
                </label>
                <input
                    id="card-name"
                    className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                    type="text"
                    placeholder="John Doe"
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1" htmlFor="card-email">
                    Email <span className="text-red-500">*</span>
                </label>
                <input
                    id="card-email"
                    className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                    type="email"
                    placeholder="john@company.com"
                />
            </div>
            <div className="mt-4">
                <label className="block text-sm font-medium mb-1">
                    Card Details <span className="text-red-500">*</span>
                </label>
                <CardElement className="bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" />
            </div>
            <button
                type="submit"
                disabled={!stripe || !clientSecret}
                className="font-medium text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out w-full bg-indigo-500 hover:bg-indigo-600 text-white focus:outline-none focus-visible:ring-2 mt-6"
            >
                Donate
            </button>
        </form>
    );
};

export default {CheckoutForm,stripePromise};
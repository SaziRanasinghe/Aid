// PayPalCheckout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

const PayPalCheckout = ({ donationAmount }) => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    const navigate = useNavigate();

    const createOrder = (data, actions) => {
        if (donationAmount <= 0) {
            // Display an error message or handle the case where the donation amount is invalid
            return Promise.reject(new Error('Donation amount must be greater than zero.'));
        }

        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: donationAmount.toFixed(2), // Ensure the amount has a maximum of two decimal places
                    },
                },
            ],
        });
    };

    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            console.log(details);
            // Process the payment response and update your application
            navigate('/thankyou'); // Navigate to the "Thank You" screen
        });
    };

    const onError = (err) => {
        console.error(err);
        // Handle payment errors
    };

    const onCancel = (data) => {
        console.log(data);
        // Handle payment cancellation
    };

    return (
        <div className="mb-4">
            <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
                onError={onError}
                onCancel={onCancel}
                style={{
                    color: 'blue',
                    shape: 'rect',
                    label: 'pay',
                    height: 40,
                }}
            />
        </div>
    );
};

export default PayPalCheckout;
import React from 'react';

const ThankYou = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Thank You for your Donation!</h2>
                <p className="text-gray-600 mb-6">
                    We appreciate your generosity. Your donation will make a difference.
                </p>
            <a
                href="/mainpage"
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md"
                >
                Return to Main Page
            </a>
        </div>
</div>
);
};

export default ThankYou;
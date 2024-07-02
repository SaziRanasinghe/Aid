import React, { useState } from 'react';
import Img1 from '../assets/category-images/bg1.jpg'
import Img2 from '../assets/category-images/don2.png'

const Funds = () => {
    const [card, setCard] = useState(true);

    return (
        <div>
            <h1 className="text-grey-darker text-5xl text-center mt-10 mb-8">Transform Funds with <span className='text-orange-500'>AidNexus!</span></h1>
        
            <section className="antialiased text-gray-600 ml-16 min-h-screen p-4">
                <div className="h-full flex flex-collg:flex-row">
                    <div className="lg:w-2/3">
                        <div className="relative px-6 sm:px-4 lg:px-44 max-w-none ml-0">
                            <img
                                className="rounded-t shadow-lg"
                                src={Img1}
                                width="460"
                                height="180"
                                alt="Pay background"
                            />
                        </div>
                        <div className="relative px-4 sm:px-6 lg:px-8 pb-8 max-w-lg mx-auto lg:ml-36">
                            <div className="bg-white px-8 -mr-3 pb-6 rounded-b shadow-lg">
                                <div className="text-center mb-6">
                                    <h1 className="text-2xl leading-snug text-blue-800 font-bold mb-2">
                                        Join Hands with AidNexus to Fight Poverty!
                                    </h1>
                                    <div className="text-sm">
                                        Your generous contribution can make a significant difference in the lives of those in need. Please choose your preferred payment method below to proceed with your donation. Thank you for your support.
                                    </div>
                                </div>

                                <div className="flex justify-center mb-6">
                                    <div className="relative flex w-full p-1 bg-gray-50 rounded">
                                        <span className="absolute inset-0 m-1 pointer-events-none" aria-hidden="true">
                                            <span
                                                className={`absolute inset-0 w-1/2 bg-white rounded border border-gray-200 shadow-sm transform transition duration-150 ease-in-out ${
                                                    card ? 'translate-x-0' : 'translate-x-full'
                                                }`}
                                            ></span>
                                        </span>
                                        <button
                                            className="relative flex-1 text-sm font-medium p-1 transition duration-150 ease-in-out focus:outline-none focus-visible:ring-2"
                                            onClick={() => setCard(true)}
                                        >
                                            Pay With Card
                                        </button>
                                        <button
                                            className="relative flex-1 text-sm font-medium p-1 transition duration-150 ease-in-out focus:outline-none focus-visible:ring-2"
                                            onClick={() => setCard(false)}
                                        >
                                            Pay With PayPal
                                        </button>
                                    </div>
                                </div>

                                {card ? (
                                    <div>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-1" htmlFor="card-nr">
                                                    Card Number <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    id="card-nr"
                                                    className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                                                    type="text"
                                                    placeholder="1234 1234 1234 1234"
                                                />
                                            </div>
                                            <div className="flex space-x-4">
                                                <div className="flex-1">
                                                    <label className="block text-sm font-medium mb-1" htmlFor="card-expiry">
                                                        Expiry Date <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        id="card-expiry"
                                                        className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                                                        type="text"
                                                        placeholder="MM/YY"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <label className="block text-sm font-medium mb-1" htmlFor="card-cvc">
                                                        CVC <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        id="card-cvc"
                                                        className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                                                        type="text"
                                                        placeholder="CVC"
                                                    />
                                                </div>
                                            </div>
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
                                        </div>
                                        <div className="mt-6">
                                            <div className="mb-4">
                                                <button className="font-medium text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out w-full bg-indigo-500 hover:bg-indigo-600 text-white focus:outline-none focus-visible:ring-2">
                                                    Pay Rs.
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="mb-4">
                                            <button className="font-medium text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out w-full bg-indigo-500 hover:bg-indigo-600 text-white focus:outline-none focus-visible:ring-2">
                                                Pay with PayPal - Rs.
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-2/4 w-full flex justify-center items-center py-4 lg:py-0">
                        <img className="animate-bounce py-4 mr-72 px-4 w-2/3 lg:w-full" src={Img2} alt="" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Funds;

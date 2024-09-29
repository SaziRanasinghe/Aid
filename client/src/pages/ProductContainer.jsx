import React from 'react';

function ProductContainer({ item, onClaim }) {
    return (
        <div className="flex flex-col">
            <a href="#" className="block h-64 rounded-lg shadow-lg bg-white">
                <img
                    src={`http://localhost:5000${item.image_url}`}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-lg"
                />
            </a>
            <div className="flex items-center justify-between mt-3">
                <div>
                    <a href="#" className="font-medium">{item.title}</a>
                    <a className="flex items-center" href="#">
                        <span className="text-xs font-medium text-gray-600">by</span>
                        <span className="text-xs font-medium ml-1 text-indigo-500">{item.donor_name}</span>
                    </a>
                </div>
                <span className="flex items-center h-8 bg-indigo-200 text-indigo-600 text-sm px-2 rounded">{item.location}</span>
            </div>
            <button
                onClick={onClaim}
                className="mt-2 bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded"
            >
                Claim
            </button>
        </div>
    );
}

export default ProductContainer;

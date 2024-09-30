import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductContainer from './ProductContainer';

function Products() {
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('popular');

    useEffect(() => {
        fetchItems();
        fetchCategories();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/items', {
                params: { category: selectedCategory, search: searchTerm, sort: sortBy }
            });
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching items:', error);
            toast.error('Failed to fetch items. Please try again later.');
        }
    };

    const handleClaim = async (itemId) => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            toast.error('You must be logged in to claim an item.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/claim', {
                itemId: itemId,
                userId: userId
            });
            fetchItems(); // Refresh the items list
            toast.success(response.data.message);
        } catch (error) {
            console.error('Error claiming item:', error);
            if (error.response && error.response.data && error.response.data.error) {
                toast.error(`Failed to claim item: ${error.response.data.error}`);
            } else {
                toast.error('Failed to claim item. Please try again.');
            }
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/category');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            toast.error('Failed to fetch categories. Please try again later.');
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    useEffect(() => {
        fetchItems();
    }, [selectedCategory, searchTerm, sortBy]);
    return (
        <div className="flex flex-col w-screen min-h-screen p-10 bg-gray-100 text-gray-800">
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <h1 className="mb-2 font-bold text-orange-600 text-3xl mt-4 text-center md:text-3xl">Donate Items</h1>

            {/* Search and filter section */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mt-2">
                <input
                    type="text"
                    placeholder="Search items..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="p-2 border rounded"
                />
                <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="p-2 border rounded mt-2 sm:mt-0 sm:ml-2"
                >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                        <option key={category.category_id}
                                value={category.category_id}>{category.category_name}</option>
                    ))}
                </select>
                <select
                    value={sortBy}
                    onChange={handleSortChange}
                    className="p-2 border rounded mt-2 sm:mt-0 sm:ml-2"
                >
                    <option value="popular">Popular</option>
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                </select>
            </div>

            {/* Items grid */}
            <div
                className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-6 gap-y-12 w-full mt-6">
                {items.map(item => (
                    <ProductContainer key={item.id} item={item} onClaim={() => handleClaim(item.id)}/>
                ))}
            </div>
            <div className="flex justify-center mt-10 space-x-1">
                <button className="flex items-center justify-center h-8 w-8 rounded text-gray-400">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd"
                              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                              clipRule="evenodd"/>
                    </svg>
                </button>
                <button className="flex items-center justify-center h-8 px-2 rounded text-sm font-medium text-gray-400"
                        disabled>
                    Prev
                </button>
                <button
                    className="flex items-center justify-center h-8 w-8 rounded bg-indigo-200 text-sm font-medium text-indigo-600"
                    disabled>
                    1
                </button>
                <button
                    className="flex items-center justify-center h-8 w-8 rounded hover:bg-indigo-200 text-sm font-medium text-gray-600 hover:text-indigo-600">
                    2
                </button>
                <button
                    className="flex items-center justify-center h-8 w-8 rounded hover:bg-indigo-200 text-sm font-medium text-gray-600 hover:text-indigo-600">
                    3
                </button>
                <button
                    className="flex items-center justify-center h-8 px-2 rounded hover:bg-indigo-200 text-sm font-medium text-gray-600 hover:text-indigo-600">
                    Next
                </button>
                <button
                    className="flex items-center justify-center h-8 w-8 rounded hover:bg-indigo-200 text-gray-600 hover:text-indigo-600">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"/>
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default Products
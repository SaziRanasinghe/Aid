import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Gallery() {
    const [galleryItems, setGalleryItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGalleryItems = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get('http://localhost:5000/api/gallery-items');
                setGalleryItems(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching gallery items:', error);
                setError('Failed to load gallery items. Please try again later.');
                setIsLoading(false);
            }
        };

        fetchGalleryItems();
    }, []);

    const GalleryItem = ({ item }) => {
        if (!item) return null;
        // Construct the full image URL
        const imageUrl = `http://localhost:5000${item.image_link}`;
        return (
            <div className="relative group overflow-hidden">
                <img
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                    src={imageUrl}
                    alt={item.event_name}
                    onError={(e) => {
                        console.error(`Failed to load image: ${imageUrl}`);
                        e.target.src = 'path/to/fallback/image.jpg'; // Replace with a fallback image
                    }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h3 className="text-white text-lg font-bold">{item.event_name}</h3>
                    <p className="text-white text-sm">{item.description}</p>
                </div>
            </div>
        );
    };

    if (isLoading) return <p className="text-center text-gray-500">Loading gallery items...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="max-w-screen-2xl mx-auto px-4 pb-16 lg:pb-24 mt-8 relative">
            <h1 className='text-5xl text-center font-bold mb-8'>
                Donations of <span className='text-orange-600'>AidNexus</span>
            </h1>

            {galleryItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {galleryItems.map((item, index) => (
                        <GalleryItem key={item.id} item={item} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No gallery items available.</p>
            )}
        </div>
    );
}

export default Gallery;
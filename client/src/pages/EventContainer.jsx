import React from 'react';
import { Link } from 'react-router-dom';

const EventContainer = ({ event }) => {
    const eventDate = new Date(event.event_date);
    const formattedDate = eventDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="card flex flex-col sm:flex-row md:flex-row bg-gray-800 mb-8 rounded-lg overflow-hidden">
            <div className="sm:flex-shrink-0 md:flex-shrink-0">
                <img
                    className="imagine w-full sm:w-56 md:w-56 lg:w-80 h-64 object-cover"
                    src={`http://localhost:5000${event.image_link}`}
                    alt={event.event_name}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/path/to/default/image.jpg';
                    }}
                />
            </div>
            <div className="righty p-6 md:mt-0 md:ml-6 sm:ml-3 flex-grow">
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <h2 className="text-orange-400 mb-2 uppercase tracking-wide text-xl font-bold">{event.event_name}</h2>
                        <div className="text-gray-100 mb-4 uppercase tracking-wide text-sm font-bold">
                            <p className="text-gray-200 mb-1">Time: {event.event_time}</p>
                            <p className="text-gray-200 mb-1">Date: {formattedDate}</p>
                        </div>
                    </div>
                </div>
                <p className="mb-4 text-gray-300">{event.description}</p>
                <div className="flex justify-between items-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${event.active === 'yes' ? 'bg-green-500 text-green-100' : 'bg-red-500 text-red-100'}`}>
                        {event.active === 'yes' ? 'Active' : 'Inactive'}
                    </span>
                    <Link to='/funds'>
                        <button className="bg-transparent uppercase hover:bg-orange-500 text-gray-100 font-semibold hover:text-black py-2 px-4 border-2 border-orange-500 hover:border-transparent rounded transition duration-300">
                            Donate
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EventContainer;

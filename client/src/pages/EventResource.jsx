import React from 'react';
import { Link } from 'react-router-dom';

const EventResource = ({ event }) => {
    // Parse the date and time
    const eventDate = new Date(event.event_date);
    const formattedDate = eventDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Parse the time
    const [hours, minutes] = event.event_time.split(':');
    const formattedTime = new Date(0, 0, 0, hours, minutes).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });

    return (
        <div className="bg-transparent border border-gray-300 shadow-lg rounded-lg overflow-hidden mb-6 transition-all duration-300 hover:shadow-xl">
            <div className="md:flex">
                <div className="md:w-1/3 md:flex-shrink-0">
                    <img
                        className="h-full w-full object-cover md:h-full md:w-full rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                        src={`http://localhost:5000${event.image_link}`}
                        alt={event.event_name}
                        onError={(e) => {
                            console.error("Image failed to load:", e.target.src);
                            e.target.onerror = null; // prevents looping
                            e.target.src = '/path/to/default/image.jpg';
                        }}
                    />
                </div>
                <div className="md:w-2/3 p-6 md:p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                        {event.active === 'yes' ? 'Active Event' : 'Inactive Event'}
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800 mt-2">
                        {event.event_name}
                    </h2>
                    <p className="mt-2 text-gray-600">
                        {formattedDate} at {formattedTime}
                    </p>
                    <p className="mt-2 text-gray-600 line-clamp-3">{event.description}</p>
                    <div className="mt-4 space-x-2">
                        <Link
                            to={`/event/${event.id}`}
                            className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                        >
                            View Details
                        </Link>
                        {!event.is_past && (
                            <Link
                                to="/donate"
                                className="inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                            >
                                Donate
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventResource;

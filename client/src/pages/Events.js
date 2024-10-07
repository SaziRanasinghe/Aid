import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventResource from './EventResource';

function Events() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showPastEvents, setShowPastEvents] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/events');
                setEvents(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching events:', error);
                setError('Oops! We encountered a hiccup while fetching the events. Please try again later.');
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const currentDate = new Date();

    const upcomingEvents = events.filter(event => {
        const eventDate = new Date(event.event_date);
        return eventDate > currentDate && event.active === 'yes';
    });

    const pastEvents = events.filter(event => {
        const eventDate = new Date(event.event_date);
        return eventDate <= currentDate || event.active === 'no';
    });

    const NoEventsMessage = ({ isPastEvents }) => (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
                {isPastEvents ? "No Past Events Found" : "No Upcoming Events Found"}
            </h2>
            <p className="text-lg text-gray-600 mb-6">
                {isPastEvents
                    ? "It looks like we don't have any past events to show at the moment."
                    : "Don't worry, we're cooking up some amazing events behind the scenes!"}
            </p>
        </div>
    );

    if (loading) return <div className="text-center py-12">Loading events...</div>;
    if (error) return <div className="text-center py-12 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto px-4 my-8">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Events</h1>

            <div className="flex justify-center mb-8">
                <button
                    className={`px-4 py-2 mr-2 rounded ${!showPastEvents ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    onClick={() => setShowPastEvents(false)}
                >
                    Upcoming Events
                </button>
                <button
                    className={`px-4 py-2 rounded ${showPastEvents ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    onClick={() => setShowPastEvents(true)}
                >
                    Past Events
                </button>
            </div>

            <div className="space-y-8">
                {showPastEvents ? (
                    pastEvents.length > 0 ? (
                        pastEvents.map(event => <EventResource key={event.id} event={event} />)
                    ) : (
                        <NoEventsMessage isPastEvents={true} />
                    )
                ) : (
                    upcomingEvents.length > 0 ? (
                        upcomingEvents.map(event => <EventResource key={event.id} event={event} />)
                    ) : (
                        <NoEventsMessage isPastEvents={false} />
                    )
                )}
            </div>
        </div>
    );
}

export default Events;


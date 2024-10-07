import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventContainer from './EventContainer';

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const filteredEvents = events.filter(event => {
    const eventDateTime = new Date(event.event_date + 'T' + event.event_time);
    return eventDateTime > currentDate && event.active === 'yes';
  });

  const NoEventsMessage = () => (
      <div className="text-center py-12 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">No Upcoming Events Found</h2>
        <p className="text-lg text-gray-600 mb-6">
          Don't worry, we're cooking up some amazing events behind the scenes!
        </p>
        <p className="text-md text-gray-500">
          In the meantime, why not check out our past events or sign up for our newsletter to stay updated?
        </p>
      </div>
  );

  if (loading) return <div className="text-center py-12">Loading events...</div>;
  if (error) return <div className="text-center py-12 text-red-500">{error}</div>;

  return (
      <div className="container mx-auto px-4 my-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Upcoming Events</h1>
        <div className="space-y-8">
          {filteredEvents.length > 0 ? (
              filteredEvents.map(event => <EventContainer key={event.id} event={event} />)
          ) : (
              <NoEventsMessage />
          )}
        </div>
      </div>
  );
}

export default Events;


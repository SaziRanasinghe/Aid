const express = require('express');
const { createPostEndpoint, createGetEndpoint } = require('./aid_nexus'); // Adjust the path as needed

const app = express();
app.use(express.json());

// POST endpoint for adding an event
createPostEndpoint(
    app,
    '/api/events',
    'INSERT INTO event (event_name, event_description, event_datetime, is_event_active) VALUES (?, ?, ?, ?)',
    ['event_name', 'event_description', 'event_datetime', 'active']
);

// GET endpoint for retrieving events
createGetEndpoint(
    app,
    '/api/events',
    'SELECT * FROM event'
);

// GET endpoint for retrieving a specific event
createGetEndpoint(
    app,
    '/api/events/:id',
    'SELECT * FROM event WHERE event_id = ?',
    ['id']
);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

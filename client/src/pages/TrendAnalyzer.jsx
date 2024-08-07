import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';


const API_BASE_URL = 'http://localhost:5000/api';

export const fetchRecipientTrends = async () => {
    const response = await fetch(`${API_BASE_URL}/recipient-trends`);
    return response.json();
};

export const fetchTimeTrends = async () => {
    const response = await fetch(`${API_BASE_URL}/time-trends`);
    return response.json();
};

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

function TrendAnalyzer() {
    const [recipientTrends, setRecipientTrends] = useState([]);
    const [timeTrends, setTimeTrends] = useState([]);

    useEffect(() => {
        fetchRecipientTrends().then(setRecipientTrends);
        fetchTimeTrends().then(setTimeTrends);
    }, []);

    const recipientChartData = {
        labels: recipientTrends.map(item => item.recipient),
        datasets: [
            {
                label: 'Total Aid',
                data: recipientTrends.map(item => item.total_aid),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    const timeChartData = {
        labels: timeTrends.map(item => item.year),
        datasets: [
            {
                label: 'Total Aid Over Time',
                data: timeTrends.map(item => item.total_aid),
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    };

    return (
        <div className="App">
            <h1>Aid Trends Analysis</h1>
            <div style={{ width: '600px', margin: '20px auto' }}>
                <h2>Top 5 Recipients by Total Aid</h2>
                <Bar data={recipientChartData} />
            </div>
            <div style={{ width: '600px', margin: '20px auto' }}>
                <h2>Aid Trends Over Time</h2>
                <Line data={timeChartData} />
            </div>
        </div>
    );
}

export default TrendAnalyzer;
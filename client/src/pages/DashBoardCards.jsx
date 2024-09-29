import React from 'react';

const DashboardCard = ({ title, value, gradient }) => (
    <div className={`bg-gradient-to-r ${gradient} text-white p-6 rounded-lg shadow-md`}>
        <h2 className="text-sm font-semibold">{title}</h2>
        <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
);

export default DashboardCard;

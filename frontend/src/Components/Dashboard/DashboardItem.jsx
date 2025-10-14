import React from 'react';
import { useParams } from 'react-router-dom';
import Programs from './DashboardItem/programs/Programs';
import MasterClasses from './DashboardItem/masterClasses/MasterClasses';
import Profile from './DashboardItem/profile/Profile';

const ComponentMapping = {
    "programs": Programs,
    "masterclasses": MasterClasses,
    "profile": Profile,
};

function DashboardItem() {
    const params = useParams();
    const Component = ComponentMapping[params.route]; // Access the component based on the route parameter

    return (
        <div className='my-4'>
            {Component ? <Component /> : <div>Loading...</div>} {/* Render the component if it exists */}
        </div>
    );
}

export default DashboardItem;

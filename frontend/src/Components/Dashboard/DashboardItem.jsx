import React from 'react';
import { useParams } from 'react-router-dom';
import Programs from './DashboardItem/programs/Programs';
import MasterClasses from './DashboardItem/masterClasses/MasterClasses';
import Profile from './DashboardItem/profile/Profile';
import Users from './DashboardItem/users/Users';
import { useAuth } from '../../Context/AuthContext';

const ComponentMapping = {
    "programs": Programs,
    "masterclasses": MasterClasses,
    "profile": Profile,
    "users": Users,
};

function DashboardItem() {
    const params = useParams();
    const auth = useAuth();
    const isAdmin = auth?.user?.role === 'admin';

    if (params.route === 'users' && !isAdmin) {
        return <div className='my-4'>You do not have permission to view this page.</div>;
    }
    const Component = ComponentMapping[params.route]; // Access the component based on the route parameter

    return (
        <div className='my-4'>
            {Component ? <Component /> : <div>Loading...</div>} {/* Render the component if it exists */}
        </div>
    );
}

export default DashboardItem;

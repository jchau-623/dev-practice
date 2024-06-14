import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

export default function CreateSpotPage () {
    const user = useSelector(({ session }) => session.user);
    return (
        <div>
            <h1>Welcome back, {user.username}!</h1>
            <NavLink to="/create-spot/overview" className="create-listing-button">
                Create a Spot
            </NavLink>
        </div>
    );
}

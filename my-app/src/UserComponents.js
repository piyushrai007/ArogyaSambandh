import React from 'react';

function Username({ username }) {
    return <p>{username}</p>;
}

function ProfilePicture({ profilePicture, className }) {
    return <img src={profilePicture} alt="Profile" className={className} />;
}

function Address({ addressLine1, city, state, pincode }) {
    return (
        <div>
            <p>{addressLine1}</p>
            <p>{city}</p>
            <p>{state}</p>
            <p>{pincode}</p>
        </div>
    );
}

export { Username, ProfilePicture, Address };

import React, { useState, useEffect } from 'react';
import { findAllUsers } from './users/client';
import { Link } from 'react-router-dom';

function Home() {
  const [newestMember, setNewestMember] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [recentlyLikedStation, setRecentlyLikedStation] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await findAllUsers();

        // Find the newest member based on the dateOfJoin
        const sortedUsers = users.sort((a, b) => new Date(b.dateOfJoin) - new Date(a.dateOfJoin));
        const newest = sortedUsers[0];

        setNewestMember(newest);
      } catch (error) {
        console.error('Error fetching users', error);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array means this effect will run once when the component mounts
  

  return (
    <div>
      <h1>Home</h1>
      {newestMember && (
        <div>
          <h2>Welcome Our Newest Member!</h2>
          <p>Username: {newestMember.username}</p>
          <p>Date Joined: {new Date(newestMember.dateOfJoin).toLocaleDateString()}</p>
          <p>
            <Link to={`/profile/${newestMember._id}`}>View {newestMember.username}'s profile</Link>
          </p>
          {/* <p>Name: {`${newestMember.firstName} ${newestMember.lastName}`}</p> */}
          {/* Add other relevant information as needed */}
        </div>
      )}
    </div>
  );
}

export default Home;

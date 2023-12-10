import React, { useState, useEffect } from 'react';
import { findAllUsers } from '../users/client';
import { Link } from 'react-router-dom';
import { useAuth } from "../useAuth";
import { MdDirectionsBike } from "react-icons/md";
import "./index.css";

function Home() {
  // State variables
  const [newestMember, setNewestMember] = useState(null);
  const authData = useAuth();

  // useEffect to fetch users and find the newest member on component mount (when home screen renders)
  // runs once
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


  // will run when there is a change in the authentication data dependency 

  // // useEffect to perform actions if there is a change in authentication data
  // useEffect(() => {
  //   if (authData && authData.currentUser) {
  //     // Fetch the user's likes or perform other actions
  //   }
  // }, [authData]);
  

  // useEffect to log the value of newestMember when it changes
  useEffect(() => {
    console.log(newestMember); // Log the value of newestMember
    if (newestMember) {
      console.log(newestMember.username); // Log the value of username if newestMember is not null
    }
  }, [newestMember]);

  // reflects updated state and props after effects have been applied 
  return (
    <div>
      <br></br>
      {authData && authData.currentUser && (
        <div>
        <h1> Welcome {authData.currentUser.username}, let's go for a ride. </h1>
        </div>
      )}
      <MdDirectionsBike className="bike-icon"/>
      <hr></hr>
      <h3>Find bike stations in any city and share your favorites!</h3>
      <div className="button btn btn-info"> <Link to={`/search`} className="white-text-link">Click here to search for a city!</Link></div>
      <hr></hr>
      {newestMember && (
        <div>
          <h2>Welcome Our Newest Member!</h2>
          <p>Username: {newestMember.username}</p>
          <p>Date Joined: {new Date(newestMember.dateOfJoin).toLocaleDateString()}</p>
          <p>
            <Link to={`/profile/${newestMember._id}`}>View {newestMember.username}'s profile</Link>
          </p>
          {/* Display the user's most recent like if available */}
          {authData && authData.currentUser && authData.userLikes.length > 0 && (
            <div>
              <h2> Your Most Recently Liked Station:</h2>
              <p><b>{authData.currentUser.username}'s</b> most recently liked station!</p>
              <p>Name: {authData.userLikes.sort((a, b) => new Date(b.dateOfLike) - new Date(a.dateOfLike))[0].station.name}
              in the glorious city of  {/**/} </p>
              
              {/* Add other relevant information about the station */}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;

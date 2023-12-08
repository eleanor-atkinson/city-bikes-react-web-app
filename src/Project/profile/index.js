// import React, { useState, useEffect } from "react";
// import { profile, logout, profileThunk, logoutThunk } from "../users/service";
// import { useNavigate } from "react-router";
// import { useDispatch } from "react-redux";
// import * as client from "../client";
// import * as userService from "../users/service";
import { Link, useParams } from "react-router-dom";
// import moment from "moment";
import * as client from "../users/client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();
  const fetchAccount = async () => {
    const account = await client.account();
    setAccount(account);
  };
  const save = async () => {
    await client.updateUser(account);
  };
  const signout = async () => {
    await client.signout();
    navigate("/project/signin");
  };


  useEffect(() => {
    fetchAccount();
  }, []);
  return (
    <div className="w-50">
      <h1>Account</h1>
      {account && (
        <div>
          <input value={account.password}
            onChange={(e) => setAccount({ ...account,
              password: e.target.value })}/>
          <input value={account.firstName}
            onChange={(e) => setAccount({ ...account,
              firstName: e.target.value })}/>
          <input value={account.lastName}
            onChange={(e) => setAccount({ ...account,
              lastName: e.target.value })}/>
          <select onChange={(e) => setAccount({ ...account,
              role: e.target.value })}>
            <option value="USER">User</option>
            <option value="MODERATOR">Moderator</option>
          </select>
          <button onClick={save}>
     Save
  </button>
  <button onClick={signout}>
    Signout
  </button>
  <Link to="/project/admin/users" className="btn btn-warning w-100">
    Users
  </Link>
        </div>
      )}
    </div>
  );
}
export default Profile;


// function Profile() {
//   const [currentUser, setCurrentUser] = useState({});
//   const [likes, setLikes] = useState([]);
//   const [followed, setFollowed] = useState([]);
//   const [city, setCity] = useState(null);
//   const { resultId } = useParams();
//   const [userLocation, setUserLocation] = useState(null);

//   const fetchFollowed = async (follower) => {
//     const followed = await userService.getFollowedUsers(follower);
//     setFollowed(followed);
//   };
//   const fetchLikes = async (userId) => {
//     const likes = await client.getLikesForUser(userId);
//     setLikes(likes);
//   };

//   const dispatch = useDispatch();
//   const fetchUser = async () => {
//     // const user = await profile();
//     const { payload } = await dispatch(profileThunk());
//     setCurrentUser(payload);
//     await fetchLikes(payload._id);
//     await fetchFollowed(payload._id);
//   };
  
//   useEffect(() => {
//     fetchUser();
//   }, []);

//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     // await logout();
//     await dispatch(logoutThunk());
//     navigate("/project/login");
//   };

//   useEffect(() => {
//     // Get user's location
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setUserLocation({
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//           });
//         },
//         (error) => {
//           console.error("Error getting user location:", error);
//           setUserLocation(null);
//         }
//       );
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//       setUserLocation(null);
//     }
//   }, []);

//   const fetchCity = async () => {
//     try {
//       const cityData = await client.findCityById(resultId);
//       setCity(cityData.network);
//     } catch (error) {
//       console.error("Error fetching city:", error);
//       setCity(null);
//     }
//   };

//   useEffect(() => {
//     fetchCity();
//   }, [resultId, userLocation]);

//   const formatDateTime = (timestamp) => {
//     return moment(timestamp).format("MMMM D, YYYY [at] HH:mm");
//   };

//   const getGoogleMapsLink = (latitude, longitude) => {
//     return `https://www.google.com/maps?q=${latitude},${longitude}`;
//   };

//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     // Calculate distance between two coordinates using Haversine formula
//     const R = 6371; // Radius of the Earth in km
//     const dLat = (lat2 - lat1) * (Math.PI / 180);
//     const dLon = (lon2 - lon1) * (Math.PI / 180);
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(lat1 * (Math.PI / 180)) *
//         Math.cos(lat2 * (Math.PI / 180)) *
//         Math.sin(dLon / 2) *
//         Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     const distance = R * c;

//     return distance;
//   };

//   const sortStationsByDistance = (stations) => {
//     if (!userLocation) {
//       return stations;
//     }

//     return stations.slice().sort((a, b) => {
//       const distanceA = calculateDistance(
//         userLocation.latitude,
//         userLocation.longitude,
//         a.latitude,
//         a.longitude
//       );
//       const distanceB = calculateDistance(
//         userLocation.latitude,
//         userLocation.longitude,
//         b.latitude,
//         b.longitude
//       );

//       return distanceA - distanceB;
//     });
//   };

//   return (
//     <div>
//           <h1>Profile</h1>
          

//        </div> 

// //     <div>
// //       <h1>Profile</h1>
// //       <pre>{JSON.stringify(currentUser, null, 2)}</pre>
// //       <button onClick={handleLogout}>Logout</button>
// //       <hr />
// //       <h3>People I follow</h3>
// //       <div className="list-group">
// //         {followed.map((f) => (
// //           <Link
// //             className="list-group-item"
// //             to={`/project/profile/${f.followed._id}`}
// //           >
// //             {f.followed.firstName} {f.followed.lastName}
// //           </Link>
// //         ))}
// //       </div>
// //       <pre>{JSON.stringify(followed, null, 2)}</pre>
// //       <hr />
// //       <h3>Bike Stations I like</h3>
// //       <div className="list-group">
// //       {likes.map((like) => (
// //   <Link
// //     key={like.station.id}  // Add a unique key for each item in the list
// //     className="list-group-item"
// //     to={`/project/details/${resultId}/stationdetails/${like.station.id}`}
// //   >
// //     {like.station.name}
// //   </Link>
// // ))}
// //       </div>
// //       <pre>{JSON.stringify(likes, null, 2)}</pre>
// //     </div>
// //   );
// // }
//   )
//   }
// export default Profile;
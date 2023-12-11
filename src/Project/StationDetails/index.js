import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import moment from "moment";
import * as client from "../client";
import { useAuth } from "../useAuth";
import "./index.css";

function StationDetails() {
  const { resultId, stationId } = useParams();
  const [city, setCity] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [likes, setLikes] = useState([]);
  const authData = useAuth();

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
          setUserLocation(null);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setUserLocation(null);
    }
  }, []);

  const fetchLikes = async () => {
    console.log('Fetching likes for stationId:', stationId);
    const likes = await client.getLikesForStation(stationId);
    console.log('Fetched likes:', likes);
    setLikes(likes);
  }

  const fetchCity = async () => {
    try {
      const cityData = await client.findCityById(resultId);
      setCity(cityData.network);
    } catch (error) {
      console.error("Error fetching city:", error);
      setCity(null);
    }
  };


  useEffect(() => {
    console.log('Before fetching likes');
    fetchLikes();
    console.log('After fetching likes');
    fetchCity();
  }, [resultId, stationId]);

  const formatDateTime = (timestamp) => {
    return moment(timestamp).format("MMMM D, YYYY [at] HH:mm");
  };

  const getGoogleMapsLink = (latitude, longitude) => {
    return `https://www.google.com/maps?q=${latitude},${longitude}`;
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    // Calculate distance between two coordinates using Haversine formula
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
  };

  return (
    <div>
      <br></br>
      {city ? (
        <>
          {city.stations && city.stations.length > 0 ? (
            <div>
              {/* Display details for the selected station */}
              {city.stations
                .filter((station) => station.id === stationId)
                .map((station) => (
                  <div key={station.id}>
                    <h1>Bike Station: {station.name}</h1>
                    <div className="bike-station-details-image pb-2">
          <img src="../bike-station-details.jpg" class="img-fluid" alt="Description of the image"></img>
       </div>
                    <div>
                      <button
                        onClick={() => {
                          if (!authData || !authData.currentUser) {
                            // User is not logged in, redirect to login page
                            alert("Please log in to like the station."); // Change "/login" to your actual login route
                          } else {
                            // User is logged in, allow them to like the station
                            client.userLikesStation(station.id, {
                              name: station.name,
                              stationId: station.id,
                              networkId: city.id,
                            });
                            window.location.reload();
                          }
                        }}
                        className="btn btn-primary float-end btn-lg"
                      >
                        Like
                      </button>
                    </div>
                    {city.location && (
            <div className="green-text-bubble-station p-2 pb-3">Located in {city.location.city}...<br></br></div>
          )}
           <div className="light-green-text-bubble-station p-2 pb-3">
            In the network, "{city.name}."
           </div>
           <div className="green-text-bubble-station-long p-2 pb-3">There are currently {station.free_bikes} free bikes at this station.
          </div>
          <div className="light-green-text-bubble-station-long p-2 pb-4">
          The station details were last updated on {formatDateTime(station.timestamp)}.
          <br></br>
          </div>
                    {city.id}
                    <p>Free Bikes: {station.free_bikes}</p>
                    <p>Last Updated: {formatDateTime(station.timestamp)}</p>
                    <p>
                      Location:{" "}
                      <a
                        href={getGoogleMapsLink(station.latitude, station.longitude)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {`${station.latitude}, ${station.longitude}`}
                      </a>
                    </p>
                    <p>
                      Distance from you (km):{" "}
                      {userLocation
                        ? calculateDistance(
                          userLocation.latitude,
                          userLocation.longitude,
                          station.latitude,
                          station.longitude
                        ).toFixed(2)
                        : "-"}
                    </p>
                    <p><h4>Reviews</h4></p>
                    <div>
                      <h3>Likes</h3>
                      <div className="list-group">
                        {likes &&
                          likes
                            .filter((like) => like.stationId === station.id)
                            .map((like) => (
                              <Link
                                key={like._id}
                                to={`/profile/${like.user._id}`}
                                className="list-group-item list-group-item-action"
                              >
                                {/* {//for some reason I'm not able to get user.firstName or user.lastName} */}
                                {like.user.username}
                              </Link>
                            ))
                        }
                      </div>
                      <pre>{JSON.stringify(likes, null, 2)}</pre>
                    </div>
                    {/* Add Reviews section if available */}
                    {/* You can customize the Reviews section based on your data structure */}
                    {/* Example: <p>Reviews: {station.reviews}</p> */}
                  </div>
                ))}
            </div>
          ) : (
            <p>No stations found for this city</p>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default StationDetails;

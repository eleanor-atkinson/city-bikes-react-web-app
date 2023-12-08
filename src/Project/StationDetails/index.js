import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import moment from "moment";
import * as client from "../client";


function StationDetails() {
  const { resultId, stationId } = useParams();
  const [city, setCity] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [likes, setLikes] = useState([]);

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
      {city ? (
        <>
          <h2>Station Details</h2>
          <p>City: {city.location.city}</p>
          <p>Country: {city.location.country}</p>
          <p>Network: {city.name}</p>
          {city.stations && city.stations.length > 0 ? (
            <div>
              {/* Display details for the selected station */}
              {city.stations
                .filter((station) => station.id === stationId)
                .map((station) => (
                  <div key={station.id}>
                    <h3>{station.name}</h3>
                    <button onClick={() => {
                      client.userLikesStation(station.id, {
                        name: station.name,
                        stationId: station.id,
                      });
                    }}
                      className="btn btn-success float-end">
                      Like
                    </button>
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
                                to={`/project/profile/${like.user._id}`}
                                className="list-group-item list-group-item-action"
                              >
                                {/* {//for some reason I'm not able to get user.firstName or user.lastName } */}
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

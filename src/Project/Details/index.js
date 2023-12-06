import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import * as client from "../client";

function Details() {
  const [city, setCity] = useState(null);
  const { resultId } = useParams();
  const [userLocation, setUserLocation] = useState(null);

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
    fetchCity();
  }, [resultId, userLocation]);

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

  const sortStationsByDistance = (stations) => {
    if (!userLocation) {
      return stations;
    }

    return stations.slice().sort((a, b) => {
      const distanceA = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        a.latitude,
        a.longitude
      );
      const distanceB = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        b.latitude,
        b.longitude
      );

      return distanceA - distanceB;
    });
  };

  return (
    <div>
      <h1>Network Details</h1>
      {city ? (
        <>
          <h2>{city.name}</h2>
          <p>City: {city.location.city}</p>
          <p>Country: {city.location.country}</p>

          <h2>Stations ordered by proximity to you</h2>
          {city.stations && city.stations.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Station</th>
                  <th>Average User Review</th>
                  <th>Free Bikes</th>
                  <th>Last Updated</th>
                  <th>Location</th>
                  <th>Distance from you (km)</th>
                </tr>
              </thead>
              <tbody>
                {sortStationsByDistance(city.stations).map((station) => (
                  <tr key={station.id}>
                    <td>
                      <Link to={`/project/details/${resultId}/stationdetails/${station.id}`}>
                        {station.name}
                      </Link>
                    </td>
                    <td> <h1>Reviews</h1></td>
                    <td>{station.free_bikes}</td>
                    <td>{formatDateTime(station.timestamp)}</td>
                    <td>
                      <a
                        href={getGoogleMapsLink(
                          station.latitude,
                          station.longitude
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {`${station.latitude}, ${station.longitude}`}
                      </a>
                    </td>
                    <td>
                      {userLocation
                        ? calculateDistance(
                            userLocation.latitude,
                            userLocation.longitude,
                            station.latitude,
                            station.longitude
                          ).toFixed(2)
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

export default Details;

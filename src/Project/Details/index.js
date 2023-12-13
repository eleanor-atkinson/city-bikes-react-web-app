import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import * as client from "../client";
import "./index.css";

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
      <br></br>
      {city ? (
        <>
        <div className="bike-station-details-image pb-2">
                      <img src="../network-details.jpg" class="img-fluid" alt="Description of the image"></img>
                    </div>
                    <br></br>
          <h1>{city.name} Network Details</h1>
          <div className="green-text-bubble"><br></br>Located in the one of a kind city of <b>{city.location.city}</b>!<br></br><br></br></div><br></br>
          <div className="light-green-text-bubble"><br></br>Click on a bike station to learn more!<br></br><br></br></div>
          {/* <div className="background-color-card">In the beautiful country of: <b>{city.location.country}</b></div> */}
          <br></br>

          <h2>Here are all the bike stations in the network ordered by proximity to you...</h2>
          {city.stations && city.stations.length > 0 ? (
            <>
              <table className="table">
                <thead>
                  <tr>
                    <th>Station</th>
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
                        <button className="btn btn-light">
                        <Link className="text-success" to={`/details/${resultId}/stationdetails/${station.id}`}>
                          {station.name}
                        </Link>
                        </button>
                      </td>

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

              <div className="small-screen-table">
                <table>
              <thead>
        <tr>
          <th>Station</th>
          <th>Free Bikes</th>
         
        </tr>
      </thead>
      <tbody>
                {sortStationsByDistance(city.stations).map((station) => (
                  <tr key={station.id} className="station-details-small-screen">
                    <td>
                    <button className="btn btn-light">
                    <Link className="text-success"  to={`/details/${resultId}/stationdetails/${station.id}`}>
                      <p>{station.name}</p>
                    </Link>
                    </button>
                    </td>
                    <td>
                    <p>{station.free_bikes}</p>
                    </td>
                 
                    </tr>
                ))}
                    </tbody>
                    </table>
              </div>
            </>
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

import React, { useState, useEffect } from "react";
import * as client from "../client";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import "./index.css";

const Search = () => {
  const { searchTerm } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");

  const fetchCities = async (searchTerm) => {
    try {
      const qwe = searchTerm || query;
      const allCities = await client.findCities(qwe);
      const filteredCities = allCities.filter((city) =>
        city.location.city.toLowerCase().includes(qwe.toLowerCase())
      );
      setResults(filteredCities);
    } catch (error) {
      console.error("Error fetching cities:", error);
      setResults([]); // Reset results in case of an error
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Only trigger the search if there's a non-empty searchTerm
        if (searchTerm && searchTerm.trim() !== "") {
          setQuery(searchTerm);
          await fetchCities(searchTerm);
        } else {
          // If searchTerm is empty, reset results
          setResults([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  
    // Cleanup function to clear the search bar when the component is unmounted
    return () => setQuery("");
  }, [searchTerm, location]);

  const handleSearch = async () => {
    await fetchCities(query);
    navigate(`/search/${query}`);
    setQuery(""); // Clear the input field after initiating a search
  };

  return (
    <div>
      <br></br>
      <div className="bike-station-details-image pb-2">
                      <img src="../bike-search.jpg" class="img-fluid" alt="Description of the image"></img>
                    </div>
                    <br></br>
      <h1>Search</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control w-75"
          placeholder="Search for a city..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button
          className="btn btn-success"
          type="button"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <h2>Results:</h2>
      {results && results.length > 0 ? (
        <div>
        <div className="background-color-card">All of the Bike Networks in Your City!</div>
        <table className="search-results-table">
          <thead>
            <tr>
              
              <th className="p-2"><br></br>Bike Network Name</th>
              
              <th><br></br>Location</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.id}>
                <td>
                  <button className="btn btn-light m-2">
                    
                  <Link className="green-link" to={`/details/${result.id}`}>{result.name}</Link>
                  </button>
                </td>
             
                <td>
                  {result.location.city}, {result.location.country}
                </td>
               
  
              </tr>
             
            ))}
          </tbody>
          <br></br>
                <br></br>
                <br></br>
                <br></br>
        </table>
        </div>
      ) : (
        <p>No results found</p>
      )}
      {results && results.length > 0 ? (
      <div className="background-color-card">
      Click on a bike network to learn more!
      </div>
      ) : ( " ")}
    </div>
  );
};

export default Search;

import React, { useState, useEffect } from "react";
import * as client from "./client";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";

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
    navigate(`/project/search/${query}`);
    setQuery(""); // Clear the input field after initiating a search
  };

  return (
    <div>
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
          className="btn btn-primary"
          type="button"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <h1>Results</h1>
      {results && results.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Reviews</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.id}>
                <td>
                  <Link to={`/project/details/${result.id}`}>{result.name}</Link>
                </td>
                <td>
                  <h1>Reviews</h1>
                </td>
                <td>
                  {result.location.city}, {result.location.country}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default Search;

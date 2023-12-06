import React, { useState, useEffect } from "react";
import * as client from "./client";
import { Link, useParams, useNavigate } from "react-router-dom";

const Search = () => {
  const { search: urlSearchTerm } = useParams();
  const [searchTerm, setSearchTerm] = useState(urlSearchTerm || "");
  const [results, setResults] = useState(null);
  const navigate = useNavigate();

  const fetchCities = async (searchValue) => {
    try {
      const allCities = await client.findCities(searchValue);
      const filteredCities = allCities.filter((city) =>
        city.location.city.toLowerCase().includes(searchValue.toLowerCase())
      );
      setResults(filteredCities);
    } catch (error) {
      console.error("Error fetching cities:", error);
      setResults([]);
    }
  };

  useEffect(() => {
    if (urlSearchTerm) {
      fetchCities(urlSearchTerm);
    }
  }, [urlSearchTerm]);

  return (
    <div>
      <h1>Search</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control w-75"
          placeholder="Search for a city..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => fetchCities(searchTerm)}
        >
          Search
        </button>
      </div>

      <h1>Results</h1>
      {results && results.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Name of the Bike Network</th>
              <th>Average Network User Reviews</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.id}>
                <td>
                  <Link to={`/project/details/${result.id}`}>
                    {result.name}
                  </Link>
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
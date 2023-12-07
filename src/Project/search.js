import React, { useState, useEffect } from "react";
import * as client from "./client";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateSearchTerm, fetchCities } from "./searchSlice";

const Search = () => {
  const { search: urlSearchTerm } = useParams();
  const searchTerm = useSelector((state) => state.search.searchTerm);
  const results = useSelector((state) => state.search.results);
  const loading = useSelector((state) => state.search.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const initializeSearch = async () => {
      if (urlSearchTerm) {
        // Set the search term in the Redux state
        dispatch(updateSearchTerm(urlSearchTerm));
        // Fetch cities based on the URL search term
        await dispatch(fetchCities(urlSearchTerm));
      }
    };

    // Call the initializeSearch function
    initializeSearch();
  }, [urlSearchTerm, dispatch]);

  const handleSearch = () => {
    dispatch(updateSearchTerm(searchTerm));
    dispatch(fetchCities(searchTerm));
    navigate(`/project/search/${searchTerm}`);
  };

  return (
    <div>
      <h1>Search</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control w-75"
          placeholder="Search for a city..."
          value={searchTerm}
          onChange={(event) => dispatch(updateSearchTerm(event.target.value))}
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
      {loading? ( 
        <p>Loading... </p>
      ) : results && results.length > 0 ? (
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
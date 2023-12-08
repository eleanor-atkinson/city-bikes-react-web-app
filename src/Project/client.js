import axios from "axios";
export const BIKE_API = "https://api.citybik.es/v2";

// participate in cookies 
const request = axios.create({
  withCredentials: true,
});

const SERVER_API = "http://localhost:4000";

const STATION_API = "http://localhost:4000/api/stations";

// posts and creates the relationship between station and user
export const userLikesStation = async (stationId, station) => {
    const response = await request.post(`${STATION_API}/${stationId}/likes`, station);
    return response.data;
};

export const getLikesForUser = async (userId) => {
    const response = await request.get(`${SERVER_API}/api/users/${userId}/likes`);
    return response.data;
}

export const getLikesForStation = async (stationId) => {
    const response = await request.get(`${SERVER_API}/api/stations/${stationId}/likes`);
    return response.data;
}


// note that never use searchTerm in function (BUG ALERT)
export const findCities = async (searchTerm) => {
    const response = await axios.get(`${BIKE_API}/networks?fields=id,name,href,location`);
    return response.data.networks;
};

// more like find network by Id
export const findCityById = async (resultId) => {
    const response = await axios.get(`${BIKE_API}/networks/${resultId}`);
    return response.data;
};


// export const findStationById = async (resultId, stationId) => {
//     const response = await axios.get(`${BIKE_API}/networks/${resultId}/stations/${stationId}`);
//     return response.data;
// };

// export const userLikesStation = async (resultId, station) => {
//     const response = await request.post(`${BIKE_API}/networks/${resultId}/likes`, station);
//     return response.data;
//   };
  
//   export const getLikesForUser = async (userId) => {
//     const response = await request.get(
//       `http://localhost:4000/api/users/${userId}/likes`
//     );
//     return response.data;
//   };
  
//   export const getLikesForStation = async (resultId) => {
//     const response = await request.get(
//       `http://localhost:4000/api/albums/${resultId}/likes`
//     );
//     return response.data;
//   };
  
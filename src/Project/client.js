import axios from "axios";
export const BIKE_API = "https://api.citybik.es/v2";

// note that never use searchTerm in function (BUG ALERT)
export const findCities = async (searchTerm) => {
    const response = await axios.get(`${BIKE_API}/networks?fields=id,name,href,location`);
    return response.data.networks;
  };


export const findCityById = async (resultId) =>  {
    const response = await axios.get(`${BIKE_API}/networks/${resultId}`);
    return response.data;
  };


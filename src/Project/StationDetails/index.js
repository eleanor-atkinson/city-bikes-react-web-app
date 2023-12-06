import { useParams } from 'react-router-dom';

function StationDetails() {
  const { resultId, stationId } = useParams();
  console.log('resultId:', resultId);
  console.log('stationId:', stationId);
    return (
      <div>
        <h1>Station Details</h1>
        <h2>Station: {stationId.name} </h2>
        <h2>All Reviews, link to users</h2>
      <p>resultId: {resultId}</p>
      <p>stationId: {stationId}</p>
      </div>
    );
  }
  
  export default StationDetails;
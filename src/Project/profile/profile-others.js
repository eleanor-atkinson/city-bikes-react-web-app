import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import * as service from "../users/client";
import * as client from "../client";

function ProfileOthers() {
    const { userId } = useParams();
    const [user, setUser] = useState({});
    const [likedStations, setLikedStations] = useState([]);

    const fetchUser = async () => {
        const user = await service.findUserById(userId);
        setUser(user);

         // Fetch liked stations for the user
    const likes = await client.getLikesForUser(userId);
    setLikedStations(likes.map((like) => like.station));
  };
    
    useEffect(() => {
        fetchUser();

    }, [userId]);

    const formatJoinDate = (joinDate) => {
        // Format the joinDate to a more readable format
        return new Date(joinDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      };

    return (
        <div>
            <br></br>
            {/* //         <button onClick={followUser} className="float-end">
    //           Follow
    //         </button> */}
    <h1><p>Check out {user.username}'s Profile!</p></h1>
    <br></br>
    <h3>Rider Details</h3>
    <div className="list-group">
        <div className="list-group-item">
        <h3>{user.username}</h3>
        </div>
        <div className="list-group-item"><p>
             Joined on {formatJoinDate(user.dateOfJoin)}  </p></div>
    </div>
    <br></br>
    <h3>Check out {user.username}'s liked stations...</h3>
      <div className="list-group">
        {likedStations.map((station) => (
          <Link
            key={station.id}
            to={`/details/${station.networkId}/stationdetails/${station.id}`}
            className="list-group-item list-group-item-action"
          >
            {station.name} ({station.networkId})
          </Link>
        ))}
      </div>
           <pre>{JSON.stringify(user, null, 2)}</pre>
         </div>
       );
}

export default ProfileOthers;
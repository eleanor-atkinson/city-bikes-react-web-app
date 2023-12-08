import { useState, useEffect } from "react";
import { useParams } from "react-router";
import * as service from "../users/client";

function ProfileOthers() {
    const { userId } = useParams();
    const [user, setUser] = useState({});
    //   const [followers, setFollowers] = useState([]);

    const fetchUser = async () => {
        const user = await service.findUserById(userId);
        setUser(user);
    };

    //   const fetchFollowers = async () => {
    //     const followers = await service.getFollowerUsers(userId);
    //     setFollowers(followers);
    //   };

    //   const followUser = async () => {
    //     const follow = await service.userFollowsAnotherUser(userId);
    //   };

    useEffect(() => {
        fetchUser();
        //     fetchFollowers();
    }, []);

    return (
        <div>
            <h1>Someone elses profile</h1>
            {/* //         <button onClick={followUser} className="float-end">
    //           Follow
    //         </button> */}
           <pre>{JSON.stringify(user, null, 2)}</pre>
         </div>
       );
}

export default ProfileOthers;
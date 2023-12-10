import { useEffect, useState } from "react";
import * as client from "./users/client";
import * as service from "./client";

export const useAuth = () => {

  // represents currently logged in user, currentUser starts as null 
  const [currentUser, setCurrentUser] = useState(null);

  // likes associated with user, starts as empty array 
  const [userLikes, setUserLikes] = useState([]);

  // represents whether the authentication data is still being loaded, starts as true
  const [isLoading, setIsLoading] = useState(true);

  // asynchronously fetches user account information using client.account()
  const fetchUser = async () => {
    try {
      // sets the current user
      const account = await client.account();
      setCurrentUser(account);

      // if a user is logged in 
      if (account) {
        // fetch the user's likes 
        const likes = await service.getLikesForUser(account._id);
        setUserLikes(likes);
      }
    } catch (error) {
      setCurrentUser(null);
    } finally {
      // isLoading is set to false regardless of whether the fetch operation was successful 
      // or encountered an error
      setIsLoading(false);
    }
  };

  // runs once when the component using useAuth mounts 
  //  returns an object that includes currentUser, userLikes, and isLoading 
  // if currentUser is truthy (i.e., a user is logged in)
  // want to change so it updates when a user logs out 
  useEffect(() => {
    fetchUser();
  }, []);

  // Returns an object with currentUser, userLikes, and isLoading if currentUser is truthy, otherwise returns null.
  return currentUser ? { currentUser, userLikes, isLoading } : null;
};

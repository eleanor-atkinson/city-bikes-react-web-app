import { useEffect, useState } from "react";
import * as client from "./users/client";
import * as service from "./client";

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLikes, setUserLikes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const account = await client.account();
      setCurrentUser(account);

      if (account) {
        // Fetch the user's likes if they are logged in
        const likes = await service.getLikesForUser(account._id);
        setUserLikes(likes);
      }
    } catch (error) {
      setCurrentUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return currentUser ? { currentUser, userLikes, isLoading } : null;
};

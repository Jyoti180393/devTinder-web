import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.data));
    } catch (err) {
      console.error(err.response);
    }
  };

  useEffect(() => {
    if (feed) return;
    getFeed();
  }, []);

  if (!feed) return;

  if (feed.length === 0)
    return (
      <div className="flex flex-col justify-center my-30">
        <h1 className="text-center text-3xl my-2">
          Your have explored all the connections!
        </h1>
        <p className="text-center">Wait for the response from the requests</p>
      </div>
    );

  return (
    feed && (
      <div className="flex items-center justify-center min-h-[calc(100vh-7rem)] bg-base-300">
        <UserCard user={feed[0]} isFeed={true} />
      </div>
    )
  );
};

export default Feed;

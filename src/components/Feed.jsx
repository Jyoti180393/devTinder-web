import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/feedSlice";
import User from "./User";

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

  return (
    feed && (
      <div className="flex items-center justify-center min-h-[calc(100vh-7rem)] bg-base-300">
        <User user={feed[0]} />
      </div>
    )
  );
};

export default Feed;

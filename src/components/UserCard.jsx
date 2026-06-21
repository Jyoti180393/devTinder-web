import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeFeed } from "../store/feedSlice";

const UserCard = ({ isFeed, user }) => {
  const { _id, firstName, age, photoUrl, about, skills } = user;
  const dispatch = useDispatch();

  const handleSendrequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true },
      );

      dispatch(removeFeed());
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="shadow-sm max-w-lg rounded-2xl">
      <div id="slide1" className="carousel-item relative w-full group">
        <div
          className={`relative overflow-hidden rounded-2xl 
            ${isFeed ? "w-100 " : "w-full h-64 sm:h-80 md:h-120"}`}
        >
          <img
            src={photoUrl}
            alt={firstName + "'s photo"}
            className={`w-full object-cover ${
              isFeed ? "h-[calc(100vh-15rem)]" : "h-[calc(100vh-25rem)]"
            }`}
          />
          <div className="absolute bottom-0 left-0 w-full p-4 text-white z-10 bg-black/50">
            <div className="flex gap-2 text-2xl font-medium mb-1">
              <span>{firstName}</span>
              {age && <span>{age}</span>}
            </div>
            <div className="font-medium">{about}</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
            ></svg>
            <div className="font-medium my-2">
              {skills?.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-600 w-auto rounded-2xl py-1 px-2 mr-2 inline-block"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {isFeed && (
          <div className="absolute left-2 right-2 top-1/2 transform justify-between hidden group-hover:flex">
            <div className="relative group inline-block">
              <button
                className="btn btn-circle w-12 h-12 text-xl hover:base-300"
                onClick={() => handleSendrequest("interested", _id)}
              >
                ❮
              </button>
              <span
                className="absolute top-full left-1/2  rounded-2xl
            -translate-x-1/3 mt-2 px-3 py-1 bg-gray-800
             text-md font-medium  
             opacity-0 pointer-events-none transition-opacity
              duration-200 group-hover:opacity-100 "
              >
                Select
              </span>
            </div>
            <div className="relative group inline-block">
              <button
                className="btn btn-circle w-12 h-12 text-xl hover:base-300"
                onClick={() => handleSendrequest("ignored", _id)}
              >
                ❯
              </button>
              <span
                className="absolute top-full left-2 rounded-2xl
            -translate-x-1/3 mt-2 px-3 py-1 bg-gray-800
             text-md font-medium  
             opacity-0 pointer-events-none transition-opacity
              duration-200 group-hover:opacity-100 "
              >
                Ignore
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;

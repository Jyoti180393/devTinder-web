import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../store/requestsSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const getConnectionRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/recieved", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log(err.response);
    }
  };

  const reviewRequest = async (status, reqId) => {
    try {
      console.log(BASE_URL + "/request/review/" + status + "/" + reqId);
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + reqId,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequest(reqId));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getConnectionRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return (
      <div className="flex flex-col justify-center my-30">
        <h1 className="text-center text-3xl my-2">
          Your have 0 Connection Requests!
        </h1>
        <p className="text-center">Send request to make new connection</p>
      </div>
    );

  return (
    requests && (
      <div className="flex flex-col justify-center my-10 bg-base-100">
        <h1 className="text-center text-3xl">Connection Requests</h1>
        <div className="flex flex-col items-center scrollbar-none overflow-auto">
          {requests.map((request) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } =
              request.fromUserId;
            return (
              <div key={_id} className="min-w-1/3 felx bg-base-200 my-3">
                <div className="card card-side shadow-sm items-center gap-2">
                  <figure>
                    <img
                      className="w-25 h-25 rounded-full"
                      src={photoUrl}
                      alt="Movie"
                    />
                  </figure>
                  <div className="card-body gap-1">
                    <h2 className="font-bold text-xl">
                      {firstName + " " + lastName}
                    </h2>
                    <p>
                      {age && <span className="mx-1">{age}</span>}
                      {gender && <span className="mx-1">{gender}</span>}
                    </p>

                    <div className="group relative cursor-pointer">
                      <p className="truncate md:w-96">{about}</p>
                      <span
                        className="absolute left-30 bottom-full mt-2 hidden group-hover:block z-50 
                        w-80 p-2 bg-base-100 border border-gray-800 text-sm rounded-md 
                        shadow-xl wrap-break-word line-height-relaxed"
                      >
                        {about}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 m-1">
                    <button
                      className="btn btn-soft btn-primary rounded-3xl hover:scale-110 text-lg"
                      onClick={() => reviewRequest("accepted", request._id)}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-soft btn-secondary rounded-3xl hover:scale-110 text-lg"
                      onClick={() => reviewRequest("rejected", request._id)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
};

export default Requests;

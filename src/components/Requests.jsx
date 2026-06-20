import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../store/requestsSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const getConnectionRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/recieved", {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log(err.response);
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
              <div key={_id} className="w-1/3 felx bg-base-200 my-3">
                <div className="card card-side shadow-sm p-3 items-center">
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

                    <p>{about}</p>
                    {/* <div className="card-actions justify-end">
                    <button className="btn btn-primary-content bg-white text-black text-sm rounded-3xl mx-2">
                      Message
                    </button>
                  </div> */}
                  </div>
                  <div className="flex flex-col gap-2">
                    <button className="btn btn-secondary rounded-3xl hover:scale-110">
                      Accept
                    </button>
                    <button className="btn btn-primary-content bg-white text-black rounded-3xl hover:scale-110">
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

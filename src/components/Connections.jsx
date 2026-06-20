import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../store/connectionsSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err.response);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0)
    return (
      <div className="flex flex-col justify-center my-30">
        <h1 className="text-center text-3xl my-2">Your have 0 connections!</h1>
        <p className="text-center">Send request to make new connection</p>
      </div>
    );

  return (
    connections && (
      <div className="flex flex-col justify-center my-10 bg-base-100">
        <h1 className="text-center text-3xl">Connections</h1>
        <div className="flex flex-col items-center scrollbar-none overflow-auto">
          {connections.map((connection) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } =
              connection;
            return (
              <div key={_id} className="w-1/4 felx bg-base-200 my-3">
                <div className="card card-side shadow-sm py-2 px-3">
                  <figure>
                    <img
                      className="w-25 h-25 rounded-full"
                      src={photoUrl}
                      alt="Movie"
                    />
                  </figure>
                  <div className="card-body  gap-1">
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
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
};

export default Connections;

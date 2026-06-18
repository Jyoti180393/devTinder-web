import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("Jyoti@gmail.com");
  const [password, setPassword] = useState("Pokharia@123");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.data));
      navigate("/");
      // axios response objects already have parsed JSON
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
      console.error("ERROR: ", err.response.data);
    }
  };

  return (
    <div className="flex justify-center my-20">
      <div className="card card-border bg-base-300 w-96 shadow-xl h-1/3">
        <div className="card-body ">
          <h2 className="card-title text-2xl">Login!</h2>
          <div className="my-1">
            <label className="form-control w-full max-w-xl block my-5">
              <div className="label mb-1">
                <span className="label-text">Email: {email}</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xl h-10 text-xl"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </label>
            <label className="form-control w-full max-w-xl block my-5">
              <div className="label mb-1">
                <span className="label-text">Password: {password}</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xl h-10 text-xl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          {error && (
            <p className="text-red-500 leading-1.5 text-lg my-2">
              Error: {error}
            </p>
          )}
          <div className="card-actions justify-center m-2">
            <button className="btn btn-primary text-xl" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

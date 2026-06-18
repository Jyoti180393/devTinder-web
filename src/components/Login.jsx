import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("Jyoti@gmail.com");
  const [password, setPassword] = useState("Pokharia@123");
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
      console.log(res.data);
      dispatch(addUser(res.data.data));
      navigate("/");
      // axion response objects already have parsed JSON
    } catch (err) {
      console.log("ERROR: ", err);
    }
  };

  return (
    <div className="flex justify-center my-20">
      <div className="card card-border bg-base-300 w-96 shadow-xl">
        <div className="card-body ">
          <h2 className="card-title">Login!</h2>
          <div className="my-2">
            <label className="form-control w-full max-w-xs block my-5">
              <div className="label mb-1">
                <span className="label-text">Email: {email}</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </label>
            <label className="form-control w-full max-w-xs block my-5">
              <div className="label mb-1">
                <span className="label-text">Password: {password}</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div className="card-actions justify-center m-4">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

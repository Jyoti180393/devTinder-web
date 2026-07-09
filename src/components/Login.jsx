import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import Signup from "./Signup";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleLogin = () => {
    const newIsLogin = !isLogin;
    setIsLogin(newIsLogin);
    navigate(newIsLogin == false ? "/login/signup" : "/login");
  };

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
      // TODO: need to redirect to error page
    }
  };

  return (
    <div className={`flex justify-center ${isLogin ? "my-20" : "my-10"}`}>
      <div className="card card-border bg-base-300 w-96 shadow-xl h-1/3">
        <div className="card-body ">
          <h2 className="card-title text-2xl">
            {isLogin ? "Login" : "Sign up"}
          </h2>
          {isLogin && (
            <>
              <div className="my-1">
                <label className="form-control w-full max-w-xl block my-5">
                  <div className="label mb-1">
                    <span className="label-text">Email: {email}</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xl h-10 text-xl"
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
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
              </div>
              {error && (
                <p className="text-red-500 leading-6 text-lg mt-4 mb-2">
                  {error}
                </p>
              )}
              <div className="card-actions justify-center m-2">
                <button
                  className="btn btn-primary text-xl"
                  onClick={handleLogin}
                >
                  Login
                </button>
              </div>
            </>
          )}
          {!isLogin && <Signup />}

          <p
            className="text-center cursor-pointer text-primary"
            onClick={toggleLogin}
          >
            {isLogin ? "New user! SignUp here" : "Existing user! Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

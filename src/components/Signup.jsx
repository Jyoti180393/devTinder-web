import { useState } from "react";
import ReusableDropdown from "./ReusableDropdown";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");

  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allowedGenders = ["Male", "Female", "Others"];
  const allowedSecurityQuestions = [
    "What is your pet name?",
    "What is your favourite color?",
    "What is your best friend's name?",
  ];

  const handleSignUp = async () => {
    try {
      const userData = {
        firstName,
        lastName,
        email,
        password,
        age,
        gender,
        about,
        securityQuestion,
        securityAnswer,
      };
      const res = await axios.post(BASE_URL + "/signup", userData, {
        withCredentials: true,
      });
      dispatch(addUser(res.data.data));
      setShowSuccessToast(true);
      setTimeout(() => {
        setShowSuccessToast(false);
      }, 3000);
      navigate("/profile");
    } catch (err) {
      console.error(err.response.data);
      setError(err.response.data);
    }
  };

  return (
    <>
      {showSuccessToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Your profile is saved successfully</span>
          </div>
        </div>
      )}
      <div className="my-1 scrollbar-none overflow-auto h-115">
        <label className="form-control w-full max-w-xl block my-5">
          <div className="label font-bold text-md mb-1">
            <span className="label-text">FIRST NAME</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xl h-10 text-xl"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </label>
        <label className="form-control w-full max-w-xl block my-5">
          <div className="label font-bold text-md mb-1">
            <span className="label-text">LAST NAME:</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xl h-10 text-xl"
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label className="form-control w-full max-w-xl block my-5">
          <div className="label font-bold text-md mb-1">
            <span className="label-text">EMAIL:</span>
          </div>
          <input
            type="email"
            className="input input-bordered w-full max-w-xl h-10 text-xl"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="form-control w-full max-w-xl block my-5">
          <div className="label font-bold text-md mb-1">
            <span className="label-text">PASSWORD:</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xl h-10 text-xl"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label className="form-control w-full max-w-xl block my-5">
          <div className="label font-bold text-md mb-1">
            <span className="label-text">AGE:</span>
          </div>
          <input
            type="number"
            className="input input-bordered w-full max-w-xl h-10 text-xl"
            onChange={(e) => setAge(e.target.value)}
          />
        </label>
        <label className="form-control w-full max-w-xl block my-5">
          <div className="label font-bold text-md mb-1">
            <span className="label-text">GENDER</span>
          </div>
          <ReusableDropdown
            dropdownList={allowedGenders}
            onDropdownSelect={(selectedValue) => setGender(selectedValue)}
          />
        </label>
        <label className="form-control w-full max-w-xl block my-5">
          <div className="label font-bold text-md mb-1">
            <span className="label-text">ABOUT</span>
          </div>
          <textarea
            className="textarea h-24 w-full max-w-xl text-lg"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>
        </label>
        <label className="form-control w-full max-w-xl block my-5">
          <div className="label font-bold text-md mb-1">
            <span className="label-text">SECURITY QUESTION</span>
          </div>
          <ReusableDropdown
            dropdownList={allowedSecurityQuestions}
            onDropdownSelect={(selectedValue) =>
              setSecurityQuestion(selectedValue)
            }
          />
        </label>
        <label className="form-control w-full max-w-xl block my-3">
          <div className="label font-bold text-md mb-1">
            <span className="label-text">SECURITY ANSWER:</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xl h-10 text-xl"
            onChange={(e) => setSecurityAnswer(e.target.value)}
          />
        </label>
      </div>
      {error && (
        <p className="text-red-500 leading-6 text-lg mt-1 mb-1">
          {error ||
            "There is something wrong! Please reload then page and try again"}
        </p>
      )}
      <div className="card-actions justify-center m-1">
        <button className="btn btn-primary text-xl" onClick={handleSignUp}>
          Signup
        </button>
      </div>
    </>
  );
};

export default Signup;

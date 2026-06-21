import { useState } from "react";
import ReusableDropdown from "./ReusableDropdown";

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

  const [error, setError] = useState("");

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
      console.log(userData);
    } catch (err) {
      console.error(err.response.data);
      setError(err.response.data);
    }
  };

  return (
    <>
      <div className="my-1 scrollbar-none overflow-auto h-100">
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
        <label className="form-control w-full max-w-xl block my-3">
          <div className="label font-bold text-md mb-1">
            <span className="label-text">GENDER</span>
          </div>
          <ReusableDropdown
            dropdownList={allowedGenders}
            onDropdownSelect={(selectedValue) => setGender(selectedValue)}
          />
          {/* <div
            className={`dropdown dropdown-bottom block ${genderDropdownOpen ? "dropdown-open" : "dropdown-close"}`}
          >
            <button
              tabIndex={0}
              role="button"
              className="input text-md w-full max-w-xl h-10 text-lg"
              onClick={() => {
                setGenderDropdownOpen(true);
              }}
            >
              {gender || "Select"}
            </button>
            {genderDropdownOpen && (
              <ul
                tabIndex="-1"
                className="dropdown-content menu bg-base-100 rounded-box 
              z-1 p-2 shadow-sm w-full"
              >
                {allowedGenders.map((genderOption, index) => (
                  <li key={index} className="w-full my-1">
                    <button
                      className=" text-lg"
                      onClick={() => {
                        setGender(genderOption);
                        console.log(genderOption);
                        setGenderDropdownOpen(false);
                      }}
                    >
                      {genderOption}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div> */}
        </label>
        <label className="form-control w-full max-w-xl block my-3">
          <div className="label font-bold text-md mb-1">
            <span className="label-text">ABOUT</span>
          </div>
          <textarea
            className="textarea h-24 w-full max-w-xl text-lg"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>
        </label>
        <label className="form-control w-full max-w-xl block my-3">
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
        <p className="text-red-500 leading-1.5 text-lg my-2">Error: {error}</p>
      )}
      <div className="card-actions justify-center m-2">
        <button className="btn btn-primary text-xl" onClick={handleSignUp}>
          Signup
        </button>
      </div>
    </>
  );
};

export default Signup;

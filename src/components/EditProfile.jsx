import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constant";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import ReusableDropdown from "./ReusableDropdown";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [skills, setSkills] = useState(user.skills);
  // TODO: add skills in the form
  const [error, setError] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const dispatch = useDispatch();
  const allowedGenders = ["Male", "Female", "Others"];

  const handleSaveProfile = async () => {
    setError("");
    try {
      const payload = {
        firstName,
        lastName,
        age,
        gender,
        about,
        photoUrl,
      };
      const res = await axios.patch(BASE_URL + "/profile/edit", payload, {
        withCredentials: true,
      });
      setShowPreview(false);
      dispatch(addUser(res.data.data));

      setShowSuccessToast(true);
      setTimeout(() => {
        setShowSuccessToast(false);
      }, 3000);
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
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
      <div className="flex justify-center my-10">
        <div className="card card-border bg-base-300 w-96 shadow-xl max-h-[calc(100vh-7rem)]">
          <div className="card-body ">
            <h2 className="card-title text-2xl text-red-700">
              {showPreview ? "Preview Profile" : "Edit Profile"}
            </h2>
            {!showPreview && (
              <div
                className={`scrollbar-none overflow-auto ${
                  error ? "h-100" : "h-120"
                }`}
              >
                <label className="form-control w-full max-w-xl block my-3">
                  <div className="label font-bold text-md">
                    <span className="label-text">FIRST NAME</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xl h-10 text-lg"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                </label>
                <label className="form-control w-full max-w-xl block my-3">
                  <div className="label font-bold text-md">
                    <span className="label-text">LAST NAME</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xl h-10 text-lg"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xl block my-3">
                  <div className="label font-bold text-md">
                    <span className="label-text">PHOTO URL</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xl h-10 text-lg"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xl block my-3">
                  <div className="label font-bold text-md">
                    <span className="label-text">AGE</span>
                  </div>
                  <input
                    type="number"
                    className="input input-bordered w-full max-w-xl h-10 text-lg"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xl block my-5">
                  <div className="label font-bold text-md mb-1">
                    <span className="label-text">GENDER</span>
                  </div>
                  <ReusableDropdown
                    dropdownList={allowedGenders}
                    onDropdownSelect={(selectedValue) =>
                      setGender(selectedValue)
                    }
                  />
                </label>
                <label className="form-control w-full max-w-xl block my-3">
                  <div className="label font-bold text-md">
                    <span className="label-text">ABOUT</span>
                  </div>
                  <textarea
                    className="textarea h-24 w-full max-w-xl text-lg"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  ></textarea>
                </label>
              </div>
            )}
            {showPreview && (
              <div className="w-full max-w-xl mx-auto">
                <UserCard
                  user={{
                    firstName,
                    lastName,
                    age,
                    gender,
                    about,
                    photoUrl,
                    skills,
                  }}
                  isFeed={false}
                />
              </div>
            )}
            {error && (
              // <div className="w-full max-w-xl">
              <p className="text-red-500 leading-6 text-sm  wrap-break-word whitespace-pre-wrap">
                {error}
              </p>
              // </div>
            )}
            <div className="card-actions justify-center m-2">
              <button
                className="btn btn-primary-content bg-white text-black text-lg rounded-3xl mx-2"
                onClick={handleSaveProfile}
              >
                Save
              </button>
              <button
                className="btn btn-primary-content bg-white text-black text-lg rounded-3xl mx-2"
                onClick={() => setShowPreview((prev) => !prev)}
              >
                {showPreview ? "Edit" : "Show Preview"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;

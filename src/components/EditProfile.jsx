import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constant";
import UserCard from "./UserCard";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [skills, setSkills] = useState(user.skills);

  const [error, setError] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const handleSaveProfile = async () => {
    try {
      const res = await axios.patch(BASE_URL + "/profile/edit", {
        firstName,
        lastName,
        age,
        gender,
        about,
      });
      console.log(res?.data?.data);
      setShowPreview(false);
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
      console.error("ERROR: ", err.response?.data || err);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card card-border bg-base-300 w-96 shadow-xl max-h-[calc(100vh-7rem)]">
        <div className="card-body ">
          <h2 className="card-title text-2xl text-red-700">Edit Profile</h2>
          {!showPreview && (
            <>
              <div className="my-1 scrollbar-none overflow-auto">
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
                <label className="form-control w-full max-w-xl block my-3">
                  {/* TODO: make it dropdown */}
                  <div className="label font-bold text-md">
                    <span className="label-text">GENDER</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xl h-10 text-lg"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
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
              {error && (
                <p className="text-red-500 leading-1.5 text-lg my-3">
                  Error: {error}
                </p>
              )}
            </>
          )}
          {showPreview && (
            <div className="my-1">
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
                />
              </div>
            </div>
          )}

          <div className="card-actions justify-center m-2">
            <button className="btn btn-primary-content bg-white text-black text-lg rounded-3xl mx-2">
              Save
            </button>
            <button
              className="btn btn-primary-content bg-white text-black text-lg rounded-3xl mx-2"
              onClick={() => setShowPreview((prev) => !prev)}
            >
              {showPreview ? "Edit" : "Preview"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

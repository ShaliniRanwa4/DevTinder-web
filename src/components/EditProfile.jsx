import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
// import PropTypes from 'prop-types'

const EditProfile = ({ user }) => {
  console.log(user);

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [skills, setSkills] = useState(user.skills);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const [showTost, setShowTest] = useState(false);

  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, skills, about, age, gender },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowTest(true);
      setTimeout(() => {
        setShowTest(false);
      }, 2000);
    } catch (err) {
      setError(err?.response?.data);
      //   console.log(err?.response?.data);
    }
  };

  return (
    <>
      <div className="flex justify-center my-5 ">
        <div className="flex justify-center mx-10 mb-5 ">
          <div className="card bg-base-300  w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">First Name</span>
                </div>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Last Name</span>
                </div>
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Skills</span>
                </div>
                <input
                  type="text"
                  placeholder="Skiil"
                  value={skills}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setSkills(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">About</span>
                </div>
                <input
                  type="text"
                  placeholder="About"
                  value={about}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setAbout(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Age</span>
                </div>
                <input
                  type="text"
                  placeholder="Age"
                  value={age}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Gender</span>
                </div>
                {/* <input
                  type="text"
                  placeholder="Gender"
                  value={gender}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setGender(e.target.value)}
                ></input> */}

                {/* <input
                  type="text"
                  placeholder="Gender"
                  value={gender}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setGender(e.target.value)}
                /> */}

                <select
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value={"male"}>
                    {/* <li>
                      <a>male</a>
                    </li> */}
                    male
                  </option>
                  <option value={"female"}>
                    {/* <li>
                      <a>female</a>
                    </li> */}
                    female
                  </option>
                  <option value={"other"}>
                    {/* <li>
                      <a>other</a>
                    </li> */}
                    other
                  </option>
                </select>
              </label>
              <p className="text-red-400">{error}</p>
              <div className="card-actions justify-center m-2">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard user={{ firstName, lastName, skills, about, age, gender }} />
      </div>
      {showTost && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile Updated successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;

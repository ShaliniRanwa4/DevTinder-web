import { useState } from "react";
import PropTypes from "prop-types";

import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import ProfilePreview from "./ProfilePreview";
// import PropTypes from 'prop-types'

const EditProfile = ({ user }) => {
  // console.log(user);

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [skills, setSkills] = useState(user.skills);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [photoUrl,setPhotoUrl]=useState(user.photoUrl)
  const [error, setError] = useState("");
  const [showTost, setShowTest] = useState(false);

  const dispatch = useDispatch();




  // EditProfile.propTypes = {
  //     user: PropTypes.shape({
  //       // _id:PropTypes.number.isRequired,
  //       firstName: PropTypes.string.isRequired,
  //       skills: PropTypes.array.isRequired,
  //       lastName: PropTypes.string.isRequired,
  //       about: PropTypes.string.isRequired,
  //       photoUrl:PropTypes.string.isRequired,
  //       age:PropTypes.number.isRequired,
  //       gender:PropTypes.string.isRequired,
  //     }).isRequired,
  //   };

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
    <div className="flex justify-center mt-24 mb-14 ">
      <div className="flex justify-center mx-10  mb-10 ">
        <div className="card w-96 shadow-xl  bg-orange-500 ">
          <div className="card-body">
            <h2 className="card-title justify-center font-bold text-3xl text-black">Edit Profile</h2>

            <label className="form-control w-full max-w-xs my-1">
              <div className="label">
                <span className="label-text font-semibold text-lg  text-black">First Name</span>
              </div>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs my-1">
              <div className="label"> 
                <span className="label-text font-semibold text-lg  text-black">Last Name</span>
              </div>
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs my-1">
              <div className="label">
                <span className="label-text font-semibold text-lg  text-black">Skills</span>
              </div>
              <input
                type="text"
                placeholder="Skill"
                value={skills}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setSkills(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs my-1">
              <div className="label">
                <span className="label-text font-semibold text-lg  text-black">About</span>
              </div>
              <input
                type="text"
                placeholder="About"
                value={about}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setAbout(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs my-1">
              <div className="label">
                <span className="label-text font-semibold text-lg  text-black">Age</span>
              </div>
              <input
                type="text"
                placeholder="Age"
                value={age}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setAge(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs my-1">
              <div className="label">
                <span className="label-text font-semibold text-lg  text-black">Profile Picture</span>
              </div>
              <input
                type="text"
                placeholder="Age"
                value={photoUrl}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs my-1">
              <div className="label">
                <span className="label-text font-semibold text-lg  text-black">Gender</span>
              </div>
             
              <select
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setGender(e.target.value)}
              >
                <option value={"male"}>
                  
                  male
                </option>
                <option value={"female"}>
                 
                  female
                </option>
                <option value={"other"}>
                other
               </option>
              </select>
            </label>
             <p className="text-red-400">{error}</p>
            <div className="card-actions justify-center m-1">
              <button className="btn text-lg font-bold" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
          </div> 
        </div> 
      </div>
       {/* <UserCard user={{ firstName, lastName, skills, about, age, gender }} />  */}
      <ProfilePreview user={{ firstName, lastName, skills, about, age, gender }}/>
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

import { useState } from "react";


import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import ProfilePreview from "./ProfilePreview";
import { useNavigate } from "react-router-dom";
// import PropTypes from 'prop-types'

const EditProfile = ( ) => {
  // console.log(user);
  const user=useSelector((store)=>store.user)
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
  const navigate=useNavigate()




  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, skills, about, age, gender,photoUrl },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowTest(true);
      setTimeout(() => {
        setShowTest(false);
      }, 2000);
      return navigate("/")

    } catch (err) {
      setError(err?.response?.data);
      //   console.log(err?.response?.data);
    }
  };

  return (
  

<div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-10 mt-28 mb-24 px-4">

{/* Edit Profile Form */}
<div className="card w-full md:w-96 shadow-xl bg-orange-500 p-6 rounded-lg">
  <div className="card-body">
    <h2 className="card-title text-center font-bold text-3xl text-black">Edit Profile</h2>

    {/* First Name */}
    <label className="form-control w-full my-2">
      <span className="label-text font-semibold text-lg text-black">First Name</span>
      <input
        type="text"
        placeholder="Enter First Name"
        value={firstName}
        className="input input-bordered w-full"
        onChange={(e) => setFirstName(e.target.value)}
      />
    </label>

    {/* Last Name */}
    <label className="form-control w-full my-2">
      <span className="label-text font-semibold text-lg text-black">Last Name</span>
      <input
        type="text"
        placeholder="Enter Last Name"
        value={lastName}
        className="input input-bordered w-full"
        onChange={(e) => setLastName(e.target.value)}
      />
    </label>

    {/* Skills */}
    <label className="form-control w-full my-2">
      <span className="label-text font-semibold text-lg text-black">Skills</span>
      <input
        type="text"
        placeholder="Enter Skills"
        value={skills}
        className="input input-bordered w-full"
        onChange={(e) => setSkills(e.target.value)}
      />
    </label>

    {/* About */}
    <label className="form-control w-full my-2">
      <span className="label-text font-semibold text-lg text-black">About</span>
      <input
        type="text"
        placeholder="Tell something about yourself"
        value={about}
        className="input input-bordered w-full"
        onChange={(e) => setAbout(e.target.value)}
      />
    </label>

    {/* Age */}
    <label className="form-control w-full my-2">
      <span className="label-text font-semibold text-lg text-black">Age</span>
      <input
        type="text"
        placeholder="Enter Age"
        value={age}
        className="input input-bordered w-full"
        onChange={(e) => setAge(e.target.value)}
      />
    </label>

    {/* Profile Picture */}
    <label className="form-control w-full my-2">
      <span className="label-text font-semibold text-lg text-black">Profile Picture URL</span>
      <input
        type="text"
        placeholder="Paste Image URL"
        value={photoUrl}
        className="input input-bordered w-full"
        onChange={(e) => setPhotoUrl(e.target.value)}
      />
    </label>

    {/* Gender */}
    <label className="form-control w-full my-2">
      <span className="label-text font-semibold text-lg text-black">Gender</span>
      <select
        className="select select-bordered w-full"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
    </label>

    {/* Error Message */}
    <p className="text-red-400">{error}</p>

    {/* Save Button */}
    <div className="card-actions justify-center mt-4">
      <button className="btn btn-success text-lg font-bold w-full" onClick={saveProfile}>
        Save Profile
      </button>
    </div>
  </div>
</div>

{/* Profile Preview */}
<ProfilePreview
  
/>

{/* Success Toast */}
{showTost && (
  <div className="toast toast-top toast-center">
    <div className="alert alert-success">
      <span>Profile Updated successfully.</span>
    </div>
  </div>
)}
</div>
  );
};

export default EditProfile;

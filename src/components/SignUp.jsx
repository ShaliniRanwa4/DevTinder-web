





import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { motion } from "framer-motion";
import { FaHandPaper, FaEye, FaEyeSlash } from "react-icons/fa";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const SignUp = () => {
  const [emailId, setemailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [signedUp, setSignedUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { width, height } = useWindowSize();

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { emailId, password, firstName, lastName },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      setSignedUp(true);
      setTimeout(() => navigate("/profile"), 2000);
    } catch (err) {
      setError(err?.response?.data || "Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-orange-400 to-red-500 pb-24 pt-20 mb-6"
    >
      {signedUp && <Confetti width={width} height={height} numberOfPieces={300} gravity={0.2} />}
   
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="card bg-white w-96 shadow-2xl rounded-xl p-6 relative"
      >
        <div className="card-body relative z-10">
          <motion.h2
            className="card-title justify-center font-bold text-2xl text-black flex items-center"
          >
            Join Us! <motion.span animate={{ rotate: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 1 }}>
              <FaHandPaper className="ml-2 text-yellow-500" />
            </motion.span>
          </motion.h2>
          
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-semibold text-lg text-black">First Name</span>
            </div>
            <motion.input
              type="text"
              placeholder="First Name"
              value={firstName}
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setFirstName(e.target.value)}
              whileFocus={{ scale: 1.05 }}
            />
          </label>
          
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-semibold text-lg text-black">Last Name</span>
            </div>
            <motion.input
              type="text"
              placeholder="Last Name"
              value={lastName}
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setLastName(e.target.value)}
              whileFocus={{ scale: 1.05 }}
            />
          </label>
          
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-semibold text-lg text-black">Email Id</span>
            </div>
            <motion.input
              type="text"
              placeholder="E-mail"
              value={emailId}
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setemailId(e.target.value)}
              whileFocus={{ scale: 1.05 }}
            />
          </label>
          
          {/* Password Field with Visibility Toggle */}
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-semibold text-lg text-black">Password</span>
            </div>
            <div className="relative w-full">
              <motion.input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                className="input input-bordered w-full max-w-xs pr-10"
                onChange={(e) => setPassword(e.target.value)}
                whileFocus={{ scale: 1.05 }}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
          </label>
          
          <p className="text-red-600 text-sm mt-2">{error}</p>
          
          <div className="flex justify-center mt-4">
            <motion.button
              className="btn text-xl bg-orange-500 text-white px-6 pt-2 rounded-lg shadow-lg"
              onClick={handleSignUp}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </motion.button>
          </div>
          
          <Link to="/login">
            <motion.p
              className="cursor-pointer font-semibold text-lg text-black mt-2"
              whileHover={{ scale: 1.1 }}
            >
              Already have an account? Login here
            </motion.p>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SignUp;

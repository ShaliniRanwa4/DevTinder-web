


// import axios from "axios";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { addUser } from "../utils/userSlice";
// import { Link, useNavigate } from "react-router-dom";
// import { BASE_URL } from "../utils/constants";
// import { motion } from "framer-motion";
// import { FaHandPaper } from "react-icons/fa";
// import Confetti from "react-confetti";
// import { useWindowSize } from "react-use";

// const Login = () => {
//   const [emailId, setemailId] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [loggedIn, setLoggedIn] = useState(false);

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { width, height } = useWindowSize();

//   const handleLogin = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.post(
//         BASE_URL + "/login",
//         { emailId, password },
//         { withCredentials: true }
//       );
//       dispatch(addUser(res.data));
//       setLoggedIn(true);
//       setTimeout(() => navigate("/"), 2000);
//     } catch (err) {
//       setError(err?.response?.data || "Something Went Wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.9 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.5 }}
//       className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-orange-400 to-red-500 relative overflow-hidden"
//     >
//       {loggedIn && <Confetti width={width} height={height} numberOfPieces={300} gravity={0.2} />}
      
//       {/* Animated Header Text */}
//       <motion.h1
//         className="text-white text-3xl font-bold text-center mb-6"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//       >
//         Code. Connect. Collaborate. Meet Developers Like You! 🚀
//       </motion.h1>
      
//       <motion.div
//         initial={{ y: -50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//         className="card bg-white w-96 shadow-2xl rounded-xl p-6 relative"
//       >
//         {/* Floating Hearts & Stars Animation */}
//         <div className="absolute inset-0 overflow-hidden">
//           {[...Array(10)].map((_, i) => (
//             <motion.div
//               key={i}
//               className="absolute text-red-500"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: -100 }}
//               transition={{ duration: 5, repeat: Infinity, delay: i * 0.5 }}
//               style={{ left: `${Math.random() * 100}%`, top: "90%" }}
//             >
//               ❤️
//             </motion.div>
//           ))}
//         </div>

//         <div className="card-body relative z-10">
//           {/* Animated Title with Waving Hand */}
//           <motion.h2
//             className="card-title justify-center font-bold text-2xl text-black flex items-center"
//           >
//             Welcome Back! <motion.span animate={{ rotate: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 1 }}><FaHandPaper className="ml-2 text-yellow-500" /></motion.span>
//           </motion.h2>

//           <label className="form-control w-full max-w-xs">
//             <div className="label">
//               <span className="label-text font-semibold text-lg text-black">Email Id</span>
//             </div>
//             <motion.input
//               type="text"
//               placeholder="E-mail"
//               value={emailId}
//               className="input input-bordered w-full max-w-xs"
//               onChange={(e) => setemailId(e.target.value)}
//               whileFocus={{ scale: 1.05 }}
//             />
//           </label>
//           <label className="form-control w-full max-w-xs">
//             <div className="label">
//               <span className="label-text font-semibold text-lg text-black">Password</span>
//             </div>
//             <motion.input
//               type="password"
//               placeholder="Password"
//               value={password}
//               className="input input-bordered w-full max-w-xs"
//               onChange={(e) => setPassword(e.target.value)}
//               whileFocus={{ scale: 1.05 }}
//             />
//           </label>
//           <p className="text-red-600 text-sm mt-2">{error}</p>
//           <div className="card-actions justify-center m-2">
//             <motion.button
//               className="btn text-xl bg-orange-500 text-white px-6 py-2 rounded-lg shadow-lg relative overflow-hidden"
//               onClick={handleLogin}
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               disabled={loading}
//             >
//               {loading ? "Logging In..." : "Login"}
//               {/* Ripple Effect */}
//               <span className="absolute inset-0 bg-white opacity-10 rounded-full scale-0 transition-transform duration-300 group-hover:scale-100"></span>
//             </motion.button>
//           </div>
//           <Link to="/signup">
//             <motion.p
//               className="cursor-pointer m-auto font-semibold text-lg text-black"
//               whileHover={{ scale: 1.1 }}
//             >
//               New User? Sign Up here !!
//             </motion.p>
//           </Link>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default Login;













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

const Login = () => {
  const [emailId, setemailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { width, height } = useWindowSize();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      setLoggedIn(true);
      setTimeout(() => navigate("/"), 2000);
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
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-orange-400 to-red-500 relative overflow-hidden"
    >
      {loggedIn && <Confetti width={width} height={height} numberOfPieces={300} gravity={0.2} />}
      
      {/* Animated Header Text */}
      <motion.h1
        className="text-white text-3xl font-bold text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Code. Connect. Collaborate. Meet Developers Like You! 🚀
      </motion.h1>
      
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="card bg-white w-96 shadow-2xl rounded-xl p-6 relative"
      >
        <div className="card-body relative z-10">
          {/* Animated Title with Waving Hand */}
          <motion.h2
            className="card-title justify-center font-bold text-2xl text-black flex items-center"
          >
            Welcome Back! <motion.span animate={{ rotate: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 1 }}>
              <FaHandPaper className="ml-2 text-yellow-500" />
            </motion.span>
          </motion.h2>

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
          
          <div className="card-actions justify-center m-2">
            <motion.button
              className="btn text-xl bg-orange-500 text-white px-6 py-2 rounded-lg shadow-lg"
              onClick={handleLogin}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={loading}
            >
              {loading ? "Logging In..." : "Login"}
            </motion.button>
          </div>
          
          <Link to="/signup">
            <motion.p
              className="cursor-pointer m-auto font-semibold text-lg text-black"
              whileHover={{ scale: 1.1 }}
            >
              New User? Sign Up here !!
            </motion.p>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Login;

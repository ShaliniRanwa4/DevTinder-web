









// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { BASE_URL } from "../utils/constants";
// import { removeUser } from "../utils/userSlice";
// import { useState } from "react";
// import Connections from "../components/Connections";
// import Request from "../components/Request";
// import { motion } from "framer-motion";

// const Navbar = () => {
//   const user = useSelector((store) => store.user);
//   const [error, setError] = useState("");
//   const [isOpen, setIsOpen] = useState(false);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [drawerContent, setDrawerContent] = useState(null);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
//       dispatch(removeUser());
//       return navigate("/login");
//     } catch (err) {
//       setError(err?.response?.data || "Something Went Wrong");
//     }
//   };

//   const openDrawer = (content) => {
//     setDrawerContent(content);
//     setDrawerOpen(true);
//   };

//   return (
//     <div>
//       <div className="navbar bg-base-300 fixed top-0 z-50">
//         <div className="flex-1">
//           <Link to={"/"} className="btn btn-ghost text-3xl">
//             DevTinder
//           </Link>
//         </div>
//         <h3 className="text-red-500">{error}</h3>

//         {user && (
//           <div className="flex-none gap-4 flex items-center">
//             <div className="form-control text-lg font-semibold text-primary transition-all duration-300 hover:scale-105">
//               Welcome, {user.firstName}
//             </div>

//             <div className="relative">
//               <div
//                 role="button"
//                 className={`btn btn-ghost btn-circle avatar transition-all duration-300 ${
//                   isOpen ? "ring-4 ring-primary shadow-lg" : ""
//                 }`}
//                 onClick={() => setIsOpen(!isOpen)}
//               >
//                 <div className="w-10 rounded-full">
//                   <img alt="Profile" src={user.photoUrl} />
//                 </div>
//               </div>

//               <ul
//                 className={`menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow-lg absolute right-0 transition-all duration-300 ease-in-out transform ${
//                   isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
//                 }`}
//               >
//                 <li className="transition-all duration-300 hover:bg-gray-200 hover:scale-105">
//                   <Link to={"/profile"} className="justify-between">
//                     Profile
//                     <span className="badge">edit</span>
//                   </Link>
//                 </li>
//                 <li
//                   className="transition-all duration-300 hover:bg-gray-200 hover:scale-105"
//                   onClick={() => openDrawer(<Connections />)}
//                 >
//                   <span className="justify-between cursor-pointer">Connections</span>
//                 </li>
//                 <li
//                   className="transition-all duration-300 hover:bg-gray-200 hover:scale-105"
//                   onClick={() => openDrawer(<Request />)}
//                 >
//                   <span className="justify-between cursor-pointer">Requests</span>
//                 </li>
//                 <li className="transition-all duration-300 hover:bg-gray-200 hover:scale-105">
//                   <a onClick={handleLogout}>Logout</a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         )}
//       </div>

//       {drawerOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-50 flex"
//           onClick={() => setDrawerOpen(false)}
//         >
//           <motion.div
//             className="bg-gradient-to-r from-orange-400  to-red-500 w-3/6 h-full p-5 shadow-lg transform transition-all duration-500 ease-in-out"
//             initial={{ x: "-100%" }}
//             animate={{ x: 0 }}
//             exit={{ x: "-100%" }}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               className="btn btn-error btn-sm mb-3"
//               onClick={() => setDrawerOpen(false)}
//             >
//               Close
//             </button>
//             <div className="overflow-y-auto h-full">{drawerContent}</div>
//           </motion.div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Navbar;














import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { useState } from "react";
import Connections from "../components/Connections";
import Request from "../components/Request";
import { motion } from "framer-motion";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      setError(err?.response?.data || "Something Went Wrong");
    }
  };

  const openDrawer = (content) => {
    setDrawerContent(content);
    setDrawerOpen(true);
    setIsOpen(false);
  };

  return (
    <div>
      <div className="navbar bg-base-300 fixed top-0 z-50 w-full px-4 md:px-8 flex justify-between items-center">
        {user ? (
          <Link to={"/"} className="text-2xl md:text-3xl font-bold">
            DevTinder
          </Link>
        ) : (
          <span className="text-2xl md:text-3xl font-bold text-gray-400 cursor-default">
            DevTinder
          </span>
        )}

        <h3 className="text-red-500 text-sm md:text-base">{error}</h3>

        {user && (
          <div className="flex items-center gap-4">
            <span className=" md:block text-lg font-semibold">
              Welcome, {user.firstName}
            </span>

            <div className="relative">
              <div
                role="button"
                className={`btn btn-ghost btn-circle avatar transition-all duration-300 ${
                  isOpen ? "ring-4 ring-primary shadow-lg" : ""
                }`}
                onClick={() => setIsOpen(!isOpen)}
              >
                <div className="w-8 md:w-10 rounded-full">
                  <img alt="Profile" src={user.photoUrl} />
                </div>
              </div>

              <ul
                className={`menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-48 md:w-52 p-2 shadow-lg absolute right-0 transition-all duration-300 ease-in-out transform ${
                  isOpen
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                }`}
              >
                <li onClick={() => setIsOpen(false)}>
                  <Link to={"/profile"} className="justify-between">
                    Profile <span className="badge">edit</span>
                  </Link>
                </li>
                <li onClick={() => openDrawer(<Connections />)}>
                  <span className="cursor-pointer">Connections</span>
                </li>
                <li onClick={() => openDrawer(<Request />)}>
                  <span className="cursor-pointer">Requests</span>
                </li>
                <li
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                >
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
          onClick={() => setDrawerOpen(false)}
        >
          <motion.div
            className="bg-gradient-to-r from-orange-400 to-red-500 w-11/12 md:w-3/6 h-full md:h-5/6 p-5 shadow-lg transform transition-all duration-500 ease-in-out"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="btn btn-error btn-sm mb-3"
              onClick={() => setDrawerOpen(false)}
            >
              Close
            </button>
            <div className="overflow-y-auto h-full">{drawerContent}</div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

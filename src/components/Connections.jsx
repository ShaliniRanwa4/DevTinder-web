




// import axios from "axios";
// import { BASE_URL } from "../utils/constants";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addConnections } from "../utils/connectionsSlice";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

// const Connections = () => {
//   const dispatch = useDispatch();
//   const connections = useSelector((store) => store.connections);
//   const [error, setError] = useState();

//   const fetchConnections = async () => {
//     try {
//       const res = await axios.get(BASE_URL + "/user/connection", {
//         withCredentials: true,
//       });
//       dispatch(addConnections(res.data.data));
//       // console.log(res?.data)
//     } catch (err) {
//       setError(err?.response?.data || "Something Went Wrong");
//     }
//   };

//   useEffect(() => {
//     fetchConnections();
//   }, []);

//   if (!connections) return;
//   if (connections.length === 0)
//     return (
//       <h1 className="flex justify-center text-black text-xl my-10 py-24 font-bold">
//         No Connection Found !! Connect to other people
//       </h1>
//     );

//   return (
//     <div className="text-center my-10">
//       <h1 className="font-extrabold text-black text-3xl mt-10">Connection</h1>
//       <p>{error}</p>

//       {connections.map((connection, index) => {
//         const { _id, firstName, lastName, age, about, gender, photoUrl } = connection;
//         return (
//           <motion.div
//             key={_id}
//             className={`m-4 p-6 border rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center max-w-lg w-full mx-auto shadow-lg hover:shadow-xl transition ${
//               index === connections.length - 1 ? "mb-20" : ""
//             }`}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             {/* Profile Image */}
//             <img
//               alt="photo"
//               className="h-20 w-20 rounded-full object-cover border border-white"
//               src={photoUrl}
//             />

//             {/* User Info */}
//             <div className="text-left mx-4 flex-1">
//               <h2 className="font-bold text-white text-lg">{firstName + " " + lastName}</h2>
//               {age && gender && <p className="text-sm text-gray-200">{age} • {gender}</p>}
//               <p className="text-gray-300 text-sm">{about}</p>
//             </div>

//             {/* Chat Button */}
//             <Link to={`/chat/${_id}`}>
//               <button className="btn btn-success btn-sm px-5 py-2 rounded-lg">Chat</button>
//             </Link>
//           </motion.div>
//         );
//       })}
//     </div>
//   );
// };

// export default Connections;







import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PropTypes from "prop-types"; // ✅ Import PropTypes

const Connections = ({ setDrawerOpen }) => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const [error, setError] = useState();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connection", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      setError(err?.response?.data || "Something Went Wrong");
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0)
    return (
      <h1 className="flex justify-center text-black text-xl my-10 py-24 font-bold">
        No Connection Found !! Connect to other people
      </h1>
    );

  return (
    <div className="text-center my-10">
      <h1 className="font-extrabold text-black text-3xl mt-10">Connection</h1>
      <p>{error}</p>

      {connections.map((connection, index) => {
        const { _id, firstName, lastName, age, about, gender, photoUrl } = connection;
        return (
          <motion.div
            key={_id}
            className={`m-4 p-6 border rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center max-w-lg w-full mx-auto shadow-lg hover:shadow-xl transition ${
              index === connections.length - 1 ? "mb-20" : ""
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Profile Image */}
            <img
              alt="photo"
              className="h-20 w-20 rounded-full object-cover border border-white"
              src={photoUrl}
            />

            {/* User Info */}
            <div className="text-left mx-4 flex-1">
              <h2 className="font-bold text-white text-lg">{firstName + " " + lastName}</h2>
              {age && gender && <p className="text-sm text-gray-200">{age} • {gender}</p>}
              <p className="text-gray-300 text-sm">{about}</p>
            </div>

            {/* Chat Button */}
            <Link to={`/chat/${_id}`}>
              <button
                className="btn btn-success btn-sm px-5 py-2 rounded-lg"
                onClick={() => setDrawerOpen(false)}
              >
                Chat
              </button>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
};

// ✅ Define PropTypes for prop validation
Connections.propTypes = {
  setDrawerOpen: PropTypes.func.isRequired,
};

export default Connections;

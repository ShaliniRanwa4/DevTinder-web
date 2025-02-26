// import axios from "axios";
// import { BASE_URL } from "../utils/constants";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addFeed } from "../utils/feedSlice";
// import UserCard from "./UserCard";

// // import { addUser } from "../utils/userSlice";

// const Feed = () => {
//   const feed = useSelector((store) => store.feed);
//   const dispatch = useDispatch();
//   const [error, setError] = useState();



  
//   const handleFeed = async () => {
//     if (feed) return;
//     try {
//       const feedData = await axios.get(BASE_URL + "/feed", {
//         withCredentials: true,
//       });
//       // console.log(feedData?.data?.data);
//       dispatch(addFeed(feedData?.data?.data));
//     } catch (err) {
//       // console.error(err);
//       setError(err?.response?.data || "Something Went Wrong");
//     }
//   };

//   useEffect(() => {
    
//     handleFeed();
//   }, []);

//   if (!feed) return;
//   if (feed.length === 0)
//     return <h1 className="flex justify-center font-bold mt-20 ">No More Feed !!</h1>;

//   return (
//     feed && (
//       <div className="flex justify-center my-10">
//         <h1 className="text-white">{error}</h1>
//         <UserCard user={feed[0]} />
//       </div>
//     )
//   );
// };

// export default Feed;








import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import { motion } from "framer-motion"; // Import Framer Motion

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const handleFeed = async () => {
    if (feed) return;
    try {
      const feedData = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(feedData?.data?.data));
    } catch (err) {
      setError(err?.response?.data || "Something Went Wrong");
    }
  };



  useEffect(() => {
    handleFeed();
  }, []);

const handleNewFeed = async () => {
    try {
      const feedData = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(feedData?.data?.data));
    } catch (err) {
      setError(err?.response?.data || "Something Went Wrong");
    }
}


  // If no feed is available, show an animated message
  if (!feed || feed.length === 0) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center h-screen"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1
          className="text-3xl font-bold text-red-500"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          No More Feed !!
        </motion.h1>
        <motion.div
          className="mt-4 p-4 bg-blue-500 text-white rounded-lg shadow-lg cursor-pointer"
          whileHover={{ scale: 1.1, rotate: 3 }}
          whileTap={{ scale: 0.9 }}
          onClick={()=>handleNewFeed()}
        >
          🔄 Refresh
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="flex justify-center my-10"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <h1 className="text-white">{error}</h1>
      <motion.div
        className="relative"
        initial={{ rotateY: 180, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ scale: 1.05 }}
      >
        <motion.div
          whileHover={{ y: -10 }}
          transition={{ duration: 0.3, repeat: Infinity, repeatType: "reverse" }}
        >
          <UserCard user={feed[0]} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Feed;

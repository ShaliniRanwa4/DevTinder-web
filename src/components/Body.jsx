// import { Outlet, useNavigate } from "react-router-dom";
// import Navbar from "./Navbar";
// import Footer from "./Footer";
// import axios from "axios";
// import { BASE_URL } from "../utils/constants";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addUser } from "../utils/userSlice";

// const Body = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const userData = useSelector((store) => store.user);
  
//    const profileView = async () => {
//     if (userData) return;

//     try {
//       const res = await axios.get(BASE_URL + "/profile/view", {
//         withCredentials: true,
//       });
//       // console.log(res.data);
//       dispatch(addUser(res.data));
//       // return navigate("/")
//     } catch (err) {
//       if (err.status === 401) {
//       return   navigate("/login");
//       }
//       // console.error(err);
//     }
//   };

//   useEffect(() => {
//     profileView();
//   }, [navigate,userData,dispatch]);
 

//   return (
//     <div>
//       <Navbar></Navbar>
//       <Outlet></Outlet>
//       <Footer></Footer>
//     </div>
//   );
// };

// export default Body;



import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.user);
  const [fetched, setFetched] = useState(false); // Prevents multiple calls

  useEffect(() => {
    const profileView = async () => {
      if (userData || fetched) return; // If user exists or API already called, stop

      try {
        const res = await axios.get(BASE_URL + "/profile/view", {
          withCredentials: true,
        });
        dispatch(addUser(res.data));
        setFetched(true); // Mark as fetched to prevent re-fetching
      } catch (err) {
        if (err.response?.status === 401) {
          navigate("/login");
        }
        console.error("Profile fetch error:", err);
      }
    };
    profileView();
  }, 
  []
  
);

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;

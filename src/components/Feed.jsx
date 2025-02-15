import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
// import { useNavigate } from "react-router-dom";
// import { addUser } from "../utils/userSlice";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [error, setError] = useState();

  // const userData = useSelector((store) => store.user);
  // const navigate = useNavigate();


  // const handle1 = async () => {
  //   try {
  //     const res = await axios.get(BASE_URL + "/profile/view", {
  //       withCredentials: true,
  //     });
  //     // console.log(res.data);
  //     dispatch(addUser(res.data));
  //     // navigate("/")
  //   } catch (err) {
  //     if (err.status === 401) {
  //       navigate("/login");
  //     }
  //     // console.error(err);
  //   }
  // };


  // useEffect(()=>{
  //   handle1()
  // })

  
  const handleFeed = async () => {
    if (feed) return;
    try {
      const feedData = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      // console.log(feedData?.data?.data);
      dispatch(addFeed(feedData?.data?.data));
    } catch (err) {
      // console.error(err);
      setError(err?.response?.data || "Something Went Wrong");
    }
  };

  useEffect(() => {
    
    handleFeed();
  }, []);

  if (!feed) return;
  if (feed.length === 0)
    return <h1 className="flex justify-center font-bold">No More Feed !!</h1>;

  return (
    feed && (
      <div className="flex justify-center my-10">
        <h1 className="text-white">{error}</h1>
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;

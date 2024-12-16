import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const handleFeed = async () => {
    if (feed) return;
    try {
      const feedData = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      // console.log(feedData?.data?.data);
      dispatch(addFeed(feedData?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    handleFeed();
  }, []);

  return feed &&(
    <div className="flex justify-center my-10">
      <UserCard user={feed[0]}/>
    </div>
  );
};

export default Feed;

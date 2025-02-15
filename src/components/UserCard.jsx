import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeFeed } from "../utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const UserCard = () => {
  const feed=useSelector((store)=>store.feed)
  const user=feed[0]
  const { _id, firstName, lastName, about, age, gender } = user;
  const dispatch = useDispatch();
  const [error, setError] = useState();

  const handleFeed = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      // console.log(res);
      dispatch(removeFeed(_id));
    } catch (err) {
      // console.error(err)
      
      setError(err?.response?.data || "Something Went Wrong");
    }
  };

 

  return (
    <div className="">
      <h2>{error}</h2>
      <div className="card bg-base-300 w-96 shadow-xl h-auto mt-14">
        <figure>
          <img
            src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
            alt="photo"
            className="h-60 w-full"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {/* {age && gender &&<p>{age+" "+gender}</p>} */}
          {age && <p>{age}</p>} {gender ? gender : "female"}
          <p>{about}</p>
          <div className="card-actions justify-center my-4">
            <button
              className="btn btn-outline btn-info"
              onClick={() => handleFeed("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-outline btn-success"
              onClick={() => handleFeed("interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

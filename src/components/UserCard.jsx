import axios from "axios";
import PropTypes from "prop-types";
import { BASE_URL } from "../utils/constants";
import { removeFeed } from "../utils/feedSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

const UserCard = ({ user }) => {
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

  UserCard.propTypes = {
    user: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      about: PropTypes.string.isRequired,
      // photoUrl:PropTypes.string.isRequired,
      // age:PropTypes.number.isRequired,
      // gender:PropTypes.string.isRequired,
    }).isRequired,
  };

  // console.log(user)

  return (
    <div className="">
      <div className="card bg-base-300 w-96 shadow-xl h-auto mt-14">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
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

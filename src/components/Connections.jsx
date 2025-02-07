import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const [error, setError] = useState();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connection", {
        withCredentials: true,
      });
      // console.log(res.data.data);
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
      <h1 className="flex justify-center my-10 py-24 font-bold">
        {" "}
        NO Connection Found !!{" "}
      </h1>
    );

  return (
    <div className="text-center my-10">
      <h1 className="font-extrabold text-white text-3xl mt-24 ">Connection</h1>
      <p>{error}</p>
      {connections.map((connection) => {
        const { _id, firstName, lastName, age, about, gender } = connection;
        // console.log(photoUrl)
        return (
          <div
            key={_id}
            className="m-4 p-4 border rounded-full bg-base-300 flex w-1/2 mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="h-20 w-20 rounded-full"
                src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
              />
            </div>
            <div className="text-left mx-4">
              {" "}
              <h2 className="font-bold text-white">
                {" "}
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + " " + gender}</p>}
              <p>{about}</p>
            </div>
            <Link to={"/chat/" + _id}>
              <div className="mx-auto my-auto pl-24">
                <button className="btn btn-outline btn-success p-4   ">
                  chat
                </button>
              </div>
            </Link>


          </div>
        );
      })}
    </div>
  );
};

export default Connections;

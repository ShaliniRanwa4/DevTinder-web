import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";


const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connection", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0) return <h1 className="flex justify-center my-10 font-bold"> NO Connection Found !!  </h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connection</h1>
      {connections.map((connection) => {
        const { _id,firstName, lastName, age, about, gender } =
          connection;
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
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
            <div className="text-left mx-4">
              {" "}
              <h2 className="font-bold text-white"> {firstName + " " + lastName}</h2>
             { age && gender &&<p>{age+" "+gender}</p>}
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;

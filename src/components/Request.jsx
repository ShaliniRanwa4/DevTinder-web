import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestsSlice";

const Request = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const [error,setError]=useState("")

  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
      // console.log(res);
      dispatch(addRequests(res?.data?.connectionRequests));
    } catch (err) {
      // console.error(err);
      setError(err?.response?.data ||"Something Went Wrong")
    }
  };

const reviewRequest=async(status,_id)=>{
  try{
    await axios.post(BASE_URL+"/request/review/"+status+"/"+_id,{},{withCredentials:true})
    // console.log(res)
    dispatch(removeRequest(_id))
  }catch(err){
    // console.error(err)
    setError(err?.response?.data ||"Something Went Wrong")
  }

}


  useEffect(() => {
    fetchRequest();
  }, []);

  if (!requests) return;
  if (requests.length === 0) return <h1 className="flex justify-center my-10 py-24 font-bold"> NO Request Found </h1>;

  return (
  

    <div className="text-center my-10">
  <h1 className="font-extrabold text-white text-3xl mt-24 mb-10">Request Received</h1>
  <h3>{error}</h3>

  {requests.map((request) => {
    const { _id, firstName, lastName, age, about, gender } = request.fromUserId;

    return (
      <div
        key={_id}
        className="p-6 flex items-center justify-between border rounded-lg bg-base-300 max-w-lg w-full mx-auto my-3 shadow-md hover:shadow-lg transition"
      >
        {/* Profile Image */}
        <img
          alt="User Avatar"
          className="h-16 w-16 rounded-full object-cover border border-gray-500"
          src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
        />

        {/* User Info */}
        <div className="text-left flex-1 mx-4">
          <h2 className="font-bold text-white text-lg">{firstName + " " + lastName}</h2>
          {age && gender && <p className="text-sm text-gray-300">{age} • {gender}</p>}
          <p className="text-gray-400 text-sm">{about}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button 
            className="btn btn-outline btn-info btn-sm px-4 rounded-md transition hover:bg-info hover:text-white" 
            onClick={() => reviewRequest("rejected", request._id)}
          >
            Reject
          </button>

          <button 
            className="btn btn-outline btn-success btn-sm px-4 rounded-md transition hover:bg-success hover:text-white" 
            onClick={() => reviewRequest("accepted", request._id)}
          >
            Add Connection
          </button>
        </div>
      </div>
    );
  })}
</div>

  );
};

export default Request;

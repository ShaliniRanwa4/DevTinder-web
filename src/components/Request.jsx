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
      <h1 className="text-bold text-white text-3xl mt-24 mb-10">Request Received</h1>
      {requests.map((request) => {
        const { _id, firstName, lastName, age, about, gender } =
          request.fromUserId;
        // console.log(photoUrl)
        return (
          <div
            key={_id}
            className=" p-4 justify-between  items-center border rounded-full bg-base-300 flex w-1/2 mx-auto my-3"
          >
            <div>
              <img
                alt="photo"
                className="h-20 w-20 rounded-full"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
            <div className="text-left">
              {" "}
              <h2 className="font-bold text-white">
                {" "}
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + " " + gender}</p>}
              <p>{about}</p>
            </div>
            <button className="btn btn-outline btn-info  px-4 rounded-full" onClick={()=>reviewRequest("rejected",request._id)}>Reject</button>
            <button className="btn btn-outline btn-success px-4 rounded-full"onClick={()=>reviewRequest("accepted",request._id)}>Add Connection</button>
          </div>
        );
      })}
    </div>
  );
};

export default Request;

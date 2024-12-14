// import axios from "axios";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setemailId] = useState("kalawati4@gmail.com");
  const [password, setPassword] = useState("Kalawati@123");
  const navigate=useNavigate();

  const dispatch=useDispatch()

  const handleLogin = async () => {
    try {
      const res = await axios.post(
       BASE_URL +"/login",
        { emailId, password },
        { withCredentials: true }
      );
      // console.log(res.data);
      dispatch(addUser(res.data))
       return navigate("/")

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300  w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Login </h2>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">emailId ID</span>
            </div>
            <input
              type="text"
              placeholder="E-mail"
              value={emailId}
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setemailId(e.target.value)}
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div className="card-actions justify-center m-2">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
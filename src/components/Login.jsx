// import axios from "axios";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setemailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      // console.log(res.data);
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something Went Wrong");
      // console.error(err);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { emailId, password, firstName, lastName },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data))
      return navigate("/profile")
    } catch (err) {
      setError(err?.response?.data || "Something Went Wrong");
      // console.error(err);
    }
  };

  return (
    <div className="flex justify-center mb-24 mt-24 " >
  
      <div className="card  bg-orange-500 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center font-bold text-2xl   text-black">
            {isLoginForm ? "Login" : "Sign Up"}{" "}
          </h2>

          {!isLoginForm && (
            <>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text font-semibold text-lg  text-black"> First Name</span>
                </div>
                <input
                  type="text"
                  placeholder="first Name"
                  value={firstName}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text font-semibold text-lg  text-black">Last Name</span>
                </div>
                <input
                  type="text"
                  placeholder="last Name"
                  value={lastName}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
            </>
          )}

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text font-semibold text-lg  text-black">Email Id</span>
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
              <span className="label-text font-semibold text-lg  text-black">Password</span>
            </div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <p className="text-white">{error}</p>
          <div className="card-actions justify-center m-2">
            <button
              className="btn text-xl"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>
          <p
            className="cursor-pointer m-auto font-semibold text-lg  text-black"
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {isLoginForm
              ? "New User ? Sign Up here !!"
              : "Existing User ? Login here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

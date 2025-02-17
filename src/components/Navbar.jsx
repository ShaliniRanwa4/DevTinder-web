import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { useState } from "react";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const [error,setError]=useState("")
  // console.log(user)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());

      return navigate("/login");
    } catch (err) {
      // console.error(err);
      setError(err?.response?.data ||"Something Went Wrong")
    }
  };

  return (
    <div>
      <div className="navbar bg-base-300 fixed top-0 z-50">
        <div className="flex-1">
          {/* <Link to={"/"} className="btn btn-ghost text-3xl"> */}
            DevTinder
          {/* </Link> */}
        </div>
        <h3>{error}</h3>
        {user && (
          <div className="flex-none gap-2">
            <div className="form-control">Welcome,{user.firstName}</div>

            <div className="dropdown dropdown-end mx-5">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to={"/profile"} className="justify-between">
                    Profile
                    {/* <span className="badge">New</span> */}
                  </Link>
                </li>
                <li>
                  {" "}
                  <Link to={"/connections"} className="justify-between">
                    Connections
                  </Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link to={"/requests"} className="justify-between">
                    Request
                  </Link>{" "}
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

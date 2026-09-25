import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { resetStore } from "../store/app.store";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/logout",
        {},
        {
          withCredentials: true,
        },
      );
      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedIn");
      dispatch(resetStore());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="sticky top-0 z-50 w-full">
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          {/* need to add a logo */}
          <Link to="/" className="btn btn-ghost text-xl">
            👩🏻‍💻DevTinder
          </Link>
        </div>
        {user && (
          <div className="flex gap-2 items-center">
            <p>Welcome {user.firstName}</p>
            {user.isPremium && (
              <>
                {/* add this to a reusable component and use it in the navbar and usercard */}
                <div className="relative inline-block p-2 ml-4">
                  <span className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-0.5 flex items-center justify-center ring-2 ring-white">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokwidth="3"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </span>
                </div>
              </>
            )}
            <div className="dropdown dropdown-end mx-4">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user.photoUrl}
                  />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/connections">Connections</Link>
                </li>
                <li>
                  <Link to="/requests">Requests</Link>
                </li>
                {!user.isPremium && (
                  <li>
                    <Link to="/premium">Premium</Link>
                  </li>
                )}
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;

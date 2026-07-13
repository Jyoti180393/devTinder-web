import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { useCallback, useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/userSlice";

const Body = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const isNotLoginPage =
    location.pathname.includes("privacy-policy") ||
    location.pathname.includes("contactUs") ||
    location.pathname.includes("aboutUs");
  const isLoginPage = location.pathname.startsWith("/login");
  const isLoggedIn = Boolean(localStorage.getItem("isLoggedIn"));

  // using useCallback to avoid infinite loop in useEffect
  // since fetchUser is a dependency of useEffect, and useEffect runs when fetchUser changes
  // since fetchUser is defined inside the component, it changes on every render
  // we are making fetchUser a stable function by wrapping it in useCallback
  // untill any dependency of useCallback changes,
  // fetchUser will not change, and useEffect will not run again
  const fetchUser = useCallback(async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data.data));
    } catch (err) {
      if (err?.response?.status === 401) {
        navigate("/login");
      }
      console.log(err.response?.data || err);
      // TODO: make an error page and add an option to login
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (isNotLoginPage || isLoginPage) return;

    if (userData) return;

    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    fetchUser();
  }, [isNotLoginPage, isLoginPage, userData, isLoggedIn, navigate, fetchUser]);

  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Profile from "./components/Profile";
import Login from "./components/Login";
import { Provider } from "react-redux";
import appStore from "./store/app.store";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Signup from "./components/Signup";
import PrivacyPolicy from "./components/Footer-pages/PrivacyPolicy";
import ContactUs from "./components/Footer-pages/ContactUs";
import AboutUs from "./components/Footer-pages/AboutUs";

function App() {
  return (
    <>
      {/* <NavBar /> */}
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />}>
                <Route path="/login/signup" element={<Signup />} />
              </Route>
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/contactUs" element={<ContactUs />} />
              <Route path="/aboutUs" element={<AboutUs />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;

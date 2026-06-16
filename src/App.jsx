import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./Body";
import Profile from "./Profile";
import Login from "./Login";

function App() {
  return (
    <>
      {/* <NavBar /> */}
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <h1 className="text-3xl font-bold "> Hello World</h1> */}
    </>
  );
}

export default App;

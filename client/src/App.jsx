import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom"; // Notice the Routes and Link components
import Sidebar from "./components/Sidebar/Sidebar";
import Feed from "./components/Feed/Feed";
import Widgets from "./components/Widgets/Widgets";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import ProfileWidgets from "./components/ProfileWidgets/ProfileWidgets";
import ProfileFollow from "./components/ProfileFollow/ProfileFollow";
import BottomNav from "./elements/BottomNav/BottomNav";

import "./App.css";

import { useStateValue } from "./contexts/StateContextProvider";
import { actionTypes } from "./contexts/StateReducers";
import request from "./utils/request";
import { api } from "./constants";
import Loader from "./elements/Loader/Loader";
const App = () => {
  const [{ user }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(false);
  const getCurrentUserData = async () => {
    setLoading(true);
    try {
      const response = await request.get(api.auth.me);
      console.log(response.data.data);
      // return;
      dispatch({
        type: actionTypes.SET_USER,
        user: response?.data?.data || {},
      });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getCurrentUserData();
    }
  }, []);

  return (
    <div className="app">
      {loading ? (
        <div
          style={{
            justifyContent: "center",
            height: "100vh",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Loader />
        </div>
      ) : user ? (
        <Router>
          <div className="app__mainContent">
            <Sidebar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile/:username" element={<ProfileRoutes />} />
              {/* <Route path="/status/:postId" element={<StatusRoutes />} /> */}
              <Route path="*" element={<Navigate to={"/"} />} />
            </Routes>
          </div>
          <BottomNav />
        </Router>
      ) : (
        <Login />
      )}
    </div>
  );
};

// Define Home component
const Home = () => (
  <div className="app__main">
    <Feed />
    <Widgets />
  </div>
);

// Define ProfileRoutes component
const ProfileRoutes = () => (
  <div className="app__main">
    <Routes>
      <Route path="/" element={<Profile />} />
      <Route path="followinfo" element={<ProfileFollow />} />
    </Routes>
    <ProfileWidgets />
  </div>
);

// Define StatusRoutes component
// const StatusRoutes = () => (
//   <div className="app__main">
//     <Routes>
//       <Route path="/" element={<Status />} />
//     </Routes>
//     {/* <StatusWidget /> */}
//   </div>
// );

export default App;

import React from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

import "./BottomNav.css";

const BottomNav = () => {
  return (
    <div className="bottomNav">
      <nav>
        <NavLink
          exact
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "bottomNav__active" : ""
          }
        >
          <HomeIcon />
        </NavLink>
        <NavLink
          to="/search"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "bottomNav__active" : ""
          }
        >
          <PanoramaFishEyeIcon />
        </NavLink>
        <NavLink
          to="/notifications"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "bottomNav__active" : ""
          }
        >
          <NotificationsNoneIcon />
        </NavLink>
        <NavLink
          to="/messages"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "bottomNav__active" : ""
          }
        >
          <MailOutlineIcon />
        </NavLink>
      </nav>
    </div>
  );
};

export default BottomNav;

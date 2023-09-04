import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./SidebarAccount.css";
import { useStateValue } from "../../contexts/StateContextProvider";
import UserItem from "../UserItem/UserItem";
import backDrop from "../../assets/backdrop4.jpg";

const SidebarAccount = () => {
  const [{ user }] = useStateValue();
  const [profile, setProfile] = useState(user);

  const [anchorEl, setAnchorEl] = useState(null);
  const onClickExpand = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);
  const id = open ? "post-popover" : undefined;

  const signout = async () => {
    try {
      localStorage.clear();
      window.location.href = "/";
    } catch (error) {}
  };

  return (
    <>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        style={{
          transform: "translate(2rem, -1rem)",
        }}
      >
        <ul className="post__expandList">
          <UserItem
            name={profile?.fullName || "N/A"}
            username={profile?.username || "N/A"}
            photourl={backDrop}
          />

          <li onClick={signout} className="logoutBtn">
            <h3 style={{ textAlign: "center" }}>Log out</h3>
          </li>
        </ul>
      </Popover>

      <div
        className="sidebarAccount__wrapper"
        aria-describedby={id}
        variant="contained"
        onClick={onClickExpand}
      >
        <div className="sidebarAccount__ava">
          <Avatar src={backDrop} />
        </div>
        <div className="sidebarAccount__userData">
          <h2>{profile && `@${profile.username}`}</h2>
        </div>
        <div className="sidebarAccount__expandIcon">
          <ExpandMoreIcon />
        </div>
      </div>
    </>
  );
};

export default SidebarAccount;

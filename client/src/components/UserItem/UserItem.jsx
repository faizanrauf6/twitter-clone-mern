import React from "react";
import Avatar from "@mui/material/Avatar";
import "./UserItem.css";

const UserItem = ({ name, username, photourl }) => {
  return (
    <div
      className="user__item"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "5px",
        padding: "10px",
      }}
    >
      <Avatar src={photourl} />
      <div className="user__details">
        <h2>{name}</h2>
        <span>@{username}</span>
      </div>
    </div>
  );
};

export default UserItem;

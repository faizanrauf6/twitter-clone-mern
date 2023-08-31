import React, { useState, useEffect } from "react";
import { Avatar } from "@mui/material";

import { useStateValue } from "../../contexts/StateContextProvider";

const FollowingEquality = ({ profile }) => {
  const [{ user }] = useStateValue();
  const [myFollowing, setMyFollowing] = useState([]);
  const [equality, setEquality] = useState([]);

  const [user1, setUser1] = useState(null);
  const [user2, setUser2] = useState(null);


  useEffect(() => {
    if (profile && profile.followers.length > 0) {
      setEquality(
        profile.followers.filter((item) => myFollowing.includes(item))
      );
    }
  }, [myFollowing, profile]);

 
  console.log(equality);

  return (
    <div className="followedInfo">
      {equality.length > 0 ? (
        <>
          {user1 && <Avatar src={user1.photoURL} />}
          {equality.length > 1 && user2 && <Avatar src={user2.photoURL} />}
          <span>
            Followed by {`${user1 ? user1.displayName : ""} `}{" "}
            {equality.length === 2 && user2 ? `and ${user2.displayName}` : ""}{" "}
            {equality.length > 2 && user2
              ? `, ${user2.displayName}, and ${equality.length - 2} others`
              : ""}{" "}
          </span>
        </>
      ) : (
        <span>Not followed by anyone you follow</span>
      )}
    </div>
  );
};

export default FollowingEquality;

import React, { useState, useEffect } from "react";
import TweetBox from "../TweetBox/TweetBox";
import Posts from "../Posts/Posts";
import { Avatar } from "@mui/material";
import Loader from "../../elements/Loader/Loader";
import "./Feed.css";

import { useStateValue } from "../../contexts/StateContextProvider";

const Feed = () => {
  const [{ user }] = useStateValue();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);

  return (
    <div className='feed'>
      <div className='feed__header'>
        <div className='feed__header-ava'>
          <Avatar src={profile && profile.photoURL} />
        </div>
        <h2>Home</h2>
      </div>

      <TweetBox />

      {loading && (
        <div className='feed__loader'>
          <Loader />
        </div>
      )}

      <Posts posts={posts} />
    </div>
  );
};

export default Feed;
